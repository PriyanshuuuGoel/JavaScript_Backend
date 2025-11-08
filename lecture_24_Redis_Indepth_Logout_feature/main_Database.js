

const mongoose = require('mongoose');
require('dotenv').config(); // ✅ loads the .env file

async function main(){
    await mongoose.connect(process.env.DB_CONNECT_KEY);
}

module.exports = { main};