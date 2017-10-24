function favoriteAccion(){
	
	$('.item').mouseenter(function(){
		var idF = $(this).attr('id')
		$(`#f${idF}`).show()
	})
	$('.item').mouseleave(function(){
		var idF = $(this).attr('id')		
		$(`#f${idF}`).hide()
	})

	function addFavorite(){

	}
}
