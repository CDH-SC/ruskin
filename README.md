# Ruskin
[Development Version](https://ruskin.dev.cdhsc.org/home)

[Production Version](https://ruskindigitalarchive.cdhsc.org)

#### Prerequisites
* [Node](https://nodejs.org/en/) version 8.5.0 or higher
* [NPM](https://www.npmjs.com/) version 5.3.0 or higher
  * [Download Node and NPM](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/) version 1.4.4 or higher (*should be saved in devDependencies*)
  * ```npm install -g @angular/cli@latest```
* [MongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
* Nodemon
  * ```npm install -g nodemon```

#### Installing
* Clone this repo
  * ```git clone https://github.com/CDH-SC/ruskin.git```
* Install Prerequisites (Check the above section)
* ```cd <path>/ruskin```
  * ```cd ruskin-api/```
    * ```npm install```
  * ```cd ruskin-angular/```
    * ```npm install```
* Note: If the npm install throws an error:
  * If it says a module is not installed, run ```npm install --save <module name>```
  * If it says that an invalid character was read at the end of the line, delete the node_module folder and the package-lock.json file and try the ```npm install``` command again
  * If it's an npm permission error see [here](https://docs.npmjs.com/getting-started/fixing-npm-permissions)


* Create a local database
  * A binary BSON dump of the database can be found: ruskin/ruskin-database/dump
  * You only need to do this step the first time you build the site or when there has been a db change
  * Ensure Mongo has been started on your local machine:
   * Linux:
    * ```$ sudo service mongod start```
  or
    * ```$ sudo service mongod restart```
   * Mac (if mongodb was installed via homebrew):
    * ```brew services start mongodb```
    * to restart:
     * ```brew services stop mongodb```
     * ```brew services start mongodb```
    * If no available formula found, you may have mongodb-community installed instead. Try
     * ```brew services start mongodb-community```
     * ```brew services stop mongodb-community```
* By default MongoDB should be running on port 27017
* Use mongorestore to restore the dump file to your local machine
  * ```$ mongorestore <path to the backup>```
* For example:
  * ```$ mongorestore ruskin/ruskin-database/dump```
* You should see a message stating that ~158 documents were restored successfully, 0 failed to restore.
* If this did not happen successfully/you receieved any error, try:
  * ```sudo mongorestore --drop -d ruskin ruskin/ruskin-database/dump/ruskin --batchSize=100```
  * This gets around any permission problems with ```sudo```, drops the previous database with ```--drop```, and sets the batch size large enough that you shouldn't run into any issues.
 * Troubleshooting assitance can be found [here](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)


### Deployment
---
* 3 Terminal Setup
* Terminal 1 : Runs the mongo database
  * ```sudo mongod --dbpath ruskin-database/dump/ruskin```
  * This **does not apply** if mongo is already started, if you followed the steps above to start mongo.
  * This does not necessarily need its own terminal, but it gives useful error messages.
* Terminal 2 : Runs the Express server
  * ```sudo mongorestore --drop -d ruskin ruskin-database/dump/ruskin --batchSize=100```
  * This **does not apply** if you already successfully mongorestored the documents as instructed above.
  * Next, once documents have been successfully restored:
  * ```cd <path>/ruskin/ruskin-api/```
  * ```nodemon server```
  * If cannot find module ```npm install --save <module>```
* Terminal 3 : Builds the webapp to the dist directory to be served by the Express server
  * ```cd <path>/ruskin/ruskin-angular/```
  * ```ng build --watch```
* The John Ruskin application should now be available at http://localhost:3000/home


### Built With
* [Angular4](https://angular.io/)
* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)

### Contributing
1. **Fork** the repo
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes
6. Always have someone else review your changes. Never approve your own pull request

Note: Be sure to merge the latest from "upstream" before making a pull request!:

### Extended Contributing
* **Component**  ``` ng g component my-new-component ```
* **Service**  ``` ng g service my-new-service ```
* **Module**  ``` ng g module my-new-module ```
* **IF YOU DON'T KNOW WHERE SOMETHING GOES... ASK**

* npm install [packages] --save or --save-dev for development only

### Versioning

### Contributors
* **Tyron Schultz**
* **Ian McDowell**
* **Stella Masucci**
* **Mitchell Lambert**
* **Colin Anderson**
* **Dan Rochester**
* **Caleb Kitzmann**


### License
MIT
