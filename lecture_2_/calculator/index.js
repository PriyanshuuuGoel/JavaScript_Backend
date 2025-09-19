


//! import all file in this , and export them together.
//! so in first.js according to requirement destructure karka use kar lega.

const {sum} = require("./sum");
const {sub} = require("./sub");
const {mult} = require("./mult");


module.exports = {sum,sub,mult};