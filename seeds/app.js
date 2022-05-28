const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i =0; i< 300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '62682b9e3744c866f3d58dd2',
            location: `${cities[random1000].city}, ${cities[random1000].state}` ,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, distinctio. Excepturi amet quo vitae dolorem ea! Excepturi inventore praesentium aliquid repellat, ad dolor ipsum, deserunt in fuga molestiae vitae aspernatur.',
            price,
            geometry: { 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ], 
                type: 'Point' },
            images: [
                {
                //   url: 'https://res.cloudinary.com/dcwkn52qe/image/upload/v1651630218/YelpCamp/atjmprh3iy2wziogpjze.png',
                    url: 'https://res.cloudinary.com/dcwkn52qe/image/upload/v1652505526/YelpCamp/ecnwkdidamc2fqpnphbe.jpg',
                  filename: 'YelpCamp/atjmprh3iy2wziogpjze'
                },
                {
                //   url: 'https://res.cloudinary.com/dcwkn52qe/image/upload/v1651630218/YelpCamp/qj13kcq8vvks2ilouqda.png',
                  url: 'https://res.cloudinary.com/dcwkn52qe/image/upload/v1652505525/YelpCamp/cpre3xz2oe8uw35tfq0q.avif',
                  filename: 'YelpCamp/qj13kcq8vvks2ilouqda'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})