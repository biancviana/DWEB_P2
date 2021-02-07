const content = document.getElementById('content');
const loading = document.getElementById('loading');

const title = document.getElementById('title');
const place = document.getElementById('place');
const description = document.getElementById('description');
const photo = document.getElementById('photo');
const newPhoto = document.getElementById('newPhoto');

let issueId;
let issue;

window.onload = () => {
  issueId = window.location.search.split('?')[1].split('=')[1];
  issue = db.collection('Register').doc(issueId);

  issue
    .get()
    .then((issueInfo) => {
      title.value = issueInfo.data().title;
      place.value = issueInfo.data().place;
      description.value = issueInfo.data().description;

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

function updateIssue() {
  let storageRef = firebase
    .storage()
    .ref()
    .child('issues/' + issueId);

  issue
    .update({
      title: title.value,
      description: description.value,
      place: place.value,
    })
    .catch(() => {
      alert('Erro ao atualizar formulário!');
      console.log(error);
    });

  if (newPhoto.files[0]) {
    if (photo.src !== window.location.href) {
      storageRef.delete();
    }

    storageRef.put(newPhoto.files[0]).then(() => {
      issue
        .update({
          photo: storageRef.fullPath,
        })
        .then(() => {
          showAlert('Problema atualizado com sucesso!', 2000);
          setTimeout(() => {
            myIssuesView();
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } else {
    showAlert('Problema atualizado com sucesso!', 2000);
    setTimeout(() => {
      myIssuesView();
    }, 2000);
  }
}
