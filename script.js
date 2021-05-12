'use strict';

const firstPost = document.getElementById('1');
firstPost.style.backgroundColor = "#F08080";
firstPost.style.width = "800px";
firstPost.style.height = "600px";

//const likeQuantity = document.getElementById('like-quantity');
//const likeQuantity = document.querySelector('#like-quantity');
const likeQuantity = document.querySelectorAll('#like-quantity')[0];
likeQuantity.innerHTML = 0;

const like = document.getElementById('like');
const dislike = document.getElementById('dislike');

const likePost = () => {
    let quantity = likeQuantity.innerHTML;
    likeQuantity.innerHTML = ++quantity;
}

const dislikePost = () => {
    let quantity = likeQuantity.innerHTML;
    likeQuantity.innerHTML = --quantity;
}

like.addEventListener('click', likePost);
dislike.addEventListener('click', dislikePost);

const cities = ['Kyiv', 'Lisbon', 'New York', 'Amsterdam'];

const liked = (event) => {
    if (event.target.classList.contains('liked')) {
        event.target.classList.remove('liked');
    } else {
        event.target.classList.add('liked');
    }
}

const checkWeather = (city) => {

    const postsContainer = document.getElementsByClassName('posts-container')[0];
    const element = document.createElement('div');

    postsContainer.appendChild(element);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=f0fe6fbba5751dffad3703f48b6c4be9`)
        .then(responce => responce.json())
        .then(data => {
            console.log(data)
            element.innerHTML = `
                <span>${data.name}</span>
                <span>Feels like: ${(data.main.feels_like - 273.15).toFixed(2)}°C</span>
                <span>Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C</span>
                <span>Max temperature: ${(data.main.temp_max - 273.15).toFixed(2)}°C</span>
                <span>Min temperature: ${(data.main.temp_min - 273.15).toFixed(2)}°C</span>
                <img src = "delete.svg" weight = "50px" height = "50px">
            `
            element.classList.add('post');
            element.style.backgroundColor = "#1E90FF";
            element.style.width = "100%";
            element.style.height = "400px";
            element.style.marginTop = "50px";
            element.addEventListener('click', liked);
            element.children[5].addEventListener('click', (e) => {
                e.target.parentElement.remove(e.target);
            });

        });

}

const initial = () => {
    for (const city of cities) {
        checkWeather(city);
    }
}

const sendData = (data) => {
    return fetch(`https://my-json-server.typicode.com/rediska-ua/websiteShop/products`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }).then(responce => responce.json());
}


const submitForm = () => {

    const name = document.getElementById('input-name').value;
    const lastName = document.getElementById('input-lastname').value;
    const phone = document.getElementById('input-phone').value;

    document.getElementById('form-post').reset();

    const body = {
        firstName: name,
        lastName: lastName,
        phoneNumber: phone
    }

    sendData(body).then(data => console.log(data));

}

const button = document.getElementsByClassName('submit')[0];
button.addEventListener('click', submitForm);


initial();