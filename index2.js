let isLoading = false;


let id = 0;
const LIMIT_ID = 1000;

const loadingElement = document.getElementById('loading');

function displayImage(imageUrl) {
    const dataContainer = document.getElementById('data-container');
    const imageElement = document.createElement('img');

    imageElement.src = imageUrl;
    imageElement.loading = "lazy";
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
    // Make an API request to fetch more data (e.g., using fetch() or AJAX)
    // Adjust the URL and parameters according to your API
    // loadingElement.classList.remove('hidden');
    // loadingElement.classList.add('block');
  
    const promises = [];
    for (let i = id; i < id + 10; i++) {
      promises.push(fetch(`https://picsum.photos/id/${i}/info`).then(response => response.json()));
    }
    const data = await Promise.all(promises);
    data.forEach(item => displayImage(item.download_url));
    id += 10;
  
    // loadingElement.classList.remove('block');
    // loadingElement.classList.add('hidden');
    isLoading = false;
  }
  // Function to check if the user has scrolled to the bottom of the page
  function handleScroll() {
    const dataContainer = document.getElementById('data-container');
    console.log('window height', window.innerHeight, 'scrollY', window.scrollY, 'dataContainer height', dataContainer.offsetHeight)
    if (dataContainer && window.innerHeight + window.scrollY >= dataContainer.offsetHeight) {
      fetchData();
    }
  }
  
  // Attach the scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Initial data load
  fetchData();


