const mongoose = require('mongoose');


const MONGO_URL = process.env.MONGO_URL_DEV;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = async () => {
    try{
        await mongoose.connect(MONGO_URL,mongoOptions );
        console.log("DB connected successfully");
    } catch(err) {
        console.log("<::: Couldn't connect to database ", err)
    }
}

