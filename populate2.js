const mongoose = require('mongoose');
const Location = require('./models/Location'); // Adjust the path to your schema file

const data = [
  { loc_name: "MVP Colony", popDensity: 3200, thresholdPercent: 95, eventWastePercent: 3, permanentSourcePercent: 7 },
  { loc_name: "Gajuwaka", popDensity: 4000, thresholdPercent: 92, eventWastePercent: 4, permanentSourcePercent: 6 },
  { loc_name: "Dwaraka Nagar", popDensity: 2800, thresholdPercent: 96, eventWastePercent: 2, permanentSourcePercent: 8 },
  { loc_name: "RK Beach", popDensity: 3500, thresholdPercent: 97, eventWastePercent: 3, permanentSourcePercent: 9 },
  { loc_name: "Seethammadhara", popDensity: 2500, thresholdPercent: 94, eventWastePercent: 4, permanentSourcePercent: 5 },
  { loc_name: "Kailasagiri", popDensity: 3100, thresholdPercent: 93, eventWastePercent: 2, permanentSourcePercent: 6 },
  { loc_name: "Madhurawada", popDensity: 2900, thresholdPercent: 91, eventWastePercent: 3, permanentSourcePercent: 7 },
  { loc_name: "Arilova", popDensity: 2700, thresholdPercent: 95, eventWastePercent: 4, permanentSourcePercent: 8 },
  { loc_name: "Pendurthi", popDensity: 3600, thresholdPercent: 98, eventWastePercent: 3, permanentSourcePercent: 9 },
  { loc_name: "Bheemunipatnam", popDensity: 2400, thresholdPercent: 92, eventWastePercent: 5, permanentSourcePercent: 6 },
  { loc_name: "Anakapalle", popDensity: 3300, thresholdPercent: 96, eventWastePercent: 4, permanentSourcePercent: 8 },
  { loc_name: "Yendada", popDensity: 3100, thresholdPercent: 94, eventWastePercent: 2, permanentSourcePercent: 7 },
  { loc_name: "Chinna Waltair", popDensity: 2900, thresholdPercent: 95, eventWastePercent: 3, permanentSourcePercent: 6 },
  { loc_name: "Kancharapalem", popDensity: 2600, thresholdPercent: 91, eventWastePercent: 5, permanentSourcePercent: 7 },
  { loc_name: "Isukathota", popDensity: 3400, thresholdPercent: 97, eventWastePercent: 4, permanentSourcePercent: 9 },
  { loc_name: "Simhachalam", popDensity: 3000, thresholdPercent: 93, eventWastePercent: 3, permanentSourcePercent: 8 },
  { loc_name: "Town Kotha Road", popDensity: 2700, thresholdPercent: 92, eventWastePercent: 3, permanentSourcePercent: 8 },
  { loc_name: "Old Gajuwaka", popDensity: 3200, thresholdPercent: 95, eventWastePercent: 4, permanentSourcePercent: 7 },
  { loc_name: "Steel Plant Township", popDensity: 3000, thresholdPercent: 94, eventWastePercent: 2, permanentSourcePercent: 6 },
  { loc_name: "Daba Gardens", popDensity: 2900, thresholdPercent: 97, eventWastePercent: 3, permanentSourcePercent: 9 },
  { loc_name: "Lawsons Bay Colony", popDensity: 3100, thresholdPercent: 96, eventWastePercent: 5, permanentSourcePercent: 8 },
  { loc_name: "Chodavaram", popDensity: 3400, thresholdPercent: 93, eventWastePercent: 2, permanentSourcePercent: 7 },
  { loc_name: "NAD Junction", popDensity: 3600, thresholdPercent: 91, eventWastePercent: 4, permanentSourcePercent: 6 },
  { loc_name: "Kancherapalem", popDensity: 2500, thresholdPercent: 90, eventWastePercent: 3, permanentSourcePercent: 7 },
  { loc_name: "Malkapuram", popDensity: 3300, thresholdPercent: 98, eventWastePercent: 4, permanentSourcePercent: 9 },
  { loc_name: "Pedagantyada", popDensity: 2800, thresholdPercent: 94, eventWastePercent: 3, permanentSourcePercent: 5 },
  { loc_name: "Port Area", popDensity: 4000, thresholdPercent: 97, eventWastePercent: 2, permanentSourcePercent: 8 },
  { loc_name: "Railway New Colony", popDensity: 2600, thresholdPercent: 92, eventWastePercent: 5, permanentSourcePercent: 7 },
  { loc_name: "Adavivaram", popDensity: 3100, thresholdPercent: 96, eventWastePercent: 4, permanentSourcePercent: 9 },
  { loc_name: "China Mushidiwada", popDensity: 3000, thresholdPercent: 95, eventWastePercent: 3, permanentSourcePercent: 6 },
  { loc_name: "Beach Road", popDensity: 3500, thresholdPercent: 93, eventWastePercent: 2, permanentSourcePercent: 8 },
  { loc_name: "Kapuluppada", popDensity: 3200, thresholdPercent: 91, eventWastePercent: 4, permanentSourcePercent: 7 }
];

async function populateLocations() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/GVMC', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully.');

    const formattedData = data.map((item, index) => ({
      loc_id: `LOC${index + 1}`,
      ...item,
    }));

    await Location.insertMany(formattedData);
    console.log('Data populated successfully.');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error populating data:', error);
    mongoose.disconnect();
  }
}

populateLocations();
