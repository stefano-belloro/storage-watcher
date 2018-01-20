(function() {

  // DOM elements
  var webStorageCheck = document.getElementById('webStorageCheck')
  var indexedDBCheck = document.getElementById('indexedDBCheck')
  var webSQLDBCheck = document.getElementById('webSQLDBCheck')
  var addEntry = document.getElementById('addEntry')
  var readAll = document.getElementById('readAll')

  if (window.indexedDB) {
    idbOps.createdb()
  } else {
    alert('Your browser does not support Indexed DB')
  }
  if (window.openDatabase) {
    websqlOps.createdb() 
  } else {
    alert('Your browser does not support Web SQL DB')
  }

  storageWatcher = {}
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
        alert('Failed to Add to Web Storage')
      }
    }

    if (indexedDBCheck.checked) {  
      try {
        idbOps.add();
      } catch (err) {
        alert('Failed to add to IndexedDB')
      }
    }

    if (webSQLDBCheck.checked) {  
      try {
        websqlOps.add();
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
})()
