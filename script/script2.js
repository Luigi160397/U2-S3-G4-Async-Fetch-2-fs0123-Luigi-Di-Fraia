const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get("id");

fetch(`https://api.pexels.com/v1/photos/${id}`, {
  headers: {
    Authorization: "OpcDc780Dmh2Cfp1cbPbKRLKiAxqJj1xqjMPp4j9rKWsgmcetaMlzl2H"
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    createCard(data.alt, data.photographer, data.src.medium, data.id);
  })
  .catch(error => console.log(error));

const createCard = (title, author, imgs, id) => {
  const row = document.querySelector(".row");
  const col = document.createElement("div");
  col.setAttribute("class", "col md-4");
  row.appendChild(col);

  col.innerHTML = `<div class="card mb-4 shadow-sm">
      <img class="bd-placeholder-img card-img-top img-fluid"
        height="225" src="${imgs}" alt="photo">
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
