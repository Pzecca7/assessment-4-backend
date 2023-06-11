const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortune-btn")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
           const data = res.data;
           alert(data);
        });
};

fortuneBtn.addEventListener('click', getFortune)

const pizzeriasContainer = document.querySelector('#pizzerias-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/pizzerias`



const getAllPizzerias = () => {
    axios.get(baseURL)
    .then(response => {
        console.log(response.data)
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}

const addPizzeria = (bodyObj) => {
    axios.post(baseURL, bodyObj)
    .then(response => {
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}

const removePizzeria = (id) => {
    axios.delete(`${baseURL}/${id}` )
    .then(response => {
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}

const updateRating = (id, type) => {
    axios.put(`${baseURL}/${id}`, {type})
    .then(response => {
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}

const changeColor = (id) => {
    axios.put(`${baseURL}/${id}`)
    .then(response => {
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}


const createPizzeriaTab = (pizzeria) => {
    const pizzeriaTab = document.createElement(`div`)
    pizzeriaTab.classList.add(`pizzeria-tab`)

    console.log(pizzeria)
    console.log(pizzeria.name)
    console.log(pizzeria.address)
    console.log(pizzeria.rating)
    console.log(pizzeria.visited)

    pizzeriaTab.innerHTML = `<img alt='pizza image' src=${pizzeria.imgURL} class="pizza-img"/>
        <p class="name">${pizzeria.name}</p>
        <p class="address">${pizzeria.address}</p>
        <p class="speciality">${pizzeria.speciality}</p>
        <div class="rating-container">
            <button class="rating-btn" onclick="updateRating(${pizzeria.id}, 'plus')">+</button>
            <p class="pizza-rating">${pizzeria.rating}</p>
            <button class="rating-btn" onclick="updateRating(${pizzeria.id}, 'minus')">-</button>
        </div>
        <div class="btns-container">
        <button id="remove-btn" onclick="removePizzeria(${pizzeria.id})">Remove</button>
        <button id="visited-btn" onclick="changeColor(${pizzeria.name}/${pizzeria.address}/${pizzeria.speciality}/${pizzeria.rating})">Visited</button>
        `
    pizzeriasContainer.appendChild(pizzeriaTab)
}

const displayPizzerias = pizzeriasObj => {
    let { visited , name, address, speciality, rating } = pizzeriasObj
    pizzeriasContainer.innerHTML= ``
    for (let i = 0; i < pizzeriasObj.length; i++) {
        console.log(pizzeriasObj[i])
        createPizzeriaTab(pizzeriasObj[i])
    }

    if(visited){
        name, address, speciality, rating = `color-change`
    }


    console.log(pizzeriasObj)
    console.log(pizzeriasContainer)
    console.log(pizzeriasObj.length)
   
}

function submitNewPizzeria(event) {
    event.preventDefault()
    
    let name = document.querySelector(`#input-name`)
    let address = document.querySelector(`#input-address`)
    let speciality = document.querySelector(`#input-speciality`)
    let rating = document.querySelector(`#input-rating`)
    let imgURL = document.querySelector(`#input-img`)

    let bodyObj = {
        name: name.value,
        address: address.value,
        speciality: speciality.value,
        rating: +(rating.value).toFixed(1),
        imgURL: imgURL.value
    }


    addPizzeria(bodyObj)

    name.value= ''
    address.value = ''
    speciality.value= ''
    rating.value = ''
    imgURL.value = ''

    console.log(bodyObj)
}

form.addEventListener('submit', submitNewPizzeria)


getAllPizzerias()