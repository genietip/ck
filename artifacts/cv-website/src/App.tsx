import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const tabs = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

function TabContent({ activeTab }: { activeTab: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {activeTab === 'about' && <About />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'experience' && <Experience />}
        {activeTab === 'achievements' && <Achievements />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'contact' && <Contact />}
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">

      {/* ── Combined sticky header: logo + tabs in one bar ── */}
      <header className="sticky top-0 z-50 bg-background border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center gap-8">
          {/* Logo */}
          <span className="font-serif text-xl tracking-wider text-primary font-bold shrink-0 py-3">
            CV<span className="text-foreground">.</span>
          </span>

          {/* Tabs */}
          <nav className="flex overflow-x-auto gap-0" style={{ scrollbarWidth: 'none' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-4 py-4 text-sm font-medium tracking-wide transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — always visible below the header */}
      <Hero />

      {/* Tab content */}
      <main className="max-w-6xl mx-auto">
        <TabContent activeTab={activeTab} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
