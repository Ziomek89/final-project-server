const mongoose = require('mongoose');

const Info = require('./models/Info.model');
const Personal = require('./models/Personal.model');
const User = require('./models/User.model');


mongoose.connect('mongodb://localhost:27017/projectRatePc')
  .then(connectObject => {

    console.log(`connected to db ${connectObject.connections[0].name}`);

    return Info.create({
      title: 'First Test Project',
      description: 'Hey it worked'
    });
      


  })
  .then(createdInfo => {
    console.log(createdInfo);

    return Personal.create({
      title: 'Test a task',
      description: 'heyyyyy',
      info: createdInfo._id
    });

    
  })
  .then(createdPersonal => {
    console.log(createdPersonal);

    return User.create({
      email: 'Adam@gmail.com',  
      username: 'Adam',
      password: 'password'
    });
  })
  .then(createdUser => {
    console.log(createdUser);

    return mongoose.connection.close()
  })
  .then(() => console.log('connection successfully closed'))
  .catch(err => console.log(err));