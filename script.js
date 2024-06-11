document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/articles') // Changez ici le port si nécessaire
        .then(response => response.json())
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
        });
});
