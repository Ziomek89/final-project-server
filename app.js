require('dotenv/config')

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const { isAuthenticated } = require('./middleware/middleware');

mongoose.connect(process.env.MONGODB_URI)
  .then(connectObject => {
    console.log(`connected to db ${connectObject.connections[0].name}`);
  })
  .catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));

app.use(cors({
    origin: [
        process.env.FRONTEND_URI
    ]
  }))
  
  app.use(express.json());

  const infoRoutes = require('./routes/info.routes');

  app.use('/api', isAuthenticated, infoRoutes);

  const personalRoutes = require('./routes/personal.routes');

  app.use('/api', isAuthenticated, personalRoutes);

  const authRoutes = require('./routes/auth.routes');

  app.use('/auth', authRoutes);

app.listen('3001', () => {
    console.log('hey we are listening on port 3001')
  });