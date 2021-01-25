const signInButton = document.getElementById('nav-sign-in');
const signUpButton = document.getElementById('nav-sign-up');

const createIssueButton = document.getElementById('nav-create-issue');
const myIssuesButton = document.getElementById('nav-my-issues');
const signOutButton = document.getElementById('nav-sign-out');

const email = document.getElementById('input-email');
const password = document.getElementById('input-password');
const errorMessage = document.getElementById('error-message');

function openSignInUpModal(modalType) {
  const button = document.getElementById('sign-in-up-button');

  if (modalType === 'signIn') {
    button.onclick = () => {
      authUser();
    };
    button.textContent = 'Entrar';

    document.getElementById('sign-in-up-modal-title').textContent = 'Entrar';
  } else {
    button.onclick = () => {
      createUser();
    };
    button.textContent = 'Criar Conta';

    document.getElementById('sign-in-up-modal-title').textContent =
      'Criar Conta';
  }

  $('#sign-in-up-modal').modal('toggle');
  $('#sign-in-up-modal').modal('show');
}

function createUser() {
  //traz todas as variáveis do formulário

  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      showAlert('Tudo pronto por aqui. Sua conta foi criada com sucesso!');

      //confirmação do usuário via e-mail cadastrado.
      const user = result.user;

      user.updateProfile({ displayName: 'Bianca Viana e Gabriel Willian' });
      console.log(user);

      closeModal();

      user
        .sendEmailVerification()
        .then((r) => {
          showAlert(
            'Um e-mail de verificação foi enviado. Verifique na sua caixa de entrada!'
          );
        })
        .catch((e) => alert('Houve um erro ao enviar o e-mail!'));
    })
    .catch((err) => {
      setError(err.message + '!');
    });
}

function authUser() {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((result) => {
      closeModal();
      showAlert(`Bem vindo, ${email.value.split('@')[0]}!`);

      console.log(result);
    })
    .catch((err) => {
      alert('Ops, não foi possível logar!');
      console.error(err);
    });
}

function forgotPassword() {
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then((result) => {
      setError(
        'Um link para redefinir sua senha foi enviado. Verifique na sua caixa de entrada!'
      );
    })
    .catch((err) => setError(err.message));
}

function setError(message) {
  errorMessage.hidden = false;
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = null;
}

function showAlert(message) {
  const alert = document.getElementById('alert');

  alert.classList.add('show');
  alert.textContent = message;

  setTimeout(() => {
    alert.classList.remove('show');
  }, 4000);
}

function closeModal() {
  $('#sign-in-up-modal').modal('hide');
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    signInButton.classList.add('d-none');
    signUpButton.classList.add('d-none');
    createIssueButton.classList.remove('d-none');
    myIssuesButton.classList.remove('d-none');
    signOutButton.classList.remove('d-none');
  } else {
    signInButton.classList.remove('d-none');
    signUpButton.classList.remove('d-none');
    createIssueButton.classList.add('d-none');
    myIssuesButton.classList.add('d-none');
    signOutButton.classList.add('d-none');
  }
});

function indexView() {
  window.location.href = 'index.html';
}

function registerIssueView() {
  window.location.href = 'registerIssue.html';
}

function myIssuesView() {}

function signOut() {
  indexView();
  firebase.auth().signOut();
}


/* ARMAZENAMENTO DE DADOS, UTILIZANDO CLOUD FIRESTORE:

 - Cadastrando um problema com base no título, descrição detalhada, lugar e foto. */

const registerButton = (event) => {
  event.preventDefault();
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let place = document.getElementById("place").value;
  let photo = document.getElementById("photo").value; 

  db.collection("Register").add({
    title: title,
    description: description,
    place: place,
    photo: photo,
    status: "Cadastrado",
  })
  .then (function(docRef){
    console.log("Formulário de problema cadastrado com sucesso!");
    alert("Formulário de problema cadastrado com sucesso!");
    console.log("Documento armazenado com ID: ", docRef.id);
  })
  .catch(function(error){
    console.error("Erro ao cadastrar formulário! ", error);
    alert("Erro ao cadastrar formulário! ", error);
  });
}


// Listagem dos problemas cadastrados para a tela index.html, estilo fórum.

function listForum()
{
  let tabela = document.getElementsByTagName("table")[0];
  // let linha = tabela.insertRow(-1);
  // let col0 = linha.insertCell(0);
  // let col1 = linha.insertCell(1);
  // let col2 = linha.insertCell(2);
  // let col3 = linha.insertCell(3);
  // let col4 = linha.insertCell(4);
   

  // col0.appendChild(document.createTextNode("Título"));
  // col1.appendChild(document.createTextNode("Local"));
  // col2.appendChild(document.createTextNode("Autor"));
  // col3.appendChild(document.createTextNode("Foto"));
  // col4.appendChild(document.createTextNode("Status"));

  db.collection("Register").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.data().title);
          console.log(doc.data().place);
          console.log(doc.id);
          console.log(doc.data().photo);
          console.log(doc.data().status);

          let linha = tabela.insertRow(-1);
          let col0 = linha.insertCell(0);
          let col1 = linha.insertCell(1);
          let col2 = linha.insertCell(2);
          let col3 = linha.insertCell(3);
          let col4 = linha.insertCell(4);

          col0.appendChild(document.createTextNode(doc.data().title));
          col1.appendChild(document.createTextNode(doc.data().place));
          col2.appendChild(document.createTextNode(doc.id));
          col3.appendChild(document.createTextNode(doc.data().photo));
          col4.appendChild(document.createTextNode(doc.data().status));

      });
  });

}

