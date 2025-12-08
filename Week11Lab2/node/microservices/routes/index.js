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
  location: String
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
  recommended: Boolean
}, { collection: 'gear' });

let users = oldMong.model('users', userSchema);
let mountains = oldMong.model('mountains', mountainSchema);
let trails = oldMong.model('trails', trailSchema);
let maps = oldMong.model('maps', mapSchema);
let camping = oldMong.model('camping', campingSchema);
let gear = oldMong.model('gear', gearSchema);

// USER ROUTES
router.post('/getUsers', async function (req, res, next) {
  const data = await users.find().lean();
  res.json(data);
});

router.post('/getUser', async function (req, res, next) {
  const data = await users.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createUser', async function (req, res, next) {
  let retVal = { response: "fail" };
  await users.create(req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/updateUser', async function (req, res, next) {
  let retVal = { response: "fail" };
  await users.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/deleteUser', async function (req, res, next) {
  let retVal = { response: "fail" };
  await users.deleteOne({ _id: req.body.id }, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

// MOUNTAIN ROUTES
router.post('/getMountains', async function (req, res, next) {
  const data = await mountains.find().lean();
  res.json(data);
});

router.post('/getMountain', async function (req, res, next) {
  const data = await mountains.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/searchMountain', async function (req, res, next) {
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

router.post('/createMountain', async function (req, res, next) {
  try {
    console.log('Creating mountain:', req.body);
    const result = await mountains.create(req.body);
    console.log('Mountain created:', result);
    res.json({ response: "success" });
  } catch (err) {
    console.error('Error creating mountain:', err);
    res.json({ response: "fail", error: err.message });
  }
});

router.post('/updateMountain', async function (req, res, next) {
  try {
    await mountains.findOneAndUpdate({ _id: req.body.id }, req.body);
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

router.post('/deleteMountain', async function (req, res, next) {
  try {
    await mountains.deleteOne({ _id: req.body.id });
    res.json({ response: "success" });
  } catch (err) {
    res.json({ response: "fail" });
  }
});

// TRAIL ROUTES
router.post('/getTrails', async function (req, res, next) {
  const data = await trails.find().lean();
  res.json(data);
});

router.post('/getTrail', async function (req, res, next) {
  const data = await trails.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createTrail', async function (req, res, next) {
  let retVal = { response: "fail" };
  await trails.create(req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/updateTrail', async function (req, res, next) {
  let retVal = { response: "fail" };
  await trails.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/deleteTrail', async function (req, res, next) {
  let retVal = { response: "fail" };
  await trails.deleteOne({ _id: req.body.id }, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

// MAP ROUTES
router.post('/getMaps', async function (req, res, next) {
  const data = await maps.find().lean();
  res.json(data);
});

router.post('/getMap', async function (req, res, next) {
  const data = await maps.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createMap', async function (req, res, next) {
  let retVal = { response: "fail" };
  await maps.create(req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/updateMap', async function (req, res, next) {
  let retVal = { response: "fail" };
  await maps.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/deleteMap', async function (req, res, next) {
  let retVal = { response: "fail" };
  await maps.deleteOne({ _id: req.body.id }, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

// CAMPING ROUTES
router.post('/getCampingSites', async function (req, res, next) {
  const data = await camping.find().lean();
  res.json(data);
});

router.post('/getCampingSite', async function (req, res, next) {
  const data = await camping.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createCampingSite', async function (req, res, next) {
  let retVal = { response: "fail" };
  await camping.create(req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/updateCampingSite', async function (req, res, next) {
  let retVal = { response: "fail" };
  await camping.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/deleteCampingSite', async function (req, res, next) {
  let retVal = { response: "fail" };
  await camping.deleteOne({ _id: req.body.id }, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

// GEAR ROUTES
router.post('/getGear', async function (req, res, next) {
  const data = await gear.find().lean();
  res.json(data);
});

router.post('/getGearItem', async function (req, res, next) {
  const data = await gear.findOne({ _id: req.body.id }).lean();
  res.json(data);
});

router.post('/createGear', async function (req, res, next) {
  let retVal = { response: "fail" };
  await gear.create(req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/updateGear', async function (req, res, next) {
  let retVal = { response: "fail" };
  await gear.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

router.post('/deleteGear', async function (req, res, next) {
  let retVal = { response: "fail" };
  await gear.deleteOne({ _id: req.body.id }, function (err, result) {
    if (!err) retVal = { response: "success" };
  });
  res.json(retVal);
});

module.exports = router;
