


app = {

	titlesList: {},
	teksty: [],
	tytuly: [],
	spisTresci: [],
	options: {
        valueNames: [ 'numer', 'tytul' ],
        item: '<li class="pozycja"><strong class="numer"></strong>. <span class="tytul"></span></li>',
        page: 10
    },


	bindEvents: function() {
		 document.getElementById("back").addEventListener("click",this.back);
		 this.addListClickEvent();
		 this.titlesList.on("updated",this.addListClickEvent);
	},

	initData: function() {
		piesni.sort(function(a,b){return a.numer-b.numer;})
        piesni.forEach(function (e){this.teksty[e.numer] = e.tekst; this.tytuly[e.numer] = e.tytul}.bind(this))

        this.spisTresci = piesni.slice(0);
        this.spisTresci.forEach(function (e){ delete e.tekst})
	},


    init: function() {
 		this.initData();
        this.titlesList = new List('users', this.options, this.spisTresci);
        this.bindEvents();
    },

    click: function(p) {
	    return function() {
	        this.pokaz(p);
	    }.bind(this);
	},


	addListClickEvent: function() {
	    pozycje = document.getElementsByClassName("pozycja");
	    for (i = 0; i < pozycje.length; ++i) {
	        p = pozycje[i];
	        p.addEventListener("click", this.click(p));
	    }
	},


	pokaz: function(e) {
	    numer = parseInt(e.getElementsByClassName('numer')[0].innerHTML);
	    this.pokazTekst(numer);
	},

	pokazTekst: function(numer){
	    document.getElementById("piesn").style.display = "block"
	    document.getElementById("users").style.display = "none"
	    document.getElementById("tytul").innerHTML = this.tytuly[numer];
	    document.getElementById("tekst").innerHTML = this.teksty[numer];
	},


	back: function() {
	    document.getElementById("users").style.display = "block"
	    document.getElementById("piesn").style.display = "none"
	}

}