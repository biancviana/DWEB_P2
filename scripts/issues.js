window.onload = () => {
  listIssues();

  setInterval(() => {
    listIssues();
  }, 15000);
};

// Listagem dos problemas cadastrados.
function listIssues() {
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

      querySnapshot.forEach((doc) => {
        rowCount = tableBody.rows.length;
        var row = tableBody.insertRow(rowCount - 1);
        row.classList.add('tableRow');
        row.onclick = (event) => {
          viewIssue(event.target.getAttribute('data-issue-id'));
        };

        const col = [];

        for (let index = 0; index < 4; index++) {
          col.push(row.insertCell(index));
          col[index].setAttribute('data-issue-id', doc.id);
        }

        const formatedEmail = doc.data().email.split('@')[0];

        col[0].appendChild(document.createTextNode(doc.data().title));
        col[1].appendChild(document.createTextNode(doc.data().place));
        col[2].appendChild(document.createTextNode(formatedEmail));
        col[3].appendChild(document.createTextNode(doc.data().status));

        if (tableBody.getAttribute('data-issue-type') === 'my-issues') {
          col[2].classList.add('d-none');
        }
      });
    });
  });

  // if (email == null || email == undefined || email == '') {
  //   buscar = db.collection('Register').get(); // vai buscar tudo da tabela sem comparar com o email. ou seja, caso a pessoa não esteja cadastrada, ela verá a tabela completa de outros usuários.
  // } else {
  //   buscar = db.collection('Register').where('email', '==', email).get(); // aqui é feito uma busca direta com o email especificado. ou seja, se o email informado pelo usuário for igual ao email que está no localstorage (que foi autenticado - function authUser), será retornado uma tabela com os SEUS problemas, de acordo com o SEU email.
  // }
}
