/**
 * =============================================================================
 *  PORTFOLIO CONFIG — SINGLE SOURCE OF TRUTH
 * =============================================================================
 *  This is the ONLY file you need to edit to make this portfolio your own.
 *  Replace every value marked with a `// TODO` or placeholder text below.
 *  The entire site (SEO, structured data, every section) reads from here.
 * =============================================================================
 */

export type SocialLink = {
  label: string
  href: string
  /** lucide-react icon name, resolved in components/icon.tsx */
  icon: string
}

export type Stat = {
  label: string
  value: number
  /** optional prefix/suffix, e.g. "+", "M", "%" */
  prefix?: string
  suffix?: string
}

export type Skill = {
  name: string
  /** 0 - 100 proficiency, drives the animated progress indicator */
  level: number
}

export type SkillCategory = {
  title: string
  skills: Skill[]
}

export type Experience = {
  company: string
  role: string
  location: string
  start: string
  end: string
  /** short one-liner shown collapsed */
  summary: string
  achievements: string[]
  impact: string
  technologies: string[]
}

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  problem: string
  solution: string
  impact: string
  featured: boolean
  year: string
  role: string
  tech: string[]
  image: string
  gallery: string[]
  /** simple architecture flow rendered in the modal */
  architecture: string[]
  github?: string
  demo?: string
  metrics: { label: string; value: string }[]
}

