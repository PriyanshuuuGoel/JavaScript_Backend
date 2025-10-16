
// Firstly connected to database

const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main(){
     await mongoose.connect('mongodb+srv://priyanshugoel7_11:2100680100252%40pg@codingadda.hdh2kto.mongodb.net/BOOKSTORE');


     //* Write the main code from here
 //! 1. Firstly create the schema 

     const userSchema = new Schema ({
        name : String ,
        age : Number ,
        profile : String,
        city : String
     })

 //! 2. Now create the Model , Model creating means creating the Collection in the database

     const Userr = mongoose.model("user",userSchema);
     //* Above line is also called the class , whose object/instance we can create.


//  //! 3(a). Now create the instance/Object  of the above Class or also can say created the Document in Collection
 
//    const user1 = new Userr({ name:"Priyanshu" , age:23 , city : "Meerut" , profile : "SDE"});
//    await user1.save();


// //! 3(b).  Can use this way to insert the document

//     await Userr.create({name:"Manvi" , age:22 , profile:"SWE" , city:"Meerut"})

// //! 3(c). Can use below way to insert multiple document

//     await Userr.insertMany([{name:"Ritik" , profile:"Data Analyst"} , { name:"Anurag" , profile:"Call Exceutive"}]);

//! 4. Now find the data 
  
    // const ans = await Userr.find({});
    // console.log(ans);

//! 5. Find document in particular field

    const result = await Userr.find({name:"Priyanshu"});
    console.log(result);

                   //* OR     

    //    console.log(  await Userr.find({name:"Priyanshu"}) )

}

main()
      .then(()=> console.log("Connected to DB"))
      .catch((error)=> console.log(error))
