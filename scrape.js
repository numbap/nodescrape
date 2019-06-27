const fetch = require('node-fetch');
const { WebPage, connector } = require('./db')


async function updateRecord (connection) {
    let loop = true
    let currentRecord = {}
    finaloutput = ''
    connector(connection, '', '')
    while(loop){
        currentRecord = await WebPage.findOneAndUpdate({status: 'Ready'}, {status: 'Processing' }).then(y => y).catch(e => 'Error')
        if(!currentRecord){
            loop = false
        } else {
            finaloutput = await pullPage('https://' + currentRecord.url)
            console.log(currentRecord._id)
            await WebPage.findOneAndUpdate({_id: currentRecord._id}, {status: 'Complete', contents: finaloutput }).then(y => console.log('done')).catch(e => 'error')
        }

    }

}

const pullPage = (url) => {
    return fetch(url).then((res) => {
       return res.text()
    }).catch(x => 'Error');
}

module.exports = { pullPage, updateRecord }