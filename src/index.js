// index.js

const handleClick = (ramen) => {
  const detailImage = document.querySelector(".detail-image");
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  const detailName = document.querySelector(".name");
  detailName.textContent = ramen.name;
  const detailRestaurant = document.querySelector(".restaurant");
  detailRestaurant.textContent = ramen.restaurant;
  const detailRating = document.querySelector("#rating-display");
  detailRating.textContent = ramen.rating;
  const detailComment = document.querySelector("#comment-display");
  detailComment.textContent = ramen.comment;
};

//Creation de click pour les nouveaux ramen
const handleSubmit = (formRamen, ramenImg) => {
  ramenImg.addEventListener("click", () => {
    handleClick(formRamen);
  });
};

const addSubmitListener = () => {
  const form = document.querySelector("#new-ramen");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target["new-comment"].value,
    };
    const ramenMenuDiv = document.querySelector("#ramen-menu");
    const ramenImg = document.createElement("img");
    ramenImg.src = formRamen.image;
    ramenImg.alt = formRamen.name;
    ramenMenuDiv.append(ramenImg);
    handleSubmit(formRamen, ramenImg);
    e.target.reset();
  });
};


const displayRamens = () => {
  fetch(`http://localhost:3000/ramens/`)
    .then((r) => r.json())
    .then((ramenData) => {
      for (const ramen of ramenData) {
        const ramenMenuDiv = document.querySelector("#ramen-menu");
        const ramenImg = document.createElement("img");
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;
        ramenImg.id = ramen.id;
        ramenMenuDiv.append(ramenImg);
        ramenImg.addEventListener("click", () => {
          handleClick(ramen);
        });
      }
      //populates .detail-image with first object in json by invoking handleClick immediately after fetch
      handleClick(ramenData[0]);
    });
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};