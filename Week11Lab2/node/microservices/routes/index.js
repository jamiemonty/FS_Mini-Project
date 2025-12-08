let express = require('express');
let router = express.Router();

let Mongoose = require('mongoose').Mongoose;
let Schema = require('mongoose').Schema;

let oldMong = new Mongoose();
oldMong.connect('mongodb://127.0.0.1:27017/db');



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

let users = oldMong.model('users', userSchema);
let mountains = oldMong.model('mountains', mountainSchema);
let trails = oldMong.model('trails', trailSchema);
let maps = oldMong.model('maps', mapSchema);
let camping = oldMong.model('camping', campingSchema);
let gear = oldMong.model('gear', gearSchema);
let reviews = oldMong.model('reviews', reviewSchema);

// Helper functions for CRUD operations
const createCRUDRoutes = (model, basePath) => {
  router.post(`/get${basePath}`, async (req, res) => {
    const data = await model.find().lean();
    res.json(data);
  });

  router.post(`/get${basePath.slice(0, -1)}`, async (req, res) => {
    const data = await model.findOne({ _id: req.body.id }).lean();
    res.json(data);
  });

  router.post(`/create${basePath.slice(0, -1)}`, async (req, res) => {
    try {
      await model.create(req.body);
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });

  router.post(`/update${basePath.slice(0, -1)}`, async (req, res) => {
    try {
      await model.findOneAndUpdate({ _id: req.body.id }, req.body);
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });

  router.post(`/delete${basePath.slice(0, -1)}`, async (req, res) => {
    try {
      await model.deleteOne({ _id: req.body.id });
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });
};

// Generate CRUD routes for all models
createCRUDRoutes(users, 'Users');
createCRUDRoutes(trails, 'Trails');
createCRUDRoutes(maps, 'Maps');
createGearRoutes();
createReviewRoutes();

// Camping routes with custom naming
router.post('/getCampingSites', async (req, res) => {
  const data = await camping.find().lean();
  res.json(data);
});

router.post('/getCampingSite', async (req, res) => {
  const data = await camping.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createCampingSite', async (req, res) => {
  try {
    await camping.create(req.body);
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

router.post('/updateCampingSite', async (req, res) => {
  try {
    await camping.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

router.post('/deleteCampingSite', async (req, res) => {
  try {
    await camping.deleteOne({ _id: req.body.id });
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

// Gear routes helper
function createGearRoutes() {
  router.post('/getGear', async (req, res) => {
    const data = await gear.find().lean();
    res.json(data);
  });

  router.post('/getGearItem', async (req, res) => {
    const data = await gear.findOne({ _id: req.body.id }).lean();
    res.json(data);
  });

  router.post('/createGear', async (req, res) => {
    try {
      await gear.create(req.body);
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });

  router.post('/updateGear', async (req, res) => {
    try {
      await gear.findOneAndUpdate({ _id: req.body.id }, req.body);
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });

  router.post('/deleteGear', async (req, res) => {
    try {
      await gear.deleteOne({ _id: req.body.id });
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });
}

// Review routes helper
function createReviewRoutes() {
  router.post('/getReviews', async (req, res) => {
    const data = await reviews.find({ mountainId: req.body.mountainId }).lean();
    res.json(data);
  });

  router.post('/createReview', async (req, res) => {
    try {
      await reviews.create(req.body);
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });

  router.post('/deleteReview', async (req, res) => {
    try {
      await reviews.deleteOne({ _id: req.body.id });
      res.json({ response: "success" });
    } catch (err) {
      res.json({ response: "fail" });
    }
  });
}

// Mountain routes with search functionality
router.post('/getMountains', async (req, res) => {
  const data = await mountains.find().lean();
  res.json(data);
});

router.post('/getMountain', async (req, res) => {
  const data = await mountains.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/searchMountain', async (req, res) => {
  const searchTerm = req.body.mountainId;
  const data = await mountains.find({
    $or: [
      { mountainName: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
      { mountainLocation: { $regex: searchTerm, $options: 'i' } }
    ]
  }).lean();
  res.json(data);
});

router.post('/createMountain', async (req, res) => {
  try {
    await mountains.create(req.body);
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

router.post('/updateMountain', async (req, res) => {
  try {
    await mountains.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

router.post('/deleteMountain', async (req, res) => {
  try {
    await mountains.deleteOne({ _id: req.body.id });
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});



module.exports = router;
