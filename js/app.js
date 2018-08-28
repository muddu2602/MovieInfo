$(document).ready( () => {
    $('#searchForm').on('submit' , (e) => {
        let movie = $('#searchText').val()
        getMovies(movie)
        e.preventDefault()
    })
})


function getMovies(movie){
    axios.get( 'http://www.omdbapi.com/?apikey=1846104e&s='+movie)
    .then( (response) => {
        console.log(response)
        let movies = response.data.Search
        let output = ''
        $.each(movies , (index , movie) => {
            output += `
        <div class="row">
            <div class="col m6 l3 s12">
                <div class="card">
                    <div class="card-image">
                        <img src="${movie.Poster}">
                        <!-- <span class="card-title">${movie.Title}</span> -->
                        <a class="btn green" href="#" onclick="movieSelected('${movie.imdbID}')"><i class="material-icons">local_movies</i>Movie Details</a>
                    </div>
                    <div>
                </div>
            </div> 
        </div>
            `;
        })
        $('#movies').html(output);

    }).catch( (err) => {
        console.log(err)
    })
}

function movieSelected(id){
    sessionStorage.setItem('movieId' , id);
    window.location = 'movie.html'
    return false
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId')
    axios.get( 'http://www.omdbapi.com/?apikey=1846104e&i='+movieId)
    .then( (response) => {
        console.log(response)
        let movie = response.data
        let output  = `
          <div class="row">
                <div class="col m12 l6 s12">
                    <div class="card">
                        <div class="card-image">
                            <img src="${movie.Poster}">
                        </div>
                        
                    </div>
                </div>

                <div class="col m12 l6 s12">
                    <ul class="collection with-header">
                    <li class="collection-header"><h4>${movie.Title}</h4></li>
                    <li class="collection-item"><strong>Genre : </strong>${movie.Genre}</li>
                    <li class="collection-item"><strong>Released : </strong>${movie.Released}</li>
                    <li class="collection-item"><strong>Rated : </strong>${movie.Rated}</li>
                    <li class="collection-item"><strong>IMDB Rating : </strong>${movie.imdbRating}</li>
                    <li class="collection-item"><strong>Director : </strong>${movie.Ditector}</li>
                    <li class="collection-item"><strong>Writer : </strong>${movie.Writer}</li>
                    <li class="collection-item"><strong>Actors : </strong>${movie.Actors}</li>
                    
                    </ul>
                </div>
           </div>

           <div class="row">
                <div class="col s12 m6 l12">
                    <div class="card deep-purple">
                        <div class="card-content white-text">
                            <span class="card-title">${movie.Title}</span>
                            <p>${movie.Plot}</p>
                        </div>
                        <div class="card-action">
                            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn black accent-2"><i class="material-icons">local_movies</i>VIEW IMDB</a>
                            <a class="btn-floating right btn-large waves-effect waves-light red" href="/"><i class="material-icons">home</i></a>
                    </div>
                </div>
            </div>
  </div>
        `
        $('#movie').html(output);


    }).catch( (err) => {
        console.log(err)
    })
}

