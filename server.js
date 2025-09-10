const express = require('express');
const logger = require('./middleware/logger');
const path = require('path');
const app = express();

app.use(logger);                    
app.use(express.json());            
app.use(express.static(path.join(__dirname, 'public'))); 

const playerRoutes = require('./routes/player');
app.use('/player', playerRoutes);   

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
