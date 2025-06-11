import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCertificate, FaUpload, FaLock, FaTimes, FaSpinner, FaChevronLeft, FaChevronRight, FaPlus, FaTrash } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  short_description?: string;
}

const Certifications: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    imageFile: null as File | null,
    shortDescription: '',
  });

  const [showDeleteAuth, setShowDeleteAuth] = useState(false);
  const [deleteAuthCode, setDeleteAuthCode] = useState('');
  const [deleteAuthError, setDeleteAuthError] = useState('');
  const [certificateToDeleteId, setCertificateToDeleteId] = useState<number | null>(null);

  // Fetch certificates from server
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/certificates');
      const data = await response.json();
      if (data.success) {
        setCertificates(data.certificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && certificates.length > 0) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, certificates.length, currentIndex]);

  useEffect(() => {
    if (currentIndex >= certificates.length && certificates.length > 0) {
      setCurrentIndex(certificates.length - 1);
    } else if (certificates.length === 0) {
      setCurrentIndex(0);
    }
  }, [certificates, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode === '6005') {
      setShowAuth(false);
      setShowUploadModal(true);
      setAuthError('');
      setAuthCode('');
    } else {
      setAuthError('Invalid code. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        imageFile: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingUpload(true);

    try {
      let imageBase64 = '';
      if (formData.imageFile) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(formData.imageFile as Blob);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      }

      const response = await fetch('http://localhost:5000/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          issuer: formData.issuer,
          date: formData.date,
          image: imageBase64,
          short_description: formData.shortDescription
        })
      });

      const data = await response.json();
      if (data.success) {
        await fetchCertificates(); // Refresh certificates after adding
        setFormData({
          title: '',
          issuer: '',
          date: '',
          imageFile: null,
          shortDescription: '',
        });
        setShowUploadModal(false);
      }
    } catch (error) {
      console.error('Error uploading certificate:', error);
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleRemoveCertificate = (id: number) => {
    setCertificateToDeleteId(id);
    setShowDeleteAuth(true);
  };

  const handleDeleteAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteAuthCode === '6005') {
      if (certificateToDeleteId) {
        try {
          const response = await fetch(`http://localhost:5000/api/certificates/${certificateToDeleteId}`, {
            method: 'DELETE'
          });
          const data = await response.json();
          if (data.success) {
            await fetchCertificates(); // Refresh certificates after deleting
            setCertificateToDeleteId(null);
            setShowDeleteAuth(false);
            setDeleteAuthError('');
            setDeleteAuthCode('');
          }
        } catch (error) {
          console.error('Error deleting certificate:', error);
        }
      }
    } else {
      setDeleteAuthError('Invalid code. Please try again.');
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400">Professional achievements and qualifications</p>
        </div>

        {certificates.length > 0 ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl relative w-full max-w-xl mx-auto h-[450px]"
              >
                <img
                  src={certificates[currentIndex].image}
                  alt={certificates[currentIndex].title}
                  className="w-full h-full object-contain absolute inset-0"
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow-lg">
                    {certificates[currentIndex].title}
                  </h3>
                  <p className="text-gray-300 mb-2 text-shadow-md">
                    {certificates[currentIndex].issuer}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 text-shadow-md">
                    {certificates[currentIndex].date}
                  </p>
                  
                  {certificates[currentIndex].short_description && (
                    <div className="mt-4 max-h-24 overflow-y-auto custom-scrollbar">
                      <p className="text-gray-300 text-sm text-shadow-md">
                        {certificates[currentIndex].short_description}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveCertificate(certificates[currentIndex].id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors z-20"
                >
                  <FaTrash className="w-6 h-6" />
                </button>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-slate-700 transition-colors z-20"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm p-2 rounded-full text-white hover:bg-slate-700 transition-colors z-20"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center mt-4 gap-2">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No certificates added yet. Click the upload button to add your first certificate.
          </div>
        )}

        {/* Add Certificate Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAuth(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 transition duration-300 ease-in-out"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add Certificate</span>
          </button>
        </div>

        {/* Authorization Modal for Add Certificate */}
        {showAuth && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full relative border border-purple-700">
              <button
                onClick={() => setShowAuth(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-4">Authorization Required</h3>
              <p className="text-gray-300 mb-6">Please enter the 4-digit code to add a certificate.</p>
              <input
                type="password"
                maxLength={4}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.slice(0, 4))}
              />
              <button
                onClick={handleAuthSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              >
                <FaLock className="w-5 h-5 mr-2" />
                Submit
              </button>
              {authError && (
                <p className="text-red-400 text-sm mt-2 text-center">{authError}</p>
              )}
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full relative border border-purple-700">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-4">Upload New Certificate</h3>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Certificate Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="issuer" className="block text-sm font-medium text-gray-300">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    id="issuer"
                    value={formData.issuer}
                    onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                    className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-gray-300">
                    Certificate Image
                  </label>
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300">
                    Short Description (optional)
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    className="mt-1 block w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.imageFile || isProcessingUpload}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingUpload ? 'Uploading...' : 'Upload Certificate'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Authorization Modal for Delete Certificate */}
        {showDeleteAuth && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full relative border border-purple-700">
              <button
                onClick={() => setShowDeleteAuth(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <FaTimes className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">Please enter the 4-digit code to delete this certificate.</p>
              <input
                type="password"
                maxLength={4}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                value={deleteAuthCode}
                onChange={(e) => setDeleteAuthCode(e.target.value.slice(0, 4))}
              />
              <button
                onClick={handleDeleteAuthSubmit}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              >
                <FaLock className="w-5 h-5 mr-2" />
                Delete
              </button>
              {deleteAuthError && (
                <p className="text-red-400 text-sm mt-2 text-center">{deleteAuthError}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Certifications; 