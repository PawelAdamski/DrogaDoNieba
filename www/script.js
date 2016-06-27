var options = {
  valueNames: [ 'numer', 'tytul' ],
  item: '<li class="pozycja"><strong class="numer"></strong>. <span class="tytul"></span></li>',
  page: 10
};

piesni.sort(function(a,b){return a.numer-b.numer;})
var teksty = []
var tytuly = []
piesni.forEach(function (e){ teksty[e.numer] = e.tekst; tytuly[e.numer] = e.tytul})

var lista = piesni.slice(0);
lista.forEach(function (e){ delete e.tekst})


var usersList = new List('users', options, lista);


click = function(p) {
	return function() {
		pokaz(p);
	}
}


addCallback = function() {
	pozycje = document.getElementsByClassName("pozycja");
	for (i = 0; i < pozycje.length; ++i) {
    	p = pozycje[i];
    	p.addEventListener("click", click(p));
	}
}


usersList.on("updated",addCallback);
addCallback();

function pokaz(e) {
	numer = parseInt(e.getElementsByClassName('numer')[0].innerHTML);
	pokazTekst(numer);
}

function pokazTekst(numer){
	document.getElementById("piesn").style.display = "block"
	document.getElementById("users").style.display = "none"
	document.getElementById("tytul").innerHTML = tytuly[numer];
	document.getElementById("tekst").innerHTML = teksty[numer];
}

function back() {
	document.getElementById("users").style.display = "block"
	document.getElementById("piesn").style.display = "none"
}
