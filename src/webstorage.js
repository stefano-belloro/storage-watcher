webstorageOps = {
  add: function() {
    var keyname = 'Value' + localStorage.length
    var addedOn = new Date()
    localStorage.setItem(keyname, addedOn)
    alert('An item has been added to localStorage.')	
  },
  readAll: function() {
    if (localStorage.length) {
      for (var i = 0; i < localStorage.length; i++){
        alert('Web Storage (localStorage) value ' + (i + 1) + ' = ' + localStorage.getItem(localStorage.key(i)))
      }
    }
  }
}