var Calculadora = {
	num1 : 0,
	num2 : 0,
	opera : 0,
	iniciar: function(){
		var elemento = document.getElementsByClassName('numero');
		for (var i = 0; i < elemento.length; i++) {
        	elemento[i].addEventListener('click', function(){
				Calculadora.darNumero(this.id);
			});	
		}	

    	var punto = document.getElementById('punto');
    	punto.addEventListener('click', function(){		
			Calculadora.darComa();
		})

    	var on = document.getElementById('on');
    	on.addEventListener('click', function(){  	
			Calculadora.resetear();
		});

		Calculadora.operar();

    	var igual = document.getElementById('igual');
    	igual.addEventListener('click', function(){ 		
			Calculadora.esIgual();
		});	

		var botones = document.getElementsByTagName('img');
		for (var i = 0; i < botones.length; i++) {
			botones[i].addEventListener('mousedown', function(){
				Calculadora.estiloBoton(this.id);
			});
			botones[i].addEventListener('mouseup', function(){
				Calculadora.quitarEstiloBoton(this.id);
			});			
		}	
	},
	darNumero: function(num){
		if(Calculadora.num1 <= 99999999){
            if(Calculadora.num1==0 && Calculadora.num1 !== '0.'){
                Calculadora.num1 = num;
            }else{
                Calculadora.num1 += num;
            }		            
    	}  
    	Calculadora.refrescar(); 			
	},
	darComa: function(){
        if(Calculadora.num1 == 0) {
            Calculadora.num1 = '0.';
        } else if(Calculadora.num1.indexOf('.') == -1) {
            Calculadora.num1 += '.';
        }
        Calculadora.refrescar();    			
	},
	resetear: function(){      	
        Calculadora.num1 = 0;
        Calculadora.num2 = 0;
        Calculadora.refrescar();
	},
	operar: function(){
    	var operacion = document.getElementsByClassName('operacion');
    	var valor;

    	for (var i = 0; i < operacion.length; i++) {
    		operacion[i].addEventListener('click', function(){ 
        		if(this.id == 'dividido'){
        			valor = 4;
        		}
        		else if(this.id == 'por'){
        			valor = 3;
        		}
        		else if(this.id == 'mas'){
        			valor = 1;
        		} 
        		else if(this.id == 'menos'){
        			valor = 2;
        		}   

	            if (Calculadora.num1 == 0){
	                Calculadora.num1 = parseFloat(document.getElementById("display").textContent);
	            }
	            Calculadora.num2 = parseFloat(Calculadora.num1);
	            Calculadora.num1= 0;
	            Calculadora.opera = valor;
	        })   
        } 		
	},
	esIgual: function(){
       	
            Calculadora.num1 = parseFloat(Calculadora.num1);
            switch (Calculadora.opera){
                case 1:
                    Calculadora.num1 += Calculadora.num2;
                break;
                case 2:
                    Calculadora.num1 = Calculadora.num2 - Calculadora.num1;
                break;
                case 3:
                    Calculadora.num1 *= Calculadora.num2;
                break;
                case 4:
                    Calculadora.num1 = Calculadora.num2 / Calculadora.num1;
                break;
            }
            Calculadora.refrescar();
            Calculadora.num2 = parseFloat(Calculadora.num1);
            Calculadora.num1 = 0;
	
	},
	estiloBoton: function(id){
		elem = document.getElementById(id);

		if (elem.classList.contains("tecla2")) {
			elem.setAttribute("style", "width:27%");
		}
		else if(id == "mas"){	
			elem.setAttribute("style", "width:88%");
		}	
		else{
			elem.setAttribute("style", "width:20%");
		}	

		if(id == 'sign'){
	        if(document.getElementById("display").textContent == 0) {
	            Calculadora.num1 = '0';
	        } else{
	            Calculadora.num1 = parseFloat(document.getElementById("display").textContent)* -1;
	        }
	        Calculadora.refrescar();  
		}
	},
	quitarEstiloBoton: function(id){
		elem = document.getElementById(id);

		if(elem.classList.contains("suma")){
			elem.setAttribute("style", "width: 90%,");
		}
		else if (elem.classList.contains("tecla2")) {
			elem.setAttribute("style", "width:29%");
		}
		else{
			elem.setAttribute("style", "width: 22%");
		}
	},
	refrescar: function(){
		document.getElementById("display").textContent = Calculadora.num1;		
	}
}

Calculadora.iniciar();
