'use strict';

const router = require('../lib/router.js');
const Notes = require('../models/notes.js');

/**
 * Simple method to send a JSON response (all of the API methods will use this)
 * @param res
 * @param data
 */
let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let sendDeleted = (res,data) => {
  // let deleteMessage = {message:'id deleted'};
  res.statusCode = 204;
  res.statusMessage = 'ID deleted';
  res.setHeader('Content-Type', 'application/json');
  res.write(data);
  res.end();
};

let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

let routesError = (res, err) => {
  let error = {error:err};
  res.statusCode = 404;
  res.statusMessage = 'Connot find ID';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

let routesErrorId = (res) => {
  res.statusCode = 400;
  res.statusMessage = 'bad request';
  res.setHeader('Content-Type', 'application/json');
  res.end();
};


router.get('/api/v1/notes', (req,res) => {

  if(req.query.id === ''){
    routesErrorId(res);
  }

  if ( req.query.id ) { 
    Notes.findOne(req.query.id)
      .then( data => sendJSON(res,data) )
      .catch( err => routesError(res,err) );
  }

  else {
    Notes.fetchAll()
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
});


router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(`Hello, welcome to notes`);
  res.end();
});



router.post('/api/v1/notes', (req,res) => {
  if(!req.body || req.body === {} || !req.body.id){
    console.log('no body', req.body);
    routesErrorId(res);
  }
  else{
    let record = new Notes(req.body);
    record.save()
      .then(data => sendJSON(res,data))
      .catch('post catch', console.error);
  }
  
});

router.put('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    Notes.updateOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,updated:success};
        sendJSON(res,data);
      })
      .catch(console.error);
  }
});

router.delete('/api/v1/notes', (req,res) => {
  if (req.query.id) { 
    Notes.deleteOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,updated:success};
        sendDeleted(res,data);
      })
      .catch( err => {
        routesError(res,err);} );
  }
  
});


module.exports = {};
