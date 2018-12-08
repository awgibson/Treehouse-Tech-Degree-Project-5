window.addEventListener('load', function (event) {
    const searchHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`;
    const gallery = document.querySelector('#gallery');


    document.querySelector('.search-container').innerHTML = searchHTML;

    for (let i = 0; i < 12; i++) {
        getRandomUser(i);
    }


    function getRandomUser(arrayPosition) {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .catch(error => console.log('There was a problem', error))
            .then(userInfo => {
                const allInfo = userInfo.results[0];
                const user =
                {
                    fullName: allInfo.name.first + ' ' + allInfo.name.last,
                    pictureLarge: allInfo.picture.large,
                    pictureMedium: allInfo.picture.medium,
                    email: allInfo.email,
                    street: allInfo.location.street,
                    city: allInfo.location.city,
                    state: allInfo.location.state,
                    zip: allInfo.location.postcode,
                    cell: allInfo.cell,
                    birthday: allInfo.dob.date,
                    galleryNumber: arrayPosition
                }
                buildGalleryCard(user);
            });
    };

    function buildGalleryCard(user) {
        const galleryHTML = `
    <div id="${user.galleryNumber}" class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.pictureMedium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.fullName}</h3>
            <p id="email" class="card-text">${user.email}</p>
            <p class="card-text cap">${user.city}, ${user.state}</p>
        </div>
    </div>`;

        const modalHTML = `<div id="${user.galleryNumber}" class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${user.pictureLarge}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${user.fullName}</h3>
            <p class="modal-text">${user.email}</p>
            <p class="modal-text cap">${user.city}</p>
            <hr>
            <p class="modal-text">${user.cell}</p>
            <p class="modal-text">${user.street}, ${user.city}, ${user.state} ${user.zip}</p>
            <p class="modal-text">Birthday: ${user.birthday}</p>
        </div>
    </div>

    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>`;

        document.querySelector('#gallery').insertAdjacentHTML('beforeend', galleryHTML);
        document.querySelector('#gallery').insertAdjacentHTML('afterend', modalHTML);
    };

    gallery.addEventListener('click', function (e) {
        if (e.target.className === 'card' || e.target.parentElement.className === 'card-info-container' || e.target.parentElement.className === 'card-img-container' || e.target.parentElement.className === 'card') {
            console.log(e.target.parentNode);


        }

    });

});