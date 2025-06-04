
const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-cyan-400">Background</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                I'm Abdul Abid, passionate about building innovative solutions that merge Artificial Intelligence, 
                Cybersecurity, and Web/Mobile Development. Skilled in Python, JavaScript, Flutter, and MySQL, 
                I specialize in solving real-world problems through intelligent applications.
              </p>
            </div>
            
            <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-400">Education</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white font-semibold text-xl">B.Tech in Computer Science Engineering</p>
                <p className="text-cyan-400 font-medium">Seshadri Rao Gudlavalleru Engineering College</p>
                <p className="text-gray-400">Andhra Pradesh, India</p>
              </div>
            </div>

            <div className="group bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30 hover:border-pink-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-pink-400">Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                To leverage cutting-edge AI technologies and secure development practices to create 
                impactful solutions that address real-world challenges and drive innovation in the digital landscape.
              </p>
            </div>
          </div>
          
          {/* Right side - Stats and Visual */}
          <div className="space-y-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Expertise Areas</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cyan-400 font-semibold">Artificial Intelligence</span>
                    <span className="text-gray-300">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-semibold">Web Development</span>
                    <span className="text-gray-300">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-pink-400 font-semibold">Cybersecurity</span>
                    <span className="text-gray-300">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 h-3 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-semibold">Mobile Development</span>
                    <span className="text-gray-300">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-purple-500/30 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
                <div className="text-gray-300 text-sm">Years Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
