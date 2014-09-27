var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
	name: String,
	description: String
});

module.exports = mongoose.model( 'Monster', MonsterSchema );
