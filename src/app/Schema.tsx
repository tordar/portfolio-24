export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tordar Tømmervik",
    "url": "https://tordar.no",
    "sameAs": [
      "https://github.com/tordar",
      "https://linkedin.com/in/yourprofile", // update with your actual LinkedIn
      // Add other social profiles
    ],
    "jobTitle": "Web Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Your Current Company" // Update as needed
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