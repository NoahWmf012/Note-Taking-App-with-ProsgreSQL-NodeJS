//prevent redirect page
$("button").on("click", (e) => {
  e.preventDefault();
});

const noteTemplate = Handlebars.compile(`
  {{#each notes}}
      <div class="note">
          <span class="input"><textarea id={{id}}>{{content}}</textarea></span>

          <button class="remove btn btn-xs" id={{id}}><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>
  {{/each}}
`);
// handling frontend functions
$(() => {
  // add function
  $("#add").on("click", (e) => {
    e.preventDefault();

    const note = $("#add-note").val();
    if (note === "") return;

    $("#add-note").val("");
    axios.post("/note", { note }).then((res) => reloadNotes(res.data));
  });

  // put function
  $("#notes").on("blur", "textarea", (e) => {
    axios.put("/note/" + $(e.currentTarget).attr("id"), {
      note: $(e.currentTarget).val(),
    });
  });

  // delete function
  $("#notes").on("click", ".remove", (e) => {
    axios.delete("/note/" + $(e.currentTarget).attr("id")).then((res) => {
      reloadNotes(res.data);
    });
  });
});

//display notes
function reloadNotes(noteData) {
  var notes = JSON.stringify(noteData);
  var parsed = JSON.parse(notes);
  console.log("parsed : ", parsed);
  $("#notes").html(
    noteTemplate({
      parsed,
    })
  );
}
