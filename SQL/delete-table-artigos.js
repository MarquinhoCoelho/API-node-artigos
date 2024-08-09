import { sql } from '../db.js'

sql`
  DROP TABLE artigos;
`.then(() => {
  console.log('tabela deletada');
})