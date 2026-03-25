/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Terminal,
  Briefcase,
  Phone,
  Code2,
  Cpu,
  Globe,
  Layers,
  Award,
  CheckCircle2,
  Server,
  Database,
  Download,
  MessageSquare,
  Calendar,
  Zap,
  Clock,
  Rocket,
  ShieldCheck,
  Smartphone
} from "lucide-react";

// Typing Effect Component
const TypingEffect = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayedText}<span className="animate-pulse border-r-2 border-brand-accent ml-1">&nbsp;</span></span>;
};

const PROJECTS = [
  {
    title: "College Event Management System",
    description: "A full-featured web application for students to explore, book, and manage college events with payment integration UI.",
    tech: ["Python", "Flask", "SQLite", "JavaScript", "Tailwind"],
    link: "https://github.com/krishoo2005",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    featured: true,
    features: ["User Auth", "Event Booking", "Admin Dashboard", "Payment UI"]
  },
  {
    title: "Flask Skills Tracker",
    description: "A comprehensive skills tracking application deployed on AWS EC2 using Gunicorn and Nginx for production.",
    tech: ["Python", "Flask", "AWS EC2", "Gunicorn", "Nginx"],
    link: "https://github.com/krishoo2005",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    title: "AWS EC2 Production Setup",
    description: "Hands-on experience setting up production-ready Linux servers on AWS with proper security and performance tuning.",
    tech: ["AWS", "Linux (Ubuntu)", "Nginx", "DevOps"],
    link: "https://github.com/krishoo2005",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    title: "Smart Home Automation System",
    description: "IoT-based automation system using ESP32 and Arduino for real-time control of home appliances.",
    tech: ["ESP32", "Arduino", "IoT", "C++"],
    link: "https://github.com/krishoo2005",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    title: "Python Automation Practice",
    description: "A series of scripts designed to automate repetitive tasks and improve workflow efficiency.",
    tech: ["Python", "Automation", "Scripts"],
    link: "https://github.com/krishoo2005",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

const SKILLS = [
  { category: "Programming", items: [{ name: "Python", level: "Advanced" }], icon: <Code2 size={18} /> },
  { category: "Backend", items: [{ name: "Flask", level: "Intermediate" }], icon: <Terminal size={18} /> },
  { category: "Cloud", items: [{ name: "AWS EC2", level: "Intermediate" }], icon: <Server size={18} /> },
  { category: "DevOps", items: [{ name: "Gunicorn", level: "Intermediate" }, { name: "Nginx", level: "Intermediate" }], icon: <Layers size={18} /> },
  { category: "OS", items: [{ name: "Linux (Ubuntu)", level: "Advanced" }], icon: <Globe size={18} /> },
  { category: "Embedded", items: [{ name: "Arduino", level: "Intermediate" }, { name: "ESP32", level: "Intermediate" }], icon: <Cpu size={18} /> },
  { category: "Tools", items: [{ name: "Git", level: "Advanced" }, { name: "GitHub", level: "Advanced" }, { name: "AutoCAD Electrical", level: "Intermediate" }], icon: <Database size={18} /> }
];

const JOURNEY = [
  { year: "2023", event: "Started coding and explored the fundamentals of computer science." },
  { year: "2024", event: "Mastered Python and built several projects focusing on automation and backend." },
  { year: "2025", event: "Focused on AWS deployment and building real-world scalable applications." }
];

const STATS = [
  { label: "Projects", value: "5+", icon: <Briefcase className="text-brand-accent" /> },
  { label: "Technologies", value: "10+", icon: <Code2 className="text-brand-accent" /> },
  { label: "Deployments", value: "2+", icon: <Rocket className="text-brand-accent" /> }
];

const ACHIEVEMENTS = [
  { title: "KPIT Sparkle 2025", detail: "Cleared 2 levels of the prestigious innovation competition." },
  { title: "IGNITE Project Expo", detail: "Served as the Event Coordinator for the tech showcase." },
  { title: "AWS Deployment", detail: "Hands-on experience in production-level cloud deployment." },
  { title: "UIDAI Hackathon", detail: "Active participant in the national-level hackathon." }
];

const SERVICES = [
  {
    title: "Website Development",
    description: "Building modern, responsive, and high-performance websites tailored to your needs.",
    icon: <Globe className="text-brand-accent" />
  },
  {
    title: "Python Backend Development",
    description: "Developing robust and scalable backend systems using Python and Flask.",
    icon: <Terminal className="text-brand-accent" />
  },
  {
    title: "AWS Deployment",
    description: "Setting up and managing production-ready servers on AWS EC2 with Nginx and Gunicorn.",
    icon: <Server className="text-brand-accent" />
  },
  {
    title: "IoT Projects",
    description: "Designing and implementing smart systems using ESP32 and Arduino.",
    icon: <Cpu className="text-brand-accent" />
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "services", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center glass m-4 rounded-2xl">
        <div 
          className="text-xl font-display font-bold tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          K. AGHADE<span className="text-brand-accent">.</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
          {["home", "about", "skills", "projects", "experience", "services", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' })}
              className={`text-[10px] uppercase tracking-widest transition-all hover:text-brand-accent ${
                activeSection === item ? "text-brand-accent" : "text-brand-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <a href="https://github.com/krishoo2005" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-brand-accent transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/krushna-aghade-136873284/" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-brand-accent transition-colors"><Linkedin size={18} /></a>
          <a href="mailto:krushnaaghade1@gmail.com" className="p-2 hover:text-brand-accent transition-colors"><Mail size={18} /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent mb-6 block font-medium">
              Electrical Engineering Student | Python Developer | AWS & Flask Enthusiast
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              K. <span className="text-gradient">AGHADE</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted max-w-2xl mb-12 h-16">
              <TypingEffect text="Building real-world scalable applications using Python, Cloud & IoT" />
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-accent text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-blue-600 transition-all shadow-lg shadow-brand-accent/20"
              >
                Hire Me
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-brand-accent/20 px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-brand-accent/5 transition-all"
              >
                View Projects
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-xs hover:text-brand-accent transition-all">
                <Download size={16} /> Resume
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-display font-bold mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-brand-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-8">ABOUT ME.</h2>
            <p className="text-xl text-brand-muted leading-relaxed mb-12">
              Passionate developer focused on solving real-world problems using Python, Cloud technologies, and IoT systems. I bridge the gap between hardware and software to create seamless digital experiences.
            </p>
            
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest text-brand-accent font-bold">Education</h3>
              <div className="space-y-6">
                <div className="relative pl-8 border-l border-brand-accent/20">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-brand-accent" />
                  <h4 className="text-lg font-bold">B.Tech Electrical Engineering</h4>
                  <p className="text-brand-muted">Current CGPA: 7.5</p>
                </div>
                <div className="relative pl-8 border-l border-brand-accent/20">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-brand-accent" />
                  <h4 className="text-lg font-bold">Maharashtra Board (12th)</h4>
                  <p className="text-brand-muted">Percentage: 74.67%</p>
                </div>
                <div className="relative pl-8 border-l border-brand-accent/20">
                  <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-brand-accent" />
                  <h4 className="text-lg font-bold">Maharashtra Board (10th)</h4>
                  <p className="text-brand-muted">Percentage: 87.20%</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-4xl font-display font-bold mb-8">JOURNEY.</h2>
            <div className="space-y-8">
              {JOURNEY.map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-brand-accent font-display font-bold text-2xl opacity-40">{item.year}</div>
                  <p className="text-brand-muted leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>

            <h2 className="text-4xl font-display font-bold mb-8 pt-8">ACHIEVEMENTS.</h2>
            <div className="grid gap-4">
              {ACHIEVEMENTS.map((achievement, idx) => (
                <div key={idx} className="glass p-6 rounded-2xl flex items-start gap-4">
                  <Award className="text-brand-accent shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold mb-1">{achievement.title}</h4>
                    <p className="text-sm text-brand-muted">{achievement.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 md:px-24 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-4">TECHNICAL SKILLS.</h2>
          <p className="text-brand-muted mb-16 max-w-2xl">Categorized expertise across the full stack, from hardware to cloud deployment.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-8 rounded-3xl card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                    {skill.icon}
                  </div>
                  <h3 className="text-xs uppercase tracking-widest font-bold">{skill.category}</h3>
                </div>
                <div className="space-y-4">
                  {skill.items.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="text-brand-accent text-[10px] uppercase tracking-widest font-bold">{item.level}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: item.level === "Advanced" ? "90%" : item.level === "Intermediate" ? "65%" : "30%" }}
                          viewport={{ once: true }}
                          className="h-full bg-brand-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Real-World Projects & Practical Experience</h2>
            <p className="text-brand-muted text-xl">Projects that demonstrate real deployment, problem-solving, and industry-level skills</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative glass rounded-[40px] overflow-hidden card-hover ${project.featured ? 'md:col-span-2' : ''}`}
              >
                <div className={`${project.featured ? 'md:grid md:grid-cols-2' : ''}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-bg/60 opacity-40 group-hover:opacity-20 transition-opacity" />
                    {project.featured && (
                      <div className="absolute top-6 left-6 bg-brand-accent text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Zap size={12} fill="currentColor" /> Featured Project
                      </div>
                    )}
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <h3 className={`${project.featured ? 'text-3xl md:text-4xl' : 'text-2xl'} font-display font-bold mb-4`}>{project.title}</h3>
                    <p className="text-brand-muted mb-8 leading-relaxed">{project.description}</p>
                    
                    {project.features && (
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {project.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-brand-muted">
                            <CheckCircle2 size={14} className="text-brand-accent" /> {f}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest text-brand-accent bg-brand-accent/5 px-3 py-1.5 rounded-lg border border-brand-accent/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={project.link} 
                        className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brand-accent hover:text-white transition-all"
                      >
                        View Project <ExternalLink size={14} />
                      </a>
                      <a 
                        href="https://github.com/krishoo2005" 
                        className="border border-white/10 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:border-brand-accent transition-all"
                      >
                        Source Code <Github size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-brand-muted italic">"These projects reflect my ability to build real-world scalable solutions for clients and businesses."</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 md:px-24 border-t border-brand-border bg-white/2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold mb-16 text-center uppercase tracking-tighter">PRACTICAL EXPERIENCE.</h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-[40px] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Server size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-brand-accent/10 rounded-2xl text-brand-accent">
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="text-3xl font-display font-bold">Cloud & Infrastructure</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-brand-accent text-xs uppercase tracking-widest font-bold">AWS & Linux</h4>
                    <p className="text-brand-muted text-sm leading-relaxed">Expertise in deploying production-ready Flask applications on AWS EC2 using Gunicorn and Nginx reverse proxies.</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-brand-accent text-xs uppercase tracking-widest font-bold">Problem Solving</h4>
                    <p className="text-brand-muted text-sm leading-relaxed">Deep understanding of real-world debugging, including port configurations, Linux permissions, and deployment bottlenecks.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">SERVICES I OFFER.</h2>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
              Professional development and deployment services for your next big idea.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-3xl text-center card-hover border-b-4 border-transparent hover:border-brand-accent"
              >
                <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 glass p-16 rounded-[60px] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-4xl font-display font-bold mb-12 text-center">Why choose me?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto text-brand-accent">
                    <Zap size={24} />
                  </div>
                  <h4 className="font-bold">Real Experience</h4>
                  <p className="text-xs text-brand-muted">Practical knowledge from building real-world projects.</p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto text-brand-accent">
                    <Rocket size={24} />
                  </div>
                  <h4 className="font-bold">Deployment Knowledge</h4>
                  <p className="text-xs text-brand-muted">Expertise in taking applications from local to production.</p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto text-brand-accent">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold">Problem Solving</h4>
                  <p className="text-xs text-brand-muted">Strong problem-solving mindset for complex technical issues.</p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto text-brand-accent">
                    <Clock size={24} />
                  </div>
                  <h4 className="font-bold">Fast Learner</h4>
                  <p className="text-xs text-brand-muted">Quick to adapt to new technologies and client requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-24 border-t border-brand-border bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-display font-bold mb-8">GET IN TOUCH.</h2>
              <p className="text-xl text-brand-muted mb-12">
                Have a project in mind or just want to say hi? Feel free to reach out!
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-accent/10 rounded-xl text-brand-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-muted mb-1 font-bold">Phone</p>
                    <p className="text-xl font-medium">+91-7058523994</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-accent/10 rounded-xl text-brand-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-muted mb-1 font-bold">Email</p>
                    <p className="text-xl font-medium">krushnaaghade1@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-accent/10 rounded-xl text-brand-accent">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-muted mb-1 font-bold">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/krushna-aghade-136873284/" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-brand-accent transition-colors">Krushna Aghade</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-brand-accent/10 rounded-xl text-brand-accent">
                    <Github size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-muted mb-1 font-bold">GitHub</p>
                    <a href="https://github.com/krishoo2005" target="_blank" rel="noopener noreferrer" className="text-xl font-medium hover:text-brand-accent transition-colors">krishoo2005</a>
                  </div>
                </div>
                <div className="pt-8 flex flex-wrap gap-4">
                  <a 
                    href="https://wa.me/917058523994" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold tracking-widest uppercase text-xs hover:scale-105 transition-all shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageSquare size={20} /> WhatsApp Me
                  </a>
                </div>
              </div>
            </div>

            <div className="glass p-12 rounded-[40px]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-brand-border text-center">
        <p className="text-brand-muted text-sm">
          © 2026 K. AGHADE. Built with React, Tailwind, and Motion.
        </p>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-brand-muted font-bold">Full Name</label>
        <input 
          required
          name="name"
          type="text" 
          placeholder="Your Name"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent outline-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-brand-muted font-bold">Email Address</label>
        <input 
          required
          name="email"
          type="email" 
          placeholder="your@email.com"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent outline-none transition-all"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-brand-muted font-bold">Message</label>
        <textarea 
          required
          name="message"
          rows={4}
          placeholder="How can I help you?"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-accent outline-none transition-all resize-none"
        />
      </div>

      <button 
        disabled={status === "loading"}
        className="w-full bg-brand-accent text-white py-5 rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-blue-600 transition-all disabled:opacity-50 shadow-lg shadow-brand-accent/20"
      >
        {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
