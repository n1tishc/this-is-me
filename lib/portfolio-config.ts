/**
 * =============================================================================
 *  PORTFOLIO CONFIG — SINGLE SOURCE OF TRUTH
 * =============================================================================
 *  This is the ONLY file you need to edit to make this portfolio your own.
 *  The entire site (SEO, structured data, every section, and the AI twin in
 *  lib/persona.ts) reads from here.
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
    name: 'Nitish Chandrashekar',
    role: 'AI / ML Engineer',
    shortBio: 'ML engineer building LLM, RAG, and computer-vision systems end to end.',
    headline: 'I build AI systems that ship.',
    subheadline: 'AI / ML Engineer',
    valueProp:
      'I take machine learning out of notebooks and into production — LLM and RAG applications, computer vision, and on-device inference — backed by real systems and MLOps rigor.',
    location: 'Rochester, NY',
    email: 'chandunitish@gmail.com',
    availability: 'Open to New Grad AI / ML Engineer roles',
    resumeUrl: '/resume.pdf', // TODO: drop your latest resume in /public/resume.pdf
    avatar: '/avatar.png', // TODO: replace /public/avatar.png with your own photo
    siteUrl: 'https://nitishc.vercel.app', // TODO: set your deployed URL (used for SEO / OG)
    twitterHandle: '',
  },

  socials: [
    { label: 'GitHub', href: 'https://github.com/n1tishc', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nitishc1', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:chandunitish@gmail.com', icon: 'mail' },
  ],

  stats: [
    { label: 'Projects Built', value: 16, suffix: '+' },
    { label: 'Records Processed', value: 5, suffix: 'M+' },
    { label: 'Query Latency Cut', value: 45, suffix: '%' },
    { label: 'Deploy Time Cut', value: 75, suffix: '%' },
    { label: 'VLM Ingredient Recall', value: 82, suffix: '%' },
    { label: 'Tracking Accuracy', value: 96, suffix: '%' },
  ],

  about: {
    paragraphs: [
      "I'm an AI/ML engineer and a recent M.S. Computer Science graduate from RIT (December 2025). I focus on taking machine learning out of notebooks and into production — LLM and RAG applications, computer vision, and increasingly on-device inference.",
      "Most recently I was a Graduate Research Assistant at RIT, where I built end-to-end ML pipelines over 50K+ experimental records and a RAG knowledge assistant, cutting scientists' data-prep time by 75%. Before grad school I spent a year at CAST Software as a software/DevOps engineer, owning CI/CD for 20+ microservices — so I bring real systems and reliability rigor to ML work.",
      "Lately I've been shipping full-stack ML products: a LoRA fine-tuned vision-language model that turns food photos into recipes, a lab-workflow orchestrator with a computer-vision decision loop, and an on-device LLM running on a phone's NPU.",
    ],
    highlights: [
      { label: 'Focus', value: 'LLMs · RAG · Computer Vision' },
      { label: 'Edge', value: 'On-device / NPU inference' },
      { label: 'Stack', value: 'PyTorch · FastAPI · React' },
      { label: 'Cloud', value: 'AWS · GCP · Kubernetes' },
    ],
  },

  skills: [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'SQL', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Go', level: 78 },
        { name: 'Java', level: 75 },
        { name: 'C++', level: 60 },
      ],
    },
    {
      title: 'AI / ML',
      skills: [
        { name: 'PyTorch', level: 90 },
        { name: 'LLMs & RAG', level: 88 },
        { name: 'HuggingFace Transformers', level: 85 },
        { name: 'Computer Vision (OpenCV)', level: 82 },
        { name: 'LoRA Fine-tuning', level: 82 },
        { name: 'LangChain', level: 80 },
        { name: 'On-device / ExecuTorch', level: 72 },
      ],
    },
    {
      title: 'Backend & APIs',
      skills: [
        { name: 'FastAPI', level: 92 },
        { name: 'REST API Design', level: 90 },
        { name: 'Microservices', level: 82 },
        { name: 'Flask', level: 80 },
        { name: 'Django', level: 78 },
        { name: 'gRPC', level: 70 },
      ],
    },
    {
      title: 'Data & Databases',
      skills: [
        { name: 'pandas / NumPy', level: 90 },
        { name: 'PostgreSQL', level: 88 },
        { name: 'ETL Pipelines', level: 85 },
        { name: 'MongoDB', level: 82 },
        { name: 'Redis', level: 80 },
        { name: 'Vector Databases', level: 78 },
      ],
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'Docker', level: 88 },
        { name: 'AWS', level: 85 },
        { name: 'Jenkins CI/CD', level: 84 },
        { name: 'Kubernetes', level: 82 },
        { name: 'GCP', level: 75 },
        { name: 'Terraform', level: 72 },
      ],
    },
    {
      title: 'Practices & Tools',
      skills: [
        { name: 'Agile / Code Review', level: 88 },
        { name: 'pytest', level: 85 },
        { name: 'AI-assisted Development', level: 85 },
        { name: 'System Design', level: 82 },
        { name: 'Grafana / Datadog', level: 78 },
      ],
    },
  ],

  experience: [
    {
      company: 'Rochester Institute of Technology',
      role: 'Graduate Research Assistant — ML Systems',
      location: 'Rochester, NY',
      start: 'May 2025',
      end: 'Aug 2025',
      summary: 'Built end-to-end ML pipelines and monitoring for a safety-critical research platform.',
      achievements: [
        'Designed end-to-end Python ML pipelines processing 50K+ experimental records with automated validation and reprocessing, cutting scientists’ data-prep time by 75%.',
        'Built training and hyperparameter-search workflows (PyTorch, scikit-learn) reaching 0.95 correlation with ground-truth experimental measurements.',
        'Shipped real-time monitoring dashboards (Plotly) for drift and pipeline failures, enabling 3x faster batch validation.',
      ],
      impact: 'Turned noisy, multi-source experimental data into a reliable, observable ML pipeline scientists could trust.',
      technologies: ['Python', 'PyTorch', 'scikit-learn', 'GCP', 'Plotly', 'ETL'],
    },
    {
      company: 'Rochester Institute of Technology',
      role: 'Research Assistant — Software Engineer',
      location: 'Rochester, NY',
      start: 'Jul 2024',
      end: 'Dec 2024',
      summary: 'Owned FastAPI backend services and a RAG knowledge assistant over millions of records.',
      achievements: [
        'Designed FastAPI services exposing REST APIs over 5M+ records across PostgreSQL and MongoDB, reducing P95 query latency by 45% through indexing and query optimization.',
        'Built a RAG knowledge assistant integrating LLMs with embedding-based retrieval and semantic search behind a FastAPI backend.',
        'Refactored a monolithic backend into modular services with structured logging and tests, improving reliability by 60%; built React/TypeScript analytics UIs.',
      ],
      impact: 'Powered daily data exploration for 20+ internal users and cut manual lookups by 40%.',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'React', 'TypeScript', 'LangChain'],
    },
    {
      company: 'CAST Software',
      role: 'Software / DevOps Engineer',
      location: 'Bengaluru, India',
      start: 'Aug 2022',
      end: 'Aug 2023',
      summary: 'Owned CI/CD and cross-platform automation for 20+ production microservices.',
      achievements: [
        'Led CI/CD (Jenkins, Docker) for 20+ production microservices, automating build-test-deploy and reducing time-to-production by 75% across 5 teams.',
        'Built cross-platform Python automation for Linux/macOS deployments, cutting installation failures by 70% across 100+ environments.',
        'Operated Kubernetes production infrastructure with monitoring and alerting, improving incident MTTR by 60%; extended Go test frameworks to raise coverage by 75%.',
      ],
      impact: 'Made releases faster and safer while stabilizing production reliability across the platform.',
      technologies: ['Python', 'Go', 'Java', 'Jenkins', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
    },
  ],

  projects: [
    {
      slug: 'sub-rosa',
      title: 'Sub Rosa — On-Device AI Note-Taker',
      tagline: 'On-device LLM inference on the Hexagon NPU',
      description:
        'A privacy-first Android app that structures legal-intake conversations fully on-device with no network calls. My contributions (team hackathon project): the on-device LLM/NPU integration and the Android client.',
      problem:
        'Sensitive legal conversations cannot be sent to the cloud, so the LLM note-structuring step had to run entirely on mobile hardware.',
      solution:
        "Integrated an on-device Qwen3-1.7B LLM via ExecuTorch's Qualcomm QNN backend (qnn_llama_runner) on the Hexagon NPU, with automatic fallback to XNNPACK/CPU on DSP failure, and built the offline Android client in Kotlin/Jetpack Compose (MVVM).",
      impact: 'Achieved ~40 tok/s decode throughput and ~0.74s model load for a fully offline inference path.',
      featured: true,
      year: '2026',
      role: 'On-Device ML + Android (team hackathon)',
      tech: ['Kotlin', 'Jetpack Compose', 'ExecuTorch', 'Qualcomm QNN', 'Hexagon NPU', 'Qwen3-1.7B'],
      image: '/projects/sub-rosa.png',
      gallery: ['/projects/sub-rosa.png'],
      architecture: [
        'Kotlin / Jetpack Compose app (MVVM)',
        'ExecuTorch qnn_llama_runner',
        'Qwen3-1.7B on Hexagon NPU',
        'Auto fallback → XNNPACK / CPU',
        'Live tok/s + load-time metrics',
      ],
      github: 'https://github.com/Dileep2896/sub-rosa-executorch',
      metrics: [
        { label: 'decode', value: '~40 tok/s' },
        { label: 'model load', value: '~0.74s' },
        { label: 'network calls', value: '0' },
      ],
    },
    {
      slug: 'kimchitest',
      title: 'KimchiTest — VLM Ingredient Detection + Recipes',
      tagline: 'LoRA fine-tuned VLM chained to an LLM',
      description:
        'An end-to-end ML product: a LoRA fine-tuned vision-language model detects ingredients from a photo, then an LLM generates three ranked recipes. Full pipeline from data to fine-tuning to serving to product.',
      problem:
        'Turn a single photo of ingredients into usable, ranked recipes — which needs reliable visual detection plus coherent downstream generation.',
      solution:
        'Fine-tuned SmolVLM2-500M with LoRA (TRL SFTTrainer) on 51 ingredient classes, served it via a FastAPI inference server with automatic CUDA/MPS/CPU detection, and chained it to an OpenAI recipe-generation step behind a React UI.',
      impact: 'Reached ~82% recall across 51 ingredient classes in a three-phase scan → review → cook product.',
      featured: true,
      year: '2025',
      role: 'Full-Stack ML',
      tech: ['Python', 'PyTorch', 'SmolVLM2', 'LoRA', 'TRL', 'OpenAI API', 'FastAPI', 'React'],
      image: '/projects/kimchitest.png',
      gallery: ['/projects/kimchitest.png'],
      architecture: [
        'React app (scan / review / cook)',
        'FastAPI /predict + /recipes',
        'SmolVLM2-500M (LoRA) detection',
        'OpenAI recipe generation',
        'Model hosted on HF Hub',
      ],
      github: 'https://github.com/n1tishc/kimchi',
      metrics: [
        { label: 'recall', value: '~82%' },
        { label: 'classes', value: '51' },
        { label: 'pipeline', value: 'VLM + LLM' },
      ],
    },
    {
      slug: 'cellflow',
      title: 'CellFlow — Lab Orchestrator with CV-in-the-Loop',
      tagline: 'Resilient workflow engine + Cellpose vision',
      description:
        'A workflow orchestrator coordinating parallel simulated cell-line runs against finite shared equipment, with retries, audit logging, and a Cellpose computer-vision step driving passage/complete decisions — visualized live in React.',
      problem:
        'Coordinate many cell-line runs against limited shared equipment (1 imager, 8 incubator slots) with failure recovery and full traceability, while a vision model drives the key decision.',
      solution:
        'Built a FastAPI orchestrator (worker tick loop, queue scheduling, exponential-backoff retries, SQLite-backed audit log), a dual-mode CV service (deterministic stub + real Cellpose), and a live React dashboard; containerized with Docker/Kubernetes and GitHub Actions CI.',
      impact: 'Deterministic, sleep-free simulation runs hundreds of ticks; failure isolation stops one run’s failure from cascading.',
      featured: true,
      year: '2025',
      role: 'Backend + ML Systems',
      tech: ['Python', 'FastAPI', 'SQLite', 'Cellpose', 'React', 'Docker', 'Kubernetes', 'GitHub Actions'],
      image: '/projects/cellflow.png',
      gallery: ['/projects/cellflow.png'],
      architecture: [
        'React dashboard (polling)',
        'FastAPI orchestrator + scheduler',
        'SQLite: runs / steps / events',
        'CV service (FastAPI + Cellpose)',
        'Docker / K8s + GitHub Actions CI',
      ],
      github: 'https://github.com/n1tishc/cellOrch',
      metrics: [
        { label: 'resources', value: '1 imager · 8 slots' },
        { label: 'resilience', value: 'retry + backoff' },
        { label: 'decision', value: 'Cellpose CV' },
      ],
    },
    {
      slug: 'tracknet',
      title: 'TrackNet Optimization',
      tagline: 'Real-time small-object tracking under motion blur',
      description:
        'Optimized a perception pipeline for tracking small, fast-moving objects in noisy real-world video, improving accuracy and outperforming YOLOv7 and TrackNetV2.',
      problem:
        'Small, fast objects in low-quality video suffer from motion blur and occlusion, which breaks standard trackers.',
      solution:
        'Added temporal median-filter background estimation and trajectory rectification (temporal inpainting) and tuned a GPU-accelerated pipeline for near real-time inference.',
      impact: 'Improved tracking accuracy from 88% to 96.5%, beating YOLOv7 and TrackNetV2.',
      featured: true,
      year: '2024',
      role: 'Computer Vision',
      tech: ['Python', 'PyTorch', 'OpenCV', 'FFmpeg', 'CUDA'],
      image: '/projects/tracknet.png',
      gallery: ['/projects/tracknet.png'],
      architecture: [
        'FFmpeg frame extraction',
        'Temporal median background est.',
        'TrackNet detection (PyTorch)',
        'Trajectory rectification',
        'GPU-tuned inference',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'accuracy', value: '88% → 96.5%' },
        { label: 'beats', value: 'YOLOv7 · TrackNetV2' },
        { label: 'speed', value: 'near real-time' },
      ],
    },
    {
      slug: 'ai-knowledge-assistant',
      title: 'AI Knowledge Assistant (RAG)',
      tagline: 'Production RAG used daily by 20+ staff',
      description:
        'A full-stack RAG assistant over 500+ internal policy documents, used daily by 20+ staff to answer questions and cut manual lookups.',
      problem:
        'Staff spent 30+ minutes a day on repetitive policy lookups, and generic LLM answers hallucinated on internal policy.',
      solution:
        'Built a FastAPI backend with embedding-based retrieval and semantic search plus a React frontend, with evaluation logging to iteratively tune retrieval quality.',
      impact: 'Reduced support escalations by 40% and improved answer quality from 0.2 to 0.6 F1.',
      featured: false,
      year: '2024',
      role: 'Full-Stack ML',
      tech: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Vector DB', 'React', 'TypeScript'],
      image: '/projects/ai-knowledge-assistant.png',
      gallery: ['/projects/ai-knowledge-assistant.png'],
      architecture: [
        'Document ingestion pipeline',
        'Embedding retrieval + semantic search',
        'LLM answer generation',
        'Eval logging + tuning',
        'React frontend',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'escalations', value: '-40%' },
        { label: 'F1', value: '0.2 → 0.6' },
        { label: 'documents', value: '500+' },
      ],
    },
    {
      slug: 'llm-compression',
      title: 'LLM Compression (Knowledge Distillation)',
      tagline: 'Top 5, Lelapa AI International Hackathon',
      description:
        'Compressed a large teacher model into an inference-efficient student via knowledge distillation, boosting low-resource multilingual task performance.',
      problem: 'Large models are too costly for low-resource multilingual deployment.',
      solution:
        'Distilled Gemini (teacher) into InkubaLM (student) and generated synthetic training data via prompt engineering across sentiment analysis, QA, and machine translation.',
      impact: 'Improved F1 from 0.2 to 0.6 (3x) and placed Top 5 in the Lelapa AI international hackathon.',
      featured: false,
      year: '2024',
      role: 'ML Engineer',
      tech: ['PyTorch', 'HuggingFace Transformers', 'Knowledge Distillation', 'Prompt Engineering'],
      image: '/projects/llm-compression.png',
      gallery: ['/projects/llm-compression.png'],
      architecture: [
        'Teacher (Gemini) outputs',
        'Synthetic data generation',
        'Student (InkubaLM) distillation',
        'Benchmark eval (F1)',
      ],
      metrics: [
        { label: 'F1', value: '0.2 → 0.6' },
        { label: 'rank', value: 'Top 5' },
        { label: 'tasks', value: 'sentiment · QA · MT' },
      ],
    },
    {
      slug: 'kv-store',
      title: 'Distributed Key-Value Store',
      tagline: 'Redis-style in-memory store in Go',
      description:
        'An in-memory key-value store with O(1) operations and RESP protocol parsing on a concurrent TCP server.',
      problem: 'Learn distributed-systems fundamentals by building a Redis-like store from scratch.',
      solution:
        'Implemented O(1) GET/SET/DEL, RESP protocol parsing, and a concurrent TCP server using goroutines and channels for thread-safe multi-client access, with a modular parse/dispatch/persist architecture.',
      impact: 'Thread-safe multi-client access with a clean, extensible architecture.',
      featured: false,
      year: '2024',
      role: 'Systems Engineering',
      tech: ['Go', 'TCP', 'Concurrency', 'RESP Protocol'],
      image: '/projects/kv-store.png',
      gallery: ['/projects/kv-store.png'],
      architecture: [
        'Concurrent TCP server (goroutines)',
        'RESP protocol parser',
        'Command dispatch',
        'In-memory store (O(1))',
        'Persistence layer',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'ops', value: 'O(1) GET/SET/DEL' },
        { label: 'concurrency', value: 'goroutines' },
        { label: 'protocol', value: 'RESP' },
      ],
    },
    {
      slug: 'greenstack',
      title: 'GreenStack — Cloud Cost & Carbon',
      tagline: 'FinOps dashboard with AI remediation',
      description:
        'A full-stack app that ingests AWS billing data and parses Terraform files to compute cost and CO2 per resource across 16 regions, with AI-generated one-click remediation.',
      problem: 'Cloud spend and carbon footprint are opaque and hard to act on.',
      solution:
        'Built a Next.js app that parses Terraform HCL and billing data, computes cost and CO2 per resource, and uses Gemini to generate downloadable Terraform remediation files.',
      impact: 'Delivered one-click, actionable cost-saving recommendations across 16 AWS regions.',
      featured: false,
      year: '2025',
      role: 'Full-Stack',
      tech: ['Next.js', 'TypeScript', 'React', 'AWS', 'Terraform', 'Gemini', 'Recharts'],
      image: '/projects/greenstack.png',
      gallery: ['/projects/greenstack.png'],
      architecture: [
        'AWS billing ingestion',
        'Terraform HCL parser',
        'Cost + CO2 computation',
        'Gemini remediation',
        'Recharts dashboard',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'regions', value: '16' },
        { label: 'output', value: '1-click Terraform' },
        { label: 'ai', value: 'Gemini' },
      ],
    },
    {
      slug: 'github-search',
      title: 'GitHub Fixability Search Engine',
      tagline: 'Rank issues by a composite fixability score',
      description:
        'A search engine that ingests and indexes GitHub issues and ranks them by a composite fixability score to speed up triage.',
      problem: 'Triaging open-source issues to find high-leverage, fixable bugs is slow.',
      solution:
        'Built async ingestion (httpx, aiosqlite), SQLite FTS5 full-text search with BM25 reranking, and TF-IDF cosine-similarity scoring, covered by 19 pytest tests.',
      impact: 'Surfaces high-fixability issues fast, with a tested, reproducible pipeline.',
      featured: false,
      year: '2024',
      role: 'Backend / Search',
      tech: ['Python', 'FastAPI', 'Streamlit', 'SQLite', 'scikit-learn', 'pytest'],
      image: '/projects/github-search.png',
      gallery: ['/projects/github-search.png'],
      architecture: [
        'Async ingestion (httpx)',
        'SQLite FTS5 index',
        'BM25 rerank + TF-IDF',
        'Fixability scoring',
        'Streamlit UI',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'search', value: 'FTS5 + BM25' },
        { label: 'tests', value: '19 passing' },
        { label: 'score', value: 'TF-IDF' },
      ],
    },
    {
      slug: 'transformer',
      title: 'Transformer from Scratch',
      tagline: 'Decoder-only GPT, built from the paper',
      description:
        'A decoder-only transformer implemented from scratch following "Attention Is All You Need" to internalize GPT architecture.',
      problem: 'Understand LLM internals beyond library abstractions.',
      solution:
        'Implemented multi-head self-attention, positional encoding, and layer normalization, and trained the model on the Shakespeare dataset.',
      impact: 'Built a deep, hands-on grasp of attention and long-range dependency modeling.',
      featured: false,
      year: '2024',
      role: 'ML / Learning',
      tech: ['Python', 'PyTorch', 'NLP'],
      image: '/projects/transformer.png',
      gallery: ['/projects/transformer.png'],
      architecture: [
        'Tokenization',
        'Multi-head self-attention',
        'Positional encoding',
        'Layer norm + feed-forward',
        'Autoregressive training',
      ],
      github: 'https://github.com/n1tishc',
      metrics: [
        { label: 'architecture', value: 'decoder-only' },
        { label: 'implementation', value: 'from scratch' },
        { label: 'dataset', value: 'Shakespeare' },
      ],
    },
  ],

  certifications: [],

  education: [
    {
      school: 'Rochester Institute of Technology',
      degree: 'M.S. in Computer Science',
      start: '2023',
      end: '2025',
      gpa: '3.57 / 4.0',
      coursework: [
        'Machine Learning',
        'Deep Learning',
        'Neural Networks',
        'NLP',
        'Computer Vision',
        'Big Data',
        'Distributed Systems',
        'Cloud Computing',
      ],
      achievements: [
        'Graduate Research Assistant — ML Systems & Optimization',
        'Research Assistant — Software Engineer (backend + RAG)',
      ],
    },
    {
      school: 'Sir M. Visvesvaraya Institute of Technology',
      degree: 'B.E. in Computer Science',
      start: '2018',
      end: '2022',
      coursework: ['Data Structures & Algorithms', 'Operating Systems', 'Databases', 'Computer Networks'],
      achievements: [],
    },
  ],

  achievements: [
    {
      category: 'Hackathon',
      title: 'Top 5 — Lelapa AI International Hackathon',
      detail: 'Knowledge distillation (Gemini → InkubaLM) improving F1 from 0.2 to 0.6 on low-resource multilingual tasks.',
      year: '2024',
    },
    {
      category: 'Hackathon',
      title: 'Qualcomm × Meta ExecuTorch Hackathon',
      detail: 'Built Sub Rosa: on-device Qwen3-1.7B running on the Hexagon NPU with NPU→CPU fallback.',
      year: '2026',
    },
    {
      category: 'Education',
      title: 'M.S. Computer Science, RIT',
      detail: 'GPA 3.57/4.0, focused on ML systems, LLMs, and computer vision.',
      year: '2025',
    },
  ],

  testimonials: [],

  blog: [],
}

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const
