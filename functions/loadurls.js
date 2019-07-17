// Load dependencies
var path = require('path');
var lineReader = require('line-reader');
const fileSystem = require('fs')
const { pullPage } = require('./scrape')
const { WebPage, connector } = require('../db/db')

// Load urls to crawl into database
const loadURLs = (list, connection) => {
    console.log('started')
    connector(connection, '', '')
    lineReader.eachLine(list, function(line, last) {

            const webPage = new WebPage({ url: line })

            webPage.save().then(({ _id }) => {
                console.log(_id)
            }).catch((e) => {
                console.log(line + " - Error")
            })
        if(last){
          console.log('done')
          return null
        }
      });    
}

module.exports = loadURLs