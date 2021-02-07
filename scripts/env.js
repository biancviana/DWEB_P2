//Aqui é o arquivo de configuração que vai conectar o código ao Firebase.

let firebaseConfig = {
  apiKey: 'AIzaSyCMrr5_yp2T6l4L-UmCoABaS7ZrJXX-xD8',
  authDomain: 'autenticacao-biancaviana.firebaseapp.com',
  projectId: 'autenticacao-biancaviana',
  storageBucket: 'autenticacao-biancaviana.appspot.com',
  messagingSenderId: '686337016024',
  appId: '1:686337016024:web:8f0ee6441777b7852997ad',
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storage = firebase.storage();
//esse comando inicia as funções do cloud firestore.
