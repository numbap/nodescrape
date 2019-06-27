const chalk = require('chalk')
const yargs = require('yargs')
const loadUrls = require('./loadurls')
const { updateRecord } = require('./scrape.js')


// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'load',
    describe: 'Load a list of of URLs into the database',
    builder: {
        list: {
            describe: 'File Name where list is located. One url per line. Will default to ./urls.txt.',
            demandOption: false,
            type: 'string',
            default: './urls.txt'
        },
        dbConn: {
            describe: 'Location to connect to MongoDB. Includes address, port and database name. Default: mongodb://localhost:27017/scrapedb',
            demandOption: false,
            type: 'string',
            default: 'mongodb://localhost:27017/scrapedb'
        },
        dbuser: {
            describe: 'Username for MongoDBLocation Default: none',
            demandOption: false,
            type: 'string',
            default: undefined
        },
        dbPass: {
            describe: 'Password for MongoDBLocation Default: none',
            demandOption: false,
            type: 'string',
            default: undefined
        }
    },
    handler: function (argv) {
        console.log('started')
        loadUrls(argv.list, argv.dbConn)
        console.log('list: ' + argv.list)
        console.log('dbConn: ' + argv.dbConn)
        console.log('dbuser: ' + argv.dbuser)
        console.log('dbPass: ' + argv.dbPass)
    }
})



yargs.command({
    command: 'scrape',
    describe: 'Begin scraping web site content and saving results to database',
    builder: {
        dbConn: {
            describe: 'Location to connect to MongoDB. Includes address, port and database name. Default: mongodb://localhost:27017/scrapedb',
            demandOption: false,
            type: 'string',
            default: 'mongodb://localhost:27017/scrapedb'
        },
        dbuser: {
            describe: 'Username for MongoDBLocation Default: none',
            demandOption: false,
            type: 'string',
            default: undefined
        },
        dbPass: {
            describe: 'Password for MongoDBLocation Default: none',
            demandOption: false,
            type: 'string',
            default: undefined
        }
    },
    handler: function (argv) {
        updateRecord(argv.dbConn)
        console.log('dbConn: ' + argv.dbConn)
        console.log('dbuser: ' + argv.dbuser)
        console.log('dbPass: ' + argv.dbPass)
    }
})


yargs.parse()