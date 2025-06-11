import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Certificate {
  id: number;
  image: string;
}

const certifications: Certificate[] = [
  { id: 1, image: "/certifications/1.png" },
  { id: 2, image: "/certifications/2.png" },
  { id: 3, image: "/certifications/3.png" },
  { id: 4, image: "/certifications/4.png" },
  { id: 5, image: "/certifications/5.png" },
  { id: 6, image: "/certifications/6.png" },
  { id: 7, image: "/certifications/7.png" },
  { id: 8, image: "/certifications/8.png" }
];

const Certifications: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Certifications</h2>
        </div>

        <div className="relative w-full overflow-hidden pt-[75%] md:pt-[56.25%] lg:pt-[45%] rounded-lg shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img
                src={certifications[currentIndex].image}
                alt={`Certificate ${currentIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {certifications.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Certifications; 