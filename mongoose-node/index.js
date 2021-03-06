const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {
  useMongoClient: true
});

connect.then((db) => {
  console.log('Connect correctly to server');


  Dishes.create({
    name: 'Chris',
    description: 'test',
  })
  .then((dish) => {
    console.log(dish);

    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {description: 'Updated test'},
    }, {
      new: true
    })
    .exec();
  })
  .then((dish) => {
    console.log(dish);

    dish.comments.push({
      rating: 5,
      comment: 'I\'m getting a sinking feeling',
      author: 'Chris'
    });

    return dish.save();
  })
  .then((dish) => {
    console.log(dish)

    return db.collection('dishes').drop();
  })
  .then(() => {
    return db.close();
  })
  .catch((err) => {
    console.log(err);
  });
});