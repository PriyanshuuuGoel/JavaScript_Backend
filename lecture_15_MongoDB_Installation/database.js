

const { MongoClient } = require('mongodb');

const url = "mongodb+srv://priyanshugoel7_11:2100680100252%40pg@codingadda.hdh2kto.mongodb.net/";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db('CoderArmy');
    const collectionnnnn = db.collection('user');



  //!  GET data 
      //  const cursor = collectionnnnn.find({});
      //  const allValues = await cursor.toArray();
      //  console.log(allValues);


     //* Below is how Cursor Object find() works
      // const cursor = collectionnnnn.find({});

      // for  await ( const doc of cursor ){
      //     console.log(cursor);
      // }


  //! INSERT data , only one data
  
  // const data = await collectionnnnn.insertOne({name:"Lamba",  age:"23" , profile:"Business Analyst"});
  // console.log("Data saved successfully");



  //! INSERT many

  const data2 = await collectionnnnn.insertMany([ {name:"Sarthak" , profile:"Business Analyst"} , { name:"Ritik" , profile : "Data Analyst"}]);
  console.log("Many data saved successfully");


  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }

 
}

run();
