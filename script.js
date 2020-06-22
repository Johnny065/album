//bring pics from api + build cards
fetch('https://jsonplaceholder.typicode.com/albums').then(data =>
  data.json().then(albums => {
    const albumList = document.getElementById('albumList');
    albums.forEach(element => {
      const divMedia = document.createElement('div');
      divMedia.classList = 'media my-4 card';
      const divBody = document.createElement('div');
      divBody.classList = 'media-body card-body';
      const h5 = document.createElement('h5');
      h5.classList = 'mt-0';
      const h6 = document.createElement('div');
      h6.setAttribute('id', `nameH6${element.userId}`);
      const btn = document.createElement('button');
      btn.classList = `btn btn-primary btn-sm btn${element.id}`;
      btn.innerText = 'See Details';
      h5.innerText = element.title;
      const picDiv = document.createElement('div');
      picDiv.setAttribute('id', `picDiv${element.id}`);
      divBody.appendChild(h5);
      divBody.appendChild(h6);
      divBody.appendChild(btn);
      divMedia.appendChild(divBody);
      divMedia.appendChild(picDiv);
      albumList.appendChild(divMedia);
      loadUsername(element.userId);
      btn.addEventListener('click', () => {
        loadPicsById(element.id);
      });
    });
  })
);

//place pics in cards and button function
const loadPicsById = id => {
  fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=15`
  ).then(response =>
    response.json().then(photos =>
      photos.forEach(element => {
        const getEle = document.querySelector(`#picDiv${id}`);
        getEle.innerHTML += `
            <img class="addImg col-2" src='${element.thumbnailUrl}' alt='${element.id}' />
            `;
        const btnDis = document.querySelector(`.btn${id}`);
        btnDis.innerText == 'See Details'
          ? (btnDis.innerText = 'Hide Details')
          : (btnDis.innerText = 'See Details');
        document.querySelector(`.btn${id}`).addEventListener('click', () => {
          if (btnDis.innerText == 'Hide Details') {
            getEle.style.display = 'none';
            getEle.innerHTML = '';
          } else if (btnDis.innerText == 'See Details') {
            getEle.style.display = 'block';
            getEle.innerHTML = '';
          }
        });
      })
    )
  );
};

//bring usernames and emails
const loadUsername = id => {
  fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`).then(response =>
    response.json().then(userNames =>
      userNames.forEach(element => {
        const putUsername = document.querySelectorAll(`#nameH6${id}`);
        for (let i = 0; i < putUsername.length; i++) {
          putUsername[i].innerHTML = `
          <h6>Username: ${element.username}</h6>
          <h6>Email: ${element.email}</h6>
          <h6>Website: ${element.website}</h6>`;
        }
      })
    )
  );
};
