

const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb+srv://priyanshugoel7_11:2100680100252%40pg@codingadda.hdh2kto.mongodb.net/Instagram');
}

module.exports = { main};