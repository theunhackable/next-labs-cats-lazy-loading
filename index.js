let isLoading = false;


let id = 0;
const LIMIT_ID = 1000;

const loadingElement = document.getElementById('loading');

function displayImage(imageUrl) {
  const dataContainer = document.getElementById('data-container');
  const imageElement = document.createElement('img');
  imageElement.classList.add('image');
  imageElement.src = imageUrl;
  imageElement.loading = "lazy";
  imageElement.alt = "random image";
  dataContainer.appendChild(imageElement);
}

async function fetchData() {
  if (isLoading) {
    return;
  } else {
    isLoading = true;
  }
  if (id >= LIMIT_ID) {
    return;
  }



  for (let i = id; i < id + 5; i++) {
    fetch(`https://picsum.photos/id/${i}/info`)
      .then(response => response.json())
      .catch(error => console.log(error.message))
      .then(data => displayImage(data.download_url))
      .catch(error => console.log(error.message));
  }
  id += 5;

  isLoading = false;
}
// Function to check if the user has scrolled to the bottom of the page
function handleScroll() {
  const dataContainer = document.getElementById('data-container');
  if (dataContainer && window.innerHeight + window.scrollY >= dataContainer.offsetHeight) {
    fetchData();
  }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial data load
fetchData();


