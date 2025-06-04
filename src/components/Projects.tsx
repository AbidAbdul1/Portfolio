
import { useState } from 'react';
import { Github, ArrowRight, X, ExternalLink } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'AI Email Automation System',
      shortDesc: 'Intelligent Gmail automation using NLP',
      fullDesc: 'Advanced email automation system that reads and responds to Gmail messages using Natural Language Processing and OpenAI API. Features intelligent categorization, auto-responses, and sentiment analysis.',
      tech: ['Python', 'OpenAI API', 'Gmail API', 'NLP'],
      category: 'AI',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      title: 'AI Learning Platform for Students',
      shortDesc: 'Interactive tutoring with visual and voice features',
      fullDesc: 'Comprehensive learning platform offering subject tutoring in Physics, Chemistry, and Mathematics with visual aids, voice interactions, and personalized learning paths.',
      tech: ['Python', 'Flask', 'OpenAI', 'Speech Recognition'],
      category: 'AI',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'AI Agricultural Advisor',
      shortDesc: 'Crop diagnosis with multilingual support',
      fullDesc: 'Smart agricultural solution providing crop and disease diagnosis from images, multilingual support, weather-based advice, and farming recommendations using computer vision.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Weather API'],
      category: 'AI',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 4,
      title: 'SQL Injection Demonstrator',
      shortDesc: 'Educational cybersecurity platform',
      fullDesc: 'Educational platform designed to demonstrate SQL injection vulnerabilities by simulating safe vs unsafe SQL inputs, helping developers understand security best practices.',
      tech: ['Python', 'Flask', 'MySQL', 'SQLite'],
      category: 'Cybersecurity',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 5,
      title: 'Voice Assistant for Bus Stand',
      shortDesc: 'Telugu language speech-enabled assistant',
      fullDesc: 'Local language voice assistant specifically designed for bus stand inquiries in Telugu, providing real-time bus schedules, route information, and travel assistance.',
      tech: ['Python', 'Speech Recognition', 'Text-to-Speech', 'API'],
      category: 'AI',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 6,
      title: 'Department File Manager',
      shortDesc: 'Secure Google Drive-like system',
      fullDesc: 'Secure document management system similar to Google Drive, specifically designed for college departments to manage and share academic documents with role-based access control.',
      tech: ['Python', 'Flask', 'MySQL', 'Firebase'],
      category: 'Web',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-24 h-24 bg-cyan-500/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-purple-500/5 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Innovative solutions that merge AI, Web Development, and Cybersecurity
          </p>
          <a
            href="https://www.linkedin.com/in/abid-abdul-cse/details/projects/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <ExternalLink size={20} />
            View All Projects on LinkedIn
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className={`w-full h-32 bg-gradient-to-r ${project.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                <span className="text-white font-bold text-lg relative z-10">{project.category}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-4 line-clamp-2">
                {project.shortDesc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-cyan-400 text-sm font-medium">
                View Details <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className={`w-full h-40 bg-gradient-to-r ${selectedProject.color} rounded-lg mb-6 flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{selectedProject.category}</span>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.fullDesc}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Github size={20} />
                    View Code
                  </button>
                  <a
                    href="https://www.linkedin.com/in/abid-abdul-cse/details/projects/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    <ExternalLink size={20} />
                    LinkedIn Projects
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
