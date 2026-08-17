import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';
import data from '../../data/contact.json';
import styles from './Contact.module.css';

const ICON_MAP = { FaFacebook, FaTwitter, FaInstagram, FaYoutube };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to a real backend / form service before going live.
    setSent(true);
  };

  return (
    <section id="contact" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Contact</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div><h4>Address</h4><p>{data.address}</p></div>
            </div>
            <div className={styles.infoItem}>
              <FaPhoneAlt className={styles.infoIcon} />
              <div><h4>Phone</h4><p>{data.phone}</p></div>
            </div>
            <div className={styles.infoItem}>
              <FaEnvelope className={styles.infoIcon} />
              <div><h4>Email</h4><p>{data.email}</p></div>
            </div>

            <div className={styles.social}>
              {data.socialLinks.map((s) => {
                const Icon = ICON_MAP[s.icon] || FaGlobe;
                return (
                  <a key={s.platform} href={s.url} className={styles.socialBtn} aria-label={s.platform}>
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>

            <div className={styles.mapWrap}>
              <iframe
                title="location-map"
                src={`https://maps.google.com/maps?q=${data.mapCoordinates.lat},${data.mapCoordinates.lng}&z=13&output=embed`}
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
            <label>Message</label>
            <textarea name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="How can we help?" />
            <button type="submit" className="btn btn-primary">{sent ? 'Message Sent ✓' : 'Send Message'}</button>
          </motion.form>
        </div>
      </div>

      <a href={`tel:${data.phone}`} className={styles.floatingBtn} style={{ bottom: 92 }} aria-label="Call">
        <FaPhoneAlt size={18} />
      </a>
      <a href="#" className={`${styles.floatingBtn} ${styles.whatsapp}`} aria-label="WhatsApp">
        <FaWhatsapp size={22} />
      </a>
    </section>
  );
}
