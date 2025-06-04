import { useState } from 'react';
import { Mail, Linkedin, Github, Send, MessageCircle, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Create WhatsApp message
    const whatsappMessage = `Hi Abdul! I'm ${formData.name} (${formData.email}). ${formData.message}`;
    const whatsappUrl = `https://wa.me/+919959474245?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    alert('Redirecting to WhatsApp! You can also find me on LinkedIn or email.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectContact = (platform) => {
    const message = "Hi Abdul! I'm interested in connecting with you.";
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/+919959474245?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'linkedin':
        window.open('https://linkedin.com/in/abdul-abid-cse', '_blank');
        break;
      case 'email':
        window.open(`mailto:abid45981@gmail.com?subject=Let's Connect&body=${encodeURIComponent(message)}`, '_blank');
        break;
    }
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you want to discuss AI, cybersecurity, or just say hello, 
                feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleDirectContact('whatsapp')}
                className="w-full flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">WhatsApp</div>
                  <div className="text-gray-400">Message me directly</div>
                </div>
              </button>
              
              <button
                onClick={() => handleDirectContact('email')}
                className="w-full flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full group-hover:scale-110 transition-transform">
                  <Mail size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-gray-400">abid45981@gmail.com</div>
                </div>
              </button>
              
              <button
                onClick={() => handleDirectContact('linkedin')}
                className="w-full flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:scale-110 transition-transform">
                  <Linkedin size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">LinkedIn</div>
                  <div className="text-gray-400">abdul-abid-cse</div>
                </div>
              </button>
              
              <a
                href="https://github.com/AbidAbdul1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-gray-400/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full group-hover:scale-110 transition-transform">
                  <Github size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">GitHub</div>
                  <div className="text-gray-400">AbidAbdul1</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