export type Certification = {
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

export type Education = {
  school: string
  degree: string
  start: string
  end: string
  gpa?: string
  coursework: string[]
  achievements: string[]
}

export type Achievement = {
  category: string
  title: string
  detail: string
  year: string
}

export type Testimonial = {
  quote: string
  name: string
  title: string
  avatar: string
}

export type BlogPost = {
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  href: string
}

export type PortfolioConfig = {
  meta: {
    name: string
    role: string
    shortBio: string
    headline: string
    subheadline: string
    valueProp: string
    location: string
    email: string
    availability: string
    resumeUrl: string
    avatar: string
    siteUrl: string
    twitterHandle: string
  }
  socials: SocialLink[]
  stats: Stat[]
  about: {
    paragraphs: string[]
    highlights: { label: string; value: string }[]
  }
  skills: SkillCategory[]
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  education: Education[]
  achievements: Achievement[]
  testimonials: Testimonial[]
  blog: BlogPost[]
}

export const config: PortfolioConfig = {
  meta: {
    // TODO: Replace with your details
    name: 'Alex Nakamura',
    role: 'AI / ML Engineer',
    shortBio: 'Building production ML systems and LLM-powered products at scale.',
    headline: 'I build AI systems that ship.',
    subheadline: 'AI / ML Engineer',
    valueProp:
      'I design, train, and deploy machine learning systems — from large-scale training pipelines to low-latency inference in production — that move real business metrics.',
    location: 'San Francisco, CA',
    email: 'hello@alexnakamura.dev',
    availability: 'Open to Senior ML / AI Engineer roles',
    resumeUrl: '/resume.pdf', // TODO: drop your resume in /public/resume.pdf
    avatar: '/avatar.png',
    siteUrl: 'https://alexnakamura.dev', // TODO: your deployed URL (used for SEO / OG)
    twitterHandle: '@alexnakamura',
  },

  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:hello@alexnakamura.dev', icon: 'mail' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/', icon: 'graduation-cap' },
  ],

  stats: [
    { label: 'Years Experience', value: 7, suffix: '+' },
    { label: 'Projects Shipped', value: 40, suffix: '+' },
    { label: 'Technologies', value: 35, suffix: '+' },
    { label: 'Users Impacted', value: 12, suffix: 'M+' },
    { label: 'Revenue Influenced', value: 8, prefix: '$', suffix: 'M+' },
    { label: 'Latency Reduced', value: 63, suffix: '%' },
  ],

  about: {
    paragraphs: [
      'I am an AI/ML Engineer focused on taking models out of notebooks and into resilient, high-throughput production systems. My work spans the full lifecycle: data pipelines, distributed training, evaluation, and low-latency serving.',
      'Over the last seven years I have led ML initiatives across recommendation systems, LLM applications, and computer vision — consistently pairing strong research intuition with pragmatic engineering. I care deeply about evaluation, reliability, and cost.',
      'When I am not fine-tuning models, I write about applied ML, contribute to open source inference tooling, and mentor engineers transitioning into machine learning.',
    ],
    highlights: [
      { label: 'Focus', value: 'LLMs · RAG · Recommenders' },
      { label: 'Scale', value: 'Billions of inferences / mo' },
      { label: 'Stack', value: 'PyTorch · Ray · Triton' },
      { label: 'Cloud', value: 'AWS · GCP · Kubernetes' },
    ],
  },

  skills: [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', level: 96 },
        { name: 'TypeScript', level: 82 },
        { name: 'Go', level: 70 },
        { name: 'C++ / CUDA', level: 68 },
        { name: 'SQL', level: 88 },
      ],
    },
    {
      title: 'AI / ML',
      skills: [
        { name: 'PyTorch', level: 94 },
        { name: 'Transformers / LLMs', level: 92 },
        { name: 'RAG & Vector Search', level: 90 },
        { name: 'Fine-tuning / LoRA', level: 86 },
        { name: 'Computer Vision', level: 80 },
      ],
    },
    {
      title: 'Data',
      skills: [
        { name: 'Spark / Ray', level: 85 },
        { name: 'Airflow / Dagster', level: 82 },
        { name: 'Feature Stores', level: 78 },
        { name: 'DuckDB / Postgres', level: 84 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', level: 88 },
        { name: 'Kubernetes', level: 82 },
        { name: 'Docker', level: 90 },
        { name: 'Terraform', level: 74 },
        { name: 'CI/CD', level: 85 },
      ],
    },
    {
      title: 'Serving & MLOps',
      skills: [
        { name: 'Triton / vLLM', level: 86 },
        { name: 'ONNX / TensorRT', level: 80 },
        { name: 'MLflow / W&B', level: 88 },
        { name: 'Model Monitoring', level: 83 },
      ],
    },
    {
      title: 'Tools & Soft Skills',
      skills: [
        { name: 'System Design', level: 90 },
        { name: 'Technical Writing', level: 88 },
        { name: 'Mentorship', level: 85 },
        { name: 'Cross-team Leadership', level: 84 },
      ],
    },
  ],

  experience: [
    {
      company: 'Horizon AI',
      role: 'Senior Machine Learning Engineer',
      location: 'San Francisco, CA',
      start: '2022',
      end: 'Present',
      summary: 'Lead engineer for the LLM platform powering customer-facing assistants.',
      achievements: [
        'Architected a retrieval-augmented generation platform serving 4M+ daily queries at p95 < 400ms.',
        'Cut inference costs 63% by migrating to vLLM with continuous batching and quantized weights.',
        'Built an automated eval harness that reduced regressions shipped to prod by 78%.',
      ],
      impact: 'Drove $8M in influenced revenue through improved assistant conversion and retention.',
      technologies: ['PyTorch', 'vLLM', 'Ray', 'Kubernetes', 'Postgres', 'AWS'],
    },
    {
      company: 'Nimbus Labs',
      role: 'Machine Learning Engineer',
      location: 'Remote',
      start: '2019',
      end: '2022',
      summary: 'Owned the recommendation and ranking systems for a 12M-user marketplace.',
      achievements: [
        'Shipped a two-tower recommender that lifted engagement 21% and GMV 14%.',
        'Designed a real-time feature store on Redis + Flink handling 90k events/sec.',
        'Introduced offline/online eval parity, cutting model iteration time in half.',
      ],
      impact: 'Recommendation improvements added an estimated $3.2M in annual GMV.',
      technologies: ['TensorFlow', 'Flink', 'Redis', 'Spark', 'GCP'],
    },
    {
      company: 'DataForge',
      role: 'Data Scientist',
      location: 'New York, NY',
      start: '2017',
      end: '2019',
      summary: 'Built forecasting and anomaly-detection models for enterprise clients.',
      achievements: [
        'Delivered demand-forecasting models improving accuracy (MAPE) by 32%.',
        'Automated an ETL + modeling pipeline that saved 20 analyst-hours per week.',
        'Presented findings to C-suite stakeholders across 6 Fortune-500 accounts.',
      ],
      impact: 'Forecasting accuracy gains reduced client inventory costs by ~$2M/year.',
      technologies: ['Python', 'scikit-learn', 'Airflow', 'Snowflake'],
    },
  ],

  projects: [
    {
      slug: 'llm-rag-platform',
      title: 'Enterprise RAG Platform',
      tagline: 'Low-latency retrieval-augmented generation at scale',
      description:
        'A production RAG platform that grounds LLM responses in enterprise knowledge with sub-second latency and strong evaluation guarantees.',
      problem:
        'Support teams were overwhelmed and generic LLM answers hallucinated on internal policy. Trust and latency were blockers to adoption.',
      solution:
        'Built a hybrid retrieval stack (BM25 + dense vectors) with a reranker, streaming generation via vLLM, and an automated eval harness gating every deploy.',
      impact: 'Deflected 41% of support tickets and reduced average handle time by 27%.',
      featured: true,
      year: '2024',
      role: 'Tech Lead',
      tech: ['PyTorch', 'vLLM', 'pgvector', 'Ray', 'Next.js', 'AWS'],
      image: '/projects/rag-platform.png',
      gallery: ['/projects/rag-platform.png', '/projects/rag-arch.png'],
      architecture: [
        'Ingestion & chunking pipeline (Ray)',
        'Hybrid retrieval: BM25 + dense (pgvector)',
        'Cross-encoder reranker',
        'vLLM streaming generation',
        'Eval harness + guardrails',
      ],
      github: 'https://github.com/',
      demo: 'https://example.com/',
      metrics: [
        { label: 'p95 latency', value: '380ms' },
        { label: 'ticket deflection', value: '41%' },
        { label: 'daily queries', value: '4M+' },
      ],
    },
    {
      slug: 'realtime-recommender',
      title: 'Real-time Recommender',
      tagline: 'Two-tower retrieval + ranking for a 12M-user marketplace',
      description:
        'An end-to-end recommendation system with real-time features, candidate generation, and a learned ranker serving personalized feeds.',
      problem:
        'The legacy popularity-based feed had flat engagement and no personalization signal for new inventory.',
      solution:
        'Implemented a two-tower retrieval model with a real-time feature store and a gradient-boosted ranker, served behind a low-latency API.',
      impact: 'Lifted engagement 21% and GMV 14% within one quarter of launch.',
      featured: true,
      year: '2023',
      role: 'ML Engineer',
      tech: ['TensorFlow', 'Flink', 'Redis', 'Go', 'GCP'],
      image: '/projects/recommender.png',
      gallery: ['/projects/recommender.png'],
      architecture: [
        'Real-time event stream (Flink)',
        'Feature store (Redis)',
        'Two-tower candidate generation',
        'GBDT ranker',
        'Serving API (Go)',
      ],
      github: 'https://github.com/',
      demo: 'https://example.com/',
      metrics: [
        { label: 'engagement', value: '+21%' },
        { label: 'GMV', value: '+14%' },
        { label: 'throughput', value: '90k/s' },
      ],
    },
    {
      slug: 'vision-defect-detection',
      title: 'Vision Defect Detection',
      tagline: 'Edge-deployed CV for manufacturing QA',
      description:
        'A computer-vision system that detects manufacturing defects on the assembly line in real time, deployed to edge devices.',
      problem:
        'Manual QA missed subtle defects and could not keep pace with line speed, causing costly recalls.',
      solution:
        'Trained a compact detection model, quantized it with TensorRT, and deployed to Jetson edge devices with an active-learning feedback loop.',
      impact: 'Reduced defect escape rate by 58% and QA labor cost by 35%.',
      featured: false,
      year: '2022',
      role: 'ML Engineer',
      tech: ['PyTorch', 'TensorRT', 'ONNX', 'OpenCV', 'Jetson'],
      image: '/projects/vision.png',
      gallery: ['/projects/vision.png'],
      architecture: [
        'Data capture + labeling',
        'Detection model training (PyTorch)',
        'TensorRT quantization',
        'Edge deployment (Jetson)',
        'Active-learning feedback loop',
      ],
      github: 'https://github.com/',
      metrics: [
        { label: 'defect escape', value: '-58%' },
        { label: 'inference', value: '22ms' },
        { label: 'QA cost', value: '-35%' },
      ],
    },
    {
      slug: 'ml-eval-harness',
      title: 'Open-source Eval Harness',
      tagline: 'Reproducible LLM evaluation for CI',
      description:
        'An open-source framework for evaluating LLM applications with dataset versioning, scorers, and CI integration.',
      problem:
        'Teams shipped prompt and model changes with no objective signal, causing silent quality regressions.',
      solution:
        'Built a pluggable eval framework with golden datasets, LLM-as-judge and heuristic scorers, and a GitHub Action that gates PRs.',
      impact: 'Adopted across 5 internal teams; reduced shipped regressions by 78%.',
      featured: false,
      year: '2024',
      role: 'Creator',
      tech: ['Python', 'Pydantic', 'GitHub Actions', 'DuckDB'],
      image: '/projects/eval-harness.png',
      gallery: ['/projects/eval-harness.png'],
      architecture: [
        'Versioned datasets',
        'Scorer registry (heuristic + LLM judge)',
        'Runner + caching',
        'CI gate (GitHub Action)',
        'Report dashboard',
      ],
      github: 'https://github.com/',
      metrics: [
        { label: 'regressions', value: '-78%' },
        { label: 'teams', value: '5' },
        { label: 'stars', value: '1.2k' },
      ],
    },
  ],

  certifications: [
    { name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', date: '2023', credentialUrl: 'https://aws.amazon.com/certification/' },
    { name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2022', credentialUrl: 'https://www.tensorflow.org/certificate' },
    { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2021', credentialUrl: 'https://www.deeplearning.ai/' },
    { name: 'Professional Data Engineer', issuer: 'Google Cloud', date: '2021', credentialUrl: 'https://cloud.google.com/certification' },
  ],

  education: [
    {
      school: 'Stanford University',
      degree: 'M.S. in Computer Science — AI Track',
      start: '2015',
      end: '2017',
      gpa: '3.9 / 4.0',
      coursework: ['Deep Learning', 'Convex Optimization', 'NLP', 'Reinforcement Learning', 'Distributed Systems'],
      achievements: ['Graduate Research Assistant, NLP Lab', 'Published 2 workshop papers'],
    },
    {
      school: 'UC Berkeley',
      degree: 'B.S. in Electrical Engineering & Computer Science',
      start: '2011',
      end: '2015',
      gpa: '3.8 / 4.0',
      coursework: ['Algorithms', 'Machine Learning', 'Probability', 'Databases', 'Operating Systems'],
      achievements: ["Dean's List (4x)", 'ACM Programming Team'],
    },
  ],

  achievements: [
    { category: 'Award', title: 'Internal Innovation Award', detail: 'For the RAG platform that deflected 41% of support tickets.', year: '2024' },
    { category: 'Hackathon', title: '1st Place — AI Hack SF', detail: 'Built a multimodal agent for accessibility in 36 hours.', year: '2023' },
    { category: 'Speaking', title: 'Speaker, MLOps World', detail: '“Evaluating LLM apps you can actually trust.”', year: '2024' },
    { category: 'Publication', title: 'Workshop Paper, NeurIPS', detail: 'Efficient retrieval for long-context generation.', year: '2023' },
    { category: 'Patent', title: 'US Patent (pending)', detail: 'Adaptive batching for low-latency LLM inference.', year: '2024' },
    { category: 'Leadership', title: 'ML Guild Lead', detail: 'Mentored 12 engineers transitioning into ML roles.', year: '2023' },
  ],

  testimonials: [
    {
      quote:
        'Alex is the rare engineer who is equally strong in research and production. The RAG platform they built became the backbone of our support org.',
      name: 'Jordan Rivera',
      title: 'VP of Engineering, Horizon AI',
      avatar: '/testimonials/person-1.png',
    },
    {
      quote:
        'Ships fast without cutting corners on evaluation. Our recommendation numbers moved within weeks of Alex joining the team.',
      name: 'Priya Anand',
      title: 'Director of Data, Nimbus Labs',
      avatar: '/testimonials/person-2.png',
    },
    {
      quote:
        'One of the best mentors I have had. Alex made complex ML systems feel approachable and helped me land my first ML role.',
      name: 'Marcus Lee',
      title: 'ML Engineer, DataForge',
      avatar: '/testimonials/person-3.png',
    },
  ],

  blog: [
    {
      title: 'Evaluating LLM apps you can actually trust',
      excerpt: 'A practical framework for grounding, scoring, and CI-gating your LLM applications.',
      date: 'Mar 2024',
      readTime: '9 min',
      tag: 'LLMs',
      href: '#',
    },
    {
      title: 'Cutting inference cost 60% with vLLM',
      excerpt: 'How continuous batching and quantization changed our serving economics.',
      date: 'Jan 2024',
      readTime: '7 min',
      tag: 'MLOps',
      href: '#',
    },
    {
      title: 'A pragmatic guide to real-time feature stores',
      excerpt: 'Design decisions behind a feature store handling 90k events per second.',
      date: 'Nov 2023',
      readTime: '11 min',
      tag: 'Data',
      href: '#',
    },
  ],
}

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const
