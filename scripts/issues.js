window.onload = () => {
  listIssues();

  setInterval(() => {
    listIssues();
  }, 15000);
};

// Listagem dos problemas cadastrados.
window.listIssues = function () {
  let search;
  var tableBody = document.getElementById('tableBody');
  var rowCount = tableBody.rows.length;

  firebase.auth().onAuthStateChanged(function (user) {
    if (tableBody.getAttribute('data-issue-type') === 'my-issues') {
      search = db.collection('Register').where('userId', '==', user.uid).get();
    } else {
      search = db.collection('Register').get();
    }

    search.then((querySnapshot) => {
      if (rowCount > 0) {
        for (let i = 0; i < rowCount; i++) {
          tableBody.deleteRow(0);
        }
      }

      const issues = [];

      querySnapshot.forEach((doc) => {
        issues.push({
          date: doc.data().date.toDate(),
          description: doc.data().description,
          title: doc.data().title,
          email: doc.data().email,
          place: doc.data().place,
          status: doc.data().status,
          userId: doc.data().userId,
          issueId: doc.id,
        });
      });

      issues.sort((a, b) => (a.date > b.date ? 1 : -1));

      issues.forEach((issue) => {
        var row = tableBody.insertRow(0);
        row.classList.add('tableRow');
        row.onclick = (event) => {
          viewIssue(event.target.getAttribute('data-issue-id'));
        };

        const col = [];

        for (let index = 0; index < 5; index++) {
          col.push(row.insertCell(index));
          col[index].setAttribute('data-issue-id', issue.issueId);
        }

        const formatedEmail = issue.email.split('@')[0];

        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = issue.date.toLocaleDateString('pt-BR', options);

        col[0].appendChild(document.createTextNode(issue.title));
        col[1].appendChild(document.createTextNode(issue.place));
        col[2].appendChild(document.createTextNode(formatedEmail));
        col[3].appendChild(document.createTextNode(date));
        col[4].appendChild(document.createTextNode(issue.status));

        if (tableBody.getAttribute('data-issue-type') === 'my-issues') {
          col[2].classList.add('d-none');
        }
      });
    });
  });
};
