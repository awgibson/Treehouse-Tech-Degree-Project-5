window.addEventListener('load', function (event) {
    const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
    const gallery = document.querySelector('#gallery');
    const users = [];


    document.querySelector('.search-container').innerHTML = searchHTML;

    getRandomUser();



    function getRandomUser(arrayPosition) {
        fetch('https://randomuser.me/api/?results=12')
            .then(response => response.json())
            .catch(error => console.log('There was a problem', error))
            .then(users => buildGalleryCard(users))
    };

    function buildGalleryCard(users) {
        console.log(users);
        for (let i = 0; i < users.results.length; i++) {
            let user = users.results[i];
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
    </div>`;

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
            <p class="modal-text">Birthday: ${user.dob.date}</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`;

            document.querySelector('#gallery').insertAdjacentHTML('beforeend', galleryHTML);
            document.querySelector('#gallery').insertAdjacentHTML('beforebegin', modalHTML);
        }

    };

    document.addEventListener('click', function (e) {
        const cards = gallery.querySelectorAll('.card');
        const modals = document.querySelectorAll('.modal-container');
        let userNumber = 0;
        // console.log(cards);
        // console.log(modals);
        console.log(e.target.parentElement.parentElement);
        if (e.target.className === 'card') {
            userNumber = e.target.id;
            modals[userNumber].classList.remove('hide');
        }
        if (e.target.parentElement.className === 'card') {
            userNumber = e.target.parentElement.id;
            modals[userNumber].classList.remove('hide');
        }
        if (e.target.parentElement.parentElement.className === 'card') {
            userNumber = e.target.parentElement.parentElement.id;
            modals[userNumber].classList.remove('hide');
        }


        if (e.target.id === 'modal-close-btn') {
            console.log('click');
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.classList.add('hide');
        }
        if (e.target.parentElement.id === 'modal-close-btn') {
            e.target.parentElement.parentElement.parentElement.classList.add('hide');
        }

        if (e.target.id === 'modal-next') {
            userNumber = e.target.parentElement.parentElement.id;
            if (userNumber < modals.length - 1) {
                modals[userNumber].classList.add('hide');
                userNumber++;
                modals[userNumber].classList.remove('hide');
            }
        }

        if (e.target.id === 'modal-prev') {
            userNumber = e.target.parentElement.parentElement.id;
            console.log(userNumber);
            if (userNumber > 0) {
                modals[userNumber].classList.add('hide');
                userNumber--;
                modals[userNumber].classList.remove('hide');
            }
        }



        // || 

    });



});