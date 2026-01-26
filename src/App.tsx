import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Smartphone, Download, ExternalLink, Code, MapPin, Instagram, Facebook, MessageCircle, LucideIcon, Moon, Sun, Info, Layers, Server, Cpu, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { data, skills } from './data';
import { Project } from './types';

// --- Components ---

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <motion.h2 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-b-4 border-blue-600 inline-block pb-2"
  >
    {title}
  </motion.h2>
);

// --- Modal Component ---

const ProjectInfoModal: React.FC<{ isOpen: boolean; onClose: () => void; project: Project; labels: any }> = ({ isOpen, onClose, project, labels }) => {
  if (!isOpen || !project.details) return null;

  const { details } = project;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-0 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100 dark:border-gray-700 relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
           <div>
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               {project.title} <span className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">Info</span>
             </h3>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition">
              <span className="sr-only">Cerrar</span>
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
        
        <div className="p-6 overflow-y-auto custom-scrollbar">
           {/* Overview */}
           <div className="mb-8">
             <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
               <Info size={20} className="text-blue-500"/> {labels.aboutProject}
             </h4>
             <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
               {details.overview}
             </p>
           </div>

           {/* Features */}
           <div className="mb-8">
             <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
               <Cpu size={20} className="text-purple-500"/> {labels.keyFeatures}
             </h4>
             <ul className="grid sm:grid-cols-2 gap-2">
               {details.features.map((feature, idx) => (
                 <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"/>
                   {feature}
                 </li>
               ))}
             </ul>
           </div>

           {/* Tech Stack Grid */}
           <div>
             <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <Layers size={20} className="text-green-500"/> {labels.stack}
             </h4>
             <div className="grid sm:grid-cols-3 gap-6">
                {details.stack.frontend && (
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wide">
                      <LayoutIcon size={16}/> {labels.frontendMobile}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {details.stack.frontend?.map(t => <TechBadge key={t} text={t}/>)}
                      {details.stack.mobile?.map(t => <TechBadge key={t} text={t}/>)}
                    </div>
                  </div>
                )}
                
                {(details.stack.backend || details.stack.database) && (
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wide">
                      <Server size={16}/> {labels.backendData}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {details.stack.backend?.map(t => <TechBadge key={t} text={t}/>)}
                      {details.stack.database?.map(t => <TechBadge key={t} text={t}/>)}
                    </div>
                  </div>
                )}

                {details.stack.tools && (
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3 text-orange-600 dark:text-orange-400 font-semibold text-sm uppercase tracking-wide">
                      <Code size={16}/> {labels.toolsLibs}
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {details.stack.tools?.map(t => <TechBadge key={t} text={t}/>)}
                    </div>
                  </div>
                )}
             </div>
           </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
           <button onClick={onClose} className="px-5 py-2.5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
             {labels.close}
           </button>
           {project.links?.github && (
             <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:opacity-90 transition flex items-center gap-2">
               <Github size={18}/> {labels.viewCode}
             </a>
           )}
        </div>

      </motion.div>
    </div>
  );
};

