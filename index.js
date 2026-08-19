const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const CUSTOM_OBJECT_ID = 'p51349175_video_games';

// ROUTE 1: Homepage - Fetches records from HubSpot and renders the table
app.get('/', async (req, res) => {
    const getUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_ID}?properties=name,publisher,price`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getUrl, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Custom Object Table | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error('Error fetching records:', error.response ? error.response.data : error.message);
        res.render('homepage', { title: 'Custom Object Table | Integrating With HubSpot I Practicum', data: [] });
    }
});

// ROUTE 2: Form Page - Renders the form to add a new record
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// ROUTE 3: Form Submit - Creates the record in HubSpot and redirects back to homepage
app.post('/update-cobj', async (req, res) => {
    const postUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_ID}`;
    const data = {
        properties: {
            name: req.body.name,
            publisher: req.body.publisher,
            price: req.body.price
        }
    };
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(postUrl, data, { headers });
        res.redirect('/');
    } catch (error) {
        console.error('Error creating record:', error.response ? error.response.data : error.message);
        res.redirect('/');
    }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));