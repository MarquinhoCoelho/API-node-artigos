import { sql } from '../db.js'

sql`
  ALTER TABLE artigos
  ALTER COLUMN id TYPE text;
`.then(() => {
  console.log('tabela alterada id: text');
})