import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const desktopQuery = '(hover: hover) and (pointer: fine) and (min-width: 981px)';
    const mq = window.matchMedia(desktopQuery);
    setEnabled(mq.matches);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };

    const onMove = (e) => { pos.x = e.clientX; pos.y = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovering(false);
    };

    let raf;
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
      tick();
    };

    const stop = () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };

    const mqChange = (e) => {
      setEnabled(e.matches);
      if (e.matches) start();
      else stop();
    };

    // Start listeners only when the media query matches
    if (mq.matches) start();
    if (mq.addEventListener) mq.addEventListener('change', mqChange);
    else mq.addListener(mqChange);

    return () => {
      stop();
      if (mq.removeEventListener) mq.removeEventListener('change', mqChange);
      else mq.removeListener(mqChange);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={`${styles.ring} ${hovering ? styles.ringHover : ''}`} />
    </>
  );
}
