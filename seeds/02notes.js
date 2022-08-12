/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("notes").del();
  await knex("notes").insert([
    { user_id: 1, content: "sam1" },
    { user_id: 1, content: "sam2" },
    { user_id: 2, content: "lesley" },
    { user_id: 2, content: "lesley" },
  ]);
};
