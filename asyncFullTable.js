const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: 'Sourwood2014@12345678',
  host: 'localhost',
  port: 5432,
  database: '2021 Goals',
});

async function execute() {
  try {
    await client.connect(); // waits for client to connect before going to the next line, cannot fail and still clg
    console.log('Connected successfully'); // won't gt execute if client.connect() fails
    const { rows } = await client.query(
      'SELECT * from public."Tasks" as Tasks'
    );
    console.table(rows);
  } catch (e) {
    console.log(`Something wrong happened: ${e}`);
  } finally {
    await client.end();
    console.log('Client disconnected');
  }

  // good note to await for all client functions: just write await before client
}

execute();
