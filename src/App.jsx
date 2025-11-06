import { Mail, MessageCircleCode, MessageCircleMore, Moon, Phone, PhoneCall, Sun } from "lucide-react"; // ✅ icons for toggle
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, ExternalLink, Instagram, Linkedin, MessageCircle, X, Upload, LogOut, ArrowLeft } from 'lucide-react';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [loginFor, setLoginFor] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState({
    editor: false,
    developer: false
  });
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = () => {
    if (credentials.username === 'Adxl' && credentials.password === 'Adxl@portfoli10') {
      setIsAuthenticated({ ...isAuthenticated, [loginFor]: true });
      setShowLogin(false);
      setCredentials({ username: '', password: '' });
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = (portfolio) => {
    setIsAuthenticated({ ...isAuthenticated, [portfolio]: false });
  };

  // ---------------- Landing Page ----------------
  const LandingPage = () => (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30 fixed"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight text-gray-900 mb-4">
          Adxl
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light mb-16 tracking-wide">
          Editor & Engineer · Turning ideas into visuals & code
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <button
            onClick={() => setCurrentPage('editor')}
            className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <img 
                src="logo/ed.png" 
                alt="Editor Icon" 
                className="w-16 h-16 mx-auto mb-6 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <h3 className="text-3xl font-light text-gray-900 mb-2">The Editor</h3>
              <p className="text-gray-600 font-light">Visual Alchemy & Story Architecture</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage('developer')}
            className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <img  
                src="logo/dev.png" 
                alt="Developer Icon" 
                className="w-16 h-16 mx-auto mb-6 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <h3 className="text-3xl font-light text-gray-900 mb-2">The Developer</h3>
              <p className="text-gray-600 font-light">Engineering Elegance & Scalable Systems</p>
            </div>
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );

  // ---------------- Editor Portfolio ----------------
  // inside your main component (Portfolio) replace EditorPortfolio with this
const EditorPortfolio = () => {
  const projects = [
    { id: 1, title: 'Viral Edit - 2M+ views [2025]', type: 'Davinci Resolve', video: 'videos/1.mp4', poster: 'videos/posters/1.jpg' },
    //{ id: 2, title: 'Motion Graphics', type: 'Video Edit', video: '/videos/motion-graphics.mp4', poster: '/videos/posters/motion-graphics.jpg' },
    { id: 3, title: 'Lyrical Video', type: 'Davinci Resolve', video: 'videos/3.mp4', poster: 'videos/posters/3.jpg' },
    //{ id: 5, title: 'Typography Design', type: 'Video Edit', video: '/videos/typography.mp4', poster: '/videos/posters/typography.jpg' },
    { id: 6, title: 'Typography Edit [2021]', type: 'Alight Motion', video: 'videos/6.mp4', poster: 'videos/posters/6.jpg' }
  ];

  // stable refs storage keyed by project id
  const videoRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);

  // play on hover (muted). Skip pause if fullscreen active.
  const handleMouseEnter = (id) => {
    const v = videoRefs.current[id];
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(err => {
      // autoplay may be blocked on some browsers -> harmless if blocked
      console.debug('hover play blocked or failed', id, err);
    });
  };

  const handleMouseLeave = (id) => {
    const v = videoRefs.current[id];
    if (!v) return;
    // don't pause if user is in fullscreen (so fullscreen playback isn't interrupted)
    if (document.fullscreenElement) return;
    v.pause();
  };

  // click / touch handler: unmute, show controls, request fullscreen, then play
  const handleVideoClick = (id) => {
    const v = videoRefs.current[id];
    if (!v) {
      console.warn('video ref missing for', id);
      return;
    }

    v.muted = false;            // unmute for fullscreen play
    v.controls = true;          // show controls in fullscreen
    // request fullscreen with prefixes where needed
    const request = v.requestFullscreen || v.webkitRequestFullscreen || v.msRequestFullscreen;
    if (request) {
      try {
        request.call(v);
      } catch (err) {
        console.warn('requestFullscreen failed', err);
      }
    } else {
      console.warn('Fullscreen API not available in this browser');
    }

    v.play().then(() => {
      // success
      setPlayingId(id);
    }).catch((err) => {
      console.error('play() failed after click', err);
    });
  };

  // hide overlay when playing, show when paused
  const onPlay = (id) => setPlayingId(id);
  const onPause = (id) => setPlayingId(prev => (prev === id ? null : prev));

  return (
    <div className="min-h-screen w-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
            <div className="w-12 h-12 rounded-full bg-white-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src="logo/logo.png" alt="Adxl" className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer group" onClick={() => setCurrentPage('developer')}>
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="logo/ed.png" alt="Editor Icon" className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
          {isAuthenticated.editor && (
            <button onClick={() => handleLogout('editor')} className="text-gray-400 hover:text-gray-900 transition-colors">
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <div className="h-12 md:h-16"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6">The Editor: Rhythm & Motion</h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-light mb-3 md:mb-4">
            I sculpt moments in time. From raw footage to a final visual journey,<br />
            I craft narratives that resonate and ignite engagement.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${(project.id - 1) * 75}ms` }}
              >
                <div
                  className="relative aspect-video bg-gray-100"
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={() => handleMouseLeave(project.id)}
                >
                  <video
                    ref={(el) => (videoRefs.current[project.id] = el)}
                    className="w-full h-full object-cover cursor-pointer"
                    preload="metadata"
                    playsInline
                    // poster is optional but gives a thumbnail before load
                    poster={project.poster || undefined}
                    onClick={() => handleVideoClick(project.id)}
                    onTouchStart={() => handleVideoClick(project.id)} // mobile friendly
                    onPlay={() => onPlay(project.id)}
                    onPause={() => onPause(project.id)}
                    onError={(e) => console.error('Video error', project.id, e)}
                  >
                    <source src={project.video} type="video/mp4" />
                    {/* fallback */}
                    Your browser does not support HTML5 video.
                  </video>

                  {/* Play overlay (hidden while playing) */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                      playingId === project.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <div className="pointer-events-auto">
                      <button
                        onClick={() => handleVideoClick(project.id)}
                        className="bg-black/40 hover:bg-black/50 rounded-full p-4 md:p-6 text-white"
                        aria-label={`Play ${project.title}`}
                      >
                        {/* simple play icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{project.type}</span>
                  <h3 className="text-lg md:text-xl font-light text-gray-900 mt-2">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      // ---------------- About Me Section ----------------
  <section className="px-6 md:px-12 py-10 bg-gray-50">
    <div className="max-w-4xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">About Me</h2>
      
      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6">
        I’m <span className="font-medium">Adxl</span> — a Computer Science Engineering student and a passionate video editor. 
        My journey started in <span className="font-medium">2019</span>, casually editing clips on <span className="font-medium">InShot</span> just for fun. 
        That spark soon became a fire — I leveled up with <span className="font-medium">Kinemaster</span>, mastered <span className="font-medium">Alight Motion</span>, 
        and today I shape stories using <span className="font-medium">DaVinci Resolve</span> and <span className="font-medium">CapCut</span>.
      </p>
      
      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6">
        Along the way, I became the <span className="font-medium">official editor for IEEE Education Society Kerala Chapter</span> 
        and a <span className="font-medium">lead editor in the Media Club at College of Engineering Munnar</span>.
      </p>
      
      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-6">
        My proudest moment? Winning <span className="font-medium">1st prize</span> in my college’s Valentine’s Day Reel Competition, 
        where my work crossed <span className="font-medium">2M+ views</span> overall and hit <span className="font-medium">250K+ views</span> on Instagram.
      </p>
      
      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
        But editing is just part of my passion — I love to <span className="font-medium">shoot cinematic visuals </span> 
        and I’m on the journey to becoming a <span className="font-medium">filmmaker</span>. 
        To me, every frame is a chance to tell a story that lingers long after the screen goes dark.
      </p>
    </div>
  </section>

<div className="h-12 md:h-16 "></div>

      {/* contact/footer section unchanged */}
      <section className="px-4 md:px-6 pb-16 md:pb-20 ">
        <div className="max-w-2xl mx-auto text-center">
          
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 md:mb-8">Let's Talk Visuals</h2>
          <p className="text-base md:text-lg text-gray-600 font-light mb-10 md:mb-12 px-4">
            Have a story that needs to be seen? Send a message about your project—a campaign, a short film, or content that demands attention. Let's make it unforgettable
          </p>
          <div className="flex gap-4 md:gap-6 justify-center">
            <a href="https://www.instagram.com/aadxlzjr" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/adhil-pa" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://api.whatsapp.com/send?phone=918157804822" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="mailto:adhil.pa@ieee.org" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};


  // ---------------- Developer Portfolio (unchanged) ----------------
  const DeveloperPortfolio = () => {
    const projects = [
      {
        id: 1,
        title: 'Aeonikra Technologies',
        description: 'Just a small business website for IPR project',
        tech: ['HTML5', 'JavaScript', 'CSS3'],
        github: 'https://github.com/adxlpa/Aeonikra',
        demo: 'https://adxlpa.github.io/Aeonikra/index.html'
      },
      {
        id: 2,
        title: 'Badalink',
        description: 'The official anti-URL shortener',
        tech: ['Node.js', 'Express.js', 'Vanilla JavaScrip', 'CSS3'],
        github: 'https://github.com/adxlpa/node-url-lengthener',
        demo: 'https://badalink.onrender.com/'
      },
      /*{
        id: 3,
        title: 'AI Content Generator',
        description: 'ML-powered tool for generating creative content and marketing copy',
        tech: ['Python', 'FastAPI', 'TensorFlow', 'React'],
        github: '#',
        demo: '#'
      },
      {
        id: 4,
        title: 'Portfolio CMS',
        description: 'Headless CMS for managing portfolio content with custom API',
        tech: ['Strapi', 'GraphQL', 'React', 'AWS'],
        github: '#',
        demo: '#'
      },
      {
        id: 5,
        title: 'Weather Dashboard',
        description: 'Real-time weather tracking with interactive maps and forecasts',
        tech: ['Vue.js', 'Mapbox', 'API Integration', 'Charts'],
        github: '#',
        demo: '#'
      },
      {
        id: 6,
        title: 'Social Media Analytics',
        description: 'Data visualization platform for tracking social media metrics',
        tech: ['React', 'D3.js', 'Express', 'Redis'],
        github: '#',
        demo: '#'
      }*/
    ];

    return (
      <div className="min-h-screen w-screen bg-white">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
            <div className="w-12 h-12 rounded-full bg-white-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src="logo/logo.png" alt="Adxl" className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
            <div className="flex flex-col items-center cursor-pointer group" onClick={() => setCurrentPage('editor')}>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="logo/dev.png" alt="Developer Icon" className="w-12 h-12 object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
            {isAuthenticated.developer && (
              <button onClick={() => handleLogout('developer')} className="text-gray-400 hover:text-gray-900 transition-colors">
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            )}
          </div>
        </nav>

        <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-32 md:pt-40 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto text-center animate-fade-in">
            <div className="h-12 md:h-16"></div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6">The Engineer: Logic & Structure</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-light mb-3 md:mb-4">
              A curious CSE student turning ideas into code
            </p>
            <p className="text-base md:text-lg text-gray-500 font-light max-w-3xl mx-auto mb-12 md:mb-16 px-4">
              A 2nd year CSE student who loves coding and learning through small projects
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16">
              {projects.map((project, index) => (
                <div key={project.id} className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left">
                  <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-2 md:mb-3">{project.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 font-light mb-4 md:mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm text-gray-600">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <Github className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-light">GitHub</span>
                    </a>
                    <a href={project.demo} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs md:text-sm font-light">Live Demo</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      // ---------------- About Me Section ----------------
  <section className="px-6 md:px-12 py-10 bg-gray-50">
    <div className="max-w-4xl mx-auto text-center animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">About Me</h2>
      
      <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
      I’m a <span className="font-medium">2nd year Computer Science Engineering student </span> 
      who loves to code and bring ideas to life. I may not have built anything big yet, 
      but I’m steadily learning by creating <span className="font-medium">small projects </span> 
      that sharpen my skills and fuel my passion for development. 
      For me, every line of code is a step toward becoming a better engineer.
    </p>
    </div>
  </section>
<div className="h-12 md:h-16"></div>
        <section className="px-4 md:px-6 pb-16 md:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 md:mb-8">Collaborate on Code</h2>
          <p className="text-base md:text-lg text-gray-600 font-light mb-10 md:mb-12 px-4">
            I’m always excited to connect with fellow developers, learners, or anyone interested in coding.  
      Whether it’s collaborating on small projects, sharing ideas, or just talking tech — let’s connect and grow together
          </p>
          <div className="flex gap-4 md:gap-6 justify-center">
            <a href="https://github.com/adxlpa" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://www.instagram.com/aadxlzjr" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://www.linkedin.com/in/adhil-pa" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="https://api.whatsapp.com/send?phone=918157804822" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
            <a href="mailto:adhil.pa@ieee.org" target="_blank" rel="noopener noreferrer" className="group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </section>
      </div>
    );
  };

  // ---------------- Main Render ----------------
  return (
    <div className="font-sans antialiased bg-white">
      <style>{`
        html, body { background-color: white !important; overflow-x: hidden; margin: 0; padding: 0; }
        #root { background-color: white; }
        * { -webkit-tap-highlight-color: transparent; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
      `}</style>

      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'editor' && <EditorPortfolio />}
      {currentPage === 'developer' && <DeveloperPortfolio />}
      {showLogin && <LoginModal />}
    </div>
  );
}
