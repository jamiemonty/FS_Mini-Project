let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

let mountainSchema = new Schema({
  mountainName: String,
  tripLength: String,
  location: String,
  mountainLocation: String,
  image: String,
  rating: Number
}, { collection: 'mountains' });

let mountains = oldMong.model('mountains', mountainSchema);

async function testInsert() {
  try {
    const testMountain = {
      mountainName: "Mount Everest",
      tripLength: "60 days",
      location: "Nepal",
      mountainLocation: "Himalayas",
      image: "https://example.com/everest.jpg",
      rating: 5
    };
    
    console.log('Inserting test mountain:', testMountain);
    const result = await mountains.create(testMountain);
    console.log('Success! Mountain inserted:', result);
    
    const allMountains = await mountains.find().lean();
    console.log('All mountains in DB:', allMountains);
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

testInsert();
