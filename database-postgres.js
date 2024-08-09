import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres {
  async create(artigo) {
    const artigoID = randomUUID();
    // const artigoID = 1;
    const { nome, descricao, conteudo, imagem, github } = artigo;

    await sql`insert into artigos (id, nome, descricao, conteudo, imagem, github) 
              values (${artigoID}, ${nome}, ${descricao}, ${conteudo}, ${imagem}, ${github})`;
  }

  async read(search) {
    let artigos;
    if (search) {
      artigos = await sql`select * from artigos where nome ilike ${'%' + search + '%'}`;
    } else {
      artigos = await sql`select * from artigos`;
    }
    return artigos;
  }

  async update(id, artigo) {
    const { nome, descricao, conteudo, imagem, github } = artigo;

    await sql`update artigos set 
              nome = ${nome}, 
              descricao = ${descricao}, 
              conteudo = ${conteudo}, 
              imagem = ${imagem}, 
              github = ${github} 
              where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from artigos where id = ${id}`;
  }
}


// function saudacao(nome) {
//   return 'Olá, ' + nome + '!';
// }

// console.log(saudacao('João')); // Saída: Olá, João!