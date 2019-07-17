// Load dependencies
const mongoose = require('mongoose')
var validator = require('validator');


// Will connect using strings from console.
const connector = (url, user, pass) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    }, function(err){
        if(err){
          console.log('Error connecting to: '+ url)
        }
        else{
          console.log('Connected to: '+ url)
        }
      })
}

// Mongoose model for the web page record in the database
const WebPage = mongoose.model('WebPage', {
    url: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('URL is invalid')
            }
        }
    },
    dateAdded: {
        type: String,
        default: Date.now
    },
    dateCrawled: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Ready'
    },
    contents: {
        type: String,
        trim: true,
        default: ''
    }
})

module.exports = { WebPage, connector }