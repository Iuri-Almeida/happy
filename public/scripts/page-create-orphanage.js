// create map
const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
});

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // get lat and lng
    document.querySelector('[name = lat]').value = lat;
    document.querySelector('[name = lng]').value = lng;

    // remove icon
    marker && map.removeLayer(marker);
    
    // add icon layer
    marker = L.marker([lat, lng], { icon }).addTo(map);
})

// adicionar o campo de fotos
function addPhotoField () {
    // pegar o container de fotos (#images)
    const container = document.querySelector('#images');

    // pegar o container para duplicar (.new-upload)
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // verificar se o campo anterior está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0];

    if (input.value == "") {
        return
    }

    // limpar o campo antes de adicionar ao container de imagens
    input.value = ""

    // adicionar o clone ao container da imagem
    container.appendChild(newFieldContainer);
}

// remove field
function deletePhotoField (event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');
    
    if (fieldsContainer.length < 2) {
        span.parentNode.children[0].value = "";
        return;
    }

    // deletar o campo
    span.parentNode.remove();
}

// troca do sim e não
function selectYesOrNo (event) {

    // remove class active from all buttons
    document.querySelectorAll('.button-select button')
    .forEach((button) => {
        button.classList.remove('active');
    })

    // select button
    const button = event.currentTarget;
    
    // add active class
    button.classList.add("active");

    // update input hidden
    const input = document.querySelector('[name = open_on_weekends]');

    // yes or no?
    input.value = button.dataset.value;
}

// validando os campos do forms
function validate(event) {

    const lat = document.querySelector('[name = lat]').value;
    const lng = document.querySelector('[name = lng]').value;

    // validar se lat e lng estão preenchidos
    if (lat == "" || lng == "") {
        alert("Selecione um local no mapa!");
        event.preventDefault();
    }
}