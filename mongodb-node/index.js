const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((db) => {

  console.log('Connected correctly to server');

  dboper.insertDocument(db, {name: 'Chris', description: 'dishes'}, 'dishes')
    .then((result) => {
      console.log("Insert Document:\n", result.ops);

      return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
      console.log('Found Document: \n', docs);

      return dboper.updateDocument(db, {name: 'Chris'}, {description: 'Updated Test'}, 'dishes');
    })
    .then((result) => {
      console.log('Updated Document:\n', result.result);
      return dboper.findDocuments(db, 'dishes');
    })
    .then((docs) => {
      console.log('Found Updated Documents: \n', docs);

      return db.dropCollection('dishes');
    })
    .then((result)=> {
      console.log("Dropped Collection: ", result);

      return db.close();
    })
    .catch((err) => {
      console.log(err);
    });
}, (err) => { console.log(err) })
.catch((err) => console.log(err));