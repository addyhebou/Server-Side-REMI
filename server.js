const { Client } = require('pg');
const express = require('express');
const app = express();
app.use(express.json());
const client = new Client({
  user: 'postgres',
  password: 'Sourwood2014@12345678',
  host: 'localhost',
  port: 5432,
  database: '2021 Goals',
});
const port = 8080;

start();

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get('/tasks', async (req, res) => {
  const rows = await readTasks();
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(rows));
});

app.post('/tasks', async (req, res) => {
  let result = {};
  try {
    const reqJSON = req.body;
    await addTask(reqJSON.task);
    res.success = true;
  } catch (error) {
    res.success = false;
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
  }
});

app.delete('/tasks', async (req, res) => {
  let result = {};
  try {
    const reqJSON = req.body;
    await deleteTask(reqJSON.TaskName);
    res.success = true;
  } catch (error) {
    res.success = false;
  } finally {
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(result));
  }
});

// app.listen(8080, () => console.log('Web server is listening... on port 8080'));
app.listen(process.env.PORT || port, () =>
  console.log(`Web server is listening... on http://localhost:${port}`)
);

async function start() {
  try {
    await connect();
  } catch (error) {
    console.log('Connection failed smh: ', error);
  } finally {
    // await end();
  }
}

async function connect() {
  try {
    await client.connect();
    console.log('Connected successfully - woohoo!');
  } catch (error) {
    console.log('DOH', error);
  }
}

async function end() {
  await client.end();
  console.log('Connection closed and finished - phew!');
}

async function readTasks() {
  try {
    const { rows } = await client.query('select * from public."Tasks"');
    return rows;
  } catch (error) {
    console.log('Error reading tasks', error);
    return false;
  }
}

async function addTask(taskname, category) {
  try {
    await client.query('insert into public."Tasks" values ($1, $2)', [
      taskname,
      category,
    ]);
    return true;
  } catch (error) {
    console.log('Error adding task:', error);
    return false;
  }
}

async function deleteTask(taskname) {
  try {
    await client.query('delete from public."Tasks" where "TaskName" = $1', [
      taskname,
    ]);
    return true;
  } catch (error) {
    console.log('Error deleting task:', error);
    return false;
  }
}