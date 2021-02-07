/* ARMAZENAMENTO DE DADOS, UTILIZANDO CLOUD FIRESTORE:

 - Cadastrando um problema com base no título, descrição detalhada, lugar e foto. */

function registerIssue(event) {
  event.preventDefault();

  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let place = document.getElementById('place').value;
  let photo = document.getElementById('photo').files[0];

  firebase.auth().onAuthStateChanged(function (user) {
    db.collection('Register')
      .add({
        title: title,
        description: description,
        place: place,
        status: 'Cadastrado',
        userId: user.uid,
        email: user.email,
      })
      .then((docRef) => {
        if (photo) {
          let storageRef = firebase.storage().ref('issues/' + docRef.id);
          storageRef.put(photo);

          docRef
            .update({
              photo: storageRef.fullPath,
            })
            .then(() => {
              showAlert('Formulário de problema cadastrado com sucesso!', 2000);

              setTimeout(() => {
                myIssuesView();
              }, 1000);
            });
        } else {
          showAlert('Formulário de problema cadastrado com sucesso!', 2000);

          setTimeout(() => {
            myIssuesView();
          }, 1000);
        }
      })
      .catch(function (error) {
        console.error('Erro ao cadastrar formulário! ', error);
        alert('Erro ao cadastrar formulário! ', error);
      });
  });
}
