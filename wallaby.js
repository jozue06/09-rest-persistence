module.exports = function () {

  return{

    files: ['./src/lib/**/*.js'],
    
    tests: ['./__test__/**/*.test.js'],
    
    env: {
      type: 'node',
    },
    
    testFramework: 'jest',

  };
};