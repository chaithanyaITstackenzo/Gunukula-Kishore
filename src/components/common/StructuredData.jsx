import { useEffect } from 'react';
import hero from '../../data/hero.json';
import contact from '../../data/contact.json';

export default function StructuredData() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: hero.name,
      jobTitle: hero.title,
      affiliation: {
        '@type': 'Organization',
        name: 'Janasena Party',
      },
      address: contact.address,
      email: contact.email,
      sameAs: contact.socialLinks
        .filter((s) => s.url && s.url !== '#')
        .map((s) => s.url),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    script.id = 'structured-data';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('structured-data');
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
