function setItemsLS(array){
	localStorage.setItem(0,JSON.stringify(array))
}

function getItemsLS(){
	return JSON.parse(localStorage.getItem(0))
}