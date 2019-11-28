(function() {

  // DOM elements
  var webStorageCheck = document.getElementById('webStorageCheck')
  var indexedDBCheck = document.getElementById('indexedDBCheck')
  var webSQLDBCheck = document.getElementById('webSQLDBCheck')
  var addEntry = document.getElementById('addEntry')
  var readAll = document.getElementById('readAll')
  var clearLogs = document.getElementById('clearLogs')
  var messageBox = document.getElementById('messageBox')

  storageWatcher = {}

  storageWatcher.display = function (message) {
    //alert(message);
    console.log(message)
    var messagePar = document.createElement('p')
    messagePar.innerText = message
    messageBox.appendChild(messagePar)
  }

  if (window.indexedDB) {
    idbOps.createdb()
  } else {
    storageWatcher.display('Your browser does not support Indexed DB')
  }
  if (window.openDatabase) {
    websqlOps.createdb() 
  } else {
    storageWatcher.display('Your browser does not support Web SQL DB')
  }

  storageWatcher.readAll = function() {
    if (webStorageCheck.checked) {  
      webstorageOps.readAll();
    }
    if (indexedDBCheck.checked) {  
      idbOps.readAll();
    }
    if (webSQLDBCheck.checked) {  
      websqlOps.readAll();
    }
  }


  storageWatcher.add = function() {
    if (webStorageCheck.checked) {  
      try {
        webstorageOps.add();
      } catch (err) {
        storageWatcher.display('Failed to Add to Web Storage')
      }
    }

    if (indexedDBCheck.checked) {  
      try {
        idbOps.add();
      } catch (err) {
        storageWatcher.display('Failed to add to IndexedDB')
      }
    }

    if (webSQLDBCheck.checked) {  
      try {
        websqlOps.add();
      } catch (err) {
        storageWatcher.display('Failed to add to Web SQL DB')
      }
    }
  }

  addEntry.onclick = function() {
    storageWatcher.add()
  }

  readAll.onclick = function(){
    storageWatcher.readAll()
  }

  clearLogs.onclick = function() {
    messageBox.innerHTML = ''
  }
})()
