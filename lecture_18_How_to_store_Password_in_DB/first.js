

//! Firstly download the bcrypt library( npm i bcrypt ) 

const bcrypt = require("bcrypt");


const password = "Rohit@123";


async function Hashing(){

    // password + salt 

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password,salt);  // It is sslow process sso we have to wait 
    
    const ans = await bcrypt.compare(password,hashPass);
    console.log(ans);
}

Hashing();