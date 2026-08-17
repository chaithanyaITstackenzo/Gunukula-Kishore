import { motion } from 'framer-motion';
import CountUpImport from 'react-countup';
const CountUp = CountUpImport?.default?.default ?? CountUpImport?.default ?? CountUpImport;
import { FaTrophy, FaShieldAlt, FaFlag } from 'react-icons/fa';
import data from '../../data/achievements.json';
import styles from './Achievements.module.css';

const ICON_MAP = { FaTrophy, FaShieldAlt, FaFlag };

export default function Achievements() {
  return (
    <section id="achievements" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Achievements</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div className={styles.statsRow}>
          {data.stats.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statNumber}>
                <CountUp end={s.value} duration={2.2} enableScrollSpy scrollSpyOnce />{s.suffix}
              </span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {data.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || FaTrophy;
            return (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Icon className={styles.icon} size={22} />
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
