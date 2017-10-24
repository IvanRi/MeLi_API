$(document).ready(init)

function init(){
	$('#search_img').click(textValue)
}

function textValue(){
	var text = $('#textsearch').val();
 	searchData(text)
}

//Request the first results

const elementPag = 10

var itemArray = []

function searchData(text){
	clearResults()
	$.ajax({
		url:`https://api.mercadolibre.com/sites/MLA/search?q=${text}`,
		type: 'get',
		dataType:'JSON',
		success:function(data){
			var objData = data.results
				debugger
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
//FIND IMAGEN THUMBNAIL

var thumbnailArray = []

function findImg(array){
	for (var x = 0; x < array.length; x++) {
		$.ajax({
			url: `https://api.mercadolibre.com/items/${array[x].id}`,
			type: 'get',
			dataType:'JSON',
			success:function(data_thumbnail){
				var newThumbnail = new Thumbnail(data_thumbnail.id , data_thumbnail.pictures[0].secure_url)
				thumbnailArray.push(newThumbnail)
			},
			error:function(xhr , status){
				console.log('data_thumbnail error')
			},
			complete: function(){
				if(thumbnailArray.length == 10){
					viewResults(itemArray , thumbnailArray)
				}
			}
		})
	}
}


//SEE THE RESULTS OF THE LIST

function viewResults(arrayR , arrayT){
	for (var i = 0; i < arrayR.length; i++) {
		for (var x = 0; x < arrayT.length; x++) {
			if(arrayR[i].id == arrayT[x].id){
				$('#cont_results').append(
					`<article class="container_item">
						<div class="item" id="${arrayR[i].id}">
							<div class="item_img" style="background-image:url(${arrayT[x].url})">
							</div>
							<div class="item_attr">
								<div class="price_location">
									<div>
										<h4>$ ${arrayR[i].price}</h4>
										<h5>${arrayR[i].location}</h5>
									</div>
									<span class="ion-android-favorite-outline favoriteIcon" id="f${arrayR[i].id}"></span>
								</div>
								<div class="title_i">
									<h3>${arrayR[i].title}</h3>
								</div>
							</div>
						</div>
					</article>`
				)						
			}
		}
	}
	favoriteAccion()

}