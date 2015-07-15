'use strict';

/**
 * @ngdoc overview
 * @name seederApp
 * @description
 * # seederApp
 *
 * Main module of the application.
 */
angular
  .module('seederApp', ['firebase', 'ui.bootstrap'])

  .constant('FIREBASE_URL', 'https://jennifer.firebaseio.com')

  .factory('Room', function($firebase, $firebaseArray, $firebaseObject, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL + '/rooms');
    // var query = ref.orderByChild('created');

    var rooms = $firebaseArray(ref);
    return {
      all: rooms,
      create: function(room){
        return rooms.$add(room);
      },
      get: function(roomId){
        return $firebaseObject(ref.child('rooms').child(roomId));
      },
      delete: function(room){
        return rooms.$remove(room);
      },
    };
  })

  .factory('Message', function($firebase, $firebaseArray, $firebaseObject, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL + '/messages');
    // var query = ref.orderByChild('created');

    var messages = $firebaseArray(ref);
    return {
      all: messages,
      create: function(message){
        return messages.$add(message);
      },
      get: function(messageId){
        return $firebaseObject(ref.child('messages').child(messageId));
      },
      delete: function(message){
        return messages.$remove(message);
      },
    };
  });