'use strict';

/**
 * @ngdoc function
 * @name seederApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the seederApp
 */
 angular
 .module('seederApp')
 .controller('SeedDataCtrl', function(Room, Message, $scope){
   $scope.rooms= Room.all;

   $scope.options = [1,2,3,4,5,6,7,8,9,10];

   $scope.createRoom = function(num){
    for(var i=0; i<num; i++){
     var room = {name: '', created: ''};
     room.name = chance.word({syllables: 3});
     var timestamp = Firebase.ServerValue.TIMESTAMP;
     room.created = timestamp;
     Room.create(room);
    };
    $scope.option ='';
    $scope.status = num + " rooms created!"
   };

   $scope.createMsg = function(msgnum, rm ){
      for(var i=0; i<msgnum; i++){
       var message = {username: '', body: '', roomId: rm.$id, created: ''};
       message.username = chance.twitter();
       message.body = chance.paragraph();
       var timestamp = Firebase.ServerValue.TIMESTAMP;
       message.created = timestamp;
       Message.create(message);
        // console.log(msgnum + ' messages for ' + rm.name);
      };
      $scope.room ='';
    
      $scope.status = msgnum + " messages created!";
   };

   // random number generator
   var rndNumGen = function(start, finish){
     return Math.floor((Math.random() * finish) + start);
   };

 // used to create realistic seed data
   var getRandomDate = function() {
     var from = new Date(2015, 5, 1).getTime();
     var to = new Date().getTime();
     return new Date(from + Math.random() * (to - from)).getTime();
   };

   var getRandomStatus = function() {
     var x = rndNumGen(0, 1);
     if(x===0){
       return 'active';
     }else{
       return 'complete';
     }
   };
 });
