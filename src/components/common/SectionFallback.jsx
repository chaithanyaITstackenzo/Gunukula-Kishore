import styles from './SectionFallback.module.css';

export default function SectionFallback() {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
    </div>
  );
}
