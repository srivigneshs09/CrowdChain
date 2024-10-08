const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();
const PORT = 5000;

// Use middleware
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
  }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/CrowdChain', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  sub: String, // Auth0 user ID
});

const User = mongoose.model('Users', userSchema);

// API to store user
app.post('/api/storeUser', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body for debugging
    const { name, email, picture, sub } = req.body.user;
  
    try {
      let user = await User.findOne({ sub });
      if (!user) {
        user = new User({ name, email, picture, sub });
        await user.save();
        console.log('New user created:', user);
      } else {
        console.log('User already exists:', user);
      }
  
      res.status(200).json({ message: 'User stored successfully' });
    } catch (error) {
      console.error('Error storing user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
