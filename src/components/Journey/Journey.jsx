import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import styles from './Journey.module.css';
import journeyData from '../../data/journey.json';

export default function Journey() {
  const [milestones, setMilestones] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const activeStripItemRef = useRef(null);
  const stripRef = useRef(null);
  const shouldScrollStrip = useRef(false);

  useEffect(() => {
    const nextMilestones = journeyData.milestones ?? [];
    setMilestones(nextMilestones);
    setActiveId((current) => {
      if (nextMilestones.some((m) => m.id === current)) {
        return current;
      }
      return nextMilestones[0]?.id ?? 0;
    });
  }, []);

  const current = useMemo(() => {
    if (!milestones.length) return null;
    return milestones.find((m) => m.id === activeId) ?? milestones[0];
  }, [activeId, milestones]);

  useEffect(() => {
    if (milestones.length < 2 || isHovering) return;

    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = milestones.findIndex((m) => m.id === currentId);
        const safeIndex = currentIndex === -1 ? 0 : currentIndex;
        const nextIndex = (safeIndex + 1) % milestones.length;
        return milestones[nextIndex]?.id ?? currentId;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [milestones, isHovering]);

  const goTo = (id) => {
    shouldScrollStrip.current = true;
    setActiveId(id);
  };
  const prev = () => {
    if (!milestones.length) return;
    const currentIndex = milestones.findIndex((m) => m.id === activeId);
    const prevIndex = (currentIndex - 1 + milestones.length) % milestones.length;
    shouldScrollStrip.current = true;
    setActiveId(milestones[prevIndex]?.id ?? 0);
  };
  const next = () => {
    if (!milestones.length) return;
    const currentIndex = milestones.findIndex((m) => m.id === activeId);
    const nextIndex = (currentIndex + 1) % milestones.length;
    shouldScrollStrip.current = true;
    setActiveId(milestones[nextIndex]?.id ?? 0);
  };

  useEffect(() => {
    if (!shouldScrollStrip.current || !activeStripItemRef.current || !stripRef.current) return;

    const strip = stripRef.current;
    const active = activeStripItemRef.current;
    const offset = active.offsetLeft - (strip.clientWidth - active.clientWidth) / 2;

    strip.scrollTo({
      left: offset,
      behavior: 'smooth',
    });

    shouldScrollStrip.current = false;
  }, [activeId]);

  return (
    <section
      id="journey"
      className={styles.journey}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.bgStack}>
        <AnimatePresence initial={false} mode="sync">
          {current ? (
            <motion.div
              key={current.id}
              className={styles.bgLayer}
              style={{ backgroundImage: `url(${current.image})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          ) : null}
        </AnimatePresence>
        <div className={styles.overlay} />
      </div>

      <div className={styles.dots}>
        {milestones.map((m) => (
          <button
            key={m.id}
            className={`${styles.dot} ${m.id === activeId ? styles.dotActive : ''}`}
            onClick={() => goTo(m.id)}
            aria-label={`Go to ${m.year}`}
          />
        ))}
      </div>

      <div className={styles.journeyInner}>
        <div className={styles.journeyContent}>
          <span className={styles.eyebrow}>The Journey</span>
          <h2 className={styles.heading}>Our Journey</h2>

          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={`${current.id}-${current.title}-${current.description}`}
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
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.stripWrap}>
        <div className={styles.strip} ref={stripRef}>
          {milestones.map((m) => (
            <button
              key={m.id}
              ref={m.id === activeId ? activeStripItemRef : null}
              className={`${styles.stripItem} ${m.id === activeId ? styles.stripItemActive : ''} ${styles[`stripItem_${m.status}`]}`}
              onClick={() => goTo(m.id)}
            >
              {m.year}
              {m.id === activeId && (
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