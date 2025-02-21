document.addEventListener("DOMContentLoaded", function() {
    fetch("https://ok.surf/api/v1/cors/news-feed")
        .then(response => response.json())
        .then(data => {
            const newsFeed = document.getElementById("news-feed");
            data.Technology.forEach(item => {
                const newsItem = document.createElement("div");
                newsItem.classList.add("news-item");
  
                const title = document.createElement("h2");
                title.textContent = item.title;
  
                const description = document.createElement("p");
                description.textContent = item.description;
  
                const link = document.createElement("a");
                link.href = item.url;
                link.textContent = "Lire la suite";
  
                newsItem.appendChild(title);
                newsItem.appendChild(description);
                newsItem.appendChild(link);
                newsFeed.appendChild(newsItem);
            });
        })
        .catch(error => console.error(error));
  });