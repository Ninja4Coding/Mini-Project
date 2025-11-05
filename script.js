const newsContainer = document.getElementById("news-container");

// Replace with any RSS feed URL
const rssUrl = encodeURIComponent("https://www.livemint.com/rss/news");

async function fetchNews() {
  newsContainer.innerHTML = "<p>Loading news...</p>";

  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await response.json();
    const articles = data.items;
    displayNews(articles);
  } catch (error) {
    newsContainer.innerHTML = "<p>Failed to load news. Try again later.</p>";
    console.error(error);
  }
}

function displayNews(articles) {
  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = "<p>No news available.</p>";
    return;
  }

  newsContainer.innerHTML = articles.map(article => `
    <div class="news-card">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
    </div>
  `).join('');
}

// Load news on page load
window.addEventListener("load", fetchNews);
