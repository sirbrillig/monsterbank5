var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var mongoose = require( 'mongoose' );

var port = process.env.PORT || 3000;

var monsters = require( './app/routes/monsters' );

var Settings = require( 'settings' );
var config = new Settings( require( './config' ) );
var mongodbUri = config.storage.mongodbUri;

mongoose.connect( mongodbUri );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

monsters.app( '/api/', app );

app.listen( port );
console.log( 'Monsters await on port ' + port );
