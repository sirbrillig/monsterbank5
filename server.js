var express = require( 'express' );
var app = express();

var port = process.env.PORT || 3000;

require( './monsters' ).app( '/api/', app );

app.listen( port );
console.log( 'Monsters await on port ' + port );
