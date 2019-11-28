// Created by Stefano Belloro, as part of a cybersecurity study

// Local Storage
if (window.localStorage) {
  var lcs = {};
  lcs.add = function() {
    var keyname = 'Value' + localStorage.length;
    var addedOn = new Date();
    localStorage.setItem(keyname, addedOn);    
    alert('An item has been added to localStorage.');
  }

  lcs.readAll = function() {
    if (localStorage.length) {
      for (var i = 0; i < localStorage.length; i++){
        alert('Web Storage (localStorage) value ' + (i + 1) + ' = ' + localStorage.getItem(localStorage.key(i)));
      }
    }
  }
} else {
  window.alert('Your browser does not support Web Storage')
  $('input.webStorage').attr('disabled', true).attr('checked', false);
}

// Indexed Database API
if (window.indexedDB) {
  var idb = {};
  var db;
  idb.request = window.indexedDB.open('Entries', 1);

  idb.request.onerror = function(event) {
    console.log('error: ');
  };

  idb.request.onsuccess = function(event) {
    db = idb.request.result;
  };

  idb.request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('entries', {keyPath: 'id', autoIncrement: true});
  }

  idb.readAll = function() {
    var objectStore = db.transaction('entries').objectStore('entries');
    
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       if (cursor) {
          alert('IndexedDB Value ' + cursor.value.id + ' added on: ' + cursor.value.added_on);
          cursor.continue();
       }
    };
  }

  idb.add = function() {
    var addedOn = new Date();
    var request = db.transaction(['entries'], 'readwrite')
    .objectStore('entries')
    .add({ value: 'test', added_on: addedOn });
    
    request.onsuccess = function(event) {
       alert('An item has been added to IndexedDB.');
    };

    request.onerror = function(event) {
       alert('Unable to add data');
    }
  }
} else {
  window.alert('Your browser does not support IndexedDB.')
  $('input.indexedDB').attr('disabled', true).attr('checked', false);
}

// Web SQL Database
if (window.openDatabase) {
  var webSQLdb = {};

  webSQLdb.open = function() {
    webSQLdb.db = openDatabase('Items', '1', 'Items Store', 1024 * 1024);
  }

  webSQLdb.onError = function(tx, e) {
    alert('There has been an error: ' + e.message);
  }

  webSQLdb.createTable = function() {
    var db = webSQLdb.db;
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                    'items (ID INTEGER PRIMARY KEY ASC, item TEXT, added_on DATETIME)', []);
    });
  }

  webSQLdb.add = function() {
    var db = webSQLdb.db;
    db.transaction(function(tx){
      var addedOn = new Date();
      tx.executeSql('INSERT INTO items(item, added_on) VALUES (?,?)',
          ['test', addedOn],
          alert('An item has been added to Web SQL DB'),
          webSQLdb.onError);
     });
  }

  webSQLdb.readAll = function() {
    var db = webSQLdb.db;
    db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM items", [], webSQLdb.callback,
          webSQLdb.onError);
    });
  }

  webSQLdb.callback = function (tx, rs) {
    for (var i=0; i < rs.rows.length; i++) {
      alert('Web SQL Database Value ' + rs.rows.item(i).ID + ' added on: ' + rs.rows.item(i).added_on);
    }
  }

  webSQLdb.open();
  webSQLdb.createTable();

} else {
  window.alert('Your browser does not support Web SQL Database')
}

// DOM elements
var webStorageCheck = document.getElementById('webStorageCheck')
var indexedDBCheck = document.getElementById('indexedDBCheck')
var webSQLDBCheck = document.getElementById('webSQLDBCheck')
var addEntry = document.getElementById('addEntry')
var readAll = document.getElementById('readAll')

storageWatcher = {}
storageWatcher.readAll = function() {
  if (webStorageCheck.checked) {  
    lcs.readAll();
  }
  if (indexedDBCheck.checked) {  
    idb.readAll();
  }
  if (webSQLDBCheck.checked) {  
    webSQLdb.readAll();
  }
}

storageWatcher.add = function() {
  if (webStorageCheck.checked) {  
    try {
      lcs.add();
    } catch (err) {
      alert('Failed to Add to Web Storage')
    }
  }

  if (indexedDBCheck.checked) {  
    try {
      idb.add();
    } catch (err) {
      alert('Failed to add to IndexedDB')
    }
  }

  if (webSQLDBCheck.checked) {  
    try {
      webSQLdb.add();
    } catch (err) {
      alert('Failed to add to Web SQL DB')
    }
  }
}

addEntry.onclick=function(){
  storageWatcher.add()
}

readAll.onclick=function(){
  storageWatcher.readAll()
}
