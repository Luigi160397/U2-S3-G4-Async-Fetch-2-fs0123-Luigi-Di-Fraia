const bottone1 = document.querySelector(".bottone1");
const bottone2 = document.querySelector(".bottone2");

bottone1.addEventListener("click", () => {
  richiesta("https://api.pexels.com/v1/search?query=nature");
});

bottone2.addEventListener("click", () => {
  richiesta("https://api.pexels.com/v1/search?query=ocean");
});

const richiesta = url => {
  fetch(url, {
    headers: {
      Authorization: "OpcDc780Dmh2Cfp1cbPbKRLKiAxqJj1xqjMPp4j9rKWsgmcetaMlzl2H"
    }
  })
    .then(res => res.json())
    .then(data => {
      const row = document.querySelector(".album .container .row");
      row.innerHTML = "";
      const photos = data.photos;
      for (const photo of photos) {
        createCard(photo.alt, photo.photographer, photo.src.medium, photo.id);
      }
      const deleteButton = document.querySelectorAll(".deleteButton");
      deleteButton.forEach(bottone => {
        bottone.addEventListener("click", event => {
          event.preventDefault();
          event.target.closest(".col").remove();
        });
      });
    })
    .catch(error => console.log(error));
};

const createCard = (title, author, imgs, id) => {
  const row = document.querySelector(".album .container .row");
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  row.appendChild(col);

  col.innerHTML = `<div class="card mb-4 shadow-sm">
    <a href="./details.html?id=${id}">
      <img class="bd-placeholder-img card-img-top img-fluid"
        height="225" src="${imgs}" alt="photo">
    </a>
    <div class="card-body">
      <h5 class="card-title text-truncate">${title}</h5>
      <p class="card-text">
        Ph: ${author}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="deleteButton btn btn-sm btn-outline-secondary">Hide</button>
        </div>
        <small class="text-muted">${id}</small>
      </div>
    </div>
  </div>`;
};

const btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", event => {
  event.preventDefault();
  const cerca = document.querySelector("#cerca").value;
  const payload = `https://api.pexels.com/v1/search?query=${cerca}`;
  richiesta(payload);
});
