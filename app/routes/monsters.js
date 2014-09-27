var restpress = require( 'restpress' );
var monsterRoutes = new restpress( 'monsters' );
var monsterData = require( '../../app/schemas/monster' );

monsterRoutes.list( function( request, response ) {
	monsterData.find( function( err, monsters ) {
		if ( err ) response.send( err );
		response.json( monsters.map( function( monster ) {
			return monster.toJSON( { virtuals: true } );
		} ) );
	} );
});

monsterRoutes.get( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( err ) response.send( err );
		response.json( monster.toJSON( { virtuals: true } ) );
	} );
});

monsterRoutes.create( function( request, response ) {
	if ( ! request.body.hasOwnProperty( 'name' ) ) {
		response.statusCode = 400;
		return response.send( 'Error: 400: Invalid data.' );
	}
	var monster = new monsterData();
	var keys = Object.getOwnPropertyNames( monster.schema.paths ).filter( function( key ) {
		return ( key[0] !== '_' );
	} );
	keys.forEach( function( key ) {
		if ( request.body.hasOwnProperty( key ) ) monster[ key ] = request.body[ key ];
	} );
	monster.save( function( err ) {
		if ( err ) response.send( err );
		response.json( monster.toJSON( { virtuals: true } ) );
	} );
});

monsterRoutes.update( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( err ) response.send( err );
		var keys = Object.getOwnPropertyNames( monster.schema.paths ).filter( function( key ) {
			return ( key[0] !== '_' );
		} );
		keys.forEach( function( key ) {
			if ( request.body.hasOwnProperty( key ) ) monster[ key ] = request.body[ key ];
		} );
		monster.save( function( err ) {
			if ( err ) response.send( err );
			response.json( monster.toJSON( { virtuals: true } ) );
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
