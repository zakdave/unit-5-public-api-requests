const gallery = document.querySelector('#gallery');

/**
 * Uses fetch to get employee data from randomuser.me and parses to JSON
 */
function getEmployeeJSON() {
    fetch('https://randomuser.me/api/?results=12&nat=us')
        .then(response => response.json())
        .then(json => createEmployeeCard(json.results))
        .catch(err => new Error(console.log('Something when wrong. Refresh the page and try again.\n' + err)))
    }

/**
 * Creates employee card items and appends to DOM
 *      calls addEars for event listeners on each
 * @param {Object} dataset - JSON results from getEmployeeJSON function
 */
function createEmployeeCard(dataset) {
    let cardHTML = '';

    for (let i = 0; i < dataset.length; i++) {
        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${dataset[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${dataset[i].name.first} ${dataset[i].name.last}</h3>
                <p class="card-text">${dataset[i].email}</p>
                <p class="card-text cap">${dataset[i].location.city}, ${dataset[i].location.state}</p>
            </div>
        </div>`;
        cardHTML += html;
    }
    gallery.insertAdjacentHTML('afterbegin', cardHTML);
    addEars(dataset);
}

/**
 * Creates event listeners and calls createModal for each employee div 
 * @param {Object} dataset - JSON results from getEmployeeJSON function
 */
function addEars(dataset) {
    const allCards = document.querySelectorAll('div .card');

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener('click', () => {
            createModal(dataset[i]);
        });
    }   
}

/**
 * Creates modal for each corresponding employee
 *      Adds close button functionality
 * @param {Object} data - employee JSON data, singular
 */
function createModal(data) {
    const rawBday = data.dob.date;
    const refinedBday = rawBday.slice('5','7') + '/' + rawBday.slice('8','10') + '/' + rawBday.slice('0', '4');
    let modalHTML =`
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.phone.replace('-', ' ')}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${refinedBday}</p>
                </div>
            </div>
        </div>`;
    gallery.insertAdjacentHTML('beforeend', modalHTML);

    //Add functionality to close modal
    const modal = gallery.lastChild;
    const closeButton = modal.querySelector('#modal-close-btn');
    closeButton.addEventListener('click', () => gallery.removeChild(modal));
}

getEmployeeJSON();