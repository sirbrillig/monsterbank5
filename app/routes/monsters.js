var restpress = require( 'restpress' );
var monsterRoutes = new restpress( 'monsters' );
var monsterData = require( '../../app/schemas/monster' );

monsterRoutes.list( function( request, response ) {
	monsterData.find( function( err, monsters ) {
		if ( err ) return response.send( err );
		console.log( 'list request' );
		response.json( monsters.map( function( monster ) {
			return monster.toJSON( { virtuals: true } );
		} ) );
	} );
});

monsterRoutes.get( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( ! monster ) {
			console.warn( 'invalid get request: no such monster', request.params.id );
			response.statusCode = 404;
			return response.send( 'Error: 404: Monster not found.' );
		}
		console.log( 'get request', request.params.id );
		response.json( monster.toJSON( { virtuals: true } ) );
	} );
});

monsterRoutes.create( function( request, response ) {
	if ( ! request.body.hasOwnProperty( 'name' ) ) {
		console.warn( 'invalid create request', request.body );
		response.statusCode = 400;
		return response.send( 'Error: 400: Invalid data.' );
	}

	var findPromise = monsterData.findOne( { 'name': request.body.name } ).exec();

	findPromise.then( function( err, monster ) {
		if ( err || monster ) {
			console.warn( 'invalid create request: existing name', request.body.name );
			response.statusCode = 400;
			return response.send( 'Error: 400: That monster already exists.' );
		}

		console.log( 'create request', request.body );
		monster = new monsterData();
		var keys = Object.getOwnPropertyNames( monster.schema.paths ).filter( function( key ) {
			return ( key[0] !== '_' );
		} );
		keys.forEach( function( key ) {
			if ( request.body.hasOwnProperty( key ) ) monster[ key ] = request.body[ key ];
		} );
		monster.save( function( err ) {
			if ( err ) return response.send( err );
			response.json( monster.toJSON( { virtuals: true } ) );
		} );
	} );
});

monsterRoutes.update( function( request, response ) {
	monsterData.findById( request.params.id, function( err, monster ) {
		if ( ! monster ) {
			console.warn( 'invalid update request: no such monster', request.params.id, request.body );
			response.statusCode = 404;
			return response.send( 'Error: 404: Monster not found.' );
		}
		console.log( 'update request', request.params.id, request.body );
		var keys = Object.getOwnPropertyNames( monster.schema.paths ).filter( function( key ) {
			return ( key[0] !== '_' );
		} );
		keys.forEach( function( key ) {
			if ( request.body.hasOwnProperty( key ) ) monster[ key ] = request.body[ key ];
		} );
		monster.save( function( err ) {
			if ( err ) return response.send( err );
			response.json( monster.toJSON( { virtuals: true } ) );
		} );
	} );
});

monsterRoutes.delete( function( request, response ) {
	monsterData.remove( {
		_id: request.params.id
	}, function( err, monster ) {
		if ( err ) return response.send( err );
		if ( ! monster ) {
			console.warn( 'invalid delete request: no such monster', request.params.id );
			response.statusCode = 404;
			return response.send( 'Error: 404: Monster not found.' );
		}
		console.log( 'delete request', request.params.id );
		response.json( monster );
	} );
});

module.exports = monsterRoutes;
