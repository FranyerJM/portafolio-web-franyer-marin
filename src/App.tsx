import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Smartphone, Download, ExternalLink, Code, MapPin, Instagram, Facebook, MessageCircle, LucideIcon, Moon, Sun } from 'lucide-react';
import { profile, skills, projects } from './data';
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
const DemoModal: React.FC<{ isOpen: boolean; onClose: () => void; downloadLink?: string; deployLink?: string }> = ({ isOpen, onClose, downloadLink, deployLink }) => {
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
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Nota importante</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Este es el <strong>Demo Web</strong> de la app mobile. Es posible que algunas funcionalidades nativas no estén disponibles.
          <br/><br/>
          Si deseas la experiencia completa:
        </p>
        
        <div className="flex flex-col gap-3">
          {downloadLink && (
            <a 
              href={downloadLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Download size={20}/> Descargar App Funcional
            </a>
          )}
          
          {deployLink && (
            <a 
              href={deployLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Continuar al Demo Web
            </a>
          )}
        </div>

        <button 
          onClick={onClose}
          className="mt-6 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline"
        >
          Cancelar
        </button>
      </motion.div>
    </div>
  );
};

const MobileProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const images = project.images || [project.img || ''];

  useEffect(() => {
    if (images.length <= 1) return;
    
    // Auto-scroll images every 3.5s
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <div className="flex flex-col items-center">
        {/* Phone Frame Container */}
        <div className="relative w-full max-w-[280px] aspect-[9/19] bg-gray-900 rounded-[2.5rem] border-[8px] border-gray-800 shadow-xl overflow-hidden mb-6 group transition-transform hover:-translate-y-2 duration-300">
          
          {/* Screen Content (Carousel) */}
          <div className="absolute top-0 w-full h-full bg-gray-100 dark:bg-gray-800">
            <AnimatePresence mode='popLayout'>
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={project.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-105"
              />
            </AnimatePresence>
            
            {/* Overlay Gradient for Buttons */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between py-10 px-6">
               
               <div /> {/* Top Spacer */}

               {/* Center Actions: View Demo & GitHub */}
               <div className="flex flex-col items-center gap-4">
                 {project.links?.deploy && (
                   <button 
                     onClick={() => setShowModal(true)}
                     className="flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full font-medium hover:bg-white/30 hover:scale-105 transition transform"
                   >
                     <ExternalLink size={18}/> Ver Demo Web
                   </button>
                 )}
                 
                 {project.links?.github && (
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:text-white font-medium text-sm hover:underline transition"
                    >
                      <Github size={16}/> Ver Código en GitHub
                    </a>
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
                      <Download size={18}/> Descargar App
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
            {Array.isArray(project.tech) && (project.tech as string[]).slice(0, 3).map(t => (
              <span key={t} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs rounded-md font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <DemoModal 
            isOpen={showModal} 
            onClose={() => setShowModal(false)} 
            downloadLink={project.links?.download}
            deployLink={project.links?.deploy}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface ProjectCardProps {
  project: Project;
  layout?: 'large' | 'medium';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, layout }) => {
  const isLarge = layout === 'large';
  
  return (
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
             {project.links?.github && <a href={project.links.github} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition"><Github size={18}/> Code</a>}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <div className="flex gap-2 text-blue-600 dark:text-blue-400">
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
  );
};

// --- Main Component ---

const Portfolio: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true; // Default to dark
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-2xl tracking-tight text-blue-700 dark:text-blue-500">FM.</h1>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="hidden md:flex gap-6">
              <a href="#proyectos" className="hover:text-blue-600 dark:hover:text-blue-400">Proyectos</a>
              <a href="#habilidades" className="hover:text-blue-600 dark:hover:text-blue-400">Skills</a>
              <a href="#contacto" className="hover:text-blue-600 dark:hover:text-blue-400">Contacto</a>
            </div>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} className="text-yellow-500"/> : <Moon size={20} className="text-gray-600"/>}
            </button>
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
              Disponible para trabajar
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Hola, soy <span className="text-blue-600 dark:text-blue-500">{profile.name}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              {profile.title}. Transformo ideas complejas en interfaces móviles y web <span className="font-bold text-gray-800 dark:text-gray-100">intuitivas y potentes</span>.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#contacto" className="px-6 py-3 bg-blue-600 dark:bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition shadow-lg shadow-blue-600/20">
                Contactarme
              </a>
              {profile.contact.github && (
                <a href={profile.contact.github} className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-2">
                  <Github size={20}/> GitHub
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
          <SectionTitle title="Apps Móviles Destacadas" />
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
            Soluciones nativas y multiplataforma diseñadas para la palma de tu mano. 
            Cada pantalla es un carrusel de capturas reales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
             {projects.relevant.map(p => (
               <MobileProjectCard key={p.id} project={p} />
             ))}
          </div>
        </section>

        {/* --- PROYECTO DESKTOP DESTACADO --- */}
        <section className="mb-24">
           <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-2">
             <Code className="text-blue-500"/> Soluciones Web / Desktop
           </h3>
           
           {/* CRM FapyTech - 16:9 Layout */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video group"
           >
             {/* Background Image (Using placeholder since no real image yet) */}
             <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                {/* Normally here goes <img src={projects.intermediate[0].img} /> */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                   <span className="text-4xl font-bold text-gray-300 dark:text-gray-600 select-none">16:9 Desktop View</span>
                </div>
             </div>

             {/* Content Overlay */}
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 pt-24 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{projects.intermediate[0].title}</h3>
                    <p className="text-gray-200 max-w-2xl text-lg mb-4">{projects.intermediate[0].description}</p>
                    <div className="flex gap-3">
                      {(projects.intermediate[0].tech as string[]).map(t => (
                        <span key={t} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-sm font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                     {projects.intermediate[0].links?.github && (
                       <a href={projects.intermediate[0].links.github} className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-200 transition">
                         <Github size={24}/>
                       </a>
                     )}
                  </div>
                </div>
             </div>
           </motion.div>
        </section>

        {/* --- NIVEL 2: PROYECTOS INTERMEDIOS (Remaining) --- */}
        {projects.intermediate.length > 1 && (
          <section className="mb-20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
              <Code className="text-blue-500"/> Más Herramientas
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.intermediate.slice(1).map(p => (
                <ProjectCard key={p.id} project={p} layout="medium" />
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
            <SectionTitle title="Sobre mí" />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {profile.bio} 
              <br/><br/>
              Combinando mi formación académica con experiencia real en el campo, he desarrollado una capacidad sólida para resolver problemas complejos, desde la automatización de tareas administrativas hasta la creación de experiencias de usuario inmersivas en aplicaciones móviles.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Stack Tecnológico</h3>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hablemos de tu próximo proyecto</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
              Si tienes alguna pregunta o una idea que quieras desarrollar, no dudes en contactarme.
            </p>

            {/* Tarjeta de Información de Contacto */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-10 flex flex-col md:flex-row justify-around items-center gap-6">
              
              {/* Ubicación */}
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tocuyito, Carabobo</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">Venezuela</span>
              </div>

              <div className="w-full md:w-px h-px md:h-12 bg-gray-300 dark:bg-gray-700"></div>

              {/* Teléfono */}
              <a href={profile.contact.phoneUrl} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.contact.phone}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">Llamar ahora</span>
              </a>

              <div className="w-full md:w-px h-px md:h-12 bg-gray-300 dark:bg-gray-700"></div>

              {/* Correo */}
              <a href={`mailto:${profile.contact.email}`} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile.contact.email}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">Escribir correo</span>
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
              © 2025 {profile.name}. Hecho con React & Tailwind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
