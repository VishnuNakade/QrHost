require('dotenv').config()
const express = require('express');
const os = require('os');
const cors = require('cors');
const app = express();
const port=process.env.PORT || 4000;

app.use(cors());

// Function to get the local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
}

app.get('/api/get-ip', (req, res) => {
  const ip = getLocalIP();
  res.json({ ip });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
