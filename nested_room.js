const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my2dgame-7bad3-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();
const roomRef = db.ref('rooms/roomA');

roomRef.set({
    status: "active",
    createdAt: admin.database.ServerValue.TIMESTAMP,
    maxPlayers: 4,
    players: {
        player1: {
            username: "MageMaster",
            score: 800,
            isOnline: true
        },
        player2: {
            username: "KnightX",
            score: 1200,
            isOnline: true
        }
    },
    logs: {
        join1: {
            event: "player1 joined",
            time: Date.now()
        }
    }
}).then (() => {
    console.log("Nested room data written.");
    db.goOffline();
    process.exit(0);
}).catch((err) => {
    console.error("Something went wrong", err);
    process.exit(1);
});