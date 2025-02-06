const mongoose = require('mongoose');

const connectToDB = async () => {
    try{
        //remote connection
        // await mongoose.connect(process.env.MONGO_URI);
        
        //locally connection
        await mongoose.connect('mongodb://localhost:27017/nodejs-auth');
        console.log('mongodb connected successfully.')
    }catch(e){
        console.log('mongodb connection failed.');
        process.exit(1);
    }
}

module.exports = connectToDB;