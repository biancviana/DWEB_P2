const content = document.getElementById('content');
const loading = document.getElementById('loading');

const updateIssueButton = document.getElementById('update-issue-button');
const deleteIssueButton = document.getElementById('delete-issue-button');
const systemAnswerView = document.getElementById('system-answer');
const answerButton = document.getElementById('answer-button');

const title = document.getElementById('title');
const place = document.getElementById('place');
const status = document.getElementById('status');
const userId = document.getElementById('userId');
const description = document.getElementById('description');
const photo = document.getElementById('photo');

let issueId;
let issue;

window.onload = () => {
  issueId = window.location.search.split('?')[1].split('=')[1];
  issue = db.collection('Register').doc(issueId);

  issue
    .get()
    .then((issueInfo) => {
      title.textContent = issueInfo.data().title;
      place.textContent = issueInfo.data().place;
      status.textContent = issueInfo.data().status;
      userId.textContent = issueInfo.data().email.split('@')[0];
      description.textContent = issueInfo.data().description;

      firebase.auth().onAuthStateChanged(function (user) {
        if (user && user.uid === issueInfo.data().userId) {
          updateIssueButton.classList.remove('d-none');
          deleteIssueButton.classList.remove('d-none');
        }
      });

      if (issueInfo.data().photo) {
        storage
          .ref('issues/' + issueId)
          .getDownloadURL()
          .then((url) => {
            photo.src = url;
          });
      } else {
        document.getElementById('attach-not-found').classList.remove('d-none');
      }
    })
    .then(() => {
      content.classList.remove('d-none');
      loading.classList.add('d-none');
    });
};

function openDeleteIssueModal() {
  $('#delete-issue-modal').modal('toggle');
  $('#delete-issue-modal').modal('show');
}

function deleteIssue() {
  $('#delete-issue-modal').modal('hide');

  if (photo.src !== window.location.href) {
    let storageRef = firebase
      .storage()
      .ref()
      .child('issues/' + issueId);
    storageRef.delete();
  }

  issue
    .delete()
    .then(() => {
      showAlert('Problema apagado com sucesso!', 2000);
      setTimeout(() => {
        myIssuesView();
      }, 1500);
    })
    .catch(function (error) {
      console.error('Erro ao apagar formulário! ', error);
    });
}

function answerIssue() {}

function updateIssueView() {
  window.location.href = 'updateIssue.html?id=' + issueId;
}
