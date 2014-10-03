var mongoose = require( 'mongoose' );
var MonsterModel = require( '../models/monster' );
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
	name: String,
	description: String,
	created: { type: Date, default: Date.now },
	level: { type: Number, default: 1 }, // CR 0 = level 1, CR 1/8 = level 2, etc.
	size: { type: String, default: 'medium' }, // one of 'tiny', 'small', 'medium', 'large', 'huge', 'gargantuan'
	speed: { type: String, default: '30 ft.' },
	armor: String, // one of 'padded', 'leather', 'studded leather'... 'splint mail', 'plate mail'
	shield: { type: Boolean, default: false },
	naturalArmor: String, // same as (and replaces) armor, but will be reported as 'natural armor'
	senses: String,
	languages: String,
	resistances: [String],
	immunities: [String],
	vulnerabilities: [String],
	traits: [String],
	actions: [String],
	legendaryActions: [String],
	abilityOrder: { type: [String], default: [ 'str', 'dex', 'con', 'wis', 'int', 'cha' ] }, // each string should be one of 'con', 'str', etc.
	abilities: { type: Object, default: {} }
});

MonsterSchema.pre( 'save', function( next ) {
	for ( var i = 0; i < 6; i++ ) {
		if ( ! this.abilities[ this.abilityOrder[ i ] ] ) {
			this.abilities[ this.abilityOrder[ i ] ] = MonsterModel.getDefaultAbilityAt( i );
		}
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

MonsterSchema.virtual( 'damage' ).get( function() {
	return MonsterModel.getDamage( this.level );
});

MonsterSchema.virtual( 'proficiencyBonus' ).get( function() {
	return MonsterModel.getProficiencyBonus( this.level );
});

MonsterSchema.virtual( 'meleeAttackBonus' ).get( function() {
	return MonsterModel.getAttackBonus( this.level, this.abilities.str );
});

MonsterSchema.virtual( 'rangedAttackBonus' ).get( function() {
	return MonsterModel.getAttackBonus( this.level, this.abilities.dex );
});

MonsterSchema.virtual( 'magicAttackBonus' ).get( function() {
	return MonsterModel.getAttackBonus( this.level, this.abilities.int );
});

MonsterSchema.virtual( 'strSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.str );
});

MonsterSchema.virtual( 'dexSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.dex );
});

MonsterSchema.virtual( 'conSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.con );
});

MonsterSchema.virtual( 'intSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.int );
});

MonsterSchema.virtual( 'wisSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.wis );
});

MonsterSchema.virtual( 'chaSaveDC' ).get( function() {
	return MonsterModel.getSaveDC( this.level, this.abilities.cha );
});

module.exports = mongoose.model( 'Monster', MonsterSchema );

