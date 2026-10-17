export interface Institution {
  name: string;
  url: string;
  logo: string;
  role: string;
  period: string;
  description: string;
  evidence?: { label: string; url: string };
}

export const career: Institution[] = [
  {
    name: 'Simplify',
    url: 'https://simplify-net.com/',
    logo: 'simplify.svg',
    role: 'Founder & CEO',
    period: 'Sep 2025 – present',
    description:
      'I lead product direction, technical decisions, and execution with the team. We build MatchaCode, an AI coding CLI, and Flash Launch, software publishing infrastructure in public beta.',
    evidence: { label: 'More about Simplify', url: 'work/simplify/' },
  },
  {
    name: 'Motion Expert Limited',
    url: 'https://www.motionexp.com/',
    logo: 'motion-expert.svg',
    role: 'Software Engineer Intern',
    period: 'Jul – Aug 2026',
    description:
      'Worked on Hong Kong movie intelligence: semantic search, citation-grounded RAG, FastAPI services, Graph Atlas relationship analysis, data lineage, and GCP delivery.',
    evidence: { label: 'Public RAG project', url: 'work/movie-intelligence/' },
  },
  {
    name: 'Climind',
    url: 'https://www.climind.co/',
    logo: 'climind.png',
    role: 'Data Engineer / Full-Stack Engineer Intern',
    period: 'Dec 2024 – Dec 2025',
    description:
      'Built an internal ESG/AI portal for 2,000+ sustainability and CSRD reports, REST APIs and data pipelines, and connected Python/PyTorch inference to product endpoints.',
  },
  {
    name: 'HKBU Department of Mathematics',
    url: 'https://www.math.hkbu.edu.hk/',
    logo: 'hkbu-math.png',
    role: 'Research Assistant',
    period: 'Jan – Oct 2025',
    description:
      'Supported research through data collection, analysis, and algorithm testing.',
  },
];

export const education: Institution[] = [
  {
    name: 'Hong Kong Baptist University',
    url: 'https://www.hkbu.edu.hk/',
    logo: 'hkbu-symbol.png',
    role: 'BSc (Hons.) Computer Science',
    period: 'Sep 2022 – expected June 2027',
    description:
      'AI concentration · Finance minor. Expected completion: June 2027.',
  },
  {
    name: 'Hong Kong University of Science and Technology',
    url: 'https://hkust.edu.hk/',
    logo: 'hkust.svg',
    role: 'Master’s programme in AI',
    period: 'Degree not completed',
    description:
      'HKUST · Master’s programme in AI — withdrew to pursue entrepreneurship. Degree not completed.',
  },
];
