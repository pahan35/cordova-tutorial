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
        document.getElementById("getLanguage").addEventListener("click", getLanguage);
        document.getElementById("getLocaleName").addEventListener("click", getLocaleName);
        document.getElementById("getDate").addEventListener("click", getDate);
        document.getElementById("getCurrency").addEventListener("click", getCurrency);
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

function getLanguage() {
    navigator.globalization.getPreferredLanguage(onSuccess, onError);

    function onSuccess(language) {
        alert('language: ' + language.value + '\n');
    }

    function onError(){
        alert('Error getting language');
    }

}

function getLocaleName() {
    navigator.globalization.getLocaleName(onSuccess, onError);

    function onSuccess(locale) {
        alert('locale: ' + locale.value);
    }

    function onError(){
        alert('Error getting locale');
    }

}

function getDate() {
    var date = new Date();

    var options = {
        formatLength:'short',
        selector:'date and time'
    }

    navigator.globalization.dateToString(date, onSuccess, onError, options);

    function onSuccess(date) {
        alert('date: ' + date.value);
    }

    function onError(){
        alert('Error getting dateString');
    }

}

function getCurrency() {
    var currencyCode = 'EUR';
    navigator.globalization.getCurrencyPattern(currencyCode, onSuccess, onError);

    function onSuccess(pattern) {
        alert('pattern: '  + pattern.pattern  + '\n' +
            'code: '     + pattern.code     + '\n' +
            'fraction: ' + pattern.fraction + '\n' +
            'rounding: ' + pattern.rounding + '\n' +
            'decimal: '  + pattern.decimal  + '\n' +
            'grouping: ' + pattern.grouping);
    }

    function onError(){
        alert('Error getting pattern');
    }

}

function onBatteryStatus(info) {
    alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
}