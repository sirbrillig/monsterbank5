var restpress = require( 'restpress' );
var monsterRoutes = new restpress( 'monsters' );
var monsterData = require( '../../app/schemas/monster' );

monsterRoutes.list( function( request, response ) {
	monsterData.find( function( err, monsters ) {
		if ( err ) response.send( err );
		response.json( monsters );
	} );
});

monsterRoutes.get( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( err ) response.send( err );
		response.json( monster );
	} );
});

monsterRoutes.create( function( request, response ) {
	if ( ! request.body.hasOwnProperty( 'name' ) ) {
		response.statusCode = 400;
		return response.send( 'Error: 400: Invalid data.' );
	}
	var monster = new monsterData();
	monster.name = request.body.name;
	if ( request.body.hasOwnProperty( 'description' ) ) monster.description = request.body.description;
	monster.save( function( err ) {
		if ( err ) response.send( err );
		response.json( monster );
	} );
});

monsterRoutes.update( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( err ) response.send( err );
		if ( request.body.hasOwnProperty( 'name' ) ) monster.name = request.body.name;
		if ( request.body.hasOwnProperty( 'description' ) ) monster.description = request.body.description;
		monster.save( function( err ) {
			if ( err ) response.send( err );
			response.json( monster );
		} );
	} );
});

monsterRoutes.delete( function( request, response ) {
	monsterData.remove( {
		_id: request.params.id
	}, function( err, monster ) {
		if ( err ) response.send( err );
		response.json( monster );
	} );
});

module.exports = monsterRoutes;
