websqlOps = {

  createdb: function() {
    this.db = openDatabase('Items', '1', 'Items Store', 1024 * 1024)
    this.db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                    'items (ID INTEGER PRIMARY KEY ASC, item TEXT, added_on DATETIME)', [])
    })
  },

  add : function() {
  	onError = this.onError

    this.db.transaction(function(tx){
      var addedOn = new Date();
      tx.executeSql('INSERT INTO items(item, added_on) VALUES (?,?)',
          ['test', addedOn],
          storageWatcher.display('An item has been added to Web SQL DB'),
          onError);
     })
  },

  readAll: function() {
  	callback = this.callback
  	onError = this.onError

    this.db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM items", [], callback, onError);
    })
  },

  onError: function(tx, e) {
    storageWatcher.display('There has been an error: ' + e.message)
  },

  callback: function (tx, rs) {
    for (var i=0; i < rs.rows.length; i++) {
      storageWatcher.display('Web SQL Database Value ' + rs.rows.item(i).ID + ' added on: ' + rs.rows.item(i).added_on);
    }
  }
}