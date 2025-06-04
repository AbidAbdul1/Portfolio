
import { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState(new Set());
  const skillRefs = useRef([]);

  const skills = [
    { name: 'Python', category: 'Programming', level: 95, color: 'from-yellow-400 to-yellow-600', icon: '🐍' },
    { name: 'JavaScript', category: 'Programming', level: 90, color: 'from-yellow-300 to-yellow-500', icon: '⚡' },
    { name: 'Dart', category: 'Programming', level: 85, color: 'from-blue-400 to-blue-600', icon: '🎯' },
    { name: 'Flutter', category: 'Mobile', level: 88, color: 'from-blue-400 to-cyan-500', icon: '📱' },
    { name: 'HTML/CSS', category: 'Web', level: 92, color: 'from-orange-400 to-red-500', icon: '🌐' },
    { name: 'Flask', category: 'Web', level: 87, color: 'from-gray-600 to-gray-800', icon: '🔥' },
    { name: 'MySQL', category: 'Database', level: 85, color: 'from-blue-600 to-blue-800', icon: '🗄️' },
    { name: 'Firebase', category: 'Tools', level: 83, color: 'from-yellow-500 to-orange-600', icon: '🔥' },
    { name: 'Git', category: 'Tools', level: 90, color: 'from-red-500 to-red-700', icon: '📝' },
    { name: 'OpenAI API', category: 'AI', level: 92, color: 'from-green-400 to-green-600', icon: '🤖' },
    { name: 'REST APIs', category: 'AI', level: 88, color: 'from-purple-400 to-purple-600', icon: '🔗' },
  ];

  const categories = ['Programming', 'Mobile', 'Web', 'Database', 'Tools', 'AI'];

  useEffect(() => {
    const observers = skillRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleSkills(prev => new Set([...prev, index]));
            }, index * 100);
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Technical Arsenal
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Crafting innovative solutions with cutting-edge technologies
        </p>
        
        {/* Interactive skill grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, categoryIndex) => (
            <div 
              key={category} 
              className="group relative"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105">
                <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                  <span className="text-2xl">
                    {category === 'Programming' && '💻'}
                    {category === 'Mobile' && '📱'}
                    {category === 'Web' && '🌐'}
                    {category === 'Database' && '🗄️'}
                    {category === 'Tools' && '🛠️'}
                    {category === 'AI' && '🤖'}
                  </span>
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => {
                      const skillIndex = skills.indexOf(skill);
                      const isVisible = visibleSkills.has(skillIndex);
                      
                      return (
                        <div
                          key={skill.name}
                          ref={el => skillRefs.current[skillIndex] = el}
                          className="group/skill relative overflow-hidden"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium flex items-center gap-2">
                              <span className="text-lg">{skill.icon}</span>
                              {skill.name}
                            </span>
                            <span className="text-cyan-400 text-sm font-bold">
                              {isVisible ? skill.level : 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative`}
                              style={{ 
                                width: isVisible ? `${skill.level}%` : '0%',
                                transitionDelay: `${index * 100}ms`
                              }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Floating tech constellation */}
        <div className="relative h-40 overflow-hidden rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex animate-scroll space-x-16">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl flex flex-col items-center justify-center border border-gray-600 hover:border-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25">
                    <span className="text-2xl mb-1">{skill.icon}</span>
                    <span className="text-xs font-bold text-white text-center px-1">
                      {skill.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
