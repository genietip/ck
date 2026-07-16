import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { LogIn, Upload, Trash2, LogOut, Check, X } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Photo { filename: string; url: string }
type Section = 'hero' | 'skills' | 'experience' | 'achievements' | 'education' | 'contact' | 'gallery';

// ─── Login form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api.login(username, password);
      onLogin(token);
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-card border border-white/8 rounded-2xl p-8"
      >
        <div className="mb-8 text-center">
          <span className="font-serif text-3xl text-primary font-bold">CV<span className="text-foreground">.</span></span>
          <p className="text-muted-foreground text-sm mt-2 tracking-wide">Admin Portal</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-secondary border border-white/8 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-secondary border border-white/8 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Inline editable field ────────────────────────────────────────────────────
function EditableField({
  label, value, multiline = false,
  onSave
}: {
  label: string; value: string; multiline?: boolean;
  onSave: (v: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    await onSave(val);
    setSaving(false);
    setEditing(false);
  }

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</label>
      {editing ? (
        <div className="flex gap-2 items-start">
          {multiline ? (
            <textarea
              value={val}
              onChange={e => setVal(e.target.value)}
              rows={3}
              className="flex-1 bg-secondary border border-primary/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none resize-none"
            />
          ) : (
            <input
              value={val}
              onChange={e => setVal(e.target.value)}
              className="flex-1 bg-secondary border border-primary/40 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none"
            />
          )}
          <button onClick={save} disabled={saving} className="p-2 text-green-400 hover:text-green-300"><Check size={16} /></button>
          <button onClick={() => { setVal(value); setEditing(false); }} className="p-2 text-red-400 hover:text-red-300"><X size={16} /></button>
        </div>
      ) : (
        <p
          className="text-foreground text-sm cursor-pointer hover:text-primary transition-colors border border-transparent hover:border-primary/30 rounded-lg px-3 py-2 -mx-3"
          onClick={() => setEditing(true)}
        >
          {value || <span className="text-muted-foreground italic">Click to edit…</span>}
        </p>
      )}
    </div>
  );
}

// ─── Gallery manager ──────────────────────────────────────────────────────────
function GalleryManager({ token }: { token: string }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    const data = await api.getGallery().catch(() => []);
    setPhotos(data);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      await api.uploadPhotos(files, token);
      await load();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function handleDelete(filename: string) {
    await api.deletePhoto(filename, token);
    setPhotos(p => p.filter(x => x.filename !== filename));
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors"
        >
          <Upload size={16} />
          {uploading ? 'Uploading…' : 'Upload Photos'}
        </button>
        <span className="text-sm text-muted-foreground">{photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
      </div>

      {photos.length === 0 ? (
        <p className="text-muted-foreground text-sm italic">No photos yet. Upload some above.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {photos.map(photo => (
            <div key={photo.filename} className="group relative aspect-square rounded-xl overflow-hidden border border-white/8">
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(photo.filename)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 hover:text-red-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Hero editor ──────────────────────────────────────────────────────────────
function HeroEditor({ content, token }: { content: Record<string, unknown>; token: string }) {
  const hero = (content.hero || {}) as Record<string, unknown>;

  async function save(field: string, value: string) {
    await api.updateContent('hero', { ...hero, [field]: value }, token);
  }

  return (
    <div>
      <EditableField label="First Name" value={hero.name1 as string || ''} onSave={v => save('name1', v)} />
      <EditableField label="Last Name" value={hero.name2 as string || ''} onSave={v => save('name2', v)} />
      <EditableField label="Tagline" value={hero.tagline as string || ''} onSave={v => save('tagline', v)} />
      <EditableField label="Bio" value={hero.bio as string || ''} multiline onSave={v => save('bio', v)} />
      <EditableField label="Email" value={hero.email as string || ''} onSave={v => save('email', v)} />
      <EditableField label="Phone" value={hero.phone as string || ''} onSave={v => save('phone', v)} />
      <EditableField label="Location" value={hero.location as string || ''} onSave={v => save('location', v)} />
    </div>
  );
}

// ─── Skills editor ────────────────────────────────────────────────────────────
function SkillsEditor({ content, token }: { content: Record<string, unknown>; token: string }) {
  const skills = (content.skills || []) as string[];
  const [list, setList] = useState<string[]>(skills);
  const [adding, setAdding] = useState('');

  async function saveList(updated: string[]) {
    setList(updated);
    await api.updateContent('skills', updated, token);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {list.map((skill, i) => (
          <span key={i} className="flex items-center gap-1 bg-secondary border border-white/8 rounded-full px-4 py-2 text-sm">
            {skill}
            <button onClick={() => saveList(list.filter((_, j) => j !== i))} className="ml-1 text-muted-foreground hover:text-red-400 transition-colors">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={adding}
          onChange={e => setAdding(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && adding.trim()) { saveList([...list, adding.trim()]); setAdding(''); } }}
          placeholder="Add skill and press Enter…"
          className="flex-1 bg-secondary border border-white/8 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/40"
        />
        <button
          onClick={() => { if (adding.trim()) { saveList([...list, adding.trim()]); setAdding(''); } }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ─── JSON editor (for complex sections) ──────────────────────────────────────
function JsonEditor({ section, content, token }: { section: string; content: Record<string, unknown>; token: string }) {
  const [value, setValue] = useState(JSON.stringify(content[section], null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    try {
      const parsed = JSON.parse(value);
      setSaving(true);
      setError('');
      await api.updateContent(section, parsed, token);
    } catch {
      setError('Invalid JSON');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={20}
        className="w-full bg-secondary border border-white/8 rounded-xl px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/40 resize-y"
        spellCheck={false}
      />
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <button
        onClick={save}
        disabled={saving}
        className="mt-3 bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContent()
      .then(setContent)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sections: { id: Section; label: string }[] = [
    { id: 'hero', label: 'Hero / About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin top bar */}
      <div className="sticky top-0 z-50 bg-background border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl text-primary font-bold">CV<span className="text-foreground">.</span></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground border border-white/10 px-2 py-0.5 rounded">Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar nav */}
        <aside className="w-48 shrink-0">
          <nav className="flex flex-col gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === s.id
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1 min-w-0">
          <h2 className="text-xl font-serif text-foreground mb-6 pb-4 border-b border-white/8">
            {sections.find(s => s.id === activeSection)?.label}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {activeSection === 'hero' && <HeroEditor content={content} token={token} />}
              {activeSection === 'skills' && <SkillsEditor content={content} token={token} />}
              {activeSection === 'experience' && <JsonEditor section="experience" content={content} token={token} />}
              {activeSection === 'achievements' && <JsonEditor section="achievements" content={content} token={token} />}
              {activeSection === 'education' && <JsonEditor section="education" content={content} token={token} />}
              {activeSection === 'contact' && <JsonEditor section="contact" content={content} token={token} />}
              {activeSection === 'gallery' && <GalleryManager token={token} />}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export function AdminPage() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));

  function handleLogin(t: string) {
    sessionStorage.setItem('admin_token', t);
    setToken(t);
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_token');
    setToken(null);
  }

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}
