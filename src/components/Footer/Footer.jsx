import { Link } from 'react-scroll';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import hero from '../../data/hero.json';
import contact from '../../data/contact.json';
import styles from './Footer.module.css';

const QUICK_LINKS = ['about', 'journey', 'responsibilities', 'achievements', 'activities', 'gallery', 'contact'];
const ICONS = { Facebook: FaFacebook, Twitter: FaTwitter, Instagram: FaInstagram, YouTube: FaYoutube };

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>GK</span>
            <span>{hero.name}</span>
          </div>
          <p className={styles.tagline}>{hero.slogan}</p>
        </div>

        <div className={styles.linksCol}>
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <Link to={l} smooth duration={600} offset={-80}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.newsletterCol}>
          <h4>Stay Updated</h4>
          <p>Get updates on public programs and party activities.</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
          <div className={styles.social}>
            {contact.socialLinks.map((s) => {
              const Icon = ICONS[s.platform] || FaFacebook;
              return <a key={s.platform} href={s.url} aria-label={s.platform}><Icon size={15} /></a>;
            })}
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} . All rights reserved by Stackenzo.</span>
        <Link to="home" smooth duration={600} className={styles.backTop} aria-label="Back to top">
          <FaArrowUp size={14} />
        </Link>
      </div>
    </footer>
  );
}
