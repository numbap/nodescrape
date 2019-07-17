This application will scrape the first page of any given URL, and save it to a MongoDB document. 

It has 2 modes:
 - Load: Load a list of URLs into a DB 
 - Scrape: For each loaded URL, scrape its HTML contents and save to the document 

From the root directory, use the following commands:

$ node app.js load --dbConn=mongodb+srv://user:password@mongoserver.com/scrape --list=./urls.txt
$ node app.js scrape --dbConn=mongodb+srv://user:password@mongoserver.com/scrape

