window.onload = () => {
  listIssues();

  setInterval(() => {
    listIssues();
  }, 15000);
};

// Listagem dos problemas cadastrados.
function listIssues() {
  db.collection('Register')
    .get()
    .then((querySnapshot) => {
      var tableBody = document.getElementById('tableBody');
      var rowCount = tableBody.rows.length;

      if (rowCount > 0) {
        for (let i = 0; i < rowCount; i++) {
          tableBody.deleteRow(0);
        }
      }

      querySnapshot.forEach((doc) => {
        console.log(doc.data().title);
        console.log(doc.data().place);
        console.log(doc.id);
        console.log(doc.data().photo);
        console.log(doc.data().status);

        rowCount = tableBody.rows.length;
        var row = tableBody.insertRow(rowCount - 1);
        row.classList.add('tableRow');
        row.onclick = () => {
          viewIssue();
        };

        let col0 = row.insertCell(0);
        let col1 = row.insertCell(1);
        let col2 = row.insertCell(2);
        let col3 = row.insertCell(3);

        col0.appendChild(document.createTextNode(doc.data().title));
        col1.appendChild(document.createTextNode(doc.data().place));
        col2.appendChild(document.createTextNode(doc.id));
        col3.appendChild(document.createTextNode(doc.data().status));
      });
    });
}
