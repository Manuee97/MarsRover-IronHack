window.onload = function(){
	/* Constantes */
	
	let containerElement = document.getElementById("robot_container");
	let robotPositions = {
			"N" : {
				url : "./assets/top.png"
			},
			"E" : {
				url : "./assets/right.png"
			},
			"S" : {
				url : "./assets/bot.png"
			},
			"W" : {
				url : "./assets/left.png"
			}
	}
		
	/* ------------------------------------------- */
	
	/* Funciones */
	
	function crearTabla(container, width, height){
		var html = "<table><thead></thead><tbody>";
		for(var i = 0; i < height; i++){
			html += "<tr>";
			for(var j = 0; j < width; j++){
				html += "<td></td>";
			}
			html += "</tr>";
		}
		
		html += "</tbody></table>";
		container.innerHTML = html;
	}
	
	function asignarPosicionPorDefecto(tableContainer, rover){
		tableContainer.querySelector("td").appendChild(rover);
	}
	
	function crearRover(position){
		var roverElement = document.createElement("div");
		roverElement.style.backgroundImage = "url(" + robotPositions[position]['url'] + ")";
		//console.log(robotPositions[position]['url']);
		roverElement.id = "rover";
		return roverElement;
	}
	
	function getElementsLength(rover, position){ /* Obtener n elementos a la izquierda o a la derecha */
		var counter = 0;
		switch(true){
			case String(position).localeCompare("L") == 0: // Izquierda
				var elementGetLength = rover.parentNode; /* td */
				var previousElement = elementGetLength.previousElementSibling;
				if(previousElement != null){
					counter++;
					while(previousElement.previousElementSibling){
						previousElement = previousElement.previousElementSibling;
						counter++;
					}
				}
			break;
			case String(position).localeCompare("R") == 0: // Derecha
				var elementGetLength = rover.parentNode; /* td */
				var nextElement = elementGetLength.nextElementSibling;
				if(nextElement != null){
					counter++;
					while(nextElement.nextElementSibling){
						nextElement = nextElement.nextElementSibling;
						counter++;
					}
				}
			break;
			case String(position).localeCompare("T") == 0: // Arriba
				var elementGetLength = rover.parentNode.parentNode; /* tr */
				var previousElement = elementGetLength.previousElementSibling;
				if(previousElement != null){
					counter++;
					while(previousElement.previousElementSibling){
						previousElement = previousElement.previousElementSibling;
						counter++;
					}
				}
			break;
			case String(position).localeCompare("B") == 0: // Abajo
				var elementGetLength = rover.parentNode.parentNode; /* tr */
				var nextElement = elementGetLength.nextElementSibling;
				if(nextElement != null){
					counter++;
					while(nextElement.nextElementSibling){
						nextElement = nextElement.nextElementSibling;
						counter++;
					}
				}
			break;
		}
		return counter;
	} 
	
	//Ejercicio
	
	/* ------------------------------------------- */
	
	crearTabla(containerElement, 10, 10);
	
	/* ------------------------------------------- */
	
	// Rover Object Goes Here
	// ======================
	
	var rover = crearRover("N");
	asignarPosicionPorDefecto(containerElement, rover);
	
	// ======================
	function turnLeft(rover){
		console.log("turnLeft was called!");
		 var previousOrNextElementsLength = getElementsLength(rover, "L");
		if(previousOrNextElementsLength != 0){
			console.log("Position: " + previousOrNextElementsLength);
			rover.parentNode.parentNode.children[ ( ( previousOrNextElementsLength - 1 ) ) ].appendChild(rover);
            rover.style.backgroundImage = "url(" + robotPositions["W"]['url'] + ")";
		}
	}

	function turnRight(rover){
	  console.log("turnRight was called!");
	  var previousOrNextElementsLength = getElementsLength(rover, "R");
	    if(previousOrNextElementsLength != 0){
			rover.parentNode.parentNode.children[ ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ) ].appendChild(rover);
            rover.style.backgroundImage = "url(" + robotPositions["E"]['url'] + ")";
		}
	}

	function turnTop(rover){
	  console.log("turnTop was called!");
		var previousOrNextElementsLength = getElementsLength(rover, "T");
		var previousOrNextElementLeftOrRightLength = getElementsLength(rover, "L");
		if(previousOrNextElementsLength != 0){
			console.log("Position: " + ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ));
			console.log(rover.parentNode.parentNode.parentNode.children[ ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ) ]);
			rover.parentNode.parentNode.parentNode.children[ ( ( previousOrNextElementsLength - 1 ) ) ].children[ ( ( previousOrNextElementLeftOrRightLength  ) ) ].appendChild(rover);
			rover.style.backgroundImage = "url(" + robotPositions["N"]['url'] + ")";
		}		
	}
	
	function turnBot(rover){
	  console.log("turnBot was called!");
	  var previousOrNextElementsLength = getElementsLength(rover, "B");
	  var previousOrNextElementLeftOrRightLength = getElementsLength(rover, "L");
		if(previousOrNextElementsLength != 0){
			console.log("Position: " + ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ));
			console.log(rover.parentNode.parentNode.parentNode.children[ ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ) ]);
			rover.parentNode.parentNode.parentNode.children[ ( rover.parentNode.parentNode.parentNode.children.length - ( previousOrNextElementsLength ) ) ].children[ previousOrNextElementLeftOrRightLength ].appendChild(rover);
			rover.style.backgroundImage = "url(" + robotPositions["S"]['url'] + ")";
		}
	}
    
    /* Botones */
    
    document.getElementById("izquierda").onclick = function() {turnLeft(rover)};
	document.getElementById("arriba").onclick = function() {turnTop(rover)};
    document.getElementById("abajo").onclick = function() {turnBot(rover)};
    document.getElementById("derecha").onclick = function() {turnRight(rover)};    
    
    
	window.addEventListener("keydown", function(e){
		var rover = containerElement.querySelector("#rover");
		switch(e.keyCode){
			case 38: // Top
				turnTop(rover);
			break;
			case 39: // Right
				turnRight(rover);
			break;
			case 40: // Bot
				turnBot(rover);
			break;
			case 37: // Left
				turnLeft(rover);
			break;
		}
	});
	
}