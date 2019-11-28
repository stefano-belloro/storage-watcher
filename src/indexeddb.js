 idbOps = {

  db: {},
  createdb: function() {
    var request = window.indexedDB.open('Entries', 1)

    request.onupgradeneeded = function(e) {
      db = e.target.result;
      var objectStore = db.createObjectStore('entries', {keyPath: 'id', autoIncrement: true})
    }

    request.onsuccess = function(e) {
      db = e.target.result;
    }

    request.onerror = function(e) {
      console.log('error: ')
      console.dir(e)
    }

  },
  readAll: function() {
    var objectStore = db.transaction('entries').objectStore('entries');
    
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       if (cursor) {
          storageWatcher.display('IndexedDB Value ' + cursor.value.id + ' added on: ' + cursor.value.added_on);
          cursor.continue();
       }
    };
  },

  add: function() {
    var objectStore = db.transaction(['entries'], 'readwrite').objectStore('entries');
    var item = {
      value: 'test', 
      added_on: new Date()
    }

    var request = objectStore.add(item)

    request.onsuccess = function(event) {
       storageWatcher.display('An item has been added to IndexedDB.')
    }

    request.onerror = function(event) {
       storageWatcher.display('Unable to add data')
    }
  }
}