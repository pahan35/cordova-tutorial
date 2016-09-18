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
        document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
        document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
        document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
        document.getElementById("dialogBeep").addEventListener("click", dialogBeep);
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

function dialogAlert() {
    var message = "I am Alert Dialog!";
    var title = "ALERT";
    var buttonName = "Alert Button";

    navigator.notification.alert(message, alertCallback, title, buttonName);

    function alertCallback() {
        console.log("Alert is Dismissed!");
    }

}

function dialogConfirm() {
    var message = "Am I Confirm Dialog?";
    var title = "CONFIRM";
    var buttonLabels = "YES,NO";

    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

    function confirmCallback(buttonIndex) {
        console.log("You clicked " + buttonIndex + " button!");
    }

}

function dialogPrompt() {
    var message = "Am I Prompt Dialog?";
    var title = "PROMPT";
    var buttonLabels = ["YES","NO"];
    var defaultText = "Default"

    navigator.notification.prompt(message, promptCallback, title, buttonLabels, defaultText);

    function promptCallback(result) {
        console.log("You clicked " + result.buttonIndex + " button! \n" +
            "You entered " +  result.input1);
    }

}

function dialogBeep() {
    var times = 2;
    navigator.notification.beep(times);
}

function onBatteryStatus(info) {
    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
}