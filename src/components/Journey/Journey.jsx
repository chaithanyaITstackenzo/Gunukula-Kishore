import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import journey from '../../data/journey.json';
import styles from './Journey.module.css';

export default function Journey() {
  const milestones = journey.milestones;
  const defaultIndex = Math.max(
    milestones.findIndex((m) => m.status === 'current'),
    0
  );
  const [active, setActive] = useState(defaultIndex);
  const stripRef = useRef(null);
  const itemRefs = useRef([]);

  const goTo = (i) => setActive(((i % milestones.length) + milestones.length) % milestones.length);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Keep the active year centered in the scrollable strip.
  useEffect(() => {
    const el = itemRefs.current[active];
    if (el && stripRef.current) {
      const strip = stripRef.current;
      const target = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
      strip.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [active]);

  const current = milestones[active];

  return (
    <section id="journey" className={styles.journey}>
      <div className={styles.bgStack}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={current.id}
            className={styles.bgLayer}
            style={{ backgroundImage: `url(${current.image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className={styles.overlay} />
      </div>

      <div className={styles.dots}>
        {milestones.map((m, i) => (
          <button
            key={m.id}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${m.year}`}
          />
        ))}
      </div>

      <div className={styles.journeyInner}>
        <div className={styles.journeyContent}>
          <span className={styles.eyebrow}>The Journey</span>
          <h2 className={styles.heading}>Our Journey</h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className={styles.storyBlock}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.year}>{current.year}</span>
              <h3 className={styles.milestoneTitle}>{current.title}</h3>
              <p className={styles.milestoneDesc}>{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.stripWrap}>
        <div className={styles.strip} ref={stripRef}>
          {milestones.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`${styles.stripItem} ${i === active ? styles.stripItemActive : ''} ${styles[`stripItem_${m.status}`]}`}
              onClick={() => goTo(i)}
            >
              {m.year}
              {i === active && (
                <motion.span
                  layoutId="journey-active-marker"
                  className={styles.activeMarker}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.navArrows}>
          <button onClick={prev} aria-label="Previous milestone"><HiChevronLeft size={22} /></button>
          <button onClick={next} aria-label="Next milestone"><HiChevronRight size={22} /></button>
        </div>
      </div>
    </section>
  );
}
