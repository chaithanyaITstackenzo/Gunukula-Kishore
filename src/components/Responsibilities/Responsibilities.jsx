import { motion } from 'framer-motion';
import { FaUsers, FaBullhorn, FaHandshake } from 'react-icons/fa';
import data from '../../data/responsibilities.json';
import styles from './Responsibilities.module.css';

const ICON_MAP = { FaUsers, FaBullhorn, FaHandshake };

export default function Responsibilities() {
  return (
    <section id="responsibilities" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Responsibilities</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div className={styles.grid}>
          {data.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon] || FaUsers;
            return (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className={styles.iconWrap}><Icon size={26} /></div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.org}>{item.organization}</p>
                <span className={styles.period}>{item.period}</span>
                <p className={styles.desc}>{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
