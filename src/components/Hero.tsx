
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const texts = ['AI Enthusiast', 'Web Developer', 'Cybersecurity Expert'];

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentPhrase = texts[currentIndex];
      
      if (currentText.length < currentPhrase.length) {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
      } else {
        setTimeout(() => {
          setCurrentText('');
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentText, currentIndex, texts]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,119,198,0.2),transparent_50%)]"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50 delay-500"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Interactive Profile image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative group">
              {/* Glowing ring effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Image container with cursor following */}
              <div 
                ref={imageRef}
                className="relative w-80 h-80 lg:w-96 lg:h-96 transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <img 
                  src="/lovable-uploads/99708e8a-5b0a-41c3-b552-7bcf5f796e03.png"
                  alt="Abdul Abid - Professional Photo"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dynamic overlay that responds to cursor */}
                <div 
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at ${50 + mousePosition.x * 0.1}% ${50 + mousePosition.y * 0.1}%, rgba(0,255,255,0.1) 0%, transparent 70%)`
                  }}
                ></div>
                
                {/* Tech stack floating badges with enhanced animation */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  AI
                </div>
                <div className="absolute bottom-8 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce delay-300">
                  Web Dev
                </div>
                <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce delay-700">
                  Security
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-cyan-400 text-lg font-medium tracking-wider uppercase">Hello, I'm</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Abdul
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Abid
                </span>
              </h1>
              
              <div className="text-2xl lg:text-3xl text-gray-300 font-light h-12 flex items-center justify-center lg:justify-start">
                <span className="inline-block min-w-0">
                  {currentText}
                  <span className="animate-pulse text-cyan-400">|</span>
                </span>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Passionate about building innovative solutions that merge Artificial Intelligence, 
              Cybersecurity, and Web Development. Turning complex problems into intelligent applications.
            </p>
            
            <div className="flex justify-center lg:justify-start space-x-6">
              <a 
                href="https://github.com/AbidAbdul1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <Github size={24} className="text-white group-hover:text-cyan-400 transition-colors" />
              </a>
              <a 
                href="https://linkedin.com/in/abdul-abid-cse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin size={24} className="text-white group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="mailto:abid45981@gmail.com"
                className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              >
                <Mail size={24} className="text-white group-hover:text-pink-400 transition-colors" />
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://drive.google.com/file/d/1A9VKuqoF-6jUyVFbvOgHL_UjgCxr0_p0/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abid-abdul-cse/details/projects/"
                target="_blank"
                rel="noopener noreferrer"
                className="group border-2 border-cyan-500/50 text-cyan-400 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown size={32} className="text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
