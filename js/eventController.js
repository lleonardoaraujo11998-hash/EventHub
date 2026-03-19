let usuario = JSON.parse(localStorage.getItem("usuario"));

if(usuario){
let nome = usuario.nome.split(" ")[0];
document.getElementById("boasVindas").innerText = "👤 " + nome;
}else{
window.location.href = "login.html";
}

fetch("data/events.json")
.then(res => res.json())
.then(eventos => {

let locais = JSON.parse(localStorage.getItem("eventos")) || [];
let todos = [...eventos, ...locais];

mostrarEventos(todos);

document.getElementById("filtroCategoria").addEventListener("change", function(){

let categoria = this.value;

let filtrados = todos.filter(e =>
categoria === "todos" || e.categoria === categoria
);

mostrarEventos(filtrados);

});

});

function mostrarEventos(lista){

let container = document.getElementById("listaEventos");
container.innerHTML = "";

lista.forEach(evento => {

let card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
<img src="${evento.imagem}">
<h3>${evento.titulo}</h3>
<p>${evento.data}</p>
<p>${evento.local}</p>
<p>${evento.endereco}</p>
<a href="${evento.documento}" target="_blank">📄 Documento</a>
`;

card.onclick = () => mostrarMapa(evento);

container.appendChild(card);

});
}

let map = L.map('map').setView([-14,-52],4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let marker;

function mostrarMapa(e){

if(marker) map.removeLayer(marker);

map.setView([e.lat,e.lng],13);

marker = L.marker([e.lat,e.lng]).addTo(map)
.bindPopup(e.titulo).openPopup();
}

function adicionarEvento(){

let evento = {
titulo: novoTitulo.value,
data: "Novo",
local: novoLocal.value,
endereco: novoEndereco.value,
categoria: novaCategoria.value,
imagem: novaImagem.value,
documento: "#",
lat: -14,
lng: -52
};

let lista = JSON.parse(localStorage.getItem("eventos")) || [];
lista.push(evento);

localStorage.setItem("eventos", JSON.stringify(lista));

alert("Adicionado!");
location.reload();
}

function logout(){
localStorage.removeItem("usuario");
window.location.href = "login.html";
}