const mongoose = require('mongoose');


async function conectDB() {
    try{
const conn = await mongoose.connect(process.env.DATABASE_URI);
console.log(`Database conected`);

    }catch(err){
console.log(err.message);
process.exit(1);
    }
}
module.exports = {conectDB};