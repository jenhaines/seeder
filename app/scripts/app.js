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
      markComplete: function(room){
          room.status = 'complete';
          return rooms.$save(room);
      }
    };

  });