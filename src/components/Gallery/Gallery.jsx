import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import data from '../../data/gallery.json';
import styles from './Gallery.module.css';

const galleryImages = Object.entries(
  import.meta.glob('../../assets/gallery/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    import: 'default',
  })
)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, src], index) => ({
    id: index + 1,
    src,
  }));

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const filtered = useMemo(() => galleryImages, []);
  const rows = useMemo(
    () => [
      { direction: 'right', items: filtered.filter((_, index) => index % 3 === 0) },
      { direction: 'left', items: filtered.filter((_, index) => index % 3 === 1) },
      { direction: 'right', items: filtered.filter((_, index) => index % 3 === 2) },
    ].map((row) => ({
      ...row,
      items: [...row.items, ...row.items],
    })),
    [filtered]
  );

  const close = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((i) => (i + 1) % filtered.length);
  const prev = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <section id="gallery" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Gallery</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div className={styles.marqueeArea}>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${styles.marqueeRow} ${styles[row.direction]}`}
            >
              {row.items.map((img, index) => (
                <button
                  key={`${img.id}-${rowIndex}-${index}`}
                  type="button"
                  className={styles.tile}
                  onMouseEnter={() => setPreviewImage(img.src)}
                  onMouseLeave={() => setPreviewImage(null)}
                  onClick={() => setLightboxIndex(img.id - 1)}
                  aria-label="Open gallery preview"
                >
                  <img src={img.src} alt="Gallery image" loading="lazy" />
                </button>
              ))}
            </div>
          ))}

          {previewImage && (
            <div className={styles.previewCard}>
              <img src={previewImage} alt="Gallery preview" />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className={styles.closeBtn} onClick={close} aria-label="Close lightbox"><HiX size={28} /></button>
            <button className={styles.navBtn} style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
              <HiChevronLeft size={30} />
            </button>
            <motion.img
              key={filtered[lightboxIndex].id}
              src={filtered[lightboxIndex].src}
              alt="Gallery image"
              className={styles.lightboxImg}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <button className={styles.navBtn} style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
              <HiChevronRight size={30} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
