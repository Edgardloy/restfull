$(document).ready(function() {
	const url = "http://www.omdbapi.com/?";
	$("#subm").prop("disabled", "disabled");

	$("#titolo").on("input", function() {
		if(!$(this).val()) {
			$("#subm").prop("disabled", "disabled");
		} else {
			$("#subm").prop("disabled", "");
		}
	});

	$("#subm").on("click", function (event) {
		event.preventDefault();
		$("#lista").html("");
		let titolo = $("#titolo").val();
		let genere = $("#genere").val();

		$.ajax({
		  url: url + 's=' + titolo + '&type=' + genere,
		  method: 'GET'
		}).then(function(data) {
			if(data.Response){
				let movies = data.Search;
				let UL = document.createElement("ul");

				for (var i = 0; i < movies.length; i++) {
					let movie = movies[i];
					let poster = (movie.Poster != "N/A") ? movie.Poster : "http://placehold.it/100x150";
					let block = `<div class="lis-wrap">
		                            <a href="#" class="film" data-id="${movie.imdbID}"><img src="${poster}" alt="${movie.Title}"></a>
		                            <a href="#" class="film" data-id="${movie.imdbID}"><center>${movie.Title}</center></a>
		                            <center>${movie.Year}</center>
                        		</div>`;
					$("#lista").append(block);
				}

				$("#lista").append(UL);			
			}
		});

	});

	$(document).on("click", "a.film", function (event) {
		event.preventDefault();
		$("#lista").hide();

		let filmID = $(this).data("id");

		$.ajax({
		  url: url + 'i=' + filmID,
		  method: 'GET'
		}).then(function(data) {
		 console.log(data);
		 return;
			if(data.Response){
				let movie = data;
				let poster = (movie.Poster != "N/A") ? movie.Poster : "http://placehold.it/100x150";
				let block = `<div class="lis-wrap">
	                            <a href="#" class="film" data-id="${movie.imdbID}"><img src="${poster}" alt="${movie.Title}"></a>
	                            <a href="#" class="film" data-id="${movie.imdbID}"><center>${movie.Title}</center></a>
	                            <center>${movie.Year}</center>
                    		</div>`;
				$("#lista").append(block);
				$("#lista").append(UL);			
			}
		});


	});


});
