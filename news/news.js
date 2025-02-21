document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const itemsPerPage = 6; // Nombre d'articles par page
    const newsFeed = document.getElementById("news-feed");
    const loadMoreButton = document.getElementById("load-more");

    function fetchNews(page) {
        fetch(`https://ok.surf/api/v1/cors/news-feed?page=${page}`)
            .then(response => response.json())
            .then(data => {
                data.Technology.slice(0, itemsPerPage).forEach(item => {
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

                if (data.Technology.length < itemsPerPage) {
                    loadMoreButton.style.display = "none";
                }
            })
            .catch(error => console.error(error));
    }

    fetchNews(currentPage);

    loadMoreButton.addEventListener("click", () => {
        currentPage++;
        fetchNews(currentPage);
    });
});