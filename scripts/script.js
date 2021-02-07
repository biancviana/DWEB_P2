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
      //showAlert('Tudo pronto por aqui. Sua conta foi criada com sucesso!');

      //confirmação do usuário via e-mail cadastrado.
      const user = result.user;

      user.updateProfile({ displayName: 'Bianca Viana e Gabriel Willian' });
      console.log(user);

      closeModal();

      user
        .sendEmailVerification()
        .then((r) => {
          showAlert(
            'Um e-mail de verificação foi enviado. Verifique na sua caixa de entrada!',
            2500
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
      localStorage.setItem('ID', email.value);
      showAlert(`Bem vindo, ${email.value.split('@')[0]}!`, 1000);

      setTimeout(() => {
        myIssuesView();
      }, 1000);

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

window.myIssuesView = function () {
  window.location.href = 'myIssues.html';
};

function viewIssue(event) {
  window.location.href =
    'viewIssue.html?id=' + event.target.getAttribute('data-issue-id');
}

function signOut() {
  localStorage.removeItem('ID');
  indexView();
  firebase.auth().signOut();
}

window.showAlert = function (message, timer) {
  $('#alert-modal').modal('toggle');
  $('#alert-modal').modal('show');

  document.getElementById('alert-modal-message').textContent = message;

  if (!timer) {
    timer = 1000;
  }

  setTimeout(() => {
    $('#alert-modal').modal('hide');
  }, timer);
};
