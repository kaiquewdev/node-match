var main = null;
var ctx = {};

function matchHandler ( token, input ) {
  var tokenIsString = ( 'string' === typeof( token ) );
  var tokenIsRegExp = ( token instanceof RegExp );
  var inputHasPattern = ( tokenIsString && ( ~input.indexOf( token ) ) );

  return inputHasPattern = ( 
    inputHasPattern || ( 
      tokenIsRegExp && ( token.test( input ) ) 
    ) 
  );
}

function matchWhenHandler ( token, whenHandler ) {
  var self = this;
  var input = self.input;
  var whenHandler = ( whenHandler || function whenHandler () {} );
  var inputHasPattern = matchHandler( token, input );

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
  var inputHasPattern = matchHandler( token, input );

  self.decisionTree.push( inputHasPattern );
  self.lastDecision = inputHasPattern;

  if ( !inputHasPattern ) {
    whenNotHandler.call( self );  
  }

  return self;
}

function matchAndHandler ( token, andHandler ) {
  var self = this;
  var input = self.input;
  var andHandler = ( andHandler || function andHandler () {} );
  var inputHasPattern = matchHandler( token, input );
  var hasTrueSignal = ( inputHasPattern && ( self.lastDecision ) );

  self.decisionTree.push( hasTrueSignal );
  self.lastDecision = hasTrueSignal;

  if ( hasTrueSignal ) {
    andHandler.call( self );  
  }

  return self;
}

function matchOrHandler ( token, orHandler ) {
  var self = this;
  var input = self.input;
  var orHandler = ( orHandler || function orHandler () {} );
  var inputHasPattern = matchHandler( token, input );
  var hasFalseSignal = !( inputHasPattern && ( self.lastDecision ) );

  self.decisionTree.push( hasFalseSignal );
  self.lastDecision = hasFalseSignal;

  if ( hasFalseSignal ) {
    orHandler.call( self );  
  }

  return self;
}

function cleanDecisionTreeHandler () {
  var self = this;

  self.decisionTree = [];

  return self;
}

function cleanLastDecisionHandler () {
  var self = this;

  self.lastDecision = null;

  return self;
}

function matchEndHandler ( endHandler ) {
  var self = this;
  var endHandler = ( endHandler || function endHandler () {} );

  endHandler.call( self );
  cleanDecisionTreeHandler.call( self );
  cleanLastDecisionHandler.call( self );

  return self;
}

function mainHandler ( input ) {
  var self = ctx = {};

  self.input = ( input || '' );
  self.decisionTree = [];
  self.lastDecision = null;
  self.when = matchWhenHandler.bind( self );
  self.whenNot = matchWhenNotHandler.bind( self );
  self.and = matchAndHandler.bind( self );
  self.or = matchOrHandler.bind( self );
  self.end = matchEndHandler.bind( self );

  return self;
}
main = mainHandler;

module.exports = exports = main;
