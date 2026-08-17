import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import data from '../../data/activities.json';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Activities.module.css';

export default function Activities() {
  const [yearFilter, setYearFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    const setOf = new Set(data.items.map((i) => i.category));
    return ['All', ...Array.from(setOf)];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    data.items.forEach((i) => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return data.items.filter((a) => {
      const yearMatch = yearFilter === 'All' ? true : a.year === yearFilter;
      const catMatch = categoryFilter === 'All' ? true : a.category === categoryFilter;
      return yearMatch && catMatch;
    });
  }, [yearFilter, categoryFilter]);

  return (
    <section id="activities" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Activities</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div className={styles.filters}>
          {data.filters.map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${yearFilter === f ? styles.filterActive : ''}`}
              onClick={() => setYearFilter(f)}
              aria-pressed={yearFilter === f}
              aria-label={`Filter year ${f}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.categoryFilters} role="tablist" aria-label="Activity categories">
          {categories.map((c) => (
            <button
              key={c}
              className={`${styles.filterBtn} ${styles.categoryBtn} ${categoryFilter === c ? styles.filterActive : ''}`}
              onClick={() => setCategoryFilter(c)}
              aria-pressed={categoryFilter === c}
              aria-label={`Filter category ${c}`}
            >
              <span className={styles.catLabel}>{c}</span>
              {c !== 'All' ? <span className={styles.count}>{` (${categoryCounts[c] || 0})`}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.carouselWrap}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No activities found for this category and year.</p>
            <div>
              <button
                className={`${styles.filterBtn} ${styles.clearBtn}`}
                onClick={() => {
                  setYearFilter('All');
                  setCategoryFilter('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            speed={700}
            spaceBetween={26}
            slidesPerView={1.15}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          >
            {filtered.map((a) => (
              <SwiperSlide key={a.id}>
                <div className={styles.card}>
                  <div className={styles.imageWrap}>
                    <img src={a.image} alt={a.title} />
                    <span className={styles.categoryBadge} aria-hidden>
                      {a.category}
                    </span>
                  </div>
                  <div className={styles.body}>
                    <div className={styles.meta}>
                      <span><FaRegCalendarAlt size={12} /> {a.date}</span>
                      <span><FaMapMarkerAlt size={12} /> {a.location}</span>
                    </div>
                    <h3 className={styles.title}>{a.title}</h3>
                    <p className={styles.desc}>{a.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
