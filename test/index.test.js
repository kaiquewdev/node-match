var match = require('../');
var should = require('should');
var util = require('util');

describe('Match', function () {
  describe('when', function () {
    it('string have a token with pattern', function ( done ) {
      var actual = 'fizzbuzz';
      var token = 'buzz';
      var secondToken = 'buuz';
      var expected = [ actual, 'boo' ].join('');

      function completeMatchingHandler () {
        var self = this; 

        self
          .input
          .should
          .eql( expected );

        done();
      }

      function tokenHandler () {
        var self = this;

        self.input += 'boo';
      }

      match( actual )
        .when( token, tokenHandler )
        .when( secondToken, tokenHandler )
        .end( completeMatchingHandler );
    });  

    it('regexp have a token with pattern', function ( done ) {
      var actual = 'fizzbuzz';
      var token = /buzz/;
      var expected = [ actual, 'boo' ].join('');

      function completeMatchingHandler () {
        var self = this; 

        self
          .input
          .should
          .eql( expected );

        done();
      }

      function tokenHandler () {
        var self = this;

        self.input += 'boo';
      }

      match( actual )
        .when( token, tokenHandler )
        .end( completeMatchingHandler );
    });
  });  

  describe('whenNot', function () {
    it('string have a token with pattern', function ( done ) {
      var actual = 'fizzboo';
      var token = 'buzz';
      var secondToken = 'buuz';
      var expected = [ actual, 'boo', 'boo' ].join('');

      function completeMatchingHandler () {
        var self = this; 

        self
          .input
          .should
          .eql( expected );

        done();
      }

      function tokenHandler () {
        var self = this;

        self.input += 'boo';
      }

      match( actual )
        .whenNot( token, tokenHandler )
        .whenNot( secondToken, tokenHandler )
        .end( completeMatchingHandler );
    });  

    it('regexp have a token with pattern', function ( done ) {
      var actual = 'fizzboo';
      var token = /buzz/;
      var expected = [ actual, 'boo' ].join('');

      function completeMatchingHandler () {
        var self = this; 

        self
          .input
          .should
          .eql( expected );

        done();
      }

      function tokenHandler () {
        var self = this;

        self.input += 'boo';
      }

      match( actual )
        .whenNot( token, tokenHandler )
        .end( completeMatchingHandler );
    });
  });
});
