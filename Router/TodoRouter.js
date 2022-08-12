class TodoRouter {
  constructor(note, express) {
    this.note = note;
    this.express = express;
  }

  router() {
    let router = this.express.Router();
    router.get("/", this.getAll.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this));
    return router;
  }

  async getAll(req, res) {
    let _note = await this.note.read(req.auth.user);
    res.json(_note);
  }

  async post(req, res) {
    await this.note.add(req.body.note, req.auth.user);
    let _note = await this.note.read(req.auth.user);
    res.json(_note);
  }

  async put(req, res) {
    await this.note.update(req.params.id, req.body.note, req.auth.user);
    let _note = await this.note.read(req.auth.user);
    res.json(_note);
  }

  async delete(req, res) {
    await this.note.remove(req.params.id);
    let _note = await this.note.read(req.auth.user);
    res.json(_note);
  }
}

module.exports = TodoRouter;
