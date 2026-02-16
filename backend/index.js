const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
