// TODO ( Creating the part od Admin in this lecture )

const express = require("express");

const app = express();
const {authentication} = require("../middleware/middle");


//? Creating Database using Array
const foodItems = [
    { id:1 , foodName:"Pasta" , price:120},
     { id:2 , foodName:"Burger" , price:90},
      { id:3 , foodName:"Pizza" , price:180},
       { id:4 , foodName:"Spring Roll" , price:50},
        { id:5 , foodName:"Panner" , price:250},
         { id:6 , foodName:"Dal" , price:220},
          { id:7 , foodName:"Rajma" , price:200},
           { id:8 , foodName:"Roti" , price:20}
]


app.use(express.json());

app.get("/food",(req,res)=>{
    res.status(200).send(foodItems);
})


//*****************   Work done by Admin 

//! Use Middleware to Authenticate
app.use("/admin", authentication);


//! Admin POST
app.post("/admin",(req,res)=>{

           foodItems.push(req.body);
        res.status(201).send("Item added sucessfully");
     
})


//! Admin DELETE
app.delete("/admin/:id",(req,res)=>{
   

        const id = parseInt(req.params.id);

        const index = foodItems.findIndex((info)=> info.id === id );

        if ( index == -1){  // Means doesn't exist
             res.status(404).send("Resource not found");
        }
        else{
            foodItems.splice(index,1);
            res.status(302).send("Deleted successfully");
        }
    
})


//! Admin PATCH Update
app.patch("/admin",(req,res)=>{

            const id = req.body.id;

            const food = foodItems.find((info)=> info.id === id);

            if ( req.body.foodName){
                food.foodName = req.body.foodName;
            }
            if( req.body.price){
                food.price = req.body.price;
            }

            res.status(200).send("Updated successfully");
      
})

app.listen(3000,()=>{
    console.log("Port at 3000 and is Listening");
})