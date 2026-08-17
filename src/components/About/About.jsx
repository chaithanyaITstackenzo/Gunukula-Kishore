import { motion } from 'framer-motion';
import CountUpImport from 'react-countup';
const CountUp = CountUpImport?.default?.default ?? CountUpImport?.default ?? CountUpImport;
import about from '../../data/about.json';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.imageFrame}>
            <img src={about.image} alt="Gunukula Kishore" />
          </div>
          <div className={styles.imageAccent} />
        </motion.div>

        <motion.div
          className={styles.contentCol}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">About</span>
          <h2 className="section-heading">{about.heading}</h2>
          <p className={styles.paragraph}>{about.introduction}</p>
          <p className={styles.paragraph}>{about.leadership}</p>
          <p className={styles.paragraph}>{about.publicService}</p>

          <div className={styles.values}>
            {about.values.map((v) => (
              <span key={v} className={styles.valueChip}>{v}</span>
            ))}
          </div>

          <div className={styles.stats}>
            {about.stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statNumber}>
                  <CountUp end={s.value} duration={2.2} enableScrollSpy scrollSpyOnce />
                  {s.suffix}
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
