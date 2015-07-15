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
 .controller('SeedDataCtrl', function(Room, Message, $scope, Firebase, chance){
   $scope.rooms= Room.all;

   $scope.options = [1,2,3,4,5,6,7,8,9,10];

   $scope.createRoom = function(num){
    for(var i=0; i<num; i++){
     var room = {name: '', created: ''};
     room.name = chance.word({syllables: 3});
     var timestamp = Firebase.ServerValue.TIMESTAMP;
     room.created = timestamp;
     Room.create(room);
    }
    $scope.option ='';
    $scope.status = num + ' rooms created!';
   };

   $scope.createMsg = function(msgnum, rm){
      for(var i=0; i<msgnum; i++){
       var message = {username: '', content: '', roomId: rm.$id, sentAt: ''};
       message.username = chance.twitter();
       message.content = chance.paragraph();
       var timestamp = Firebase.ServerValue.TIMESTAMP;
       message.sentAt = timestamp;
       Message.create(message);
        // console.log(msgnum + ' messages for ' + rm.name);
      }
      $scope.msgnum ='';
      $scope.msgselected ='';
    
      $scope.status = msgnum + ' messages created!';
   };
 });
