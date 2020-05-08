const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const Sports = require('./models/sport-model');
const app = express();

// let sports = [

// ]

/* Your code goes here */
app.delete('/sports/delete', (reqs, res) => {
    let id = reqs.body.id;
    let sportId = reqs.query.id;
    if(!id) {
        res.statusMessage = "no id was sent in the body"
        return res.statusCode(406).end();
    }
    if(!sportId) {
        res.statusMessage = "no id was sent in query parameters"
        return res.statusCode(406).end();
    }
    
    if(sportId != id) {
        res.statusMessage = "the ids dont match";
        return res.statusCode(409).end();
    }
    Sports.deleteSport(sportId)
        .then(res => {
            if(res.deletedCount < 1) {
                err.statusMessage = "the id doesnt exist";
                return res.statusCode(404).end();
            }
            res.statusMessage = "sport deleted";
            return res.statusCode(204).end();
        }).catch(err => {
            err.statusMessage = "server error" + err;
            return err.statusCode(400)
        })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});