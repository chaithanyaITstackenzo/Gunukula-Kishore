import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { HiChevronDown } from 'react-icons/hi';
import hero from '../../data/hero.json';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  const [bg, setBg] = useState(hero.backgroundImage);

  useEffect(() => {
    const updateBg = () => {
      const isMobile = window.innerWidth <= 768;
      setBg(isMobile && hero.mobileBackgroundImage ? hero.mobileBackgroundImage : hero.backgroundImage);
    };

    updateBg();
    window.addEventListener('resize', updateBg);
    return () => window.removeEventListener('resize', updateBg);
  }, []);

  return (
    <section id="home" className={styles.hero}>

      {/* Mobile hero image (separate section only visible on small screens) */}
      <div className={styles.mobileImageWrap}>
        <img
          src={hero.mobileBackgroundImage || hero.backgroundImage}
          alt={`${hero.name} - hero`}
        />
      </div>

      {/* Hero Background (desktop/tablet) */}
      <div
        className={styles.bgLayer}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* Dark Overlay */}
      <div className={styles.overlay} />

      {/* Decorative Shapes */}
      <div className={styles.shapes}>
        <span className={`${styles.shape} ${styles.shape1}`} />
        <span className={`${styles.shape} ${styles.shape2}`} />
        <span className={`${styles.shape} ${styles.shape3}`} />
      </div>

      {/* Hero Content */}
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>

          <motion.p
            className={styles.eyebrow}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            {hero.party}
          </motion.p>

          <motion.h1
            className={styles.title}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            {hero.name}
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            {hero.title}
            <br />
            {hero.slogan}
          </motion.p>

          <motion.p
            className={styles.tagline}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            className={styles.ctaRow}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
          >
            {hero.ctaButtons.map((btn) => (
              <Link
                key={btn.label}
                to={btn.target}
                smooth
                duration={600}
                offset={-80}
                className={`btn ${
                  btn.type === 'primary'
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {btn.label}
              </Link>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <HiChevronDown size={26} />
      </motion.div>

    </section>
  );
}