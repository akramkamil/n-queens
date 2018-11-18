// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //var row =this.attributes[rowIndex]
      var count=0;
      var row= this.get(rowIndex);
        for(var i=0; i<row.length; i++){
          //console.log(row,433)
          count=count+row[i]
        }
        if(count>1){
          return true;
        }
    return false
       // fixme

    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //var row =this.attributes[0]
      var row= this.get(0);
      for(var i = 0; i<row.length; i++){
        if(this.hasRowConflictAt(i) === true){
          return true;
        }
      }
      
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //debugger
      var count=0;
      //console.log(colIndex)
      var col= this.get(colIndex);
      //console.log(colIndex)
          for(var j = 0; j < col.length; j++){
            var col= this.get(j);            
            count=count+col[colIndex]            
          }
        if(count>1){
          return true;
        }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var col = this.get(0);
      for(var i = 0; i<col.length; i++){
        if(this.hasColConflictAt(i) === true){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
          // debugger
             var count=0;

      var firstRow= this.get(0);

for(var j = 0; j < firstRow.length - Math.abs(majorDiagonalColumnIndexAtFirstRow); j++){
  if(majorDiagonalColumnIndexAtFirstRow >= 0){
    var row= this.get(j);            
    count=count+row[j+majorDiagonalColumnIndexAtFirstRow]  
  }else {
    var row= this.get(j+Math.abs(majorDiagonalColumnIndexAtFirstRow));            
    count=count+row[j]
  }
                      
          }
        if(count>1){
          return true;
        }      
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var col = this.get(0);
      for(var i = - this.get('n') +1; i<col.length; i++){
        if(this.hasMajorDiagonalConflictAt(i) === true){
          return true;
        }
      }
      return false; // fixme
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      debugger;
                var count=0;

      var firstRow= this.get(0);
console.log(minorDiagonalColumnIndexAtFirstRow)
      for(var j = firstRow.length-1 - Math.abs(minorDiagonalColumnIndexAtFirstRow); j >= 0; j--){
      for(var i = 0; i < Math.abs(firstRow.length-1 - minorDiagonalColumnIndexAtFirstRow); i++){
         if(minorDiagonalColumnIndexAtFirstRow <= 3){
        var row= this.get(i+minorDiagonalColumnIndexAtFirstRow);            
        count=count+row[j-i]
      }
  else {
        var row= this.get(i);            
        count=count+row[j-1]
      }
   
  }
                      
          }
        if(count>1){
          return true;
        } 
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
