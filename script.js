const apiKey = "99328bbd"; // Replace with your OMDb API key

document.getElementById('searchButton').addEventListener('click', async () => {
    const movieTitle = document.getElementById('movieTitle').value.trim();
    if (!movieTitle) {
        alert('Please enter a movie title!');
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`);
        const data = await response.json();

        if (data.Response === "False") {
            document.getElementById('movieContainer').innerHTML = `<p>${data.Error}</p>`;
            return;
        }

        document.getElementById('movieContainer').innerHTML = `
                    <div class="movie-container">
                        <h2>${data.Title} (${data.Year})</h2>
                        <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${data.Title}">
                        <div class="movie-details">
                            <p><strong>Genre:</strong> ${data.Genre}</p>
                            <p><strong>Director:</strong> ${data.Director}</p>
                            <p><strong>Plot:</strong> ${data.Plot}</p>
                            <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                        </div>
                    </div>
                `;
    } catch (error) {
        document.getElementById('movieContainer').innerHTML = "<p>Failed to fetch movie details. Please try again later.</p>";
    }
});