const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );


// id: uuid.v4(), // This is a String type holding a uuid
// name: String,
// num_players: Number
/* Your code goes here */
const sport = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    num_players: { type: Number, required: true }
});

const sportsCollection = mongoose.model('sports', sport);

const Sports = {
    deleteSport: (id) => {
        return sportsCollection
            .deleteOne({id})
                .then(res => {
                    console.log("sport deleted");
                    return res;
                })
                .catch(err => {return err});
    }
}

module.exports = {
    Sports
};