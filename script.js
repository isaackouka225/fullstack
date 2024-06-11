document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/articles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(articles => {
            const container = document.getElementById('articles-container');
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'article';
                articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <p>Likes: ${article.likes}</p>
                `;
                container.appendChild(articleElement);
            });
        })
        .catch(error => {
            const container = document.getElementById('articles-container');
            container.innerHTML = `<p>Error loading articles: ${error.message}</p>`;
        });
});
