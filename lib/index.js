var main = null;
var ctx = {};

function matchWhenHandler ( token, whenHandler ) {
  var self = this;
  var input = self.input;
  var whenHandler = ( whenHandler || function whenHandler () {} );
  var tokenIsString = ( 'string' === typeof( token ) );
  var tokenIsRegExp = ( token instanceof RegExp );
  var inputHasPattern = ( tokenIsString && ( ~input.indexOf( token ) ) );

  inputHasPattern = ( 
    inputHasPattern || ( 
      tokenIsRegExp && ( token.test( input ) ) 
    ) 
  );

  self.decisionTree.push( inputHasPattern );
  self.lastDecision = inputHasPattern;
  
  if ( inputHasPattern ) {
    whenHandler.call( self );
  }

  return self;
}

function matchWhenNotHandler ( token, whenNotHandler ) {
  var self = this;
  var input = self.input;
  var whenHandler = ( whenHandler || function whenNotHandler () {} );
  var tokenIsString = ( 'string' === typeof( token ) );
  var tokenIsRegExp = ( token instanceof RegExp );
  var inputHasPattern = ( tokenIsString && ( ~input.indexOf( token ) ) );

  inputHasPattern = ( 
    inputHasPattern || ( 
      tokenIsRegExp && ( token.test( input ) ) 
    ) 
  );

  self.decisionTree.push( inputHasPattern );
  self.lastDecision = inputHasPattern;

  if ( !inputHasPattern ) {
    whenNotHandler.call( self );  
  }

  return self;
}

function matchEndHandler ( endHandler ) {
  var self = this;
  var endHandler = ( endHandler || function endHandler () {} );

  endHandler.call( self );

  return self;
}

function mainHandler ( input ) {
  var self = ctx = {};

  self.input = input;
  self.decisionTree = [];
  self.lastDecision = null;
  self.when = matchWhenHandler.bind( self );
  self.whenNot = matchWhenNotHandler.bind( self );
  self.end = matchEndHandler.bind( self );

  return self;
}
main = mainHandler;

module.exports = exports = main;
