import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';
import glassTumblerIcon from '../../assets/symbol_glass_tumbler.svg';

export default function LoadingScreen({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.screen}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            className={styles.logoBadge}
            initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'backOut' }}
          >
            <div className={styles.badgeCircle}>
              <img src={glassTumblerIcon} alt="Glass tumbler loader icon" className={styles.badgeIcon} />
            </div>
          </motion.div>

          <div className={styles.barTrack}>
            <motion.div
              className={styles.bar}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
