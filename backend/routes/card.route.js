const express = require('express');
const app = express();
const cardRoute = express.Router();

let Card = require('../models/Card');

cardRoute.route('/addCard').post((req, res, next) => {
  Card.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

cardRoute.route('/getallCard').get((req, res) => {
  Card.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

cardRoute.route('/getCard/:id').get((req, res) => {
  Card.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

cardRoute.route('/updateCard/:id').put((req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

cardRoute.route('/deleteCard/:_id').delete((req, res, next) => {
  Card.findOneAndDelete({_id: req.params._id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = cardRoute;
