const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my2dgame-7bad3-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your database URL
});

const db = admin.database();

const playerListRef = db.ref('players');

const newPlayers = [
    {
        username: "MageMaster", score: 900, level: 2 },
    {   username: "KnihgtX", score: 1400, level: 4 },
    {   username: "ShadowWolf", score: 1100, level: 3 }
];

const insertPromises = newPlayers.map(player => {
    return playerListRef.push(player);
});

Promise.all(insertPromises)
.then(() => {
    console.log("All players pushed to database.");
    db.goOffline();
    process.exit(0);
})
.catch((err) => {
    console.error("Error pushing players to database:", err);
    process.exit(1);
});