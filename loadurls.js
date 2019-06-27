var path = require('path');
var lineReader = require('line-reader');
const fileSystem = require('fs')
const { pullPage } = require('./scrape')
const { WebPage, connector } = require('./db')


const loadURLs = (list, connection) => {
    console.log('started')
    connector(connection, '', '')
    lineReader.eachLine(list, function(line, last) {

            const webPage = new WebPage({ url: line })

            webPage.save().then(({ _id }) => {
                // console.log(line + " - Done")
                console.log(_id)
                // pullPage('https://' + line.toString().trim()).then(res => { console.log(res); })
            }).catch((e) => {
                console.log(line + " - Error")
            })
        // do whatever you want with line...
        if(last){
          // or check if it's the last one
          console.log('done')
        }
      });
      
}

module.exports = loadURLs