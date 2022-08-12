const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const basicAuth = require("express-basic-auth");
const TodoRouter = require("./Router/TodoRouter");
const NoteServer = require("./Server/NoteServer");
const myAuthorizer = require("./Authorization");
const { connection } = require("pg");
const knexfile = require("./knexfile").development;

const knex = require("knex")(knexfile);

//Authorization
app.use(
  basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    authorizeAsync: true,
    realm: "My App",
  })
);

//Set handlebars engine
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const note = new NoteServer(knex);
const route = new TodoRouter(note, express);

//landing page, {{{body}}} content
app.get("/", (req, res) => {
  note.read(req.auth.user).then((notes) => {
    console.log("notes :", notes);
    res.render("index", {
      user: req.auth.user,
      notes,
    });
  });
});

app.use("/note", route.router());

//Bonus: auto save function

app.listen(3001, () => {
  console.log("Listening on port: 3001");
});
