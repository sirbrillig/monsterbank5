var express = require( 'express' );
var app = express();

require( './monsters' ).app( '/api/', app );

app.listen( 3000 );
