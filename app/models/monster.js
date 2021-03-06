module.exports = {
	getProficiencyBonus: function( level ) {
		var cr = this.getCRNumeric( level );
		var bonus = 0;
		switch ( true ) {
			case ( cr < 5 ):
				bonus = 2;
			break;
			case ( cr < 9 ):
				bonus = 3;
			break;
			case ( cr < 13 ):
				bonus = 4;
			break;
			case ( cr < 17 ):
				bonus = 5;
			break;
			case ( cr < 21 ):
				bonus = 6;
			break;
			case ( cr < 25 ):
				bonus = 7;
			break;
			case ( cr < 29 ):
				bonus = 8;
			break;
			case ( cr > 28 ):
				bonus = 9;
			break;
		}
		return bonus;
	},

	getBonusForAbility: function( score ) {
		return Math.floor( ( score - 10 ) / 2 );
	},

	getDefaultAbilityAt: function( index ) {
		var abilityScoreArray = [ 15, 14, 13, 12, 10, 8 ];
		return abilityScoreArray[ index ];
	},

	calculateAC: function( armor, dex ) {
		dex = this.getBonusForAbility( dex );
		var ac = 10;
		switch( armor.toLowerCase() ) {
			case 'padded':
				ac = 11 + dex;
			break;
			case 'leather':
				ac = 11 + dex;
			break;
			case 'studded leather':
				ac = 12 + dex;
			break;
			case 'hide':
				ac = 12 + this.maxAbility( dex, 2 );
			break;
			case 'chain shirt':
				ac = 13 + this.maxAbility( dex, 2 );
			break;
			case 'scale':
				ac = 14 + this.maxAbility( dex, 2 );
			break;
			case 'breastplate':
				ac = 14 + this.maxAbility( dex, 2 );
			break;
			case 'half plate':
				ac = 15 + this.maxAbility( dex, 2 );
			break;
			case 'ring mail':
				ac = 14;
			break;
			case 'chain mail':
				ac = 16;
			break;
			case 'splint mail':
				ac = 17;
			break;
			case 'plate mail':
				ac = 18;
			break;
		}
		return ac;
	},

	maxAbility: function( score, max ) {
		if ( score > max ) return max;
		return score;
	},

	getCR: function( level ) {
		switch( level ) {
			case 1:
				return '0';
			case 2:
				return '1/8';
			case 3:
				return '1/4';
			case 4:
				return '1/2';
			default:
				return level - 4;
		}
	},

	getCRNumeric: function( level ) {
		switch( level ) {
			case 1:
				return 0;
			case 2:
				return 0.125;
			case 3:
				return 0.25;
			case 4:
				return 0.5;
			default:
				return level - 4;
		}
	},

	getHitDie: function( size ) {
		switch( size.toLowerCase() ) {
			case 'tiny':
				return 4;
			case 'small':
				return 6;
			case 'medium':
				return 8;
			case 'large':
				return 10;
			case 'huge':
				return 12;
			case 'gargantuan':
				return 20;
			default:
				return 8;
		}
	},

	getHitDiceCount: function( level ) {
		return level;
	},

	getHP: function( hitDie, hitDice, con ) {
		con = this.getBonusForAbility( con );
		return Math.floor( ( hitDice * ( hitDie / 2 ) ) + ( con * hitDice ) );
	},

	getAC: function( armor, naturalArmor, shield, dex ) {
		dex = this.getBonusForAbility( dex );
		if ( ! armor && ! naturalArmor ) return dex + 10;

		if ( naturalArmor ) return this.calculateAC( naturalArmor, dex );

		var ac = this.calculateAC( armor, dex );
		if ( shield ) ac += 2;
		return ac;
	},

	getDamage: function( level ) {
		return ( this.getCRNumeric( level ) * 6 ) + 1;
	},

	getAttackBonus: function( level, ability ) {
		return this.getProficiencyBonus( level ) + this.getBonusForAbility( ability );
	},

	getSaveDC: function( level, ability ) {
		return 8 + this.getProficiencyBonus( level ) + this.getBonusForAbility( ability );
	}

};
