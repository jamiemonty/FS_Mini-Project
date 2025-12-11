let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');

// Schema definitions
let userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  accountId: String,
  location: String,
  role: { type: String, default: 'user' }
}, { collection: 'users' });

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

let reviewSchema = new Schema({
  mountainId: String,
  mountainName: String,
  userName: String,
  userEmail: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
}, { collection: 'reviews' });

// Models
let users = oldMong.model('users', userSchema);
let mountains = oldMong.model('mountains', mountainSchema);
let trails = oldMong.model('trails', trailSchema);
let maps = oldMong.model('maps', mapSchema);
let camping = oldMong.model('camping', campingSchema);
let gear = oldMong.model('gear', gearSchema);
let reviews = oldMong.model('reviews', reviewSchema);

// Sample data
const sampleTrails = [
  { name: 'Wicklow Way', difficulty: 'Moderate', distance: '127km', elevation: '600m', location: 'Wicklow, Ireland', description: 'Ireland\'s oldest waymarked trail through the Garden of Ireland' },
  { name: 'Dingle Way', difficulty: 'Easy', distance: '179km', elevation: '400m', location: 'Kerry, Ireland', description: 'Circular route around the Dingle Peninsula with stunning coastal views' },
  { name: 'Beara Way', difficulty: 'Moderate', distance: '196km', elevation: '500m', location: 'Cork/Kerry, Ireland', description: 'Remote peninsula walk with dramatic mountain and sea views' }
];

const sampleMaps = [
  { trailName: 'Wicklow Way', mapUrl: 'https://www.wicklowway.com/map', coordinates: '53.0781, -6.4034', region: 'Leinster' },
  { trailName: 'Dingle Way', mapUrl: 'https://www.dingleway.com/map', coordinates: '52.1412, -10.2681', region: 'Munster' },
  { trailName: 'Beara Way', mapUrl: 'https://www.bearaway.com/map', coordinates: '51.7520, -9.9320', region: 'Munster' }
];

const sampleCamping = [
  { siteName: 'Glenveagh National Park', location: 'Donegal', capacity: '50 tents', amenities: 'Toilets, Water, Fire pits', price: '€15/night' },
  { siteName: 'Killarney National Park', location: 'Kerry', capacity: '100 tents', amenities: 'Toilets, Showers, Shop', price: '€20/night' },
  { siteName: 'Wicklow Mountains', location: 'Wicklow', capacity: '30 tents', amenities: 'Basic facilities', price: '€12/night' }
];

const sampleGear = [
  { itemName: 'Hiking Boots', category: 'Footwear', description: 'Waterproof trekking boots', price: '€140', recommended: true, shopUrl: 'https://www.decathlon.ie/search/?query=trekking+boots' },
  { itemName: 'Backpack 60L', category: 'Bags', description: 'Large capacity hiking backpack', price: '€185', recommended: true, shopUrl: 'https://www.decathlon.ie/search/?query=Hiking+backpack' },
  { itemName: 'Sleeping Bag', category: 'Camping', description: '-10°C rated sleeping bag', price: '€110', recommended: true, shopUrl: 'https://www.decathlon.ie/search/?query=sleeping+bags' },
  { itemName: 'Trekking Poles', category: 'Equipment', description: 'Adjustable aluminum poles', price: '€55', recommended: true, shopUrl: 'https://www.decathlon.ie/search/?query=Trekking+poles' },
  { itemName: 'Water Filter', category: 'Equipment', description: 'Portable water purification', price: '€37', recommended: false, shopUrl: 'https://www.decathlon.ie/search/?query=water+filter' },
  { itemName: 'Headlamp', category: 'Lighting', description: 'LED rechargeable headlamp', price: '€32', recommended: true, shopUrl: 'https://www.decathlon.ie/search/?query=Headlamp' }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@trek.com',
    password: 'admin123',
    accountId: 'ADM001',
    location: 'Dublin, Ireland',
    role: 'admin'
  },
  {
    name: 'Seán Murphy',
    email: 'sean@example.com',
    password: 'user123',
    accountId: 'USR001',
    location: 'Galway, Ireland',
    role: 'user'
  }
];

const reviewTemplates = [
  { mountainName: 'Mount Everest', userName: 'Seán Murphy', userEmail: 'sean@example.com', rating: 5, comment: 'Incredible experience! The views are breathtaking and the challenge is worth every step.', date: new Date('2024-01-15') },
  { mountainName: 'Mount Everest', userName: 'Aoife O\'Connor', userEmail: 'aoife@example.com', rating: 5, comment: 'Life-changing adventure. Proper preparation is essential!', date: new Date('2024-02-20') },
  { mountainName: 'K2', userName: 'Liam Kelly', userEmail: 'liam@example.com', rating: 5, comment: 'The ultimate mountaineering challenge. Extremely technical and demanding.', date: new Date('2024-02-10') },
  { mountainName: 'Kilimanjaro', userName: 'Niamh Byrne', userEmail: 'niamh@example.com', rating: 4, comment: 'Amazing trek through different climate zones. Great for beginners to high altitude.', date: new Date('2024-03-10') },
  { mountainName: 'Kilimanjaro', userName: 'Ciara Walsh', userEmail: 'ciara@example.com', rating: 5, comment: 'Unforgettable journey to the roof of Africa!', date: new Date('2024-01-20') },
  { mountainName: 'Mont Blanc', userName: 'Oisín Ryan', userEmail: 'oisin@example.com', rating: 4, comment: 'Beautiful Alpine scenery. The Goûter Route is challenging but manageable.', date: new Date('2024-01-25') },
  { mountainName: 'Mont Blanc', userName: 'Saoirse Doyle', userEmail: 'saoirse@example.com', rating: 5, comment: 'Classic Alpine climb with stunning views of three countries.', date: new Date('2024-03-05') },
  { mountainName: 'Matterhorn', userName: 'Conor McCarthy', userEmail: 'conor@example.com', rating: 5, comment: 'Iconic pyramid shape and thrilling climb. Technical skills required!', date: new Date('2024-02-15') },
  { mountainName: 'Denali', userName: 'Fiona Brennan', userEmail: 'fiona@example.com', rating: 5, comment: 'Extreme cold and altitude. One of the toughest climbs in North America.', date: new Date('2024-01-30') }
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
    description: 'Mount Kilimanjaro is Africa\'s highest peak and the world\'s tallest free-standing mountain. Unlike many high peaks, it doesn\'t require technical climbing skills, making it accessible to fit hikers. The trek passes through five distinct climate zones, from tropical rainforest to arctic summit. Brian OShea once climbed this mountain',
    difficulty: 'Extreme',
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
    await users.deleteMany({});
    await trails.deleteMany({});
    await maps.deleteMany({});
    await camping.deleteMany({});
    await gear.deleteMany({});
    await mountains.deleteMany({});
    await reviews.deleteMany({});
    console.log('All existing data cleared');
    
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
    
    const insertedMountains = await mountains.insertMany(sampleMountains);
    console.log('Mountains inserted');
    
    // Create reviews with actual mountain IDs
    const sampleReviews = [];
    for (const template of reviewTemplates) {
      const mountain = insertedMountains.find(m => m.mountainName === template.mountainName);
      if (mountain) {
        sampleReviews.push({
          mountainId: mountain._id.toString(),
          mountainName: template.mountainName,
          userName: template.userName,
          userEmail: template.userEmail,
          rating: template.rating,
          comment: template.comment,
          date: template.date
        });
      }
    }
    
    await reviews.insertMany(sampleReviews);
    console.log('Reviews inserted');
    
    console.log('All sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
}

insertData();
