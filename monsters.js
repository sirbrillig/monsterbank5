var restpress = require( 'restpress' );
var monsters = new restpress( 'monsters' );

var data = [
	{
	'id': 1,
	'message': 'hello, world'
	},
	{
		'id': 2,
		'message': 'good bye'
	}
];

monsters.list( function( request, response ) {
	response.json( data );
});

monsters.get( function( request, response ) {
	response.json( data[request.params.id - 1] );
});

module.exports = monsters;
