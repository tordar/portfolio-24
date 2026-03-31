export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://tordar.no/#person",
        "name": "Tordar Tømmervik",
        "url": "https://tordar.no",
        "image": "https://tordar.no/DSC09739.jpeg",
        "description": "Full-stack developer based in Oslo, Norway. Specialises in React, Next.js, and TypeScript. Previously at Norwegian Red Cross (IFRC Nyss disease surveillance platform), now at digital product consultancy Umain.",
        "sameAs": [
          "https://github.com/tordar",
          "https://www.linkedin.com/in/tordar",
          "https://www.strava.com/athletes/29745314"
        ],
        "jobTitle": "Full-stack developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Umain",
          "url": "https://umain.com"
        },
        "knowsAbout": ["React", "Next.js", "TypeScript", "JavaScript", "Python", "MongoDB", "Azure", "Tailwind CSS", "Web Development", "Full-stack Development"]
      },
      {
        "@type": "WebSite",
        "@id": "https://tordar.no/#website",
        "name": "Tordar Tømmervik",
        "url": "https://tordar.no",
        "author": { "@id": "https://tordar.no/#person" }
      },
      {
        "@type": "ProfilePage",
        "@id": "https://tordar.no/#profilepage",
        "url": "https://tordar.no",
        "name": "Tordar Tømmervik | Web Developer",
        "mainEntity": { "@id": "https://tordar.no/#person" }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 