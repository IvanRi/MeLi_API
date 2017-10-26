var idObjFav = 100

if(localStorage.length<3){
	localStorage.setItem(1,100)
	idObjFav = localStorage.getItem(1)
}else{
	idObjFav = localStorage.getItem(1)
}

function favoriteAccion(){

	$('.item').mouseenter(function(){
		var idF = $(this).attr('id')
		$(`#f${idF}`).show()
	})
	$('.item').mouseleave(function(){
		var idF = $(this).attr('id')		
		$(`#f${idF}`).hide()
	})

	$('.favoriteIcon').click(function(){
		var idF = $(this).attr('id')
		$(`#${idF}`).toggleClass('ion-heart')
		// 	CAMBIAR VALIDACION DEL LOCALSTORAGE CON IDOBJFAV
		var idFLS = idF.substring(1)
		if(localStorage.getItem(idFLS)==null){
			localStorage.setItem(idObjFav,idFLS)
			idObjFav++
			localStorage.setItem(1,idObjFav)		
		}else{
			localStorage.removeItem(idFLS)
		}
	})
}

//to fav

// $('#favoriteButton').click(toFav)

function toFav(){

	$.ajax({
		url:`https://api.mercadolibre.com/sites/MLA/search?q=${text}`,
		type: 'get',
		dataType:'JSON',
		success:function(data){
			clearResults()
			var objData = data.results
			for (var i = 0; i < elementPag; i++){
				var priceF = priceFormat(objData[i].price)
				var newItem = new Item(objData[i].title , priceF , objData[i].address.state_name , objData[i].id , objData[i].shipping.free_shipping)
				itemArray.push(newItem)				
			}
		},
		error:function(xhr , status){
			console.log('searchData error')
		},
		complete:function(){
			findImg(itemArray)
		}
	})	

}	
