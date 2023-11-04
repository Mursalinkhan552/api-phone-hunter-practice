
const loadPhones = async (searchText, dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch (error) {
        console.log(error);
    }

}



const displayPhones = (phones, dataLimit) => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // No Phone Found Message 
    const message = document.getElementById('no-phone-message');
    if (phones.length === 0) {
        message.classList.remove('d-none');

    }
    else {
        message.classList.add('d-none');
    }

    // Display phones Slice

    const showAll = document.getElementById('show-all');

    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        // console.log(phone);

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#displayModal">Details</button>
        </div>
        
        `;
        phoneContainer.appendChild(phoneDiv);

    });
    spinnerLoader(false);
}

const loadShowAllPhones = (dataLimit) => {
    spinnerLoader(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    loadShowAllPhones(12);
})

document.getElementById('search-field').addEventListener('keydown', function (event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        loadShowAllPhones(12);
    }

})

const spinnerLoader = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading == true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    loadShowAllPhones();
})

const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = (data) => {
    console.log(data);
    const phoneTitle = document.getElementById('displayModalLabel');
    phoneTitle.innerText = data.name;
    const phoneModalBody = document.getElementById('phone-modal-body');
    phoneModalBody.innerHTML = `
    
    <div>                              
    <p>ChipSet: ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet : 'No ChipSet Found' }</p>
    <p>Display Size: ${data.mainFeatures.displaySize ? data.mainFeatures.displaySize : 'Display Size Not Found'}</p>
    <p>Memory: ${data.mainFeatures.memory ? data.mainFeatures.memory : 'No Memory Found'}</p>
    <p>Sensors: ${data.mainFeatures.sensors ? data.mainFeatures.sensors : 'No Sensors Found'}</p>
    <p>Storage: ${data.mainFeatures.storage ? data.mainFeatures.storage : 'No Storage Found'}</p>
    <h3>Released date: ${data.releaseDate ? data.releaseDate : 'No Releases Date Found'}</h3>
    </div>
    
    `
}




// loadPhones();