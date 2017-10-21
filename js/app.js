//llamados
var juegoActivo = 0
movimientos = 1
puntuacion = 0
totalImagenes = 35
totalFilas = 5
totalColumnas = 7
bloqueo = 0
min= 1
seg=60;
var data = [];
var item;
var itemDiv;
var arrayDiv = [];
//iniciar juego
var juegoDulces = {
  init: function(){
    $(".btn-reinicio").on("click", function(){
      switch(juegoActivo){
        case 0:
        juegoDulces.iniciarJuego();
        break;
        case 1:
        juegoActivo = 2;
        clearInterval(juego);
        juegoDulces.terminarJuego();
        break;
        case 2:
        juegoDulces.reiniciarJuego();
        break;
        default:
        console.log('Error en el estado juegoActivo');
      }
    });
		//llamado animaciones
    this.animacionTitulo();
    this.cargarImagenes();
  },
	//botón  inicio / reinicias
  iniciarJuego: function(){
    $(".btn-reinicio").html('Reiniciar');
    juegoActivo = 1;
    juego = setInterval (function(){
     juegoDulces.inicioTiempo()
   },1000);
    this.scanRepetidosCol();
    this.scanRepetidosFil();
    if(data.length != 0){
      setTimeout(function(){
        juegoDulces.animacionAcertar();
      }, 800);
    }
  },
	//finalizar juego
  terminarJuego: function(){
    $(".panel-tablero").hide("slide", {direction: "left"}, "slow", function(){
      $(".time").hide("slide", {direction: "left"}, "slow");
      $(".panel-score").animate({width: "390%"}, 1000);
      if(juegoActivo != 1){
        $(".score").before("<p class='final'>Juego Terminado</p>");
      }
    });
  },
	//reinicio juego
  reiniciarJuego: function(){
    var col = $("div[class^='col']");
    for (var i = 0; i < col.length; i++) {
      $(col[i]).html('');
    }
		//panel de puntaje y movimientos
    clearInterval(juego);
    $(".btn-reinicio").html('Iniciar');
    $("#timer").html('02:00');
    $(".final").remove();
    $("#movimientos-text").html('0');
    $("#score-text").html('0');
    puntuacion = 0;
    movimientos = 1;
    this.cargarImagenes();
    $(".main-titulo-2").remove();
    $(".panel-score").animate({width: "25%"}, 1000, function(){
      $(".panel-tablero").show("slide", {direction: "left"}, "slow");
      $(".time").show("slide", {direction: "left"}, "slow");
    });
    juegoActivo = 0;
  },
	//cuenta regresiva
  inicioTiempo: function(){
    if (seg !=0) {
      seg = seg -1;
      $('#timer').html('0'+min+':'+seg);
    }



    if (seg>0 && seg<10){
      $('#timer').html('0'+min+':'+'0'+seg);
    }
    if (min==0 && seg==0){
      clearInterval(juego);
      $(".panel-tablero").hide("fold",2000,funcioncita);
      $(".time").hide();
      seg=60;
      min=1;
      juegoActivo=2;
      $("#timer").html("0"+min+":"+seg);
    }
    if ( seg == 0)  {
      min=min-1;
      seg=59;
      $('#timer').html('0'+min+':'+seg);
    }


   //panel finalizacion juego
    function funcioncita(){
      $( ".panel-score" ).animate({width:'100%'},3000);
      $(".score").before("<p class='final'>Juego Terminado</p>");
    }
  },
	//cambio color titulo
  animacionTitulo: function(){
    setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-tituloc", 200),
      $(".main-tituloc").switchClass("main-tituloc","main-titulo", 200)
    }, 1000);
  },
	//llamado ducles
  imagenes: function(){
    var i = 0;
    this[i++] = "image/1.png";
    this[i++] = "image/2.png";
    this[i++] = "image/3.png";
    this[i++] = "image/4.png";
    this.total = i;
  },
  obtenerColumnas: function(){
    var i = 0;
    this[i++] = $(".col-1").find("div");
    this[i++] = $(".col-2").find("div");
    this[i++] = $(".col-3").find("div");
    this[i++] = $(".col-4").find("div");
    this[i++] = $(".col-5").find("div");
    this[i++] = $(".col-6").find("div");
    this[i++] = $(".col-7").find("div");
    this.total = i;
  },
  obtenerFilas: function(){
    var i = 0;
    this[i++] = $("[id*=img-1]");
    this[i++] = $("[id*=img-2]");
    this[i++] = $("[id*=img-3]");
    this[i++] = $("[id*=img-4]");
    this[i++] = $("[id*=img-5]");
    this.total = i;
  },
  cargarImagenes: function(){
    var num = 1;
    var numImg = 1;
    for(var i = 1; i <= totalColumnas; i++){
      for(var ii = 1; ii <= totalFilas; ii++){
        var imagen = new this.imagenes;
        var src = imagen[Math.floor(Math.random() * imagen.total)];
        $(".col-" + num).append("<div id='item-"+ numImg +" img-"+ ii +"'>" +
          "<img src="+ src +" class='imagen-"+ numImg +"'>" +
          "</div>");
        $(".imagen-" + numImg).draggable({
          revert: true,
          containment: ".panel-tablero",
          start: function(){
            if(juegoActivo == 1){
              $("#movimientos-text").html(movimientos++);
            }
          },
          stop: function(){
            if(juegoActivo == 1){
              if(bloqueo == 0){
                juegoDulces.scanRepetidosCol();
                juegoDulces.scanRepetidosFil();
                juegoDulces.animacionAcertar();
              }
            }
          },
          drag: function(event, ui){}
        });
        $("[id='item-"+ numImg +" img-"+ ii +"'").droppable({
          drop: function(event, ui){
            if(juegoActivo == 1){
              if(bloqueo == 0){
                imagenUno = event.target.lastChild;
                imagenDos = ui.draggable[0];
                imgUno = $(imagenUno).attr("src");
                imgDos = $(imagenDos).attr("src");
                $(imagenUno).attr("src", imgDos);
                $(imagenDos).attr("src", imgUno);
              }
            }
          }
        });
        numImg++;
      }
      num++;
    }
  },
  resetDiv: function(){
    setTimeout(function(){
      var col = new juegoDulces.obtenerColumnas;
      var num = 1;
      var numImg = 1;
      for(var i = 0;  i <= totalColumnas; i++){
        var num2 = 1;
        for (var ii = 0; ii < totalFilas; ii++){
          var nuevoDiv = $(col[i])[ii];
          $(nuevoDiv).attr("id", "item-"+ numImg +" img-"+ num2);
          $(nuevoDiv).find("img").attr("class", "item-"+ numImg);
          num2++;
          numImg++;
        }
        num++;
      }
      juegoDulces.scanRepetidosCol();
      juegoDulces.scanRepetidosFil();
      if(data.length != 0){
        setTimeout(function(){
          juegoDulces.animacionAcertar();
        }, 800);
      }
      bloqueo = 0;
    }, 800);
  },
  agregarDiv: function(){
    bloqueo = 1;
    setTimeout(function(){
      var imagen = new juegoDulces.imagenes
      var datos = arrayDiv;
      for(var i = 0; i < datos.length; i++){
        var id = $(datos[i].obj)[0].id;
        var src = imagen[Math.floor(Math.random() * imagen.total)];
        var divEliminado = $(datos[i].obj).detach();
        var divNuevo = $(divEliminado)[0];

        $(divNuevo).find("img").attr("src", src);
        $(divNuevo).attr("id", id);
        $(datos[i].clase).prepend(divNuevo);
        $("[id*='"+ id +"']").show('bounce', 400, 'slow');
      }
      arrayDiv = [];
      juegoDulces.resetDiv();
    }, 1000);

  },
  animacionAcertar: function(){
    var array
    var claseCol
    var cajaDulce

    if(data.length != 0){
      for(var i = 0; i < data.length; i++){
        switch(data[i].obj){
          case "Col":
          objeto = new this.obtenerColumnas;
          break;
          case "Fil":
          objeto = new this.obtenerFilas;
          break;
          default:
          console.log("Error en el Objeto - animacionAcertar");
        }

        for(var n = 0; n < data[i].arrays.length; n++){
          $(data[i].colFil[data[i].arrays[n]]).hide("pulsate", 400, function(){});
          cajaDulce = $(data[i].colFil[data[i].arrays[n]]);
          claseCol = "."+$(data[i].colFil[data[i].arrays[n]])[0].parentNode.className;
          itemDiv = {obj: $(data[i].colFil[data[i].arrays[n]]), clase: claseCol};
          arrayDiv.push(itemDiv);
        }
        $("#score-text").html(data[i].puntos);
      }
      data = [];
      juegoDulces.agregarDiv();
    }
  },
  scanRepetidosCol: function(){
    var imagen = new this.imagenes;
    var colDiv = new this.obtenerColumnas;
    var col = new this.obtenerColumnas;
    var objeto = "Col";
    for (var n = 0; n < col.total; n++) {
      col[n] = $(col[n]).find("img");
    }

    for(var i = 0; i < col.total; i++){
      for(var img = 0; img < imagen.total; img++){
        if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 5;
          item = {arrays: [0,1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 10;
          item = {arrays: [0,1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(col[i][0]).attr("src") == imagen[img] && $(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 20;
          item = {arrays: [0,1,2], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(col[i][1]).attr("src") == imagen[img] && $(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(col[i][2]).attr("src") == imagen[img] && $(col[i][3]).attr("src") == imagen[img] && $(col[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 10;
          item = {arrays: [2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);

        }else{

        }
      }

    }

  },
	//puntuaciones
  scanRepetidosFil: function(){
    var imagen = new this.imagenes;
    var filDiv = new this.obtenerFilas;
    var fil = new this.obtenerFilas;
    var objeto = "Fil";
    for (var n = 0; n < fil.total; n++) {
      fil[n] = $(fil[n]).find("img");
    }

    for(var i = 0; i < fil.total; i++){

      for(var img = 0; img < imagen.total; img++){
        if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 7;
          item = {arrays: [0,1,2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 10;
          item = {arrays: [1,2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [0,1,2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 20;
          item = {arrays: [0,1,2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 5;
          item = {arrays: [1,2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 5;
          item = {arrays: [2,3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 4;
          item = {arrays: [0,1,2,3], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 4;
          item = {arrays: [1,2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [2,3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 20;
          item = {arrays: [3,4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][0]).attr("src") == imagen[img] && $(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 5;
          item = {arrays: [0,1,2], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][1]).attr("src") == imagen[img] && $(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 5;
          item = {arrays: [1,2,3], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][2]).attr("src") == imagen[img] && $(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [2,3,4], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][3]).attr("src") == imagen[img] && $(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 10;
          item = {arrays: [3,4,5], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else if($(fil[i][4]).attr("src") == imagen[img] && $(fil[i][5]).attr("src") == imagen[img] && $(fil[i][6]).attr("src") == imagen[img]){

          puntuacion = puntuacion + 15;
          item = {arrays: [4,5,6], colFil: filDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);


        }else{

        }

      }

    }

  }
}

$(document).ready(function(){
  juegoDulces.init();
});
