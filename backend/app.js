const express = require('express');
const cors = require('cors');
const app = express()
const port = 3300

app.use(cors());
app.use(express.json());
app.use*express.urlencoded({extended: false});

app.use(require('./src/routes/user.routes'));
app.use(require('./src/routes/register.routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})