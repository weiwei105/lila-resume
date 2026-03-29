/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Phone,
  MessageCircle,
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Briefcase, 
  User, 
  Layers,
  Menu,
  X
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, SKILLS } from './constants';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-orange-600/20 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-orange-600 rounded-full pointer-events-none z-[101] hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />
    </>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-orange-600 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        x: [0, 100, 0],
        y: [0, 50, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-24 -left-24 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, -45, 0],
        x: [0, -50, 0],
        y: [0, 100, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-50/40 rounded-full blur-3xl"
    />
    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
  </div>
);

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '关于我', href: '#home' },
    { name: '经验', href: '#experience' },
    { name: '项目', href: '#projects' },
    { name: '技能', href: '#skills' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center px-8 py-4 rounded-full transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-orange-900/5' : 'bg-transparent'}`}>
          <motion.a 
            href="#" 
            className="text-2xl font-black tracking-tighter group flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="group-hover:text-orange-600 transition-colors">{PERSONAL_INFO.name}</span>
            <span className="text-orange-600">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-bold text-gray-500 hover:text-orange-600 rounded-full hover:bg-orange-50 transition-all"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
            <div className="w-px h-4 bg-gray-200 mx-4"></div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white/90 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black hover:text-orange-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const y2 = useSpring(scrollY, { stiffness: 100, damping: 30 });

  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="inline-block px-4 py-1.5 mb-8 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-bold tracking-widest uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            UI Designer & AI Explorer
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.9]">
            <motion.span 
              className="block italic"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              UI
            </motion.span>
            <motion.span 
              className="block text-orange-600 italic"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              设计师
            </motion.span>
          </h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 font-medium leading-relaxed whitespace-pre-wrap text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {PERSONAL_INFO.about}
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="space-y-4">
              <h4 className="text-sm font-black text-orange-600 uppercase tracking-widest">教育背景</h4>
              <p className="text-lg font-bold text-gray-900 whitespace-pre-line">{PERSONAL_INFO.education}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-black text-orange-600 uppercase tracking-widest">联系方式</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} className="text-orange-600" />
                  <span className="font-medium">{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={18} className="text-orange-600" />
                  <span className="font-medium">{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MessageCircle size={18} className="text-orange-600" />
                  <span className="font-medium">微信: {PERSONAL_INFO.wechat}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="relative aspect-square max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full lg:ml-auto"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="absolute inset-0 bg-orange-600 rounded-[3rem] rotate-6 opacity-10"
            animate={{ rotate: [6, 10, 6], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="w-full h-full bg-white rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex items-center justify-center p-4 md:p-8 border border-gray-100"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img 
              src="/avatar.jpg" 
              alt="Portrait" 
              className="w-full h-full object-contain rounded-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/portrait/800/800";
              }}
              referrerPolicy="no-referrer"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60"
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon: any }) => (
  <motion.div 
    className="flex items-center gap-4 mb-16"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <div className="p-3 bg-orange-600 rounded-2xl shadow-lg shadow-orange-200">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-4xl font-black tracking-tight">{children}</h2>
    <div className="h-px bg-gray-200 flex-grow ml-4"></div>
  </motion.div>
);

const Experience = () => (
  <section id="experience" className="py-24 relative overflow-hidden bg-white/50">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionTitle icon={Briefcase}>工作经验</SectionTitle>
      <div className="relative space-y-16 before:absolute before:left-0 md:before:left-[100px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
        {EXPERIENCES.map((exp, i) => (
          <motion.div 
            key={i}
            className="relative grid md:grid-cols-[200px_1fr] gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col md:items-end md:pr-12">
              <motion.span 
                className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                {exp.period}
              </motion.span>
              <motion.div 
                className="absolute left-[-4px] md:left-[96px] top-1.5 w-2 h-2 bg-orange-600 rounded-full border-4 border-white ring-1 ring-orange-100"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: i * 0.1 + 0.5 }}
              ></motion.div>
            </div>
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
              <div className="text-orange-600 font-semibold mb-6 flex items-center">
                <span className="w-4 h-px bg-orange-200 mr-2"></span>
                {exp.company}
              </div>
              <ul className="space-y-4">
                {exp.description.map((item, j) => (
                  <li key={j} className="text-gray-600 text-lg leading-relaxed flex items-start group">
                    <span className="mr-3 mt-2.5 w-1.5 h-1.5 bg-orange-200 rounded-full flex-shrink-0 group-hover:bg-orange-500 transition-colors"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle icon={Code}>精选作品集</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {PROJECTS.map((project, i) => (
          <motion.div 
            key={i}
            className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-orange-200 transition-all duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="aspect-video overflow-hidden relative">
              <motion.img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div className="text-white">
                  <p className="text-sm font-bold tracking-widest uppercase mb-2">View Case Study</p>
                  <div className="w-12 h-1 bg-orange-500"></div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">{project.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed line-clamp-2">{project.description}</p>
              <a href={project.link} className="inline-flex items-center text-sm font-bold mt-6 group/link">
                查看详情 <ExternalLink className="ml-1 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-24 bg-black text-white rounded-[3rem] mx-6 my-12 overflow-hidden relative">
    <motion.div 
      animate={{ 
        rotate: [0, 360],
      }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none"
    />
    <div className="max-w-7xl mx-auto px-12 relative z-10">
      <SectionTitle icon={Layers}>专业技能</SectionTitle>
      <div className="grid md:grid-cols-3 gap-16">
        {SKILLS.map((skill, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-orange-500 font-bold uppercase tracking-widest mb-8 flex items-center">
              <span className="w-8 h-px bg-orange-500/30 mr-4"></span>
              {skill.category}
            </h3>
            <div className="flex flex-wrap gap-4">
              {skill.items.map((item, j) => (
                <motion.span 
                  key={j} 
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-lg font-medium hover:bg-orange-600 hover:border-orange-600 transition-all cursor-default"
                  whileHover={{ scale: 1.1, rotate: 2 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-black text-white">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <motion.div 
        className="text-xl font-bold mb-4 md:mb-0"
        whileHover={{ scale: 1.1 }}
      >
        {PERSONAL_INFO.name}.
      </motion.div>
      <div className="text-gray-500 text-sm">
        © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
      </div>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <motion.a 
          href={`mailto:${PERSONAL_INFO.email}`} 
          className="hover:text-orange-500 transition-colors" 
          title={PERSONAL_INFO.email}
          whileHover={{ y: -5, scale: 1.2 }}
        >
          <Mail size={20} />
        </motion.a>
        <motion.a 
          href={`tel:${PERSONAL_INFO.phone}`} 
          className="hover:text-orange-500 transition-colors" 
          title={PERSONAL_INFO.phone}
          whileHover={{ y: -5, scale: 1.2 }}
        >
          <Phone size={20} />
        </motion.a>
        <motion.div 
          className="hover:text-orange-500 transition-colors cursor-help" 
          title={`微信: ${PERSONAL_INFO.wechat}`}
          whileHover={{ y: -5, scale: 1.2 }}
        >
          <MessageCircle size={20} />
        </motion.div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-600 bg-[#fdfdfd] cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
