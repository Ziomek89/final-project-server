const express = require('express');
const router = express.Router();

const Info = require('../models/Info.model');
const Personal = require('../models/Personal.model');

router.post('/infos', (req, res, next) => {

    console.log(req.body);
  
    const { title, description } = req.body;
  
    Info.create({
      title,
      description
    })
      .then(createdInfo => {
        res.json({ message: 'POST infos worked', info: createdInfo });
      })
      .catch(err => res.json(err));
  
    
  });

  router.get('/infos', (req, res, next) => {
  
    Info.find()
      .populate('personals')
      .then(foundInfoArray => {
        console.log(foundInfoArray);
        res.json({ message: 'GET infos worked', infos: foundInfoArray });
      })
      .catch(err => res.json(err));
    
  });

  router.get('/infos/:infoId', (req, res, next) => {

    const { infoId } = req.params;
  
    Info.findById(infoId)
      .populate('personals')
      .then(foundInfo => {
        res.json({ message: 'GET infos/:infoId worked ' + infoId, info: foundInfo });
      })
      .catch(err => res.json(err));
    
  });

  router.put('/infos/:infoId', (req, res, next) => {
    const { infoId } = req.params;
  
    Info.findByIdAndUpdate(infoId, req.body, { new: true })
      .then(updatedInfo => {
        console.log(updatedInfo);
        res.json({ message: 'PUT infos/:infoId worked ' + infoId, info: updatedInfo });
      })
      .catch(err => res.json(err));
  
    
  });

  router.delete('/infos/:infoId', (req, res, next) => {
    const { infoId } = req.params;
    Info.findByIdAndDelete(infoId)
      .then(deletedInfo => {
        Personal.deleteMany({ info: infoId }).then(() => {})
        res.json({ message: 'DELETE infos/:infoId worked ' + infoId, info: deletedInfo });
      })
      .catch(err => res.json(err));
    
  });
  
  module.exports = router;