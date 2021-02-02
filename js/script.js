const gallery = document.querySelector('#gallery');
let employeeData;

/**
 * Uses fetch to get employee data from randomuser.me and parses to JSON
 */
function getEmployeeJSON() {
    fetch('https://randomuser.me/api/?results=12&nat=us')
        .then(response => response.json())
        .then(json => {
            employeeData = json.results;
            createEmployeeCard(employeeData);
        })
    
    
        
    }

/**
 * Creates employee card items and appends to DOM
 * @param {Object} data - JSON results from getEmployeeJSON function
 */
function createEmployeeCard(data) {
    console.log(data)
    let cardHTML = '';

    data.forEach(each => {
        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${each.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${each.name.first} ${each.name.last}</h3>
                <p class="card-text">${each.email}</p>
                <p class="card-text cap">${each.location.city}, ${each.location.state}</p>
            </div>
        </div>`;
        cardHTML += html;
    });
    gallery.insertAdjacentHTML('afterbegin', cardHTML);
}

getEmployeeJSON();