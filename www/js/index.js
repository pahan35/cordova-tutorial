/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        window.addEventListener("batterystatus", onBatteryStatus, false);
        document.getElementById("getOrientation").addEventListener("click", getOrientation);
        document.getElementById("watchOrientation").addEventListener("click", watchOrientation);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    }
};

app.initialize();

var localStorage = window.localStorage;

document.addEventListener("volumeupbutton", callbackFunction, false);

function callbackFunction() {
    alert('Volume Up Button is pressed!')
}

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
    e.preventDefault();
    alert('Back Button is Pressed!');
}

function getOrientation(){
    navigator.compass.getCurrentHeading(compassSuccess, compassError);

    function compassSuccess(heading) {
        alert('Heading: ' + heading.magneticHeading);
    };

    function compassError(error) {
        alert('CompassError: ' + error.code);
    };

}

function watchOrientation(){

    var compassOptions = {
        frequency: 3000
    }

    var watchID = navigator.compass.watchHeading(compassSuccess, compassError, compassOptions);

    function compassSuccess(heading) {
        alert('Heading: ' + heading.magneticHeading);

        setTimeout(function() {
            navigator.compass.clearWatch(watchID);
        }, 10000);

    };

    function compassError(error) {
        alert('CompassError: ' + error.code);
    };

}

function onBatteryStatus(info) {
    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
}