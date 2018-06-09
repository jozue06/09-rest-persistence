const superagent = require('superagent');
require('/Users/joshuamcclung/codefellows/401/09-rest-persistence/src/api/api.js');

describe('app',() =>{

  it('should post a note with id', () =>{
    let obj = {
      content: 'freds name', 
      title: 'Fred'};
    let expected;
    return superagent
      .post('http://localhost:3333/api/v1/notes')
      .send(obj)
      .then(data => expect(expected).toEqual(data.body.id))

      .catch(err => {return err;});
  });


  it('should get back a note with specific id', () => {

    return superagent
      .get('http://localhost:3333/api/v1/notes?id=')
      .then(data => {
        expect(data.statusCode).toBe(404);
      } )
      .catch(err => {return err;});
  });



});