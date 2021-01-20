function criarusuario(event){ //traz todas as variáveis do formulário
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password1").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then (result => {
                alert("Tudo pronto por aqui. Sua conta foi criada com sucesso!");
                console.log(result);

                //confirmação do usuário via e-mail cadastrado.
                const user = result.user;

                user.updateProfile({ displayName: "Bianca Viana e Gabriel Willian"});
                console.log(user);

                user.sendEmailVerification().then(r => {
                    alert("Um e-mail de verificação foi enviado. Verifique na sua caixa de entrada!"); 
                }).catch(e => alert("Houve um erro ao enviar o e-mail!"));
            }).catch (err => {
                    alert("Ops, tivemos um erro ao criar sua conta!");
                    console.log(err);
                });
};
    

function autenticacacaousuario(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password1").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then (result => {
            window.location.href = "home.html";
            console.log(result);
        }).catch (err => {
            alert("Ops, não foi possível logar!");
            console.error(err);
        })
        
};  


firebase.auth().onAuthStateChanged((user) => {

    let email = document.getElementById("email").value;
    const divUser = document.querySelector(".user")
    const spanName = document.querySelector("span.name");
    const btnsair = document.querySelector(".sair");
    const btnresetar = document.querySelector(".resetar");

    if(user) {
        spanName.innerHTML = user.email;
        divUser.style.display = "block";
    } 
    else
    {
        divUser.style.display = "none";
    }

    //botão de sair.
    btnsair.addEventListener("click", () => {
        firebase.auth().signOut();
    });
    

    btnresetar.addEventListener("click", () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(result => {
            alert("Um link para redefinir sua senha foi enviado. Verifique na sua caixa de entrada!");
            console.log(result);
        }).catch (err => console.log(err));
    });

});
