

app = {
	teksty: [],
	tytuly: [],
	spisTresci: [],
	options: {
        valueNames: [ 'numer', 'tytul' ],
        item: '<li class="pozycja"><strong class="numer"></strong>. <span class="tytul"></span></li>'
    },


	bindEvents: function() {
		
		if (document.getElementsByClassName("list").length>0) {
			window.addEventListener("resize",this.resizePiesni);
			document.getElementsByClassName("list")[0].addEventListener("resize",this.resizeTekst);		
			this.titlesList = new List('container', this.options, this.spisTresci);
			this.titlesList.on("updated",this.addListClickEvent.bind(this));
			this.addListClickEvent();
			this.resizePiesni();
			document.getElementById("literyCyfry").addEventListener("click", this.changeKeyboard);
		}
		else {
			this.resizeTekst();
			document.getElementById("tekst").addEventListener("resize",this.resizeTekst);		
			numer = localStorage.getItem("numer");
			this.pokazTekst(numer)
			this.resizeTekst()
		}
	},

	initData: function() {
		piesni.sort(function(a,b){return a.numer-b.numer;})
        piesni.forEach(function (e){this.teksty[e.numer] = e.tekst; this.tytuly[e.numer] = e.tytul}.bind(this))

        this.spisTresci = piesni.slice(0);
        this.spisTresci.forEach(function (e){ delete e.tekst})
	},


    init: function() {
 		this.initData();
        this.bindEvents();
    },

    click: function(p) {
	    return function() {
	        this.pokaz(p);
	        window.location.href = 'piesn.html';
	    }.bind(this);
	},


	addListClickEvent: function() {
	    pozycje = document.getElementsByClassName("pozycja");
	    for (i = 0; i < pozycje.length; ++i) {
	        p = pozycje[i];
	        p.addEventListener("click", this.click(p),true);
	    }
	},


	pokaz: function(e) {
	    numer = parseInt(e.getElementsByClassName('numer')[0].innerHTML);
	    window.localStorage.setItem("numer",numer);
	},

	pokazTekst: function(numer){
	    document.getElementById("tytul").innerHTML = this.tytuly[numer];
	    document.getElementById("tekst").innerHTML = this.teksty[numer];
	    this.resizeTekst();
	},

	resizePiesni: function () {
		search = document.getElementsByClassName("search")[0];
		list = document.getElementsByClassName("list")[0];
		container = list.parentElement;
		body = container.parentElement;
		container.style.height = body.clientHeight+"px";
		list.style.height = Math.floor(container.clientHeight-search.offsetHeight-20)+"px";
	},



	resizeTekst: function () {
		tekst = document.getElementById("tekst");
		tytul = document.getElementById("tytul");
		container = piesn.parentElement;
		body = container.parentElement;
		container.style.height = body.clientHeight+"px";
		tekst.style.height = (container.clientHeight-tytul.offsetHeight)+"px";
	},

	changeKeyboard: function () {
		currentKeyboard = document.getElementById("literyCyfry").innerHTML;
		if (currentKeyboard==="Abc") {
			document.getElementById("literyCyfry").innerHTML = "123";
			document.getElementById("search").type = "Text";
			document.getElementById("search").placeholder = "Numer, Tytuł";
			document.getElementById("search").value = "";
		} else {
			document.getElementById("literyCyfry").innerHTML = "Abc";
			document.getElementById("search").type = "Number";
			document.getElementById("search").value = "";
		}
	}
}
