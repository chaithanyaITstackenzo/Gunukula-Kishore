import { useEffect, useRef, useState } from 'react';
import glassTumblerIcon from '../../assets/symbol_glass_tumbler_red.svg';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const desktopQuery = '(hover: hover) and (pointer: fine) and (min-width: 981px)';
    const mq = window.matchMedia(desktopQuery);
    setEnabled(mq.matches);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cursor = { x: pos.x, y: pos.y };

    const onMove = (e) => { pos.x = e.clientX; pos.y = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) setHovering(false);
    };

    let raf;
    const tick = () => {
      cursor.x += (pos.x - cursor.x) * 0.25;
      cursor.y += (pos.y - cursor.y) * 0.25;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;
      }
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
    <img
      ref={cursorRef}
      src={glassTumblerIcon}
      alt=""
      className={`${styles.cursorIcon} ${hovering ? styles.cursorIconHover : ''}`}
    />
  );
}