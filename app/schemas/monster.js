var mongoose = require( 'mongoose' );
var MonsterModel = require( '../models/monster' );
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
	name: String,
	description: String,
	created: { type: Date, default: Date.now },
	level: Number, // CR 0 = level 1, CR 1/8 = level 2, etc.
	size: String, // one of 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'
	speed: String,
	armor: String, // one of 'padded', 'leather', 'studded leather'... 'splint mail', 'plate mail'
	shield: Boolean,
	naturalArmor: String, // same as (and replaces) armor, but will be reported as 'natural armor'
	resistances: [String],
	immunities: [String],
	vulnerabilities: [String],
	traits: [String],
	actions: [String],
	abilityOrder: [String], // each string should be one of 'con', 'str', etc.
	abilities: {}
});

MonsterSchema.pre( 'save', function( next ) {
	for ( var i = 0; i < 6; i++ ) {
		this.abilities[ this.abilityOrder[ i ] ] = MonsterModel.getDefaultAbilityAt( i );
	}
	next();
});

MonsterSchema.virtual( 'cr' ).get( function() {
	return MonsterModel.getCR( this.level );
});

MonsterSchema.virtual( 'hitDie' ).get( function() {
	return MonsterModel.getHitDie( this.size );
});

MonsterSchema.virtual( 'hitDice' ).get( function() {
	return MonsterModel.getHitDiceCount( this.level );
});

MonsterSchema.virtual( 'hp' ).get( function() {
	return MonsterModel.getHP( this.hitDie, this.hitDice, this.abilities.con );
});

MonsterSchema.virtual( 'ac' ).get( function() {
	return MonsterModel.getAC( this.armor, this.naturalArmor, this.shield, this.abilities.dex );
});

module.exports = mongoose.model( 'Monster', MonsterSchema );

