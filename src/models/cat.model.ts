import connect, { sql } from "@databases/sqlite";
import { Cat, PageOffset, PageSort } from "../types";

const db = connect();

async function prepare() {
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS cats (
      id VARCHAR PRIMARY KEY,
      name TINYTEXT NOT NULL,
      breed_group TINYTEXT NOT NULL,
      weight UNSIGNED SMALLINT NOT NULL
    );
  `);
}

const prepared = prepare();

async function add(cat: Cat) {
  await prepared;
  await db.query(sql`
    INSERT INTO cats (id, name, breed_group, weight) 
    VALUES (${cat.id}, ${cat.name}, ${cat.breedGroup}, ${cat.weight});
  `);
}

async function getById(id: string): Promise<Cat | null> {
  await prepared;
  const results = await db.query(sql`
    SELECT * FROM cats WHERE id=${id};
  `);
  return results.length ? results[0] : null;
}

async function deleteById(id: string) {
  await prepared;
  await db.query(sql`
    DELETE FROM cats WHERE id=${id};
  `);
}

async function listAll(offset: PageOffset, sort: PageSort) {
  await prepared;

  const results = await db.query(sql`
    SELECT * FROM cats 
    ORDER BY ${sql.__dangerous__rawValue(sort.field)} ${sql.__dangerous__rawValue(sort.direction)}
    LIMIT ${offset.limit} OFFSET ${offset.offset};
  `);
  return results;
}

async function searchByName(name: string) {
  await prepared;
  return db.query(sql`
    SELECT * FROM cats WHERE name LIKE '%' || ${name} || '%';
  `);
}

export default {
  add,
  getById,
  deleteById,
  listAll,
  searchByName,
};
