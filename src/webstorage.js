webstorageOps = {
  add: function() {
    var keyname = 'Value' + localStorage.length
    var addedOn = new Date()
    localStorage.setItem(keyname, addedOn)
    storageWatcher.display('An item has been added to localStorage.')	
  },
  readAll: function() {
    if (localStorage.length) {
      for (var i = 0; i < localStorage.length; i++){
        storageWatcher.display('Web Storage (localStorage) value ' + (i + 1) + ' = ' + localStorage.getItem(localStorage.key(i)))
      }
    }
  }
}