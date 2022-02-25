const express = require('express');
const router = require('./routes/router.js');
const bodyParser = require('body-parser');
require('dotenv').config({ path: __dirname + '/.env' });
const PORT = process.env.PORT || 3333;

const app = express();

// parse requests bearing payload in JSON format
app.use(express.json());
// parse requests bearing payload in image/png format
app.use(bodyParser.raw({
    type: 'image/png',
    limit: '10mb'
}));

app.use('/', router);

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };

    const errorObj = { ...defaultErr, ...err };
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});