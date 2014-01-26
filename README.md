# Match

# Description

Simple pattern matching with chain style for node.js

# Installation

  [sudo] npm install match

# Usage

  ```javascript
  var match = require('node-match');

  function whenHandler () {
    console.log('Matched!');
  }

  match('fizzbuzz')
    .when('buzz', whenHandler);
    .end();
  ```

# API

## When

  // Match when the token is founded as string or regexp

  .when( token, callback )

## WhenNot

  // Match when not the token is founded as string or regexp

  .whenNot( token, callback )

## And

  // Match and the token is founded as string or regexp
  
  .and( token, callback )

## Or

  // Match or the token is founded as string or regexp

  .or( token, callback )

## End

  // Finish the matching

  .end( callback )

# License

  Under BSD-2

# Author

  Kaique da Silva - kaique.developer@gmail.com

