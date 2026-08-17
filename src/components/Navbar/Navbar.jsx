import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import hero from '../../data/hero.json';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'journey', label: 'Journey' },
  { to: 'responsibilities', label: 'Responsibilities' },
  { to: 'achievements', label: 'Achievements' },
  { to: 'activities', label: 'Activities' },
  { to: 'gallery', label: 'Gallery' },
  { to: 'mission', label: 'Mission' },
  { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.05 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const showSolid = open || !isHeroVisible;
  const themeClass = showSolid ? styles.darkText : styles.lightText;

  return (
    <header className={`${styles.navbar} ${showSolid ? styles.solid : ''} ${themeClass}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="home" smooth duration={350} className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark}>GK</span>
          <span className={styles.logoText}>{hero.name}</span>
        </Link>

        <nav className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={350}
              offset={-80}
              spy
              onSetActive={() => setActive(link.to)}
              className={`${styles.navLink} ${active === link.to ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="contact" smooth duration={350} offset={-80} className={`btn btn-primary ${styles.ctaDesktop}`}>
          Join Us
        </Link>

        <button className={styles.hamburger} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                offset={-60}
                onClick={() => setOpen(false)}
                className={styles.mobileLink}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
