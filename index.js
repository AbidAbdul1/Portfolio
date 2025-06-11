const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Create necessary directories
const CERTIFICATES_FILE = path.join(__dirname, 'certificates.json');
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Create directories if they don't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Initialize certificates file if it doesn't exist
if (!fs.existsSync(CERTIFICATES_FILE)) {
  fs.writeFileSync(CERTIFICATES_FILE, JSON.stringify([]));
}

// Helper function to read certificates
function readCertificates() {
  const data = fs.readFileSync(CERTIFICATES_FILE, 'utf8');
  return JSON.parse(data);
}

// Helper function to write certificates
function writeCertificates(certificates) {
  fs.writeFileSync(CERTIFICATES_FILE, JSON.stringify(certificates, null, 2));
}

// Routes
app.post('/api/certificates', (req, res) => {
  try {
    const { title, issuer, date, image, short_description } = req.body;
    
    if (!title || !issuer || !date || !image) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Save image to file
    const imageData = image.split(';base64,').pop();
    const imageBuffer = Buffer.from(imageData, 'base64');
    const imageFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;
    const imagePath = path.join(IMAGES_DIR, imageFileName);
    fs.writeFileSync(imagePath, imageBuffer);

    const certificates = readCertificates();
    const newCertificate = {
      id: certificates.length + 1,
      title,
      issuer,
      date,
      image: `/images/${imageFileName}`,
      short_description,
      created_at: new Date().toISOString()
    };
    
    certificates.push(newCertificate);
    writeCertificates(certificates);
    
    res.status(201).json({
      success: true,
      message: 'Certificate added successfully',
      certificate: newCertificate
    });
  } catch (error) {
    console.error('Error adding certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding certificate',
      error: error.message
    });
  }
});

app.get('/api/certificates', (req, res) => {
  try {
    const certificates = readCertificates();
    res.json({
      success: true,
      certificates: certificates.sort((a, b) => new Date(b.date) - new Date(a.date))
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates',
      error: error.message
    });
  }
});

app.delete('/api/certificates/:id', (req, res) => {
  try {
    const { id } = req.params;
    const certificates = readCertificates();
    const index = certificates.findIndex(cert => cert.id === parseInt(id));
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Delete the image file
    const imagePath = path.join(__dirname, 'public', certificates[index].image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    certificates.splice(index, 1);
    writeCertificates(certificates);
    
    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting certificate',
      error: error.message
    });
  }
});

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 