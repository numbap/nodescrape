// Load dependencies
const chalk = require('chalk')
const yargs = require('yargs')
const loadUrls = require('./functions/loadurls')
const { updateRecord } = require('./functions/scrape')
const { connector } = require('./db/db')

// Customize yargs version
yargs.version('1.1.0')

// Create add command to load file
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
            describe: 'Location to connect to MongoDB. Includes address, user, password, port and database name. Default: mongodb://localhost:27017/scrapedb',
            demandOption: false,
            type: 'string',
            default: 'mongodb://localhost:27017/scrapedb'
        }
    },
    handler: function (argv) {
        console.log('started')
        // Start loading the URLs into the database
        loadUrls(argv.list, argv.dbConn)
        console.log('list: ' + argv.list)
        console.log('dbConn: ' + argv.dbConn)
    }
})

// Commands for scraping
yargs.command({
    command: 'scrape',
    describe: 'Begin scraping web site content and saving results to database',
    builder: {
        dbConn: {
            describe: 'Location to connect to MongoDB. Includes address, port, user, password and database name. Default: mongodb://localhost:27017/scrapedb',
            demandOption: false,
            type: 'string',
            default: 'mongodb://localhost:27017/scrapedb'
        }
    },
    handler: function (argv) {
        connector(argv.dbConn, '', '')
        // Load 10000 non-blocking async instances for faster scraping
        for (i = 0; i < 10000; i++) {
            // Start scraping urls, one at a time
            updateRecord().catch(e => console.log(e))
        }
        console.log('dbConn: ' + argv.dbConn)
    }
})

yargs.parse()