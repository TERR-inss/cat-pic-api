const mongoose = require('mongoose');
// allows use of .env file for database connection
require('dotenv').config({ path: __dirname + '/../.env' });

// Uncomment the below and replace the empty string with your database URI
// const myURI = '';

const DB_URI = process.env.MONGO_URI || myURI;

mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'cat-pic-db'
    })
    .then(() => console.log('Connected to database.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const catPicSchema = new Schema({
    name: { type: String, required: true} ,
    description: { type: String, required: true },
    image: { type: String, required: true },
    last_modified: { type: Date, default: Date.now },
});

const CatPic = mongoose.model('catPic', catPicSchema);

module.exports = CatPic;