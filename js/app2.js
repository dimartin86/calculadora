
var Calculadora = {
	iniciar: function(){
		Calculadora.principal();
	},
	principal: function(){
		var tecla = document.querySelectorAll('.teclado img');

		var operacion = '';

		for(var i = 0; i<tecla.length; i++){			
			tecla[i].addEventListener("mousedown", function(){
				elem = document.getElementById(this.id);


				if (elem.classList.contains("tecla2")) {
					elem.setAttribute("style", "width:27%");
				}
				else if(this.id == "mas"){					
					elem.setAttribute("style", "width:88%");
					Calculadora.arrResultado.push(Calculadora.numeroEnPantalla());
					Calculadora.numero = [];

					if (Calculadora.operacion == 'restar') {
						Calculadora.operacion = 'sumardespuesderestar';
					}
					else{
						Calculadora.operacion = 'sumar';					
					}
				}
				else if(this.id == "menos"){
					elem.setAttribute("style", "width:20%");
					Calculadora.arrResultado.push(Calculadora.numeroEnPantalla());
					Calculadora.numero = [];

					if (Calculadora.operacion == 'sumar') {
						Calculadora.operacion = 'restardespuesdesumar';
					}
					else{
						Calculadora.operacion = 'restar';					
					}					
				}
				else if(this.id == "por"){
					elem.setAttribute("style", "width:20%");
					Calculadora.arrResultado.push(Calculadora.numeroEnPantalla());
					Calculadora.numero = [];

					if (Calculadora.operacion == 'sumar') {
						Calculadora.operacion = 'multiplicardespuesdesumar';
					}
					else if (Calculadora.operacion == 'restar') {
						Calculadora.operacion = 'multiplicardespuesderestar';
					}
					else{
						Calculadora.operacion = 'multiplicar';					
					}					
				}	
				else if(this.id == "dividido"){
					elem.setAttribute("style", "width:20%");
					Calculadora.arrResultado.push(Calculadora.numeroEnPantalla());
					Calculadora.numero = [];

					if (Calculadora.operacion == 'sumar') {
						Calculadora.operacion = 'dividirdespuesdesumar';
					}
					else if (Calculadora.operacion == 'restar') {
						Calculadora.operacion = 'dividirdespuesderestar';
					}
					else{
						Calculadora.operacion = 'dividir';					
					}					
				}											
				else{
					elem.setAttribute("style", "width:20%");					
				}	

				if(this.id == 'on'){
					Calculadora.arrResultado = [];
					Calculadora.numero = [];
					Calculadora.operacion = '';
					Calculadora.resultadotemporal= 0;
					document.getElementById('display').innerHTML = 0;
				}					

				if(isNaN(this.id) == false || this.id == 'punto' || this.id == 'sign'){
					if(Calculadora.numero.length <= 8){
						if(isNaN(this.id) == false){
							Calculadora.numero.push(this.id);							
						}
						else if(this.id == 'punto'){
							Calculadora.numero.push('.');
						}
						else{
							if(Calculadora.numero[0].includes('-')){
								Calculadora.numero[0] = Calculadora.numero[0].replace('-', '');
							}
							else{
								Calculadora.numero[0] = '-'+Calculadora.numero[0];
							}
						}
					}	

					if (isNaN(Calculadora.numeroEnPantalla()) == false) {
						document.getElementById('display').innerHTML = Calculadora.numeroEnPantalla();	
					}		
				}		


				if(this.id == 'igual'){
					if(Calculadora.operacion == 'sumar'){
						document.getElementById('display').innerHTML = Calculadora.sumar('sumar');							
					}
					else if(Calculadora.operacion == 'restar'){
						document.getElementById('display').innerHTML = Calculadora.restar('restar');
					}
					else if (Calculadora.operacion == 'sumardespuesderestar') {
						Calculadora.resultadotemporal = Calculadora.restar('restar');
						document.getElementById('display').innerHTML = Calculadora.sumar('sumardespuesderestar');
					}
					else if(Calculadora.operacion == 'restardespuesdesumar'){
						Calculadora.resultadotemporal = Calculadora.sumar('sumar');
						document.getElementById('display').innerHTML = Calculadora.restar('restardespuesdesumar');
					}
					else if(Calculadora.operacion == 'multiplicar'){
						document.getElementById('display').innerHTML = Calculadora.multiplicar('multiplicar');	
					}
					else if(Calculadora.operacion == 'multiplicardespuesdesumar'){
						Calculadora.resultadotemporal = Calculadora.sumar('sumar');
						document.getElementById('display').innerHTML = Calculadora.multiplicar('multiplicardespuesdesumar');	
					}			
					else if(Calculadora.operacion == 'multiplicardespuesderestar'){
						Calculadora.resultadotemporal = Calculadora.restar('restar');
						document.getElementById('display').innerHTML = Calculadora.multiplicar('multiplicardespuesderestar');	
					}
					else if(Calculadora.operacion == 'dividir'){
						document.getElementById('display').innerHTML = Calculadora.dividir('dividir');
					}	
					else if(Calculadora.operacion == 'dividirdespuesdesumar'){
						Calculadora.resultadotemporal = Calculadora.sumar('sumar');
						document.getElementById('display').innerHTML = Calculadora.dividir('dividirdespuesdesumar');	
					}			
					else if(Calculadora.operacion == 'dividirdespuesderestar'){
						Calculadora.resultadotemporal = Calculadora.restar('restar');
						document.getElementById('display').innerHTML = Calculadora.dividir('dividirdespuesderestar');	
					}											
				}								
			})					

			tecla[i].addEventListener("mouseup", function(){
				elem = document.getElementById(this.id);

				if(elem.classList.contains("suma")){
					elem.setAttribute("style", "width: 90%,");
				}
				else if (elem.classList.contains("tecla2")) {
					elem.setAttribute("style", "width:29%");
				}
				else{
					elem.setAttribute("style", "width: 22%");
				}
			})			
		}
	},
	numero: new Array(),
	arrResultado: new Array(),
	operacion: '',
	resultadotemporal: 0,
	numeroEnPantalla: function(){	
		var num = parseFloat(Calculadora.numero.join(""));
		
		return num;

	},
	sumar: function(accion){
		if (accion == 'sumardespuesderestar') {
			var res = Calculadora.restar('restar')+ (Calculadora.numeroEnPantalla()*2);	
			Calculadora.resultadotemporal = res + Calculadora.numeroEnPantalla();
		}
		else{
			if (Calculadora.resultadotemporal != 0) {
				res = Calculadora.resultadotemporal;
				Calculadora.arrResultado = [Calculadora.resultadotemporal];
				Calculadora.resultadotemporal = 0;
			}
			else{
				var res = 0;

				for(var i = 0; i<Calculadora.arrResultado.length; i++){
					res = res+Calculadora.arrResultado[i];
				}				
			}
				
		}		
			

		var res = res + Calculadora.numeroEnPantalla();
		

		return res;

	},
	restar: function(accion){
		if (accion == 'restardespuesdesumar') {
			var res = Calculadora.sumar('sumar')- (Calculadora.numeroEnPantalla()*2);	
			Calculadora.resultadotemporal = res-Calculadora.numeroEnPantalla();
		}
		else{
			if (Calculadora.resultadotemporal != 0) {
				res = Calculadora.resultadotemporal;
				Calculadora.arrResultado = [Calculadora.resultadotemporal];
				Calculadora.resultadotemporal = 0;
			}
			else{	
				var res = 0;

				for(var i = 0; i<Calculadora.arrResultado.length; i++){
					if(i == 0){
						res = res+Calculadora.arrResultado[i];
					}
					else{
						res = res-Calculadora.arrResultado[i];
					}
				}
			}
		}		

		var res = res - Calculadora.numeroEnPantalla();
		return res;
	},
	multiplicar: function(accion){
		if (accion == 'multiplicardespuesdesumar') {
			var res = Calculadora.resultadotemporal - Calculadora.numeroEnPantalla();
			Calculadora.resultadotemporal  = res * Calculadora.numeroEnPantalla();
		}
		else if (accion == 'multiplicardespuesderestar'){
			console.log(Calculadora.resultadotemporal +", numenpantalla: "+ Calculadora.numeroEnPantalla());
			var res = Calculadora.resultadotemporal + Calculadora.numeroEnPantalla();
			Calculadora.resultadotemporal  = res * Calculadora.numeroEnPantalla();
		}		
		else{
			if (Calculadora.resultadotemporal != 0) {
				res = Calculadora.resultadotemporal;
				Calculadora.arrResultado = [Calculadora.resultadotemporal];
				Calculadora.resultadotemporal = 0;
			}
			else{	
				var res = 1;

				for(var i = 0; i<Calculadora.arrResultado.length; i++){
					res *= Calculadora.arrResultado[i];
				}
			}
				
		}		
			
		var res = res * Calculadora.numeroEnPantalla();
		

		return res;

	},
	dividir: function(accion){
		alert(accion)
		if (accion == 'dividirdespuesdesumar') {
			var res = Calculadora.resultadotemporal - Calculadora.numeroEnPantalla();
			Calculadora.resultadotemporal  = res / Calculadora.numeroEnPantalla();
		}
		else if (accion == 'dividirdespuesderestar'){
			var res = Calculadora.resultadotemporal + Calculadora.numeroEnPantalla();
			Calculadora.resultadotemporal  = res / Calculadora.numeroEnPantalla();
		}		
		else{
			if (Calculadora.resultadotemporal != 0) {
				res = Calculadora.resultadotemporal;
				Calculadora.arrResultado = [Calculadora.resultadotemporal];
				Calculadora.resultadotemporal = 0;
			}
			else{	
				var res = 1;

				console.log(Calculadora.arrResultado)

				for(var i = 0; i<Calculadora.arrResultado.length; i++){
					if(i == 0){
						res = Calculadora.arrResultado[i]/res;
					}
					else{
						res = res/Calculadora.arrResultado[i];
					}					
				}
			}
				
		}		
		
		alert(res +' '+ Calculadora.numeroEnPantalla())	
		var res = res / Calculadora.numeroEnPantalla();
		

		return res;

	}				
}

Calculadora.iniciar()



