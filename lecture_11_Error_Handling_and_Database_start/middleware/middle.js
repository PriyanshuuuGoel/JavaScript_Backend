


const authentication= (req,res,next)=>{

        // Here we are adding foodItems in foodMenu
     // It is done by Admin , so we have to Authenticate
     //* Dummy Code to Authenticate
     const token = "ABCDEF";
     const Access = ( token === "ABCDEF" ? 1 : 0);

     if(!Access){
        res.status(403).send("Permission not allowed");
     }
     else{
        next();
     }
}


module.exports = {
    authentication,
}