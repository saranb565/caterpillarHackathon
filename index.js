const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db('car_inspections'); // Replace with your database name
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the inspection page (GET)
app.get('/inspection', (req, res) => {
    res.render('inspection', { next: 'Tyre' });
});

// Route for the inspection page (POST)
app.post('/inspection', async (req, res) => {
    const inspectionData = req.body;
    const database = await connectToDatabase();
    const inspectionCollection = database.collection('inspection');

    try {
        // Save inspection data
        const inspectionResult = await inspectionCollection.insertOne(inspectionData);
        const inspectionId = inspectionResult.insertedId; // Save the inspection ID for linking with tire data

        res.redirect(`/tyre?inspectionId=${inspectionId}`);
    } catch (error) {
        console.error("Error saving inspection", error);
        res.status(500).send("Failed to save inspection");
    }
});

// Route for the Tyre page (GET)
app.get('/tyre', (req, res) => {
    const { inspectionId } = req.query; // Get the inspection ID from query parameters
    res.render('tyre', { next: 'Battery', inspectionId });
});

// Route for the Tyre page (POST)
app.post('/tyre', async (req, res) => {
    const tireData = req.body;
    const { inspectionId } = req.query;
    const database = await connectToDatabase();
    const tireCollection = database.collection('tire');

    try {
        // Attach the inspection ID to the tire data
        tireData.inspectionId = inspectionId;

        // Save tire data
        await tireCollection.insertOne(tireData);

        res.redirect('/battery');
    } catch (error) {
        console.error("Error saving tire inspection", error);
        res.status(500).send("Failed to save tire inspection");
    }
});

// Route for the Battery page (GET)
app.get('/battery', (req, res) => {
    res.render('battery', { next: 'Exterior' });
});

// Route for the Battery page (POST)
app.post('/battery', async (req, res) => {
    const batteryData = req.body;
    const database = await connectToDatabase();
    const batteryCollection = database.collection('battery');

    try {
        await batteryCollection.insertOne(batteryData);
        res.redirect('/exterior');
    } catch (error) {
        console.error("Error saving battery inspection", error);
        res.status(500).send("Failed to save battery inspection");
    }
});

// Route for the Exterior page (GET)
app.get('/exterior', (req, res) => {
    res.render('exterior', { next: 'Brake' });
});

// Route for the Exterior page (POST)
app.post('/exterior', async (req, res) => {
    const exteriorData = req.body;
    const database = await connectToDatabase();
    const exteriorCollection = database.collection('exterior');

    try {
        await exteriorCollection.insertOne(exteriorData);
        res.redirect('/brake');
    } catch (error) {
        console.error("Error saving exterior inspection", error);
        res.status(500).send("Failed to save exterior inspection");
    }
});

// Route for the Brake page (GET)
app.get('/brake', (req, res) => {
    res.render('brake', { next: 'Engine' });
});

// Route for the Brake page (POST)
app.post('/brake', async (req, res) => {
    const brakeData = req.body;
    const database = await connectToDatabase();
    const brakeCollection = database.collection('brake');
    try {
        await brakeCollection.insertOne(brakeData);
        res.redirect('/engine');
    } catch (error) {
        console.error("Error saving brake inspection", error);
        res.status(500).send("Failed to save brake inspection");
    }
});

// Route for the Engine page (GET)
app.get('/engine', (req, res) => {
    res.render('engine', { next: 'Customer voice' });
});

// Route for the Engine page (POST)
app.post('/engine', async (req, res) => {
    const engineData = req.body;
    const database = await connectToDatabase();
    const engineCollection = database.collection('engine');

    try {
        await engineCollection.insertOne(engineData);
        res.redirect('/voice_customer');
    } catch (error) {
        console.error("Error saving engine inspection", error);
        res.status(500).send("Failed to save engine inspection");
    }
});

// Route for the Customer Voice page (GET)
app.get('/voice_customer', (req, res) => {
    res.render('voice_customer', { next: 'Complete' });
});

// Route for the Customer Voice page (POST)
app.post('/voice_customer', async (req, res) => {
    const customerVoiceData = req.body;
    const database = await connectToDatabase();
    const customerVoiceCollection = database.collection('voice_customer');

    try {
        await customerVoiceCollection.insertOne(customerVoiceData);
        res.redirect('/inspection');
    } catch (error) {
        console.error("Error saving customer voice inspection", error);
        res.status(500).send("Failed to save customer voice inspection");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
