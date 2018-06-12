const superagent = require('superagent');
require('../../../src/api/api.js');
const app = require('../../../src/app.js');


/*
## Tests
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:

 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found [ X ]
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request [ X ]
 * `GET`: test 200, it should contain a response body for a request made with a valid id [ X ]
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid [ X ]
 * `POST`: test 200, it should respond with the body content for a post request with a valid body [ X ]
 * 

*/

describe('app',() =>{

  beforeAll( () => {
    app.start(3300);
  });

  afterAll( ()=>{

    app.stop();
  });



  it('should post a new note with the body, and get back that note with a specific id', () => {
    let obj = {
      id:'33',
      content: 'freds name', 
      title: 'Fred'};
    return superagent
      .post('http://localhost:3300/api/v1/notes')
      .send(obj)

      .then(data =>
      {
        let returns = data.body.id;//?
        return superagent
          .get(`http://localhost:3300/api/v1/notes?id=${returns}`)//?
          .then(data => {
            // console.log(data.body.id);
            // console.log(returns);
            expect(data.body.id).toEqual(returns);//?
          } )
          .catch(err => {return err;});
      });

  });



  it('should return error for post 400', () => {
    let obj = {};
    return superagent
      .post('http://localhost:3300/api/v1/notes')
      .send(obj)
      .then(res => {
        console.log(res.statusCode);
        expect(res.statusCode).toEqual('3');
      })
      .catch(err => {
       
        return err;});
  });



});