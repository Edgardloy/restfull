$(document).ready(function() {
	
	const urlGenere = "http://www.omdbapi.com/?";
	const block_per_movies = "#lista";
	const block_per_movie = "#film-desc";
	const input_titolo = "#titolo";
	const input_genere = "#genere";
	const btn_submit = "#subm";
	
	$(btn_submit).prop("disabled", "disabled");

	$(input_titolo).on("input", function() {
		if(!$(this).val()) {
			$(btn_submit).prop("disabled", "disabled");
		} else {
			$(btn_submit).prop("disabled", "");
		}
	});

	$(btn_submit).on("click", function (event) {
		event.preventDefault();
		$(block_per_movies).html("");
		let titolo = $(input_titolo).val();
		let genere = $(input_genere).val();

		moviesService.setParam({url:urlGenere})
					.getList(titolo, genere)
					.then(function(data) {
						if(data.Response){
							let movies = data.Search;
							show.Movies(movies, block_per_movies);	
						}
					});

	});

	$(document).on("click", "a.film", function (event) {
		event.preventDefault();
		$(block_per_movies).hide();

		let filmID = $(this).data("id");

		moviesService.setParam({url:urlGenere})
					.getMovie(filmID)
					.then(function(data) {
						if(data.Response){
							let movie = data;
							show.Movie(movie, block_per_movie);
						}
					});

		$(block_per_movie).show();
	});

});

var moviesService = (function () {
	let _url = "";

	let _setParam = function (param) {
		_url = param.url;
		return this;
	}
	let _getList = function (titolo, genere) {
		return $.ajax({
		  url: _url + 's=' + titolo + '&type=' + genere,
		  method: 'GET'
		});
	}

	let _getMovie = function (filmID) {
		return $.ajax({
		  url: _url + 'i=' + filmID,
		  method: 'GET'
		});
	}
	
	return {
		setParam: _setParam,
		getList: _getList,
		getMovie: _getMovie
	}
})();

var show = (function () {
	
	var _Movies = function (listaMovies, idBlock) {
		for (var i = 0; i < listaMovies.length; i++) {
			let movie = listaMovies[i];
			let poster = (movie.Poster != "N/A") ? movie.Poster : "http://placehold.it/100x150";
			let block = `<div class="lis-wrap">
                            <a href="#" class="film" data-id="${movie.imdbID}"><img src="${poster}" alt="${movie.Title}"></a>
                            <a href="#" class="film" data-id="${movie.imdbID}"><center>${movie.Title}</center></a>
                            <center>${movie.Year}</center>
                		</div>`;
			$(idBlock).append(block);
		}
	}

	var _Movie = function (movie, idBlock) {
		let poster = (movie.Poster != "N/A") ? movie.Poster : "http://placehold.it/300x450";
		let rating = Math.floor(movie.imdbRating);
		var stelle = "";
		for (var i = 0; i < rating; i++) {
			stelle += "<img src='img/stella.png' width='20px'>";
		}
		let block = `<div>
                        <img src="${poster}">
                    </div>
                    <div class="colum">
                    	<span><h1>${movie.Title}</h1></span>
                        <div><span>Raiting: </span> ${movie.imdbRating} ${stelle}</div>
                        <div><span>Country: </span>${movie.Country}</div>
                        <div><span>Year: </span>${movie.Year}</div>
                        <div><span>Released: </span>${movie.Released}</div>
                        <div><span>Runtime: </span>${movie.Runtime}</div>
                        <div><span>Genre: </span>${movie.Genre}</div>
                        <div><span>Director: </span>${movie.Director}</div>
                        <div><span>Actors: </span>${movie.Actors}</div>
                        <div><span>Desc: </span>${movie.Plot}</div>
                        <div class="hr"></div>
                    </div>`;
		$(idBlock).append(block);	
	}
	
	return {
		Movies: _Movies,
		Movie: _Movie
	}
})();
