const axios = require('axios');
require('dotenv').config();
console.log('Token loaded:', process.env.PRIVATE_APP_ACCESS ? 'Yes' : 'No');

const schemaData = {
  name: 'video_games',
  labels: {
    singular: 'Video Game',
    plural: 'Video Games'
  },
  primaryDisplayProperty: 'name',
  requiredProperties: ['name'],
  properties: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
      fieldType: 'text'
    },
    {
      name: 'publisher',
      label: 'Publisher',
      type: 'string',
      fieldType: 'text'
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      fieldType: 'number'
    }
  ],
  associatedObjects: ['CONTACT']
};

axios.post('https://api.hubapi.com/crm/v3/schemas', schemaData, {
  headers: {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
  }
})
.then(res => {
  console.log('--- SUCCESS ---');
  console.log('Your Custom Object ID is:', res.data.fullyQualifiedName || res.data.objectTypeId);
})
.catch(err => {
  console.error('Error creating schema:', err.response ? err.response.data : err.message);
});