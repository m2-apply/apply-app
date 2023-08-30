import { Pool } from 'pg';

const PG_URI =
  'postgres://qspnceod:0MDas8XPh1cH8fq9gHUoTwxsZHjos5Jf@mahmud.db.elephantsql.com/qspnceod';

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params) => {
    console.log('executed query', text);
    console.log('query params', params);
    return pool.query(text, params);
  },
};

export default db;
