export const profile = {
  name: 'P Sai Krishnan',
  role: 'Computer Science Undergraduate',
  email: 'sai.krish6081@gmail.com',
  phone: '+91 8368836251',
  location: 'Chennai, Tamil Nadu',
  github: 'https://github.com/krish180306',
  githubHandle: 'krish180306',
  linkedin: 'https://linkedin.com/in/p-sai-krishnan',
  linkedinHandle: 'p-sai-krishnan',

  objective: `Computer Science undergraduate at Vellore Institute of Technology with interests in machine learning and full-stack web development. Passionate about building intelligent data-driven applications and scalable web platforms while gaining hands-on experience in real-world software development.`,

  education: {
    degree: 'B.Tech in Computer Science and Engineering',
    school: 'Vellore Institute of Technology, Chennai',
    period: 'Expected 2028',
    gpa: 'CGPA: 8.03',
  },

  skills: {
    Languages: ['Python', 'HTML', 'CSS', 'C', 'C++', 'JavaScript', 'Java'],
    'Frameworks/Libraries': ['React', 'Vite', 'Node.js', 'Express', 'Scikit-learn', 'Tensorflow', 'PyTorch', 'NumPy', 'Pandas'],
    'Tools/Platforms': ['Git', 'GitHub', 'Google Colab'],
    Databases: ['MySQL', 'SQL*Plus', 'MongoDB'],
  },

  research: [
    {
      title: 'Deep Learning Prediction for Photonic Crystal DWDM Demultiplexer',
      period: 'Aug 2025 - Dec 2025',
      points: [
        'Developed a deep learning based regression model to predict structural and performance parameters of a 2D photonic crystal DWDM demultiplexer using FDTD simulation datasets.',
        'Trained machine learning models using Python libraries such as Scikit-learn and NumPy to estimate photonic device design parameters.',
        'Evaluated model performance using Mean Squared Error (MSE) and R2 score to assess prediction accuracy.',
      ],
    },
  ],

  projects: [
    {
      id: 'scriptops',
      title: 'ScriptOps',
      subtitle: 'AI-Powered Film Production Assistant',
      tag: 'Hackathon Winner',
      icon: '🎬',
      description: 'Built a full-stack AI-powered application in a 24-hour hackathon that won first place by automating film pre-production analysis.',
      tech: ['Python', 'FastAPI', 'React', 'Recharts', 'Google Gemini Pro API'],
      features: [
        'Automated screenplay parsing and scene breakdowns',
        'Character analysis, emotion tracking, and screen-time estimation',
        'Interactive visual dashboards mapping budget, prop allocation, and scheduling timelines',
      ],
    },
    {
      id: 'field2site',
      title: 'Field2Site',
      subtitle: 'Equipment Rental Marketplace',
      tag: null,
      icon: '🚜',
      description: 'Developed a full-stack equipment rental marketplace facilitating transactions between construction firms and suppliers.',
      tech: ['React', 'Vite', 'Node.js', 'Express.js', 'MySQL', 'Nodemailer'],
      features: [
        'Real-time catalog search and dynamic pricing calculation',
        'Multi-tier user roles (Customer, Supplier, Admin)',
        'Booking schedules and invoice generation pipelines',
        'OTP-based secure email verification',
      ],
    },
    {
      id: 'visionassist',
      title: 'VisionAssist',
      subtitle: 'CNN-Based Assistive Face Recognition System',
      tag: null,
      icon: '👁️',
      description: 'Developed a deep-learning face recognition system to assist visually impaired individuals in recognizing family members and familiar people.',
      tech: ['PyTorch', 'OpenCV', 'NumPy', 'Scikit-learn'],
      features: [
        'Real-time face tracking and cropping from camera feeds',
        'Voice feedback synthesis mapping recognized faces to auditory cues',
        'Low-latency processing suitable for edge devices',
      ],
    },
    {
      id: 'dwdm',
      title: 'Research_DWDM',
      subtitle: 'Photonic Crystal DWDM Demultiplexer',
      tag: 'Published Research',
      icon: '🔬',
      description: 'Developed a deep learning based regression model to predict structural and performance parameters of a 2D photonic crystal DWDM demultiplexer using FDTD simulation datasets.',
      tech: ['Python', 'TensorFlow/Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'],
      features: [
        'Trained neural network regression model estimating demultiplexer device metrics',
        'Realized MSE < 0.01 with R2 score > 0.98 on predicted parameters',
        'Significantly accelerated photonic demultiplexer device optimization from hours to milliseconds',
        'Published at Sixth International Conference on Optical & Wireless Technologies (OWT2025)',
      ],
    },
  ],

  achievements: [
    '2x Hackathon Winner',
    'Published research paper at Sixth International Conference on Optical & Wireless Technologies (OWT2025)',
    'Quantitative Research Virtual Experience — JPMorgan Chase & Co., Forage (Feb 2025)',
  ],
};

export function projectDescriptionText(id: string): string {
  const p = profile.projects.find(proj => proj.id === id);
  if (!p) return '';
  const heading = p.tag ? `${p.title} — ${p.subtitle} (${p.tag})` : `${p.title} — ${p.subtitle}`;
  return `PROJECT: ${heading}

DESCRIPTION:
${p.description}

TECH STACK:
${p.tech.map(t => `- ${t}`).join('\n')}

KEY FEATURES:
${p.features.map(f => `- ${f}`).join('\n')}`;
}

export const resumeText = `${profile.name.toUpperCase()}
${profile.phone} | ${profile.email} | ${profile.location}
LinkedIn: linkedin.com/in/${profile.linkedinHandle} | GitHub: github.com/${profile.githubHandle}

OBJECTIVE
${profile.objective}

EDUCATION
${profile.education.degree}, ${profile.education.school}
${profile.education.period} | ${profile.education.gpa}

SKILLS
${Object.entries(profile.skills).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n')}

RESEARCH EXPERIENCE
${profile.research.map(r => `${r.title} (${r.period})\n${r.points.map(p => `- ${p}`).join('\n')}`).join('\n\n')}

PROJECTS
${profile.projects.map(p => `${p.title}${p.subtitle ? ` — ${p.subtitle}` : ''}${p.tag ? ` (${p.tag})` : ''}\n- ${p.description}`).join('\n\n')}

ACHIEVEMENTS & CERTIFICATIONS
${profile.achievements.map(a => `- ${a}`).join('\n')}`;
