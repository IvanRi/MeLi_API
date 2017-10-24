function priceFormat(el){
	var elReverse = el.toString().split("").reverse()
	for (var i = 2; i < elReverse.length; i+=4) {
		if(elReverse[i+1] != undefined){
			elReverse.splice(i+1,0,".")
		}
	}
	return elReverse.reverse().join("")
}