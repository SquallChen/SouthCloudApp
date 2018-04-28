//定义一个全局的myDB对象
var myDB = {
    name: 'test',
    version: 1,
    db: null
};

var imMsg = [{label:1, test:'trytest'}];

var storeArr = ['test', 'hello', 'try'];

// deleteDB(myDB.name);

openDB(myDB.name, myDB.version);
setTimeout(function() {
    addData(myDB.db, storeArr[0]);
    // updateDataByKey(myDB.db, 'test1', 1);
    // deleteDataByKey(myDB.db, 'test1', 2);
    // clearObjectStore(myDB.db, 'test1');
    // getDataByKey(myDB.db, 'test', 1);
    // cursor(myDB.db, 'hello');
}, 3000);



//创建或者数据库
function openDB(name, version) {
    var version = version || 1;
    var request = window.indexedDB.open(name, version);
    //失败回调
    request.onerror = function(e) {
        console.log(e.currentTarget.error.message);
    };
    //成功回调并将数据库对象赋值myDB对象中
    request.onsuccess = function(e) {
        myDB.db = e.target.result;
    };

    request.onupgradeneeded = function(e) {
        var db = e.target.result;
        console.log(storeArr);

        //添加ObjectStore
        for (var i = 0; i < storeArr.length; i++) {
            if (!db.objectStoreNames.contains(storeArr[i])) {
                //keyPath
                // db.createObjectStore(store, { keyPath: "id" });
                //keyGenerate自增长ID
                db.createObjectStore(storeArr[i], { autoIncrement: true });
            }

        }
        //删除ObjectStore
        // if (db.objectStoreNames.contains(store)) {
        //     db.deleteObjectStore(store);
        // }
        console.log('DB version changed to ' + version);
    };
}

//关闭数据库
function closeDB(db) {
    db.close();
}

//删除数据库
function deleteDB(name) {
    indexedDB.deleteDatabase(name);
}

//添加数据
function addData(db, storeName) {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    for (var i = 0; i < imMsg.length; i++) {
        store.add(imMsg[i]);
    }
}

//查找数据
function getDataByKey(db, storeName, value) {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    var request = store.get(value);
    request.onsuccess = function(e) {
        var student = e.target.result;
        console.log(student.name);
    };
}

//更新ObjectStore数据值
function updateDataByKey(db, storeName, value) {
    console.log(value);
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    var request = store.get(value);
    request.onsuccess = function(e) {
        var studentput = e.target.result;
        console.log(studentput);
        studentput.age = 125;
        studentput.name = 'cao';
        store.put(studentput);
    };
}

//删除值
function deleteDataByKey(db, storeName, value) {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    store.delete(value);
}

//清空ObjectStore
function clearObjectStore(db, storeName) {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    store.clear();
}

//遍历数据传入数组
var customers = [];

function cursor(db, storeName) {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName);
    var count = 0;
    store.openCursor(null, 'prev').onsuccess = function(event) {
        count++;
        var cursor = event.target.result;
        if (cursor && count < 51) {
            customers.push(cursor.value);
            cursor.continue();
        } else {}
    };
}
