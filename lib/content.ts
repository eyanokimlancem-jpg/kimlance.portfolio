export const profile = {
  name: "KIM LANCE EYANO",
  headline: "Full-Stack Developer | IT Graduate | Software & Web Application Developer",
  intro:
    "I develop modern websites, practical software solutions, and innovative applications that transform ideas into meaningful digital experiences.",
  about:
    "I am Kim Lance Eyano, a Bachelor of Science in Information Technology graduate with experience building commissioned systems, academic projects, internship projects, and web applications. My interests include software development, web development, systems development, and practical technology solutions that create value for real users.",
};

export type SkillGroup = {
  title: string;
  icon: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Development",
    icon: "Monitor",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend Development",
    icon: "ServerCog",
    items: ["Node.js", "REST APIs", "Server Actions", "Authentication", "Business Logic"],
  },
  {
    title: "Database Management",
    icon: "Database",
    items: ["PostgreSQL", "Prisma ORM", "Schema Design", "Data Modeling", "Query Optimization"],
  },
  {
    title: "Mobile Application Development",
    icon: "Smartphone",
    items: ["Mobile UI Design", "Cross-platform Thinking", "App Flow Design", "Feature Planning"],
  },
  {
    title: "UI/UX Design",
    icon: "Palette",
    items: ["Wireframing", "Visual Design", "Interaction Design", "Accessibility", "Design Systems"],
  },
  {
    title: "Development Tools",
    icon: "Wrench",
    items: ["Git", "GitHub", "Figma", "Docker", "Vercel"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  type: string;
  status: string;
  description: string;
  details: string;
  stack: string[];
  links?: {
    label: string;
    href: string;
  }[];
  placeholder: string;
};

export const projects: Project[] = [
  {
    id: "arbizo-dental-clinic-management-system",
    title: "Arbizo Dental Clinic Management System",
    category: "Commissioned Project",
    type: "Dental Clinic Management System",
    status: "Completed/Commissioned",
    description:
      "A commissioned software project designed to support dental clinic operations with structured management workflows and practical administrative support.",
    details:
      "This project focuses on creating a working clinic management solution suited for dental practice operations, covering the need for organized records, operational clarity, and efficient day-to-day administration.",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    placeholder: "Dental Management",
  },
  {
    id: "sign-signing-inclusivity",
    title: "SIGN — Signing Inclusivity thru Gesture and Non-Verbal Communication",
    category: "Capstone Project",
    type: "Sign Language Application",
    status: "Academic Project",
    description:
      "A capstone project created to support educational access and communication through sign-based and non-verbal interaction concepts.",
    details:
      "The project is focused on accessibility and learning support, using gesture and non-verbal communication ideas to explore ways to improve understanding and inclusivity in educational settings.",
    stack: ["React", "Node.js", "PostgreSQL", "UI/UX Design"],
    placeholder: "Sign Language",
  },
  {
    id: "casa-san-miguel-foundation-website",
    title: "CASA San Miguel Foundation Website",
    category: "Internship Project",
    type: "Website Development",
    status: "Project Website",
    description:
      "A website development project created to present the organization’s mission, programs, and public-facing information in a clear, engaging format.",
    details:
      "This project involved creating and improving a public website experience to support information access and online presentation for the foundation.",
    stack: ["HTML", "CSS", "JavaScript", "Web Content Design"],
    links: [
      { label: "Visit Website", href: "https://www.casasanmiguel-artcenter.org" },
      { label: "Visit Website 2", href: "https://www.csm-art.org" },
    ],
    placeholder: "Foundation Website",
  },
  {
    id: "comprehensive-dormitory-management",
    title: "Comprehensive Dormitory Management",
    category: "School Project",
    type: "Dormitory Management System",
    status: "Academic System Project",
    description:
      "An academic systems project focused on managing dormitory records, room allocation, and day-to-day administrative operations in a structured way.",
    details:
      "The system was designed as a school project to model essential dormitory management functions and support organized record keeping within a campus housing context.",
    stack: ["PHP", "MySQL", "Bootstrap", "System Design"],
    placeholder: "Dormitory Management",
  },
  {
    id: "mymd-app",
    title: "MyMD App",
    category: "Upcoming Project",
    type: "Mobile Application",
    status: "Coming Soon",
    description:
      "A planned mobile application concept focused on practical digital utility and user-centered product thinking for future development.",
    details:
      "This upcoming project is still in the concept stage and will be developed as a mobile application idea with a clear user focus and practical functionality in mind.",
    stack: ["Mobile Design", "Product Planning", "Future Development"],
    placeholder: "MyMD App",
  },
];

export const services = [
  "Website Development",
  "Full-Stack Web Applications",
  "Management Information Systems",
  "Mobile Application Development",
  "UI/UX Design",
  "Software Maintenance and Troubleshooting",
];
