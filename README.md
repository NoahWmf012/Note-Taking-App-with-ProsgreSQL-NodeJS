# Note Taking Application with Database
This application use: BasicAuth for authentication, handlebars for rendering, knexJS for DB handling(CREATE TABLE, INSERT INTO, DELETE etc.), PosgresSQP as Database

### How To Start This APP

- run: `cd Note-Taking-Application-DB`
- run: `npm install express express-handlebars express-basic-auth pg knex dotenv`
- open your Postgres psql
- open a new `.env` file with 3 variables:
  `DB_NAME`
  `DB_USERNAME`
  `DB_PASSWORD`

### How To Run This APP

- run: `cd Note-Taking-Application-DB`
- run: `node app.js`
- open Google Chrome: http://localhost:3001/

The success logined page will be like the following picture:
<br/>
<img width="858" alt="Screen Shot 2022-09-22 at 3 08 07 PM" src="https://user-images.githubusercontent.com/67308492/191681081-c2f72369-3348-42f9-bb96-9233e7c896f5.png">
