import { motion, AnimatePresence } from 'framer-motion';
import { Link, Route, Switch, useLocation, Router as WouterRouter, Redirect } from 'wouter';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const tabs = [
  { id: 'about',        label: 'About',        path: '/about' },
  { id: 'skills',       label: 'Skills',        path: '/skills' },
  { id: 'experience',   label: 'Experience',    path: '/experience' },
  { id: 'achievements', label: 'Achievements',  path: '/achievements' },
  { id: 'education',    label: 'Education',     path: '/education' },
  { id: 'contact',      label: 'Contact',       path: '/contact' },
];

function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-white/8">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center gap-8">
        {/* Logo */}
        <Link href="/about">
          <span className="font-serif text-xl tracking-wider text-primary font-bold shrink-0 py-3 cursor-pointer">
            CV<span className="text-foreground">.</span>
          </span>
        </Link>

        {/* Tab links */}
        <nav className="flex overflow-x-auto gap-0" style={{ scrollbarWidth: 'none' }}>
          {tabs.map((tab) => {
            const isActive = location === tab.path || (location === '/' && tab.path === '/about');
            return (
              <Link key={tab.id} href={tab.path}>
                <span
                  className={`relative block shrink-0 px-4 py-4 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Pages() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Switch>
          <Route path="/">
            <Redirect to="/about" />
          </Route>
          <Route path="/about"        component={About} />
          <Route path="/skills"       component={Skills} />
          <Route path="/experience"   component={Experience} />
          <Route path="/achievements" component={Achievements} />
          <Route path="/education"    component={Education} />
          <Route path="/contact"      component={Contact} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
        <Header />
        <main className="max-w-6xl mx-auto">
          <Pages />
        </main>
        <Footer />
      </div>
    </WouterRouter>
  );
}

export default App;
