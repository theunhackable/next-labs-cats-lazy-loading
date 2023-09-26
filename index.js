let isLoading = false;

const dataContainer = document.getElementById('data-container');
const loader = document.getElementById('loader'); 

function displayImage(imageUrl) {

  const imageElement = document.createElement('img');
  
  imageElement.classList.add('image');
  imageElement.src = imageUrl;
  imageElement.width = 200;
  imageElement.height = 300;
  imageElement.alt = "random image";

  dataContainer.appendChild(imageElement);
}

async function fetchData() {

  if (isLoading) {
    return;
  } else {
    isLoading = true;
  }

  let promises = [];

  loader.classList.add('show');

  for (let i = 0; i < 5; i++) {

     promises.push(fetch('https://picsum.photos/200/300?random=1'));
  }
  loader.classList.add('show');
  loader.classList.remove('hidden');

  const responses = await Promise.all(promises)
  responses.map((response) => {
    displayImage(response.url);
  })
  loader.classList.add('hidden');
  loader.classList.remove('show');
      
  isLoading = false;
}
// Function to check if the user has scrolled to the bottom of the page
function handleScroll() {
  if (dataContainer && window.innerHeight + window.scrollY >= dataContainer.offsetHeight) {
    fetchData();
  }
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial data load
fetchData();


