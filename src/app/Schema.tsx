export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tordar Tømmervik",
    "url": "https://tordar.no",
    "sameAs": [
      "https://github.com/tordar",
      "https://linkedin.com/in/tordar",
    ],
    "jobTitle": "Full-stack developer", 
    "worksFor": {
      "@type": "Organization",
      "name": "Umain" 
    },
    "knowsAbout": ["React", "Next.js", "JavaScript", "Web Development"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 