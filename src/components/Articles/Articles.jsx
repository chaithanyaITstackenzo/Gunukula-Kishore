import { useState } from 'react';
import { motion } from 'framer-motion';
import data from '../../data/articles.json';
import styles from './Articles.module.css';

const DEFAULT_IMAGE = '/images/about-portrait.png';

export default function Articles() {
  const items = data.items || [];
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleItems = items.slice(0, visibleCount);
  const canLoadMore = items.length > visibleCount;

  return (
    <section id="articles" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">MEDIA</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.description}</p>
        </div>

        <div className={styles.grid}>
          {visibleItems.map((a, i) => (
            <motion.article
              key={a.id}
              className={styles.card}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              {true && (
                <div className={styles.imageWrap}>
                  {a.url ? (
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      <img src={a.image || DEFAULT_IMAGE} alt={`${a.publication} - ${a.title}`} loading="lazy" />
                    </a>
                  ) : (
                    <img src={a.image || DEFAULT_IMAGE} alt={`${a.publication} - ${a.title}`} loading="lazy" />
                  )}
                </div>
              )}

              <div className={styles.body}>
                <div className={styles.publication}>{a.publication}</div>
                <h3 className={styles.title}>{a.title}</h3>
                <div className={styles.date}>{a.date}</div>
                <p className={styles.excerpt}>{a.excerpt}</p>

                {a.url ? (
                  <a className={styles.readLink} href={a.url} target="_blank" rel="noopener noreferrer">Read Article →</a>
                ) : (
                  <div className={styles.unavailable}>Article link unavailable</div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {canLoadMore ? (
          <div className={styles.moreWrap}>
            <button className={styles.viewMoreBtn} onClick={() => setVisibleCount(items.length)}>
              View More Articles
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
