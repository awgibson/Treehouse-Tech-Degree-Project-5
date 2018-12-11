//----------------------------------------------------------------------------------------------
//Exceeds Expecations - Employees can be filtered by name with dynamically added search feature.
//----------------------------------------------------------------------------------------------
function userSearch() {
    const searchHTML = `
        <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form>`; //Holds search bar HTML

    document.querySelector('.search-container').innerHTML = searchHTML; //Inserts search bar HTML

    const searchBox = document.querySelector('#search-input'); //Holds search input

    //-------------------------------------------------------------------------------------
    //Event listener that triggers with every keyup in order to have a live search function
    //-------------------------------------------------------------------------------------
    searchBox.addEventListener('keyup', function (e) {
        const searchQuery = searchBox.value.toLowerCase(); //Holds/updates what is entered in input field everytime a key is released
        const userNames = document.querySelectorAll('.card-name'); //Selects all of the HTML elements that hold employee names

        //----------------------------------------------------------------------------------------------------------------------------
        //Loops through all HTML elements holding the employee names and sees if the the search field matches using the indexOf method
        //----------------------------------------------------------------------------------------------------------------------------
        for (let i = 0; i < userNames.length; i++) {
            let user = userNames[i].innerText.toLowerCase(); //Holds name of current employee of the loop and converts to lowercase
            if (user.indexOf(searchQuery) > -1) {
                userNames[i].parentElement.parentElement.classList.remove('hide'); //Removes helper CSS class 'hide' if name matches
            } else {
                userNames[i].parentElement.parentElement.classList.add('hide'); //Adds helper CSS class 'hide' if name does not match
            }
        } //End loop
    }); //End keyup event listener
} //End userSearch function

//---------------------------------------------------
//Function that handles fetching 12 random employess.
//---------------------------------------------------
function getRandomUser() {
    fetch('https://randomuser.me/api/?results=12') //Fetches 12 users at once
        .then(response => response.json()) //Resolves response as JSON
        .catch(error => console.log('There was a problem', error)) //Displays error to console
        .then(users => buildGalleryCard(users)) //Builds the gallery of employee cards passing the 12 users at once
}; //End getRandomUser function

//----------------------------------------------------------------------------------------------------------------
//Function that handles assembling the 12 employee display cards and 12 employee moedals for detailed information.
//----------------------------------------------------------------------------------------------------------------
function buildGalleryCard(users) {

    //----------------------------------------------------------------------------------------------------------------------------
    //Loops through the 12 employees fetched and places the person's infomration in the appropriate spot in the HTML markup
    //----------------------------------------------------------------------------------------------------------------------------
    for (let i = 0; i < users.results.length; i++) {
        let user = users.results[i]; //Stores the current employee's information of the current loop cycle
        const galleryHTML = `
    <div id="${i}" class="card"> 
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p id="email" class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
    </div>`; //Markup for the employee information card that appears on screen. The top level div has an id of the current loop cycle. This ID is used to assist with DOM manipulation.

        let modalHTML = `<div id="${i}" class="modal-container hide">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.location.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.location.street}, ${user.location.city} ${user.location.state} ${user.location.postcode}</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`; //Markup for the employee modal markup that contains additional information. These are setup default with CSS helper class hide which hides the elements.

        document.querySelector('#gallery').insertAdjacentHTML('beforeend', galleryHTML); //Places the employee information cards within the gallery div
        document.querySelector('#modal-holder').insertAdjacentHTML('beforeend', modalHTML); //Places the modals outside of the gallery div
    } //End loop



}; //End buildGalleryCard function

