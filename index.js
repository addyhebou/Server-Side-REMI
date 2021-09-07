const { Client } = require('pg'); // gets the Client attribute from PG databse
const client = new Client({
  user: 'postgres',
  password: 'Sourwood2014@12345678',
  host: 'localhost',
  port: 5432,
  database: '2021 Goals',
});

client
  .connect()
  .then(() => console.log('Connected successfully - woohoo!'))
  .then(() =>
    client.query(
      'SELECT * FROM public."Tasks" as Tasks WHERE Tasks."Category" = $1',
      ['Tech']
    )
  )
  .catch((e) => console.log(e))
  .then((results) => console.table(results.rows))
  .catch((err) => console.log)
  .finally(() => client.end());
