const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my2dgame-7bad3-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your database URL
});

const db = admin.database();

const playersRef = db.ref('players');

playersRef.on('child_added', (snapshot) => {
    console.log("New player added:");
    console.log(snapshot.key, snapshot.val());
});

playersRef.on('child_changed', (snapshot) => {
    console.log("Player updated:");
    console.log(snapshot.key, snapshot.val());
});

playersRef.on('child_removed', (snapshot) => {
    console.log("Player removed:");
    console.log(snapshot.key);
});

const playerRef = db.ref('players/player1');

playerRef.update({
    score: 1600
}).then(() => {
    console.log("Player score updated.");
}).catch(err => {
    console.error("Update failed:", err);
});

const playerToDelete = db.ref('players/player2');

playerToDelete.remove()
    .then(() => {
        console.log("Player2 delete successfully.");
        db.goOffline();
        process.exit(0);
    })
    .catch((err) => {
        console.error("Deletion failed:", err);
        process.exit(1);
    });
