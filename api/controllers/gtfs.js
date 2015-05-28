'use strict';
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var async = require('async');
var util = require('util');

module.exports.updates = function (req, res) {
  /**
   * Created by Jeff West on 5/26/15.
   */

  var entities = [];

  var api_key = req.swagger.params.api_key.value;

  var requestSettings = {
    method: 'GET',
    url: "http://api.511.org/transit/tripupdates?api_key=" + api_key + "&agency=vta",
    encoding: null
  };

  request(requestSettings, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

      feed.entity.forEach(function (entity) {

        if (entity.trip_update) {
          entities.push(entity);
          console.log(entity.trip_update);
        }

      });

      res.json(entities);
    }
    else {
      res.status(500).send('error: ' + error)
    }

  });

};

module.exports.updatesByTrip = function (req, res) {
  /**
   * Created by Jeff West on 5/26/15.
   */

  var paramTripId = req.swagger.params.tripId.value;

  var entities = [];

  var api_key = req.swagger.params.api_key.value;

  var requestSettings = {
    method: 'GET',
    url: "http://api.511.org/transit/tripupdates?api_key=" + api_key + "&agency=vta",
    encoding: null
  };

  request(requestSettings, function (error, response, body) {

    if (!error && response.statusCode == 200) {

      var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

      feed.entity.forEach(function (entity) {

        if (entity.trip_update) {
          var elementTripId = entity['id'].split('-')[0];

          if (paramTripId == elementTripId) {
            entities.push(entity);
            console.log(entity.trip_update);
          }
        }

      });

      res.json(entities);
    }
    else {
      res.status(500).send('error: ' + error)
    }

  });

};
