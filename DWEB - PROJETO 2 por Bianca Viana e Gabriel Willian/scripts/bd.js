let inputProblemas = document.getElementById("problema");
let inputLocal = document.getElementById("local");

const bd = firebase.database();

var btnbd = document.getElementById("btnbd"); 

btnbd.addEventListener("click", function() {
    var id = bd.ref().child("problema").push().key; //referência ao firebase. o (.child) é o filho da autenticação (problema).

    let problema = {
        problemas: inputProblemas.value, 
        local: inputLocal.value 
    };

    bd.ref("problema/" + id).set(problema); // o "/" é dentro do problema, ou seha, ele está setando o objeto "problema" acima dentro da tabela problema lá no firebase.


    alert("Seu problema foi cadastrado com sucesso!");

})

