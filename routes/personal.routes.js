const express = require('express');
const router = express.Router();

const Personal = require('../models/Personal.model');
const Info = require('../models/Info.model');

router.post('/personals', (req, res, next) => {

    const { title, description, infoId } = req.body;
  
    let newPersonal;
  
    Personal.create({
      title,
      description,
      info: infoId
    })
      .then(createdPersonal => {
        console.log(createdPersonal);
        newPersonal = createdPersonal;
        return Info.findByIdAndUpdate(infoId, {
          $push: { personals: createdPersonal._id }
        }, {
          new: true
        });
      })
      .then(updatedInfo => {
        console.log(updatedInfo);
        res.json({ message: 'POST personals worked', personal: newPersonal, info: updatedInfo });
      })
      .catch(err => res.json(err));
  
    
  });
  
  module.exports = router;