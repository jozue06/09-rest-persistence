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

let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

router.get('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    Notes.findOne(req.query.id)
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
  else {
    Notes.fetchAll()
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
});

router.delete('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    Notes.deleteOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,deleted:success};
        sendJSON(res,data);
      })
      .catch(console.error);
  }
});

router.post('/api/v1/notes', (req,res) => {

  let record = new Notes(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);

});

module.exports = {};


/*'use strict';

const router = require('../lib/router.js');

function routesHeader (res){
  res.statusCode = 200;
  res.statusMessage = 'OK';
}

router.get('/', (req,res) => {
  routesHeader(res);
  let name = req.query.name || '';
  res.write(`Hello drummer ${name}`);
  res.end();
});


router.get('/api',(req,res) =>{
  res.statusCode = 400;
  res.statusMessage = 'bad request';
  res.end();
});

router.get('/api/v1/drums', (req, res)=>{
  if(!req.query.id){
    res.statusCode = 404;
    res.statusMessage = 'not found';
    return err;
  }
  else{
    routesHeader(res);
    res.write(`drum info for ID: ${req.query.id}`);
    res.end();
  }
});

// test with httpie:
//    echo '{"title":"Go Home","content":"foobar"}' | http post http://localhost:3333/data
 
router.post('/api/v1/drums', (req,res) => {
  if(!req.body){
    res.statusCode = 500;
    res.statusMessage = 'no such record';
    return err;}
  else{
    // routesHeader(res);
    res.write( JSON.stringify(req.body) );
    res.end();
  }
});

router.put('/api/v1/drums', (req,res) => {
  if(!req.query.id){return err;}
  else if(!req.body){return err;}
  else{
    routesHeader(res);  
    res.write(JSON.stringify(req.body));
    res.end();
  }
  
});


router.delete('/api/v1/drums', (req,res) => {
  routesHeader(res);
  res.write(`id: ${req.query.id} was deleted`);
  res.end();
});



module.exports = {};

*/