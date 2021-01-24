let description = document.getElementById('description');
let place = document.getElementById('place');

const bd = firebase.database();

var registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', function () {
  var id = bd.ref().child('problema').push().key; //referência ao firebase. o (.child) é o filho da autenticação (problema).

  let problema = {
    problemas: description.value,
    local: place.value,
  };

  bd.ref('problema/' + id).set(problema); // o "/" é dentro do problema, ou seha, ele está setando o objeto "problema" acima dentro da tabela problema lá no firebase.

  alert('Seu problema foi cadastrado com sucesso!');
});
