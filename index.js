let isLoading = false;




const dataContainer = document.getElementById('data-container');

function displayImage(imageUrl) {
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
  

  for (let i = 0; i < 15; i++) {

    fetch('https://picsum.photos/200/300?random=1').then((response) => {
      displayImage(response.url);
    }
    );
    // displayImage('https://picsum.photos/200/300?random=2')
      
  }
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


