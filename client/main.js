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



const baseURL = `http://localhost:4000/pizzerias`

const pizzeriasContainer = document.querySelector('#pizzeria-container')
const form = document.querySelector('form')

const getAllPizzerias = () => {
    axios.get(baseURL)
    .then(response => {
        displayPizzerias(response.data)
    })
    .catch(err => console.log(err))
}

const addPizzeria = (body) => {
    axios.post(baseURL, body)
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

function submitHandler(event) {
    event.preventDefault()

    let name = document.querySelector(`#input-name`)
    let address = document.querySelector(`#input-address`)
    let speciality = document.querySelector(`#input-speciality`)
    let rating = document.querySelector(`#input-rating`)
    let imgURL = document.querySelector(`#input-image`)

    let bodyObj = {
        name: name.value,
        address: address.value,
        speciality: speciality.value,
        rating: +(rating.value),
        imgURL: imgURL.value
    }

    addPizzeria(bodyObj)

    name.value= ''
    address.value = ''
    speciality.value= ''
    rating.value = ''
    imgURL.value = ''

}



const createPizzeriaTab = (pizzeria) => {
    const pizzeriaTab = document.createElement(`div`)
    pizzeriaTab.classList.add(`pizzeria-tab`)

    pizzeriaTab.innerHTML = `
        <img alt='pizza image' src=${pizzeria.imgURL} class="pizza-img"/>
        <p class="name">${pizzeria.name}</p>
        <p class="address">${pizzeria.address}</p>
        <div class="btns-container">
            <button onclick="updatePizzeria(${pizzeria.index}, 'minus')">-</button>
            <p class="pizza-rating">$${pizzeria.rating}</p>
            <button onclick="updatePizzeria(${pizzeria.index}, 'plus')">+</button>
        </div>
        <button onclick="removePizzeria(${pizzeria.index})">Remove</button>
    `


    pizzeriasContainer.appendChild(pizzeriaTab)
}

const displayPizzerias = pizzerias => {
    for (let i = 0; i < pizzerias.length; i++) {
        createPizzeriaTab(pizzerias[i])
    }
}

form.addEventListener('submit', submitHandler)


getAllPizzerias()