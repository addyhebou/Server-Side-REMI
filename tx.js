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
    await client.connect();
    console.log('Client successfully connected - woo hoo!');
    await client.query('BEGIN'); // to start transaction
    await client.query('delete from public."Tasks" where "TaskName" = $1', [
      'Get MIDI',
    ]);
    await client.query('COMMIT');
  } catch (error) {
    console.log('DOH!', error);
    await client.query('ROLLBACK');
  } finally {
    await client.end();
    console.log('Client successfully disconnected');
  }
}

execute();
