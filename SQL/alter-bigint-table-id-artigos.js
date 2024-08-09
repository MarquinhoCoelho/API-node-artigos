import { sql } from '../db.js'

sql`
  ALTER TABLE artigos
  ALTER COLUMN id TYPE bigint USING id::bigint;
`.then(() => {
  console.log('tabela alterada id: bigint');
})