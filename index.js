function showLoader() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    if (loader && content) {
        loader.style.display = 'block';
        content.style.display = 'none';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    if (loader && content) {
        loader.style.display = 'none';
        content.style.display = 'block';
    }
}

function loadContent(url) {
    showLoader();
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            document.getElementById("main-content").classList.add("fade-in");
            setTimeout(function () {
                document.getElementById("main-content").classList.remove("fade-in");
              }, 1000);
            hideLoader();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            hideLoader();
        });
}

function home() {
    loadContent('pages/homepage.html');
}

function projects() {
    loadContent('pages/projects.html');
}

function social() {
    loadContent('pages/social.html');
}

// Sayfa yüklendiğinde ana içeriği yükleyin
document.addEventListener('DOMContentLoaded', function() {
    loadContent('pages/homepage.html');
});
