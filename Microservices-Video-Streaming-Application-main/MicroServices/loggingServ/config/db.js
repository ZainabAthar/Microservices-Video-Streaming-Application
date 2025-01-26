const mongoose = require("mongoose")

require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch((err) => {
        console.log("Could not connect to mongoose");
        console.log(err);
    })


module.exports={mongoose}