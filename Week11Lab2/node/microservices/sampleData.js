// Run this file once to insert sample data: node sampleData.js

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

let trailSchema = new Schema({
  name: String,
  difficulty: String,
  distance: String,
  elevation: String,
  location: String,
  description: String
}, { collection: 'trails' });

let mapSchema = new Schema({
  trailName: String,
  mapUrl: String,
  coordinates: String,
  region: String
}, { collection: 'maps' });

let campingSchema = new Schema({
  siteName: String,
  location: String,
  capacity: String,
  amenities: String,
  price: String
}, { collection: 'camping' });

let gearSchema = new Schema({
  itemName: String,
  category: String,
  description: String,
  price: String,
  recommended: Boolean
}, { collection: 'gear' });

let trails = oldMong.model('trails', trailSchema);
let maps = oldMong.model('maps', mapSchema);
let camping = oldMong.model('camping', campingSchema);
let gear = oldMong.model('gear', gearSchema);

const sampleTrails = [
  { name: 'Everest Base Camp', difficulty: 'Hard', distance: '130 km', elevation: '5,364 m', location: 'Nepal', description: 'Trek to the base of the world\'s highest mountain' },
  { name: 'Inca Trail', difficulty: 'Moderate', distance: '43 km', elevation: '4,215 m', location: 'Peru', description: 'Ancient path to Machu Picchu' },
  { name: 'Tour du Mont Blanc', difficulty: 'Moderate', distance: '170 km', elevation: '2,665 m', location: 'France/Italy/Switzerland', description: 'Circle the Mont Blanc massif' },
  { name: 'Kilimanjaro', difficulty: 'Hard', distance: '62 km', elevation: '5,895 m', location: 'Tanzania', description: 'Summit Africa\'s highest peak' }
];

const sampleMaps = [
  { trailName: 'Everest Base Camp', mapUrl: 'https://maps.example.com/ebc', coordinates: '27.9881° N, 86.9250° E', region: 'Himalayas' },
  { trailName: 'Inca Trail', mapUrl: 'https://maps.example.com/inca', coordinates: '13.1631° S, 72.5450° W', region: 'Andes' },
  { trailName: 'Tour du Mont Blanc', mapUrl: 'https://maps.example.com/tmb', coordinates: '45.8326° N, 6.8652° E', region: 'Alps' }
];

const sampleCamping = [
  { siteName: 'Namche Bazaar Camp', location: 'Nepal', capacity: '50 people', amenities: 'Toilets, Water, Shelter', price: '$15/night' },
  { siteName: 'Aguas Calientes Camp', location: 'Peru', capacity: '30 people', amenities: 'Hot Springs, Restaurant', price: '$20/night' },
  { siteName: 'Chamonix Base Camp', location: 'France', capacity: '40 people', amenities: 'Showers, WiFi, Store', price: '$25/night' },
  { siteName: 'Barafu Camp', location: 'Tanzania', capacity: '60 people', amenities: 'Medical Station, Guides', price: '$18/night' }
];

const sampleGear = [
  { itemName: 'Hiking Boots', category: 'Footwear', description: 'Waterproof trekking boots', price: '$150', recommended: true },
  { itemName: 'Backpack 60L', category: 'Bags', description: 'Large capacity hiking backpack', price: '$200', recommended: true },
  { itemName: 'Sleeping Bag', category: 'Camping', description: '-10°C rated sleeping bag', price: '$120', recommended: true },
  { itemName: 'Trekking Poles', category: 'Equipment', description: 'Adjustable aluminum poles', price: '$60', recommended: true },
  { itemName: 'Water Filter', category: 'Equipment', description: 'Portable water purification', price: '$40', recommended: false },
  { itemName: 'Headlamp', category: 'Lighting', description: 'LED rechargeable headlamp', price: '$35', recommended: true }
];

async function insertData() {
  try {
    await trails.insertMany(sampleTrails);
    console.log('Trails inserted');
    
    await maps.insertMany(sampleMaps);
    console.log('Maps inserted');
    
    await camping.insertMany(sampleCamping);
    console.log('Camping sites inserted');
    
    await gear.insertMany(sampleGear);
    console.log('Gear inserted');
    
    console.log('All sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
}

insertData();
