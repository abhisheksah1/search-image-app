const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result");
const searchMoreBtn = document.querySelector(".search-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=sw-bEl6MeMzB39r6mvrwcwyXayCE22hioOmoofxoyUA&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  if(page === 1) {
    searchResult.innerHTML = "";
  }


  const results = data.results;

  results.forEach((result) => {
    const img = document.createElement("img");
    img.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(img);
    searchResult.appendChild(imageLink);
  });
  searchMoreBtn.style.display="block"
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchResult.innerHTML = ""; // Clear previous search results
  searchImage();
});

searchMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});
