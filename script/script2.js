const createCard = (title, author, imgs, photographer_url) => {
  const row = document.querySelector("#row");
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  row.appendChild(col);

  const card = `
      <div class="card mb-4 shadow-sm">
        <img class="bd-placeholder-img card-img-top img-fluid" src="${imgs}" alt="photo">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">Ph: ${author}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a class='text-muted' href="${photographer_url} target="_blank"><small>${photographer_url}</small></a>
          </div>
        </div>
      </div>
    `;
  col.innerHTML = card;
};

window.onload = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: "OpcDc780Dmh2Cfp1cbPbKRLKiAxqJj1xqjMPp4j9rKWsgmcetaMlzl2H"
    }
  })
    .then(res => res.json())
    .then(data => {
      createCard(data.alt, data.photographer, data.src.medium, data.photographer_url);
    })
    .catch(error => console.log(error));
};
