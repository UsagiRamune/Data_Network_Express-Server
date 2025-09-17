const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my2dgame-7bad3-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your database URL
});

const db = admin.database();

const playerRef = db.ref('players/player1');
const roomRef = db.ref('rooms/roomA');

Promise.all([
    playerRef.set({
        username: 'PlayerOne',
        score: 1500,
        isOnline: true,
        lastLogin: new Date().toISOString()
    }),
    roomRef.set({
        status: "waiting",
        maxPlayers: 4,
        players: {
            player1: true,
        },
        createdAt: admin.database.ServerValue.TIMESTAMP
    })
])
.then(() => {
    console.log("Data written successfully to Realtime Database.");
    db.goOffline();
    process.exit(0);
})
.catch((err) => {
    console.error("Error writing data to Realtime Database:", err);
    process.exit(1);
});