// Helper for icons and badges
const LayoutIcon = ({size}: {size: number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const TechBadge = ({ text }: { text: string }) => (
  <span className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">
    {text}
  </span>
);

const DemoModal: React.FC<{ isOpen: boolean; onClose: () => void; downloadLink?: string; deployLink?: string; labels: any }> = ({ isOpen, onClose, downloadLink, deployLink, labels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-100 dark:border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{labels.demoModalTitle}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: labels.demoModalDesc }} />
        
        <div className="flex flex-col gap-3">
          {downloadLink && (
            <a 
              href={downloadLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Download size={20}/> {labels.downloadApp}
            </a>
          )}
          
          {deployLink && (
            <a 
              href={deployLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {labels.continueDemo}
            </a>
          )}
        </div>

        <button 
          onClick={onClose}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
        >
          {labels.cancel}
        </button>
      </motion.div>
    </div>
  );

};

const DesktopWarningModal: React.FC<{ isOpen: boolean; onClose: () => void; onContinue: () => void; labels: any }> = ({ isOpen, onClose, onContinue, labels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-gray-100 dark:border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-orange-500 flex justify-center">
           <Smartphone size={48} className="stroke-1" /> 
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{labels.desktopWarningTitle}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: labels.desktopWarningDesc }} />
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onContinue}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            {labels.continue}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {labels.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const MobileProjectCard: React.FC<{ project: Project; labels: any }> = ({ project, labels }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const images = project.images || [project.img || ''];
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 280 : -280,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 280 : -280,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  useEffect(() => {
    if (images.length <= 1) return;
    
    // Auto-scroll images every 3.5s
    const timer = setInterval(() => {
      paginate(1);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Phone Frame Container */}
        <div className="relative w-full max-w-[280px] aspect-[9/19] bg-gray-900 rounded-[2.5rem] border-[8px] border-gray-800 shadow-xl overflow-hidden mb-6 group transition-transform hover:-translate-y-2 duration-300">
          
          {/* Screen Content (Carousel) */}
          <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Navigation Buttons (Visible on Hover/Touch) */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/30 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-black/50"
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/30 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-30 hover:bg-black/50"
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Overlay Gradient for Buttons */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between py-10 px-6 z-20">
               
               <div /> {/* Top Spacer */}

                {/* Center Actions: View Demo & Info */}
               <div className="flex flex-col items-center gap-4">
                 {project.links?.deploy && (
                   <button 
                     onClick={() => setShowDemoModal(true)}
                     className="flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-medium hover:bg-white/30 hover:scale-105 transition transform"
                   >
                     <ExternalLink size={18}/> {labels.demoWeb}
                   </button>
                 )}
                 
                 {project.details && (
                    <button 
                      onClick={() => setShowInfoModal(true)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:text-white font-medium text-sm hover:underline transition"
                    >
                      <Info size={18}/> {labels.moreInfo}
                    </button>
                 )}
               </div>

               {/* Bottom Action: Download (Blue & Lowest) */}
               <div>
                 {project.links?.download && (
                    <a 
                      href={project.links.download} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-xl hover:bg-blue-700 hover:scale-105 transition transform"
                    >
                      <Download size={18}/> {labels.download}
                    </a>
                 )}
               </div>

            </div>
          </div>

          {/* Notch or Punch-hole based on project */}
          {project.id === 1 ? (
             /* Android Punch-hole */
             <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20 shadow-sm border border-gray-800"></div>
          ) : (
             /* iPhone Notch */
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
          )}
          
          {/* Indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Project Info (Outside Phone) */}
        <div className="text-center max-w-[300px]">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.isArray(project.tech) && (project.tech as string[]).slice(0, 10).map(t => (
              <span key={t} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs rounded-md font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
      <AnimatePresence>
        {showDemoModal && (
          <DemoModal 
            isOpen={showDemoModal} 
            onClose={() => setShowDemoModal(false)} 
            downloadLink={project.links?.download}
            deployLink={project.links?.deploy}
            labels={labels}
          />
        )}

        {showInfoModal && (
          <ProjectInfoModal 
            isOpen={showInfoModal} 
            onClose={() => setShowInfoModal(false)} 
            project={project}
            labels={labels}
          />
        )}
      </AnimatePresence>
      </AnimatePresence>
    </>
  );
};

interface ProjectCardProps {
  project: Project;
  layout?: 'large' | 'medium';
  labels: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, layout, labels }) => {
  const isLarge = layout === 'large';
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  return (
    <>
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {isLarge && project.img && (
        <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative group">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
             {/* Overlay buttons for UX - Desktop doesn't need the modal for now, or assume it's web-first  */}
             {project.links?.deploy && <a href={project.links.deploy} className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition"><ExternalLink size={18}/> Demo</a>}
             {project.details && <button onClick={() => setShowInfoModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"><Info size={18}/> Info</button>}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <div className="flex gap-2 text-blue-600 dark:text-blue-400">
            {project.details && <button onClick={() => setShowInfoModal(true)} aria-label="More Info"><Info size={18}/></button>}
            {project.links?.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer"><Github size={18}/></a>}
            {project.links?.download && <a href={project.links.download} target="_blank" rel="noopener noreferrer"><Download size={18}/></a>}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {Array.isArray(project.tech) ? project.tech.map(t => (
            <span key={t} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
              {t}
            </span>
          )) : <span className="text-xs text-gray-500 dark:text-gray-400">{project.tech}</span>}
        </div>
      </div>
    </motion.div>
    
    <AnimatePresence>
      {showInfoModal && (
        <ProjectInfoModal 
          isOpen={showInfoModal} 
          onClose={() => setShowInfoModal(false)} 
          project={project}
          labels={labels}
        />
      )}
    </AnimatePresence>
    </>
  );
};

// --- Main Component ---

const Portfolio: React.FC = () => {
  const [showDesktopInfoModal, setShowDesktopInfoModal] = useState(false);
  const [showDesktopWarningModal, setShowDesktopWarningModal] = useState(false);
  const [pendingLink, setPendingLink] = useState('');

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    // Check if mobile (using same breakpoint as Tailwind md: 768px)
    if (window.innerWidth < 768) {
      e.preventDefault();
      setPendingLink(url);
      setShowDesktopWarningModal(true);
    }
    // Desktop: Fall through to default behavior (target="_blank")
  };

  const handleContinueToSystem = () => {
    if (pendingLink) {
      window.open(pendingLink, '_blank', 'noopener,noreferrer');
    }
    setShowDesktopWarningModal(false);
  };
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      // Default to dark mode unless explicitly set to light
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || !savedTheme;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    console.log('Theme changed:', isDark ? 'Dark' : 'Light');
  }, [isDark]);


  const [lang, setLang] = useState<'es' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      return (savedLang === 'es' || savedLang === 'en') ? savedLang : 'es';
    }
    return 'es';
  });

  const { profile, projects, labels } = data[lang];

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-2xl tracking-tight text-blue-700 dark:text-blue-500">FM.</h1>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="hidden md:flex gap-6">
              <a href="#proyectos" className="hover:text-blue-600 dark:hover:text-blue-400">{labels.projects}</a>
              <a href="#habilidades" className="hover:text-blue-600 dark:hover:text-blue-400">{labels.skills}</a>
              <a href="#contacto" className="hover:text-blue-600 dark:hover:text-blue-400">{labels.contactNav}</a>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1 font-bold text-xs"
                aria-label="Toggle language"
              >
                <Globe size={18} />
                {lang.toUpperCase()}
              </button>

              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-500"/> : <Moon size={20} className="text-gray-600"/>}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Intro */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold"
            >
              {labels.available}
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {labels.greeting} <span className="text-blue-600 dark:text-blue-500">{profile.name}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              {profile.title}. {profile.bio}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#contacto" className="px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">
                {labels.contact}
              </a>
              {profile.contact.github && (
                <a href={profile.contact.github} className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                  <Github size={20}/> {labels.github}
                </a>
              )}
            </div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 translate-y-4"></div>
            <img 
              src={profile.photo} 
              alt="Franyer Marin" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl relative z-10"
            />
          </motion.div>
        </section>

        {/* --- NIVEL 1: HELIPUERTO DE ESTRELLAS (GRILLA MÓVIL) --- */}
        <section id="proyectos" className="mb-32 scroll-mt-24">
          <SectionTitle title={labels.featuredApps} />
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            {labels.featuredAppsDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
             {projects.relevant.map(p => (
               <MobileProjectCard key={p.id} project={p} labels={labels} />
             ))}
          </div>
        </section>

        {/* --- PROYECTO DESKTOP DESTACADO --- */}
        <section className="mb-24">
           <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-2">
             <Code className="text-blue-500"/> {labels.desktopTitle}
           </h3>
           
           {/* CRM FapyTech - 16:9 Layout */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 group mb-8"
           >
             {/* Project Preview: Iframe or Image Container */}
             <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 w-full overflow-hidden">
                {projects.intermediate[0].links?.deploy ? (
                  <iframe 
                    src={projects.intermediate[0].links.deploy} 
                    title={projects.intermediate[0].title}
                    className="w-[400%] h-[400%] scale-[0.25] origin-top-left md:w-full md:h-full md:scale-100 border-0 pointer-events-none transition-all duration-500 group-hover:blur-sm group-hover:scale-[0.2625] md:group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  /* Fallback if no deploy link */
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                     <span className="text-4xl font-bold text-gray-300 dark:text-gray-600 select-none">{labels.desktopFallback}</span>
                  </div>
                )}

                {/* Hover Overlay with Action Button */}
                {projects.intermediate[0].links?.deploy && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 z-10">
                   {projects.intermediate[0].links?.deploy && (
                     <a 
                       href={projects.intermediate[0].links.deploy} 
                       onClick={(e) => handleLinkClick(e, projects.intermediate[0].links?.deploy || '')}
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition transform flex items-center gap-2"
                     >
                       <ExternalLink size={20}/> {labels.openSystem}
                     </a>
                   )}

                   {projects.intermediate[0].details && (
                      <button 
                        onClick={() => setShowDesktopInfoModal(true)}
                        className="flex items-center gap-2 px-2 py-1 text-white/90 hover:text-white font-medium text-sm hover:underline transition"
                      >
                        <Info size={18}/> {labels.moreInfo}
                      </button>
                   )}
                </div>
                )}
             </div>
           </motion.div>

           {/* Content Below Preview (Outside the frame) */}
           <div className="px-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-4 md:gap-8">
                <div className="w-full">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">{projects.intermediate[0].title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg mb-6 leading-relaxed">{projects.intermediate[0].description}</p>
                  
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {(projects.intermediate[0].tech as string[]).map(t => (
                      <span key={t} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 self-start md:self-start shrink-0 mt-2 md:mt-0">
                   {projects.intermediate[0].details && (
                     <button 
                       onClick={() => setShowDesktopInfoModal(true)} 
                       className="p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-lg border border-gray-100 dark:border-gray-600"
                     >
                       <Info size={24}/>
                     </button>
                   )}
                </div>
              </div>
           </div>

        </section>

        {/* --- NIVEL 2: PROYECTOS INTERMEDIOS (Remaining) --- */}
        {projects.intermediate.length > 1 && (
          <section className="mb-20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Code className="text-blue-500"/> Más Herramientas
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.intermediate.slice(1).map(p => (
                <ProjectCard key={p.id} project={p} layout="medium" labels={labels} />
              ))}
            </div>
          </section>
        )}

        {/* --- NIVEL 3: EL LABORATORIO (PROYECTICOS) --- */}
        <section className="mb-24 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">El Laboratorio</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Experimentos, scripts y prototipos rápidos.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projects.mini.map(p => (
              <motion.div 
                key={p.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition"
              >
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-1">{p.title}</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">{p.tech}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SKILLS & ABOUT --- */}
        <section id="habilidades" className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2">
            <SectionTitle title={labels.about} />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {profile.bio} 
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">{labels.stack}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER / CONTACTO MEJORADO --- */}
      <footer id="contacto" className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{labels.talk}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              {labels.talkDesc}
            </p>

            {/* Tarjeta de Información de Contacto */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-10 flex flex-col md:flex-row justify-around items-center gap-6">
              
              {/* Ubicación */}
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.contact.location}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">Venezuela</span>
              </div>

              <div className="w-full md:w-px h-px md:h-12 bg-gray-300 dark:bg-gray-700"></div>

              {/* Teléfono */}
              <a href={profile.contact.phoneUrl} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.contact.phone}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">{labels.call}</span>
              </a>

              <div className="w-full md:w-px h-px md:h-12 bg-gray-300 dark:bg-gray-700"></div>

              {/* Correo */}
              <a href={`mailto:${profile.contact.email}`} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.contact.email}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">{labels.email}</span>
              </a>
            </div>

            {/* Botones Sociales */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {profile.contact.socials?.map((social: any) => {
                const iconMap: Record<string, LucideIcon> = {
                  Github: Github,
                  Instagram: Instagram,
                  Facebook: Facebook,
                  MessageCircle: MessageCircle
                };
                
                const Icon = iconMap[social.icon] || Github;

                return (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 ${social.color} hover:border-transparent hover:shadow-md`}
                  >
                    <Icon size={20} />
                    {social.name}
                  </a>
                );
              })}
            </div>
          </motion.div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <AnimatePresence>
        {showDesktopInfoModal && (
          <ProjectInfoModal 
            isOpen={showDesktopInfoModal} 
            onClose={() => setShowDesktopInfoModal(false)} 
            project={projects.intermediate[0]}
            labels={labels}
          />
        )}
        {showDesktopWarningModal && (
          <DesktopWarningModal 
            isOpen={showDesktopWarningModal} 
            onClose={() => setShowDesktopWarningModal(false)}
            onContinue={handleContinueToSystem}
            labels={labels}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Portfolio;
