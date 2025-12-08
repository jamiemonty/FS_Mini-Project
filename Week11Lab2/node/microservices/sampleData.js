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
  recommended: Boolean,
  shopUrl: String
}, { collection: 'gear' });

let mountainSchema = new Schema({
  mountainName: String,
  tripLength: String,
  location: String,
  mountainLocation: String,
  image: String,
  rating: Number,
  description: String,
  difficulty: String,
  elevation: String,
  bestSeason: String
}, { collection: 'mountains' });

let userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  accountId: String,
  location: String,
  role: { type: String, default: 'user' }
}, { collection: 'users' });

let trails = oldMong.model('trails', trailSchema);
let maps = oldMong.model('maps', mapSchema);
let camping = oldMong.model('camping', campingSchema);
let gear = oldMong.model('gear', gearSchema);
let mountains = oldMong.model('mountains', mountainSchema);
let users = oldMong.model('users', userSchema);

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
  { itemName: 'Hiking Boots', category: 'Footwear', description: 'Waterproof trekking boots', price: '$150', recommended: true, shopUrl: 'https://www.rei.com/c/mens-hiking-boots' },
  { itemName: 'Backpack 60L', category: 'Bags', description: 'Large capacity hiking backpack', price: '$200', recommended: true, shopUrl: 'https://www.rei.com/c/backpacking-packs' },
  { itemName: 'Sleeping Bag', category: 'Camping', description: '-10°C rated sleeping bag', price: '$120', recommended: true, shopUrl: 'https://www.rei.com/c/sleeping-bags' },
  { itemName: 'Trekking Poles', category: 'Equipment', description: 'Adjustable aluminum poles', price: '$60', recommended: true, shopUrl: 'https://www.rei.com/c/trekking-poles' },
  { itemName: 'Water Filter', category: 'Equipment', description: 'Portable water purification', price: '$40', recommended: false, shopUrl: 'https://www.rei.com/c/water-filters-and-purifiers' },
  { itemName: 'Headlamp', category: 'Lighting', description: 'LED rechargeable headlamp', price: '$35', recommended: true, shopUrl: 'https://www.rei.com/c/headlamps' }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@trek.com',
    password: 'admin123',
    accountId: 'ADM001',
    location: 'Headquarters',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    accountId: 'USR001',
    location: 'New York',
    role: 'user'
  }
];

const sampleMountains = [
  {
    mountainName: 'Mount Everest',
    tripLength: '12-14 days',
    location: 'Nepal',
    mountainLocation: 'Himalayas, Mahalangur Range',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200',
    rating: 5,
    description: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The summit sits at 8,848.86 meters, attracting experienced mountaineers from around the world. The climb is extremely challenging, requiring extensive preparation, acclimatization, and technical climbing skills.',
    difficulty: 'Expert',
    elevation: '8,848.86m (29,032ft)',
    bestSeason: 'April-May, September-October'
  },
  {
    mountainName: 'K2',
    tripLength: '60-75 days',
    location: 'Pakistan/China',
    mountainLocation: 'Karakoram Range',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200',
    rating: 5,
    description: 'K2, also known as Mount Godwin-Austen or Chhogori, is the second highest mountain in the world at 8,611 meters. It is considered more technically difficult to climb than Everest, with a fatality rate of about 25%. The mountain is known for its steep faces and unpredictable weather conditions.',
    difficulty: 'Expert',
    elevation: '8,611m (28,251ft)',
    bestSeason: 'June-August'
  },
  {
    mountainName: 'Kilimanjaro',
    tripLength: '5-9 days',
    location: 'Tanzania',
    mountainLocation: 'Eastern Rift Mountains',
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200',
    rating: 4,
    description: 'Mount Kilimanjaro is Africa\'s highest peak and the world\'s tallest free-standing mountain. Unlike many high peaks, it doesn\'t require technical climbing skills, making it accessible to fit hikers. The trek passes through five distinct climate zones, from tropical rainforest to arctic summit.',
    difficulty: 'Moderate',
    elevation: '5,895m (19,341ft)',
    bestSeason: 'January-March, June-October'
  },
  {
    mountainName: 'Mont Blanc',
    tripLength: '2-3 days',
    location: 'France/Italy',
    mountainLocation: 'Graian Alps',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
    rating: 4,
    description: 'Mont Blanc is the highest mountain in the Alps and Western Europe, standing at 4,808 meters. The most popular route is via the Goûter Route, which requires good physical fitness and basic mountaineering skills. The mountain offers stunning views of the surrounding Alpine peaks.',
    difficulty: 'Hard',
    elevation: '4,808m (15,774ft)',
    bestSeason: 'June-September'
  },
  {
    mountainName: 'Matterhorn',
    tripLength: '2-3 days',
    location: 'Switzerland/Italy',
    mountainLocation: 'Pennine Alps',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200',
    rating: 5,
    description: 'The Matterhorn is one of the most iconic and photographed mountains in the world, known for its distinctive pyramid shape. At 4,478 meters, it presents a serious mountaineering challenge with exposed rock climbing and steep snow slopes. The Hörnli Ridge is the most common route.',
    difficulty: 'Expert',
    elevation: '4,478m (14,692ft)',
    bestSeason: 'July-September'
  },
  {
    mountainName: 'Denali',
    tripLength: '17-21 days',
    location: 'Alaska, USA',
    mountainLocation: 'Alaska Range',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    rating: 5,
    description: 'Denali, formerly known as Mount McKinley, is North America\'s highest peak at 6,190 meters. The extreme cold, severe weather, and high altitude make it one of the most challenging climbs in the world. The West Buttress route is the most popular, requiring glacier travel and cold-weather camping skills.',
    difficulty: 'Expert',
    elevation: '6,190m (20,310ft)',
    bestSeason: 'May-July'
  }
];

async function insertData() {
  try {
    // Clear existing data
    await users.deleteMany({});
    console.log('Existing users cleared');
    
    await users.insertMany(sampleUsers);
    console.log('Users inserted');
    
    await trails.insertMany(sampleTrails);
    console.log('Trails inserted');
    
    await maps.insertMany(sampleMaps);
    console.log('Maps inserted');
    
    await camping.insertMany(sampleCamping);
    console.log('Camping sites inserted');
    
    await gear.insertMany(sampleGear);
    console.log('Gear inserted');
    
    await mountains.insertMany(sampleMountains);
    console.log('Mountains inserted');
    
    console.log('All sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
}

insertData();
