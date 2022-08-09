//prevent redirect page
$("button").on("click", (e) => {
  e.preventDefault();
});

const noteTemplate = Handlebars.compile(`
  {{#each notes}}
      <div class="note">
          <span class="input"><textarea id={{@index}}>{{this}}</textarea></span>

          <button class="remove btn btn-xs" id={{@index}}><i class="fa fa-trash" aria-hidden="true"></i></button>
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
    axios.post("note", { note }).then((res) => reloadNotes(res.data));
  });

  // put function
  $("#notes").on("blur", "textarea", (e) => {
    axios.put("note/" + $(e.currentTarget).attr("id"), {
      note: $(e.currentTarget).val(),
    });
  });

  // delete function
  $("#notes").on("click", ".remove", (e) => {
    axios.delete("note/" + $(e.currentTarget).attr("id")).then((res) => {
      reloadNotes(res.data);
    });
  });
});

//display notes
function reloadNotes(noteData) {
  console.log("noteData : " + noteData);
  $("#notes").html(noteTemplate({ note: noteData }));
}
