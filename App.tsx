import emailjs from '@emailjs/browser';
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Home, User, 
  Code, Briefcase, GraduationCap, Award, Download, LayoutDashboard, ChevronRight,
  Github, Linkedin, Instagram, Mail, Phone, Send, CheckCircle2, Loader2, Cpu, Globe, ExternalLink, MapPin, Target, Stethoscope, Zap
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { PORTFOLIO_DATA } from './constants';
import { SectionId } from './types';

// Skill Bar Component with Scroll-Triggered Animation
const SkillBar: React.FC<{ name: string; percentage: number; isDark: boolean }> = ({ name, percentage, isDark }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{name}</span>
        <span className={`text-xs font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{percentage}%</span>
      </div>
      <div className={`w-full bg-gray-200 rounded-full h-1.5 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div 
          className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 h-1.5 rounded-full transition-all duration-[1000ms] ease-out shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
          style={{ width: inView ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};

// Reusable Contact Form Component
const ContactForm: React.FC<{
  isDark: boolean;
  formStatus: 'idle' | 'submitting' | 'success';
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}> = ({ isDark, formStatus, onSubmit, formData, setFormData }) => {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Your Name"
            className={`w-full px-5 py-3.5 rounded-2xl border text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-200 text-black'
            }`}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Phone</label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+91 00000 00000"
            className={`w-full px-5 py-3.5 rounded-2xl border text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-gray-50 border-gray-200 text-black'
            }`}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Email</label>
        <input
          required
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Your E-m@il id"
          className={`w-full px-5 py-3.5 rounded-2xl border text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
            isDark
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-gray-50 border-gray-200 text-black'
          }`}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Message</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Tell me about your project..."
          className={`w-full px-5 py-3.5 rounded-2xl border text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none ${
            isDark
              ? 'bg-white/5 border-white/10 text-white'
              : 'bg-gray-50 border-gray-200 text-black'
          }`}
        />
      </div>

      <button
        disabled={formStatus === 'submitting'}
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
      >
        {formStatus === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [viewMode, setViewMode] = useState<'home' | 'dashboard'>('home');
  const [activeSubSection, setActiveSubSection] = useState<SectionId | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: ''
});

  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.className = isDark ? 'bg-[#020617] text-white overflow-x-hidden' : 'bg-gray-50 text-gray-900 overflow-x-hidden';
  }, [isDark]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleDashboardClick = () => {
    setViewMode('dashboard');
    setActiveSubSection(null); 
  };

  const handleHomeClick = () => {
    setViewMode('home');
    setActiveSubSection(null);
  };

  const handleSectionSelect = (id: SectionId) => {
    setViewMode('dashboard');
    setActiveSubSection(id);
    setIsSidebarOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormStatus('submitting');

  try {
    await emailjs.send(
      'service_arvr40z',  // 👈 tumhara Service ID
      'template_nb8mnkr', // 👈 yaha apna Template ID daalna
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
      'Qn8kL4YMW_xSULqmY'   // 👈 yaha apna Public Key daalna
    );

    setFormStatus('success');

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });

  } catch (error) {
    console.error(error);
    setFormStatus('idle');
  }
};

  const dashboardItems = [
    { id: 'overview', icon: <User size={24} />, label: 'Overview', desc: 'About me & Bio' },
    { id: 'skills', icon: <Code size={24} />, label: 'Skills', desc: 'Tech & Tools' },
    { id: 'projects', icon: <LayoutDashboard size={24} />, label: 'Projects', desc: 'My Works' },
    { id: 'experience', icon: <Briefcase size={24} />, label: 'Experience', desc: 'Work History' },
    { id: 'education', icon: <GraduationCap size={24} />, label: 'Education', desc: 'Academic background' },
    { id: 'certification', icon: <Award size={24} />, label: 'Certification', desc: 'Badges & Certificates' },
  ];

  const renderSectionContent = () => {
    if (!activeSubSection) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-10 pb-20">
          {dashboardItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionSelect(item.id as SectionId)}
              className={`p-8 rounded-[2rem] border flex flex-col items-start text-left transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_30px_rgba(139,92,246,0.2)] group relative overflow-hidden ${
                isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-gray-100 hover:border-purple-300 shadow-xl'
              }`}
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-4 rounded-[1.2rem] bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-6 group-hover:rotate-6 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-2 group-hover:text-purple-400 transition-colors">{item.label}</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
            </button>
          ))}
        </div>
      );
    }

    switch (activeSubSection) {
      case 'overview':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6 space-y-8">
            <h2 className="text-4xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">About Me</h2>
            
            {/* Bio Card */}
            <div className={`p-8 md:p-10 rounded-[2.5rem] border relative overflow-hidden ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                 <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 flex-shrink-0">
  <img 
    src="/profile.jpg"
    className="w-full h-full object-cover rounded-[1.2rem]" 
    alt="Bio Avatar" 
  />
</div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-black mb-1">Hi, I'm <span className="text-purple-500">Niraj Kumar</span></h3>
                    <p className="text-blue-400 font-black tracking-widest uppercase text-xs mb-4">Full Stack Developer</p>
                    <p className={`text-base leading-relaxed font-medium whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {PORTFOLIO_DATA.aboutMe}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Highlights Grid */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Zap className="text-yellow-400" size={24} /> Projects Highlight
              </h3>
              <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Stethoscope size={32} />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-black text-red-500 mb-4">🏥 Hospital Management System</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Patient record management",
                        "Appointment scheduling",
                        "Admin dashboard",
                        "Secure authentication system",
                        "REST API integration"
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                          <span className="text-sm font-medium opacity-80">{feat}</span>
                        </div>




                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            
            {/* Projects Highlights Grid */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Zap className="text-yellow-400" size={24} /> 
              </h3>
              <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 flex-shrink-0">
                    <Stethoscope size={32} />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-black text-red-500 mb-4">Online Public Opinion & Voting Platform </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Real-time Voting & Polling",
                        "Authentication & Authorization",
                        "Admin dashboard",
                        "Scalability Ready",
                        "Database Management"
                      ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                          <span className="text-sm font-medium opacity-80">{feat}</span>
                        </div>




                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Career Objective Card */}
            <div className="space-y-4">
               <h3 className="text-2xl font-black flex items-center gap-3">
                <Target className="text-blue-500" size={24} /> Career Objective
              </h3>
              <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                <p className={`text-lg font-semibold leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  To secure a challenging Full Stack Developer role where I can apply my MERN stack skills, learn new technologies, and contribute to impactful projects.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <MapPin size={20} className="text-purple-400" />
                    <span className="text-sm font-bold">Ranchi, Jharkhand</span>
                  </div>
                   <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                    <Target size={20} className="text-blue-400" />
                    <span className="text-sm font-bold">Seeking Job Opportunity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6">
            <h2 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(PORTFOLIO_DATA.skills).map(([key, cat]) => (
                <div key={key} className={`p-6 rounded-[2rem] border transition-all hover:border-purple-500/30 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'}`}>
                  <h3 className="text-xs font-black text-blue-400 mb-6 uppercase tracking-[0.2em]">{cat.title}</h3>
                  <div className="space-y-4">
                    {cat.skills.map(s => <SkillBar key={s.name} name={s.name} percentage={s.percentage} isDark={isDark} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6">
            <h2 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">Selected Works</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {PORTFOLIO_DATA.projects.map((p, idx) => {
                let imgSeed = 200 + idx;
                if (p.title.toLowerCase().includes('hospital')) imgSeed = 111;
                if (p.title.toLowerCase().includes('shop') || p.title.toLowerCase().includes('e-commerce')) imgSeed = 222;
                if (p.title.toLowerCase().includes('chat')) imgSeed = 333;

                return (
                  <div key={idx} className={`rounded-[2rem] border overflow-hidden group transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl ${isDark ? 'bg-white/5 border-white/10 hover:shadow-purple-500/10' : 'bg-white border-gray-100 shadow-md hover:shadow-purple-200/50'}`}>
                    <div className="h-70 overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                         <div className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           View Case Study <ChevronRight size={14} />
                         </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black mb-3 group-hover:text-purple-500 transition-colors">{p.title}</h3>
                      <p className={`text-xs mb-5 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{p.description}</p>
                      
                      <div className="flex flex-col gap-6">
                        <div className="flex gap-2 flex-wrap">
                          {p.tags.map(tag => <span key={tag} className="text-[9px] font-black uppercase tracking-tighter px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/5">#{tag}</span>)}
                        </div>
                        
                        {p.link && (
                          <a 
                            href={p.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20"
                          >
                            <ExternalLink size={14} /> Live Links
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6">
            <h2 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">Work Experience</h2>
            <div className="space-y-6">
              {PORTFOLIO_DATA.experiences.map((exp, i) => (
                <div key={i} className={`p-6 rounded-[2rem] border flex flex-col sm:flex-row justify-between items-start group hover:border-purple-500/50 transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'}`}>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                    <p className="text-sm opacity-60 font-medium mb-4">{exp.company}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{exp.description}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-8 shrink-0">
                    <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20 whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6">
            <h2 className="text-4xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PORTFOLIO_DATA.educations.map((edu, i) => (
                <div key={i} className={`p-6 rounded-[2rem] border flex flex-col justify-between group hover:border-blue-500/50 transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'}`}>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="text-lg font-black mb-1 leading-tight group-hover:text-blue-400 transition-colors">{edu.degree}</h3>
                    <p className="text-xs font-medium opacity-60">{edu.institution}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    case 'certification':
  return (
    <div className="animate-in fade-in slide-in-from-right-10 duration-700 pt-6">
      
      <h2 className="text-4xl font-black mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500">
        Certifications
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {PORTFOLIO_DATA.certifications.map((cert, idx) => (
          <div
            key={idx}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition-all hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            {/* Image */}
            <div className="h-62 w-full overflow-hidden rounded-2xl mb-6">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white leading-snug">
              {cert.title}
            </h3>

            {/* Provider */}
            <p className="mt-2 text-base opacity-70">
              {cert.provider}
            </p>

            {/* Year + Duration */}
            <p className="mt-3 text-purple-400 font-semibold">
              {cert.year} • {cert.duration}
            </p>

            {/* Description */}
            <p className="mt-4 text-sm opacity-70 leading-relaxed">
              {cert.description}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
      default:
        return <div className="animate-in fade-in pt-6 text-gray-500">Section Content...</div>;
    }
  };

  const isDashboardMode = viewMode === 'dashboard';

  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-[#020617] text-white' : 'bg-gray-50 text-gray-900'} font-['Inter'] transition-colors duration-700`}>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 blur-[180px] rounded-full transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 blur-[180px] rounded-full transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 inset-x-0 z-[100] h-20 border-b flex items-center justify-between px-6 md:px-12 backdrop-blur-2xl transition-all duration-500 ${isDark ? 'bg-black/40 border-white/5' : 'bg-white/70 border-gray-200'}`}>
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleHomeClick}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-all duration-500">
            N
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg tracking-tighter">NIRAJ <span className="text-purple-500">KUMAR</span></span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Full Stack Web Developer </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <button onClick={handleHomeClick} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all hover:text-purple-500 ${!isDashboardMode ? 'text-purple-500' : 'opacity-40 hover:opacity-100'}`}>
            <Home size={14} /> Home
          </button>
          <button onClick={handleDashboardClick} className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all hover:text-purple-500 ${isDashboardMode ? 'text-purple-500' : 'opacity-40 hover:opacity-100'}`}>
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button 
            onClick={() => {
              if (isDashboardMode) handleHomeClick();
              setTimeout(() => {
                const contactSection = document.getElementById('contact-section');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }} 
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-all hover:text-purple-500"
          >
            <Mail size={14} /> Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`p-3 rounded-xl border transition-all duration-500 hover:scale-110 ${isDark ? 'border-white/5 bg-white/5 text-yellow-400' : 'border-gray-200 bg-gray-100 text-blue-600'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-3 rounded-xl border border-white/5"><Menu size={18} /></button>
        </div>
      </nav>

      <main className={`flex-1 pt-20 relative overflow-hidden flex flex-col md:flex-row`}>
        {!isDashboardMode ? (
          /* HOME SCREEN */
          <div className="w-full h-full overflow-y-auto custom-scrollbar scroll-smooth">
            <div className="min-h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 py-10 gap-10 md:gap-16 animate-in fade-in duration-1000">
              
              {/* Left Column: Avatar & Main Intro */}
              <div className="w-full md:w-5/12 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative group mb-6">
                  <div className="absolute inset-[-15px] bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-[40px] opacity-20 group-hover:opacity-50 transition-all duration-1000 animate-pulse" />
                  <div className="relative z-10 w-40 h-40 md:w-60 md:h-60 rounded-full p-2 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 shadow-xl hover:rotate-2 transition-transform duration-700">
                    <img src="/profile.jpg"
                    className="w-full h-full object-cover rounded-[7.2rem]" 
                    alt="Bio Avatar" 
  
                    />
                  </div>
                </div>

                {/* Name on One Line */}
                <h1 className="font-black tracking-tighter leading-tight text-3xl md:text-5xl lg:text-6xl mb-3 whitespace-nowrap">
                  {PORTFOLIO_DATA.name.split(' ')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-600 to-indigo-600">{PORTFOLIO_DATA.name.split(' ')[1]}</span>
                </h1>
                
                <p className="font-black tracking-[0.3em] uppercase text-blue-400 text-[10px] md:text-xs mb-1">
                  {PORTFOLIO_DATA.role}
                </p>
                <p className="font-bold opacity-40 text-[10px] md:text-xs mb-8">
                  {PORTFOLIO_DATA.subRole}
                </p>

                <div className="flex gap-4">
                  <button 
                    onClick={handleDashboardClick}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-black rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-500 uppercase tracking-widest text-[9px]"
                  >
                    Dashboard
                  </button>
                  <a 
  href="/cv.pdf"
  download
  className={`px-8 py-3 flex items-center justify-center gap-2 border-[2px] rounded-full font-black transition-all hover:bg-white/10 active:scale-95 uppercase tracking-widest text-[9px] ${isDark ? 'border-white/10' : 'border-gray-300'}`}
>
  <Download size={14} /> Download CV
</a>
                </div>
              </div>

              {/* Right Column: Cards & Socials */}
              <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left gap-6">
                {/* Card 1 */}
                <div className={`p-6 md:p-8 rounded-[2.5rem] border w-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'}`}>
                  <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-3 justify-center md:justify-start">
                    <Cpu className="text-purple-500" size={24} />
                    Architecting Scalable Apps
                  </h2>
                  <p className={`text-sm md:text-base leading-relaxed mb-6 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Experienced in building modern web ecosystems using MERN. I focus on high availability, performant code, and elegant UI architectures.
                  </p>
                  
                  {/* Social Icons */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    {[
                      { Icon: Github, color: 'hover:bg-[#333]', link: PORTFOLIO_DATA.contact.socials.github },
                      { Icon: Linkedin, color: 'hover:bg-[#0077b5]', link: PORTFOLIO_DATA.contact.socials.linkedin },
                      { Icon: Instagram, color: 'hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', link: PORTFOLIO_DATA.contact.socials.instagram },
                      { Icon: Mail, color: 'hover:bg-purple-600', link: `mailto:${PORTFOLIO_DATA.contact.email}` }
                    ].map(({ Icon, color, link }, idx) => (
                      <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 hover:text-white hover:scale-110 ${color}`}>
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Card 2 (New card for Web Development) */}
                <div className={`p-6 md:p-8 rounded-[2.5rem] border w-full animate-in slide-in-from-right-8 duration-700 delay-150 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-lg'}`}>
                  <h2 className="text-xl md:text-2xl font-black mb-4 flex items-center gap-3 justify-center md:justify-start">
                    <Globe className="text-blue-500" size={24} />
                    End-to-End Development
                  </h2>
                  <p className={`text-sm md:text-base leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    From crafting responsive, pixel-perfect interfaces to optimizing robust backend APIs, I bridge the gap between design and technology to deliver complete digital products.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mt-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Available for Hire
                    </div>
                    
                    {/* Contact Me Button */}
                    <button 
                      onClick={() => {
                        const contactSection = document.getElementById('contact-section');
                        contactSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 px-6 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-[9px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-lg"
                    >
                      <Mail size={12} /> Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Contact Section */}
            <section id="contact-section" className="px-6 md:px-20 lg:px-32 py-24 border-t border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full" />
               <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/5 blur-[120px] rounded-full" />
               
               <div className="max-w-6xl mx-auto relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="animate-in slide-in-from-left-8 duration-1000">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Connect</span></h2>
                        <p className={`text-lg mb-12 leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                           Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and creative ideas.
                        </p>
                        
                        <div className="space-y-8">
                           <div className="flex items-center gap-6 group">
                              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                                 <Mail size={28} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Email Me</p>
                                 <p className="font-black text-lg">{PORTFOLIO_DATA.contact.email}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 group">
                              <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/10 group-hover:scale-110 transition-transform duration-500">
                                 <Phone size={28} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Call Me</p>
                                 <p className="font-black text-lg">{PORTFOLIO_DATA.contact.phone}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 group">
                              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 border border-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                                 <MapPin size={28} />
                              </div>
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Location</p>
                                 <p className="font-black text-lg">{PORTFOLIO_DATA.contact.location}</p>
                              </div>
                           </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                           <button 
                             onClick={() => setIsContactModalOpen(true)}
                             className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                           >
                             Open Quick Modal
                           </button>
                        </div>
                     </div>
                     
                     <div className={`p-8 md:p-12 rounded-[3rem] border animate-in slide-in-from-right-8 duration-1000 ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                        {formStatus === 'success' ? (
                           <div className="py-16 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
                              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-8">
                                 <CheckCircle2 size={56} />
                              </div>
                              <h3 className="text-3xl font-black mb-3">Message Sent!</h3>
                              <p className="text-lg opacity-60">Thank you, I will contact you soon.</p>
                              <button onClick={() => setFormStatus('idle')} className="mt-10 text-purple-500 font-black uppercase tracking-widest text-[10px] hover:underline">Send another message</button>
                           </div>
                        ) : (
                           <ContactForm
  isDark={theme === 'dark'}
  formStatus={formStatus}
  onSubmit={handleContactSubmit}
  formData={formData}
  setFormData={setFormData}
/>
                        )}
                     </div>
                  </div>
               </div>

               <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
                  <p className="text-[10px] font-black uppercase tracking-widest">© 2026 Niraj Kumar. All rights reserved.</p>
                  <div className="flex gap-8">
                    <a href={PORTFOLIO_DATA.contact.socials.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest hover:text-purple-500 transition-colors">Github</a>
                    <a href={PORTFOLIO_DATA.contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest hover:text-purple-500 transition-colors">Linkedin</a>
                    <a href={PORTFOLIO_DATA.contact.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest hover:text-purple-500 transition-colors">Instagram</a>
                  </div>
               </footer>
            </section>
          </div>
        ) : (
          /* DASHBOARD MODE */
          <>
            <div className="w-full lg:w-[400px] shrink-0 sticky top-0 h-full p-6 transition-all duration-1000">
              <div className={`relative w-full h-full rounded-[2.5rem] flex flex-col items-center justify-center p-8 glass-morphism border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white/90 border-gray-100 shadow-xl'}`}>
                <div className="relative group scale-75 mb-6">
                  <div className="absolute inset-[-10px] bg-gradient-to-tr from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-[30px] opacity-20 animate-pulse" />
                  <div className="relative z-10 w-40 h-40 rounded-full p-1.5 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 shadow-xl">
                    <img src="/profile.jpg" className="w-full h-full object-cover rounded-full" alt="Avatar" /> 
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="font-black tracking-tighter text-3xl leading-none mb-2">
                    {PORTFOLIO_DATA.name.split(' ')[0]} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-600 to-indigo-600">{PORTFOLIO_DATA.name.split(' ')[1]}</span>
                  </h1>
                  <p className="font-black tracking-[0.2em] uppercase text-blue-400 text-[8px] mb-6">
                    {PORTFOLIO_DATA.role}
                  </p>
                  <button onClick={handleHomeClick} className="w-full py-3 rounded-xl bg-white/5 text-gray-400 font-black border border-white/5 hover:bg-white/10 text-[9px] uppercase tracking-widest transition-all">
                    Back to Home
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 h-full p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar">
              <div className="max-w-5xl mx-auto">
                {activeSubSection && (
                  <div className="flex items-center gap-2 mb-10 pb-4 border-b border-white/5 overflow-x-auto no-scrollbar scroll-smooth">
                    {dashboardItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSectionSelect(item.id as SectionId)}
                        className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                          activeSubSection === item.id 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <button onClick={() => setActiveSubSection(null)} className="ml-auto px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-white/5 text-gray-500 border border-white/5">
                      Grid View
                    </button>
                  </div>
                )}
                {renderSectionContent()}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Contact Me Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setIsContactModalOpen(false)}>
          <div 
            className={`w-full max-w-xl p-8 md:p-10 rounded-[2.5rem] border shadow-2xl animate-in zoom-in-95 duration-300 relative ${isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-200'}`}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors">
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight mb-2">Get In <span className="text-purple-500">Touch</span></h2>
              <p className="text-sm opacity-60">Fill out the form below and I'll get back to you within 24 hours.</p>
            </div>

            {formStatus === 'success' ? (
              <div className="py-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                <p className="opacity-60">Thank you, I will contact you soon.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-purple-500 font-black uppercase tracking-widest text-[10px] hover:underline">Send another message</button>
              </div>
            ) : (
              <ContactForm
  isDark={theme === 'dark'}
  formStatus={formStatus}
  onSubmit={handleContactSubmit}
  formData={formData}
  setFormData={setFormData}
/>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center border-t border-white/5 pt-8 opacity-40">
               <div className="flex items-center gap-2 text-[10px] font-bold">
                 <Phone size={14} className="text-purple-500" /> {PORTFOLIO_DATA.contact.phone}
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold">
                 <Mail size={14} className="text-purple-500" /> {PORTFOLIO_DATA.contact.email}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex justify-end" onClick={() => setIsSidebarOpen(false)}>
           <div className={`w-3/4 h-full p-8 shadow-2xl animate-in slide-in-from-right duration-500 ${isDark ? 'bg-[#020617]' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-black tracking-tighter">NAVIGATE</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-white/5 rounded-xl"><X size={18} /></button>
              </div>
              <div className="space-y-4">
                <button onClick={handleHomeClick} className="w-full flex items-center gap-3 p-6 rounded-[1.5rem] bg-white/5 font-black uppercase tracking-widest text-[9px] border border-white/5"><Home size={16} /> Home</button>
                <button onClick={handleDashboardClick} className="w-full flex items-center gap-3 p-6 rounded-[1.5rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 font-black uppercase tracking-widest text-[9px] border border-purple-500/20"><LayoutDashboard size={16} /> Dashboard</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
