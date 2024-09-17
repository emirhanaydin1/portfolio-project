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
    localStorage.lastpage = 'pages/homepage.html';
}

function projects() {
    loadContent('pages/projects.html');
    localStorage.lastpage = 'pages/projects.html';
}

function social() {
    fetchInstagramProfilePicture();
    loadContent('pages/social.html');
    localStorage.lastpage = 'pages/social.html';
}



// Sayfa yüklendiğinde ana içeriği yükleyin
document.addEventListener('DOMContentLoaded', function() {
    fetchInstagramProfilePicture();
    loadContent(localStorage.lastpage);
});



// Access token'inizi buraya yapıştırın (kullanıcı doğrulaması yapılmış olmalı)
const accessToken = 'EAAUWrJk0osgBO0kNZBPPyPdcA3LVo25v2fEiQyWSEbEwd0EgjlfjZCxGr98ZCKq9e9UHY8MD8O5k7dvPzITRd2nRGRJzjHxQiiYZCZCkPi5H1sPXZBZAK0yQ4qptxzFs4Q6lDK1HzgCGrx9M4wvDWZCZATBdW3fH1ijNLDJAKjmbj2hAM9LlOv0xPckZBcgPRiMDK0ZCWLYaoERR5Oubi6A45zkLIZAjdIq26FEMdDDyutZBsagZDZD';  // Facebook Developer'dan alınan Access Token

// Kullanıcı ID'sini girin
const instagramUserID = '17841456867797955';  // Instagram kullanıcı ID'si

// Instagram Profil Fotoğrafını Çekmek İçin API Çağrısı
const fetchInstagramProfilePicture = async () => {
    const apiURL = `https://graph.facebook.com/v17.0/${instagramUserID}?fields=profile_picture_url,followers_count,biography&access_token=${accessToken}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.profile_picture_url) {
            // Profil fotoğrafı URL'sini <img> etiketine yerleştir
            document.getElementById("profile-pic").src = data.profile_picture_url;
            document.getElementById("biography").innerHTML = "Biography: <br>" + data.biography;
            document.getElementById("followers").innerHTML =  document.getElementById("followers").innerHTML + data.followers_count;
        } else {
            console.error("Profil fotoğrafı bulunamadı ya da erişim izniniz yok.");
        }
    } catch (error) {
        console.error("API isteği başarısız oldu: ", error);
    }
};
// Fonksiyonu çağı

