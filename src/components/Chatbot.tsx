
import { useState } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Abdul's AI assistant. Ask me about his skills, projects, or experience!"
    }
  ]);
  const [input, setInput] = useState('');

  const responses = {
    "who is abdul abid": "Abdul Abid is an AI enthusiast, Web Developer, and Cybersecurity Expert with a B.Tech in Computer Science Engineering from Seshadri Rao Gudlavalleru Engineering College, Andhra Pradesh.",
    "what are his skills": "Abdul's top skills include Python, JavaScript, Dart, Flutter, HTML/CSS, Flask, MySQL, Firebase, Git, OpenAI API, and REST APIs. He specializes in AI, web development, and cybersecurity.",
    "list his projects": "Abdul has worked on several impressive projects: AI Email Automation System, AI Learning Platform for Students, AI Agricultural Advisor, SQL Injection Demonstrator, Voice Assistant for Bus Stand (Telugu), and Department File Manager.",
    "how to contact": "You can reach Abdul at abid45981@gmail.com, connect on LinkedIn (abdul-abid-cse), or check out his GitHub (AbidAbdul1). There's also a contact form on this website!",
    "education": "Abdul holds a B.Tech in Computer Science Engineering from Seshadri Rao Gudlavalleru Engineering College in Andhra Pradesh, India.",
    "ai projects": "Abdul has created several AI projects including an Email Automation System using NLP and OpenAI API, an AI Learning Platform for students, an Agricultural Advisor with image recognition, and a Telugu Voice Assistant for bus inquiries."
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const lowercaseInput = input.toLowerCase();
    
    let botResponse = "I'm not sure about that. You can ask me about Abdul's skills, projects, education, or how to contact him!";
    
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseInput.includes(key)) {
        botResponse = value;
        break;
      }
    }

    setMessages(prev => [...prev, userMessage, { type: 'bot', text: botResponse }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-t-xl">
            <h3 className="text-white font-semibold">Chat with Abdul's AI</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {message.text}
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Abdul..."
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-500 text-sm"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