//---------------------------------------
//Event to trigger functions on page load.
//---------------------------------------
window.addEventListener('load', function () {
    const modalDiv = `<div id="modal-holder"></div>`; //Holds HTML to for a DIV to place all the hidden modals in
    document.querySelector('#gallery').insertAdjacentHTML('beforebegin', modalDiv); //Places the modal holder DIV

    document.body.style.background = 'rgb(168,232,171)'; //Extra credit: changed background color from the list of styling options to change

    //--------------
    //Call functions
    //--------------
    getRandomUser(); //Starts getRandomUser function
    userSearch(); //Stars userSearch function

    const gallery = document.querySelector('#gallery'); //Holds gallery DIV 
    const modalHolder = document.querySelector('#modal-holder'); //Holds modal DIV

    //----------------------------------------------------------
    //Event listener that watches for clicks for employee cards
    //----------------------------------------------------------
    gallery.addEventListener('click', function (e) {
        const modals = document.querySelectorAll('.modal-container'); //Holds all modal containers which had the detailed employee information
        let userNumber = 0; //This variable is changed based on the ID assigned to the employee card for identifcation purposes.

        //--------------------------------------------------------------------------------------------------------------
        //These conditionals handle all possible locations clicked within the employee cards
        //When clicked, the CSS class 'hide' is removed from the modal that matches the ID of the employee card clicked
        //--------------------------------------------------------------------------------------------------------------
        if (e.target.className === 'card') {
            userNumber = e.target.id; //Reassigns userNumber to match the ID of the employee card (0-11)
            modals[userNumber].classList.remove('hide'); //Removes 'hide' CSS class from the apporiate element in the models array. Card ID corresponds with the modal element array position.
        }
        if (e.target.parentElement.className === 'card') {
            userNumber = e.target.parentElement.id;
            modals[userNumber].classList.remove('hide');
        }
        if (e.target.parentElement.parentElement.className === 'card' && e.target.parentElement.parentElement.tagName === 'DIV') {
            userNumber = e.target.parentElement.parentElement.id;
            modals[userNumber].classList.remove('hide');
        } //End card click handlers
    }); //End event listener

    //-------------------------------------------------
    //Event listener that watches for clicks for modals
    //-------------------------------------------------
    modalHolder.addEventListener('click', function (e) {
        const modals = document.querySelectorAll('.modal-container'); //Holds all modal containers which had the detailed employee information
        let userNumber = 0; //This variable is changed based on the ID assigned to the employee card for identifcation purposes.

        //------------
        //Close button
        //------------
        if (e.target.id === 'modal-close-btn') {
            e.target.parentElement.parentElement.classList.add('hide'); //When the close button is clicked, the CSS class hide is added back to the model
        }
        if (e.target.parentElement.id === 'modal-close-btn') {
            e.target.parentElement.parentElement.parentElement.classList.add('hide'); //Same as above but handles a direct click on the 'X'. Modal didn't always close if both conditionals weren't coded
        } //End close button

        //---------------------------------------------------------------------------------------------------------------------------
        //Extra Credit: Functionality has been added to switch back and forth between employees when the detail modal window is open.
        //---------------------------------------------------------------------------------------------------------------------------
        if (e.target.id === 'modal-next') {
            userNumber = e.target.parentElement.parentElement.id; //Reassigns userNumber to ID of modal (0-11)
            if (userNumber < modals.length - 1) { //Extra credit: No errors in console. Prevents next button working if the modal is of the last employee
                modals[userNumber].classList.add('hide'); //Hides current modal
                userNumber++; //Increments userNumber to next employee
                modals[userNumber].classList.remove('hide'); //Displays the next employee
            }
        } //End next button

        if (e.target.id === 'modal-prev') {
            userNumber = e.target.parentElement.parentElement.id; //Reassigns userNumber to ID of modal (0-11)
            if (userNumber > 0) { //Extra credit: No errors in console. Prevents previous button working if the modal is of the first employee
                modals[userNumber].classList.add('hide'); //Hides current modal
                userNumber--; //Decreases userNumber to previous employee
                modals[userNumber].classList.remove('hide'); //Displays the previous employee
            }
        } // End previous button
    }); //End event listener
}); //End window load event listener