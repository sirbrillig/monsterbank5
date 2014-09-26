var express = require( 'express' );
var app = express();

require( './monsters' ).app( app );

app.listen( 3000 );
