function registrar(){

let nome = document.getElementById("nome").value;
let senha = document.getElementById("senha").value;

let usuario = {nome, senha};

localStorage.setItem("usuario", JSON.stringify(usuario));

alert("Conta criada!");
window.location.href = "login.html";
}

function login(){

let nome = document.getElementById("loginNome").value;
let senha = document.getElementById("loginSenha").value;

let usuario = JSON.parse(localStorage.getItem("usuario"));

if(usuario && usuario.nome === nome && usuario.senha === senha){
window.location.href = "index.html";
}else{
alert("Login inválido");
}
}