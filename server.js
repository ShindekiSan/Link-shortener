const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const http = require('http')

const app = express();

// const options = {
//     host: 'proxy',
//     port: 5000,
//     path: 'http://localhost:5000',
//     headers: {
//         Host: 'localhost:5000'
//     }
// };

// http.get(options, function(res) {
//     console.log(res);
//     res.pipe(process.stdout)
// });

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start () {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been startet on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
};

start()
