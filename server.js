var express = require( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );

var port = process.env.PORT || 3000;

var monsters = require( './monsters' );

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

monsters.app( '/api/', app );

app.listen( port );
console.log( 'Monsters await on port ' + port );
