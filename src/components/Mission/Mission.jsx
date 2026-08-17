import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaQuoteLeft } from 'react-icons/fa';
import data from '../../data/mission.json';
import styles from './Mission.module.css';

export default function Mission() {
  return (
    <section id="mission" className={`section ${styles.wrap}`}>
      <div className={styles.pattern} />
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Mission &amp; Vision</span>
          <h2 className="section-heading">{data.heading}</h2>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.col}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.iconWrap}><FaBullseye size={26} /></div>
            <h3>{data.mission.title}</h3>
            <p>{data.mission.description}</p>
          </motion.div>

          <motion.div
            className={styles.col}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.iconWrap}><FaEye size={26} /></div>
            <h3>{data.vision.title}</h3>
            <p>{data.vision.description}</p>
          </motion.div>
        </div>

        <motion.div
          className={styles.quote}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <FaQuoteLeft className={styles.quoteIcon} size={22} />
          <p>{data.quote.text}</p>
          <span>&mdash; {data.quote.attribution}</span>
        </motion.div>
      </div>
    </section>
  );
}
