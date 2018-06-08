const superagent = require('superagent');

describe('app',() =>{

  it('should', () =>{


    // const expected = 'ID: 123';
    // expect(actual).toBe
    superagent
      .get('http://localhost:3333/api/v1/drums?id=123')
      .then(data=> console.log(data))
      .catch(err => console.log(err));



  });



});