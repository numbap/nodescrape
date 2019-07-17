// Load dependencies
const fetch = require('node-fetch');
const { WebPage } = require('../db/db')

// Scrape web pages and load into database, one record at a time
async function updateRecord () {
    let loop = true
    let currentRecord = {}
    finaloutput = ''
    let x = 0

    while(loop){
        currentRecord = await WebPage
        .findOneAndUpdate({status: 'Ready'}, {status: 'Processing' })
        .then(y => y)
        .catch(e => 'Error')

        if(!currentRecord){
            loop = false
        } else {
            console.log(currentRecord._id, ' - ', x)
        
            finaloutput = await fetch('https://' + currentRecord.url)
            .then((res) => res.text())
            .catch(x => 'Error');

            WebPage
            .findOneAndUpdate({_id: currentRecord._id}, {status: 'Complete', contents: finaloutput })
            .then(y => console.log(currentRecord._id, ' - done'))
            .catch(e => 'error')
            x++
        }
    }
}

module.exports = { updateRecord }