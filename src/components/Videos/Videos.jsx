import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import data from '../../data/videos.json';
import styles from './Videos.module.css';

const fallbackVideos = data.items;

export default function Videos() {
  const [playingKey, setPlayingKey] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);
  const [videos, setVideos] = useState(fallbackVideos);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!apiKey || !channelId) {
      setVideos(fallbackVideos);
      return () => window.removeEventListener('resize', checkMobile);
    }

    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('YouTube API request failed');
        }

        const result = await response.json();
        const items = (result.items || []).map((item) => ({
          id: item.id?.videoId || item.id,
          title: item.snippet?.title || 'YouTube Video',
          youtubeId: item.id?.videoId,
          thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url,
        }));

        setVideos(items.length ? items : fallbackVideos);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setVideos(fallbackVideos);
        }
      }
    };

    fetchVideos();

    return () => {
      controller.abort();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const fallbackThumbnail = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#0f766e"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#g)"/>
      <circle cx="640" cy="360" r="88" fill="rgba(255,255,255,0.12)"/>
      <path d="M620 300 L700 360 L620 420 Z" fill="white"/>
      <rect x="160" y="120" width="960" height="56" rx="8" fill="rgba(255,255,255,0.08)"/>
      <text x="640" y="158" text-anchor="middle" fill="white" font-size="26" font-family="Arial, sans-serif">Video Preview</text>
    </svg>
  `)}`;

  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    if (!video.youtubeId) return fallbackThumbnail;
    return `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  };

  const handleThumbnailError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackThumbnail;
  };

  const shouldPause = playingKey !== null || isHovering;

  const getSourceType = (v) => {
    if (v.type) return v.type;
    if (v.youtubeId) return 'youtube';
    // try to infer from url
    if (v.url?.includes('instagram.com')) return 'instagram';
    if (v.url?.includes('facebook.com')) return 'facebook';
    return 'youtube';
  };

  const renderPlayerFor = (v) => {
    const source = getSourceType(v);
    if (source === 'youtube' && v.youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${v.youtubeId}?controls=1&playsinline=1&autoplay=1${isMobileView ? '&mute=1' : ''}`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }

    if (source === 'instagram') {
      // Build a clean embed URL for Instagram reels/posts by stripping query params
      const raw = v.url || (v.instagramId ? `https://www.instagram.com/reel/${v.instagramId}/` : '');
      const cleanBase = raw.split('?')[0];
      const withSlash = cleanBase.endsWith('/') ? cleanBase : `${cleanBase}/`;
      const igEmbedUrl = `${withSlash}embed/`;
      return (
        <iframe
          src={igEmbedUrl}
          title={v.title}
          allow="autoplay; encrypted-media; fullscreen"
          style={{border: 'none'}}
        />
      );
    }

    if (source === 'facebook') {
      const fbHref = encodeURIComponent(v.url || '');
      return (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?href=${fbHref}&show_text=0&width=560`}
          title={v.title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }

    // fallback to YouTube iframe when possible
    if (v.youtubeId) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${v.youtubeId}?controls=1&playsinline=1&autoplay=1${isMobileView ? '&mute=1' : ''}`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }

    return null;
  };

  return (
    <section id="videos" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Videos</span>
          <h2 className="section-heading">{data.heading}</h2>
          <p className="section-subheading">{data.subheading}</p>
        </div>

        <div
          className={`${styles.scroller} ${shouldPause ? styles.paused : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {[...videos, ...videos].map((v, i) => {
            const itemKey = `${v.id}-${i}`;
            const isPlaying = (hoveredKey === itemKey || playingKey === itemKey) && v.youtubeId;

            return (
              <motion.div
                key={itemKey}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: (i % videos.length) * 0.04 }}
                onMouseEnter={() => setHoveredKey(itemKey)}
                onMouseLeave={() => setHoveredKey((current) => (current === itemKey ? null : current))}
              >
                {isPlaying ? (
                  <div className={styles.playerWrap}>{renderPlayerFor(v)}</div>
                ) : (
                  <button
                    className={styles.thumbWrap}
                    onClick={() => setPlayingKey((current) => (current === itemKey ? null : itemKey))}
                    onMouseEnter={() => setHoveredKey(itemKey)}
                    onMouseLeave={() => setHoveredKey((current) => (current === itemKey ? null : current))}
                  >
                    <img
                      src={getThumbnail(v)}
                      alt={v.title}
                      onError={handleThumbnailError}
                    />
                    <span className={styles.playOverlay}><FaPlay size={16} /></span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
