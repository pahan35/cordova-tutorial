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
        document.getElementById("findContacts").addEventListener("click", findContacts);
        document.getElementById("prepareDatabase").addEventListener("click", function () {
            prepareDatabase(function(db) {
                // got database
                var span = document.getElementById('doc-count');
                showDocCount(db, span);
            }, function (e) {
                // error getting database
                alert(e.message);
            });
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function findContacts() {
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;

    fields = ["displayName"];
    navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

    function contactfindSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            alert("Display Name = " + contacts[i].displayName);
            // TODO: Write contacts into local storage
        }
    }

    function contactfindError(message) {
        alert('Failed because: ' + message);
    }

}

function prepareDatabase(ready, error) {
    var db = openDatabase('documents', '1.0', 'Offline document storage', 5*1024*1024, function (db) {
        db.changeVersion('', '1.0', function (t) {
            t.executeSql('CREATE TABLE docids (id, name)');
        }, error);
        ready(db);
    });

}

function showDocCount(db, span) {
    db.readTransaction(function (t) {
        t.executeSql('SELECT COUNT(*) AS c FROM docids', [], function (t, r) {
            span.textContent = r.rows[0].c;
        }, function (t, e) {
            // couldn't read database
            span.textContent = '(unknown: ' + e.message + ')';
        });
    });
}