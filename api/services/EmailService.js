var nodemailer = require("nodemailer");
var moment = require('moment');
var smtpTransport = nodemailer.createTransport({
    //service: 'Gmail',
    secure:true,
    host: "just14.justhost.com",
    auth: {
        user: 'grupos@yoplanner.com',
        pass: 'groupyp$0123'
    }
});

module.exports = {
  sendEmail: function (options) {
    smtpTransport.sendMail({  //email options
       from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>", // sender address.  Must be the same as authenticated user if using Gmail.
       to: options.to,// receiver
       //bcc: "daniel.muller@yoplanner.com,oscarman2001@hotmail.com",
       bcc: "oscarman2001@hotmail.com",
       subject: options.subject,//"RFP Recibida ✔", // subject
       text: options.text, // body
       html: options.html
    }, function(error, info){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + info.response);
       }

       //smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
  },

  sendCustomer: function (options, rfp) {
    var header = `<!DOCTYPE html">
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
         <style media="screen"> body{font-family: 'Roboto', sans-serif; margin: 0;}.container{padding: 0 2em 0;}.header1{min-height: 100px; background-color: #005B8A;}.header2{min-height: 30px; background-color: #D5E000;}.title-container{padding: 2em; font-size: 30px;}.header-section{width: 100%;}.header-title{background-color: #D3E203; display: inline-block; min-width: 30%; text-align: center; color: white; font-size: 2em; padding: 0.5em;}.dots{border-bottom: thick dotted rgb(182, 182, 182); display: inline-block; min-width: 33%;}.body-section{padding: 1em; margin-top: 1em;}.element-value{margin: 1em; border-radius: 5px; border: thin solid rgb(181, 181, 181); padding: 0.5em;}.body-element{display: inline-block;}</style>
         <title>Yo Planner</title> </head>
          <body style="font-family: 'Roboto', sans-serif;margin: 0;"> <div class="header1" style="min-height: 100px;background-color: #005B8A;"></div><div class="header2" style="min-height: 30px;background-color: #D5E000;"></div><div class="title-container" style="color: rgb(85, 85, 85);padding: 2em;font-size: 30px;"> Solicitud de <span style="font-size: 36px;"><strong>COTIZACIÓN</strong></span> <img src="https://lh3.googleusercontent.com/-b9WKT2thItQ/AAAAAAAAAAI/AAAAAAAACmI/Uj0L2xjmTBg/s200-c/photo.jpg" style="border-radius:50%;width:128px;height:128px;margin-right:2em;border: 4px solid #ebebeb;"></div><div class="container" style="padding: 0 2em 0;">`;
        var close = '</div></body></html>';
        var datosGrupo = `<div class="body-element" style="width: 50%;display: inline-block;">
          <strong>Nombre</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.nombre+`</div>
        </div>
        <div class="body-element" style="width: 25%;display: inline-block;">
          <strong>Fecha de entrada</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+moment(rfp.fechaInicial).format('DD/MM/YYYY')+`</div>
        </div>
        <div class="body-element" style="width: 24%;display: inline-block;">
          <strong>Fecha de salida</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+moment(rfp.fechaFinal).format('DD/MM/YYYY')+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Asistentes</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.asistenciaEsperada+`</div>
        </div>`;
        var habTemp1 = '';
        rfp.configuracionHabitaciones.forEach(function (hab) {
          if (hab.tipoHabitacion == 1) {
            habTemp1 += moment(hab.fecha).format('DD/MM');
            habTemp1 += ' - ';
            habTemp1 += hab.habitaciones;
            habTemp1 += '<br>';
          }
        });
        var habSencillas = `<div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Hab. Sencillas</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+habTemp1+`</div>
        </div>`;
        var habTemp2 = '';
        rfp.configuracionHabitaciones.forEach(function (hab) {
          if (hab.tipoHabitacion == 2) {
            habTemp2 += moment(hab.fecha).format('DD/MM');
            habTemp2 += ' - ';
            habTemp2 += hab.habitaciones;
            habTemp2 += '<br>';
          }
        });
        var habDobles = `<div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Hab. Dobles</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+habTemp2+`</div>
        </div>`;
        var datosGrupo1 = `
        <div class="body-element" style="width: 100%;display: inline-block;">
          <strong>Comentarios adicionales</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.comentarios+`</div>
        </div>
      `;
      //EVentos
      var header_eventos = `
      <div class="header-section" style="width: 100%;">
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
        <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
          <strong>EVENTOS</strong>
        </div>
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      </div>`;
      var eventos_for = '';
      if(rfp.salones && rfp.salones.length>0) {
        rfp.salones.forEach(function(salon){
          var tempTipoEvento = 'default';
          if (salon.tipoEvento == 1) {
            tempTipoEvento = 'Desayuno';
          }
          if (salon.tipoEvento == 2) {
            tempTipoEvento = 'Comida';
          }
          if (salon.tipoEvento == 3) {
            tempTipoEvento = 'Cena';
          }
          if (salon.tipoEvento == 4) {
            tempTipoEvento = 'Cocktail';
          }
          if (salon.tipoEvento == 5) {
            tempTipoEvento = 'Sesión';
          }
          if (salon.tipoEvento == 6) {
            tempTipoEvento = 'Breakout';
          }
          if (salon.tipoEvento == 7) {
            tempTipoEvento = 'Oficina';
          }
          if (salon.tipoEvento == 8) {
            tempTipoEvento = 'Bodega';
          }
          if (salon.tipoEvento == 9) {
            tempTipoEvento = 'Otro';
          }
          var tempTipoSalon = 'default';
          if (salon.tipoSalon == 1) {
            tempTipoSalon = 'Auditorios';
          }
          if (salon.tipoSalon == 2) {
            tempTipoSalon = 'Banquete';
          }
          if (salon.tipoSalon == 3) {
            tempTipoSalon = 'Coctel';
          }
          if (salon.tipoSalon == 4) {
            tempTipoSalon = 'Esculela';
          }
          if (salon.tipoSalon == 5) {
            tempTipoSalon = 'Herradura';
          }
          if (salon.tipoSalon == 6) {
            tempTipoSalon = 'Imperial';
          }
          if (salon.tipoSalon == 7) {
            tempTipoSalon = 'Mesas Redondas';
          }
          if (salon.tipoSalon == 8) {
            tempTipoSalon = 'Medias Lunas';
          }
          if (salon.tipoSalon == 9) {
            tempTipoSalon = 'Otro';
          }
          var tempeventos = `
          <div class="body-element" style="width: 100%;display: inline-block;">
            <strong>Nombre del evento</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.nombreEvento+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Fecha</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+moment(salon.fecha).format('DD/MM/YYYY')+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Hora inicio</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaInicio+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Hora fin</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaFin+`</div>
          </div>
          <div class="body-element" style="width: 50%;display: inline-block;">
            <strong>Tipo evento</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoEvento+`</div>
          </div>
          <div class="body-element" style="width: 49%;display: inline-block;">
            <strong>Montaje</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoSalon+`</div>
          </div>
          <div class="body-element" style="width: 100%;display: inline-block;">
            <strong>Comentarios adicionales</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.comentarios+`</div>
          </div>
          `;
          eventos_for += tempeventos;
        });
      }
      var eventos1 = `<div class="body-section" style="padding: 1em;margin-top: 1em;">`+eventos_for+`</div>`;
      //Hoteles
      var hoteles_for = '';
      rfp.recintos.forEach(function(recinto, i){
        var temp_hotel = `
        <div class="body-element" style="width: 100%;display: inline-block;">
          <strong>Hotel #`+(i+1)+`</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+recinto.name+`</div>
        </div>
        `;
        hoteles_for += temp_hotel;
      });
      var hoteles = `
      <div class="header-section" style="width: 100%;">
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
        <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
          Selección de <strong>Hoteles</strong>
        </div>
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      </div>
      <div class="body-section" style="padding: 1em;margin-top: 1em;">`+hoteles_for+`</div>`;
      //Contacto
      var contacto = `
      <div class="header-section" style="width: 100%;">
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
        <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
          Datos de <strong>CONTACTO</strong>
        </div>
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      </div>
      <div class="body-section" style="padding: 1em;margin-top: 1em;">
        <div class="body-element" style="width: 60%;display: inline-block;">
          <strong>Nombre</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.nombreCliente+`</div>
        </div>
        <div class="body-element" style="width: 39%;display: inline-block;">
          <strong>Email</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.email+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Telefono</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.telefonoContacto+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Empresa</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.empresa+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Cargo</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.puesto+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>País</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.paisText+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Estado</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.estadoText+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Ciudad</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.ciudadText+`</div>
        </div>
      </div>
      `;
      var footer = `
      <div style="background-color:rgb(69, 69, 69); width: 100%;padding: 1em;">
        <p style="color: white;">
          © Powered by <strong>YoPlanner</strong>
        </p>
      </div>
      `;
  var htmlfinal = header + datosGrupo + habSencillas + habDobles + datosGrupo1 + header_eventos + eventos1 + hoteles + contacto + close + footer;
  smtpTransport.sendMail({
     from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
     to: options.to,
     bcc: "oscarman2001@hotmail.com",
     subject: options.subject,
     html: htmlfinal
  }, function(error, info){
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + info.response);
     }
  });
},

sendHotel: function (options, rfp, user) {
  //var header = '<!DOCTYPE html"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"><style media="screen"> body{font-family: "Roboto", sans-serif; margin: 0;}.container{padding: 0 2em 0;}.header1{min-height: 100px; background-color: #005B8A;}.header2{min-height: 30px; background-color: #D5E000;}.title-container{padding: 2em; font-size: 30px;}.header-section{width: 100%;}.header-title{background-color: #D3E203; display: inline-block; min-width: 30%; text-align: center; color: white; font-size: 2em; padding: 0.5em;}.dots{border-bottom: thick dotted rgb(182, 182, 182); display: inline-block; min-width: 33%;}.body-section{padding: 1em; margin-top: 1em;}.element-value{margin: 1em; border-radius: 5px; border: thin solid rgb(181, 181, 181); padding: 0.5em;}.body-element{display: inline-block;}</style><title>Yo Planner</title> </head><body style="font-family: "Roboto", sans-serif;margin: 0;"> <div class="header1" style="min-height: 100px;background-color: #005B8A;"></div><div class="header2" style="min-height: 30px;background-color: #D5E000;"></div><div class="title-container" style="color: rgb(85, 85, 85);padding: 2em;font-size: 30px;"> Solicitud de <span style="font-size: 36px;"><strong>COTIZACIÓN</strong></span> <img src="https://lh3.googleusercontent.com/-b9WKT2thItQ/AAAAAAAAAAI/AAAAAAAACmI/Uj0L2xjmTBg/s200-c/photo.jpg" style="border-radius:50%;width:128px;height:128px;margin-right:2em;border: 4px solid #ebebeb;"></div><div class="container" style="padding: 0 2em 0;">';
  var header = `<!DOCTYPE html">
      <html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
       <style media="screen"> body{font-family: 'Roboto', sans-serif; margin: 0;}.container{padding: 0 2em 0;}.header1{min-height: 100px; background-color: #005B8A;}.header2{min-height: 30px; background-color: #D5E000;}.title-container{padding: 2em; font-size: 30px;}.header-section{width: 100%;}.header-title{background-color: #D3E203; display: inline-block; min-width: 30%; text-align: center; color: white; font-size: 2em; padding: 0.5em;}.dots{border-bottom: thick dotted rgb(182, 182, 182); display: inline-block; min-width: 33%;}.body-section{padding: 1em; margin-top: 1em;}.element-value{margin: 1em; border-radius: 5px; border: thin solid rgb(181, 181, 181); padding: 0.5em;}.body-element{display: inline-block;}</style>
       <title>Yo Planner</title> </head>
        <body style="font-family: 'Roboto', sans-serif;margin: 0;"> <div class="header1" style="min-height: 100px;background-color: #005B8A;"></div><div class="header2" style="min-height: 30px;background-color: #D5E000;"></div><div class="title-container" style="color: rgb(85, 85, 85);padding: 2em;font-size: 30px;"> Solicitud de <span style="font-size: 36px;"><strong>COTIZACIÓN</strong></span> <img src="https://lh3.googleusercontent.com/-b9WKT2thItQ/AAAAAAAAAAI/AAAAAAAACmI/Uj0L2xjmTBg/s200-c/photo.jpg" style="border-radius:50%;width:128px;height:128px;margin-right:2em;border: 4px solid #ebebeb;"></div><div class="container" style="padding: 0 2em 0;">`;
  var close = '</div></body></html>';
  var datosGrupo = '<div class="body-element" style="width: 50%;display: inline-block;"><strong>Nombre</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+rfp.nombre+'</div></div><div class="body-element" style="width: 25%;display: inline-block;"><strong>Fecha de entrada</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+moment(rfp.fechaInicial).format('DD/MM/YYYY')+'</div></div><div class="body-element" style="width: 24%;display: inline-block;"><strong>Fecha de salida</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+moment(rfp.fechaFinal).format('DD/MM/YYYY')+'</div></div><div class="body-element" style="width: 33%;display: inline-block;"><strong>Asistentes</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+rfp.asistenciaEsperada+'</div></div>';
  var habTemp1 = '';
      rfp.configuracionHabitaciones.forEach(function (hab) {
        if (hab.tipoHabitacion == 1) {
          habTemp1 += moment(hab.fecha).format('DD/MM');
          habTemp1 += ' - ';
          habTemp1 += hab.habitaciones;
          habTemp1 += '<br>';
        }
      });
      var habSencillas = '<div class="body-element" style="width: 33%;display: inline-block;"><strong>Hab. Sencillas</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+habTemp1+'</div></div>';
      var habTemp2 = '';
      rfp.configuracionHabitaciones.forEach(function (hab) {
        if (hab.tipoHabitacion == 2) {
          habTemp2 += moment(hab.fecha).format('DD/MM');
          habTemp2 += ' - ';
          habTemp2 += hab.habitaciones;
          habTemp2 += '<br>';
        }
      });
      var habDobles = '<div class="body-element" style="width: 33%;display: inline-block;"><strong>Hab. Dobles</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+habTemp2+'</div></div>';
      var datosGrupo1 = `
      <div class="body-element" style="width: 100%;display: inline-block;">
        <strong>Comentarios adicionales</strong><br>
        <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.comentarios+`</div>
      </div>
    `;
    //EVentos
    var header_eventos = `
    <div class="header-section" style="width: 100%;">
      <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
        <strong>EVENTOS</strong>
      </div>
      <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
    </div>`;
    var eventos_for = '';
    if(rfp.salones && rfp.salones.length>0) {
      rfp.salones.forEach(function(salon){
        var tempTipoEvento = 'default';
        if (salon.tipoEvento == 1) {
          tempTipoEvento = 'Desayuno';
        }
        if (salon.tipoEvento == 2) {
          tempTipoEvento = 'Comida';
        }
        if (salon.tipoEvento == 3) {
          tempTipoEvento = 'Cena';
        }
        if (salon.tipoEvento == 4) {
          tempTipoEvento = 'Cocktail';
        }
        if (salon.tipoEvento == 5) {
          tempTipoEvento = 'Sesión';
        }
        if (salon.tipoEvento == 6) {
          tempTipoEvento = 'Breakout';
        }
        if (salon.tipoEvento == 7) {
          tempTipoEvento = 'Oficina';
        }
        if (salon.tipoEvento == 8) {
          tempTipoEvento = 'Bodega';
        }
        if (salon.tipoEvento == 9) {
          tempTipoEvento = 'Otro';
        }
        var tempTipoSalon = 'default';
        if (salon.tipoSalon == 1) {
          tempTipoSalon = 'Auditorios';
        }
        if (salon.tipoSalon == 2) {
          tempTipoSalon = 'Banquete';
        }
        if (salon.tipoSalon == 3) {
          tempTipoSalon = 'Coctel';
        }
        if (salon.tipoSalon == 4) {
          tempTipoSalon = 'Esculela';
        }
        if (salon.tipoSalon == 5) {
          tempTipoSalon = 'Herradura';
        }
        if (salon.tipoSalon == 6) {
          tempTipoSalon = 'Imperial';
        }
        if (salon.tipoSalon == 7) {
          tempTipoSalon = 'Mesas Redondas';
        }
        if (salon.tipoSalon == 8) {
          tempTipoSalon = 'Medias Lunas';
        }
        if (salon.tipoSalon == 9) {
          tempTipoSalon = 'Otro';
        }
        var tempeventos = `
        <div class="body-element" style="width: 100%;display: inline-block;">
          <strong>Nombre del evento</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.nombreEvento+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Fecha</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+moment(salon.fecha).format('DD/MM/YYYY')+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Hora inicio</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaInicio+`</div>
        </div>
        <div class="body-element" style="width: 33%;display: inline-block;">
          <strong>Hora fin</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaFin+`</div>
        </div>
        <div class="body-element" style="width: 50%;display: inline-block;">
          <strong>Tipo evento</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoEvento+`</div>
        </div>
        <div class="body-element" style="width: 49%;display: inline-block;">
          <strong>Montaje</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoSalon+`</div>
        </div>
        <div class="body-element" style="width: 100%;display: inline-block;">
          <strong>Comentarios adicionales</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.comentarios+`</div>
        </div>
        `;
        eventos_for += tempeventos;
      });
    }
    var eventos1 = `<div class="body-section" style="padding: 1em;margin-top: 1em;">`+eventos_for+`</div>`;
    //Contacto
    var contacto = `
    <div class="header-section" style="width: 100%;">
      <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
        Datos de <strong>CONTACTO</strong>
      </div>
      <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
    </div>
    <div class="body-section" style="padding: 1em;margin-top: 1em;">
      <div class="body-element" style="width: 60%;display: inline-block;">
        <strong>Nombre</strong><br>
        <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+user.nombre+`</div>
      </div>
      <div class="body-element" style="width: 39%;display: inline-block;">
        <strong>Email</strong><br>
        <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+user.username+`</div>
      </div>
    </div>
    `;
    var footer = `
    <div style="background-color:rgb(69, 69, 69); width: 100%;padding: 1em;">
      <p style="color: white;">
        © Powered by <strong>YoPlanner</strong>
      </p>
    </div>
    `;
  var htmlfinal = header + datosGrupo + habSencillas + habDobles + datosGrupo1 + header_eventos + eventos1 + contacto + close + footer;
  smtpTransport.sendMail({
     from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
     to: options.to,
     bcc: "oscarman2001@hotmail.com",
     subject: options.subject,
     html: htmlfinal
  }, function(error, info){
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + info.response);
     }
  });
},

  sendPlanner: function (options, rfp, user) {
    //var header = '<!DOCTYPE html"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"><style media="screen"> body{font-family: "Roboto", sans-serif; margin: 0;}.container{padding: 0 2em 0;}.header1{min-height: 100px; background-color: #005B8A;}.header2{min-height: 30px; background-color: #D5E000;}.title-container{padding: 2em; font-size: 30px;}.header-section{width: 100%;}.header-title{background-color: #D3E203; display: inline-block; min-width: 30%; text-align: center; color: white; font-size: 2em; padding: 0.5em;}.dots{border-bottom: thick dotted rgb(182, 182, 182); display: inline-block; min-width: 33%;}.body-section{padding: 1em; margin-top: 1em;}.element-value{margin: 1em; border-radius: 5px; border: thin solid rgb(181, 181, 181); padding: 0.5em;}.body-element{display: inline-block;}</style><title>Yo Planner</title> </head><body style="font-family: "Roboto", sans-serif;margin: 0;"> <div class="header1" style="min-height: 100px;background-color: #005B8A;"></div><div class="header2" style="min-height: 30px;background-color: #D5E000;"></div><div class="title-container" style="color: rgb(85, 85, 85);padding: 2em;font-size: 30px;"> Solicitud de <span style="font-size: 36px;"><strong>COTIZACIÓN</strong></span><img src="https://lh3.googleusercontent.com/-b9WKT2thItQ/AAAAAAAAAAI/AAAAAAAACmI/Uj0L2xjmTBg/s200-c/photo.jpg" style="border-radius:50%;width:128px;height:128px;margin-right:2em;border: 4px solid #ebebeb;"></div><div class="container" style="padding: 0 2em 0;">';
    var header = `<!DOCTYPE html">
        <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
         <style media="screen"> body{font-family: 'Roboto', sans-serif; margin: 0;}.container{padding: 0 2em 0;}.header1{min-height: 100px; background-color: #005B8A;}.header2{min-height: 30px; background-color: #D5E000;}.title-container{padding: 2em; font-size: 30px;}.header-section{width: 100%;}.header-title{background-color: #D3E203; display: inline-block; min-width: 30%; text-align: center; color: white; font-size: 2em; padding: 0.5em;}.dots{border-bottom: thick dotted rgb(182, 182, 182); display: inline-block; min-width: 33%;}.body-section{padding: 1em; margin-top: 1em;}.element-value{margin: 1em; border-radius: 5px; border: thin solid rgb(181, 181, 181); padding: 0.5em;}.body-element{display: inline-block;}</style>
         <title>Yo Planner</title> </head>
          <body style="font-family: 'Roboto', sans-serif;margin: 0;"> <div class="header1" style="min-height: 100px;background-color: #005B8A;"></div><div class="header2" style="min-height: 30px;background-color: #D5E000;"></div><div class="title-container" style="color: rgb(85, 85, 85);padding: 2em;font-size: 30px;"> Solicitud de <span style="font-size: 36px;"><strong>COTIZACIÓN</strong></span> <img src="https://lh3.googleusercontent.com/-b9WKT2thItQ/AAAAAAAAAAI/AAAAAAAACmI/Uj0L2xjmTBg/s200-c/photo.jpg" style="border-radius:50%;width:128px;height:128px;margin-right:2em;border: 4px solid #ebebeb;"></div><div class="container" style="padding: 0 2em 0;">`;
    var close = '</div></body></html>';
    var datosGrupo = '<div class="body-element" style="width: 50%;display: inline-block;"><strong>Nombre</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+rfp.nombre+'</div></div><div class="body-element" style="width: 25%;display: inline-block;"><strong>Fecha de entrada</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+moment(rfp.fechaInicial).format('DD/MM/YYYY')+'</div></div><div class="body-element" style="width: 24%;display: inline-block;"><strong>Fecha de salida</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+moment(rfp.fechaFinal).format('DD/MM/YYYY')+'</div></div><div class="body-element" style="width: 33%;display: inline-block;"><strong>Asistentes</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+rfp.asistenciaEsperada+'</div></div>';
    var habTemp1 = '';
        rfp.configuracionHabitaciones.forEach(function (hab) {
          if (hab.tipoHabitacion == 1) {
            habTemp1 += moment(hab.fecha).format('DD/MM');
            habTemp1 += ' - ';
            habTemp1 += hab.habitaciones;
            habTemp1 += '<br>';
          }
        });
        var habSencillas = '<div class="body-element" style="width: 33%;display: inline-block;"><strong>Hab. Sencillas</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+habTemp1+'</div></div>';
        var habTemp2 = '';
        rfp.configuracionHabitaciones.forEach(function (hab) {
          if (hab.tipoHabitacion == 2) {
            habTemp2 += moment(hab.fecha).format('DD/MM');
            habTemp2 += ' - ';
            habTemp2 += hab.habitaciones;
            habTemp2 += '<br>';
          }
        });
        var habDobles = '<div class="body-element" style="width: 33%;display: inline-block;"><strong>Hab. Dobles</strong><br><div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">'+habTemp2+'</div></div>';
        var datosGrupo1 = `
        <div class="body-element" style="width: 100%;display: inline-block;">
          <strong>Comentarios adicionales</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+rfp.comentarios+`</div>
        </div>
      `;
      //EVentos
      var header_eventos = `
      <div class="header-section" style="width: 100%;">
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
        <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
          <strong>EVENTOS</strong>
        </div>
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      </div>`;
      var eventos_for = '';
      if(rfp.salones && rfp.salones.length>0) {
        rfp.salones.forEach(function(salon){
          var tempTipoEvento = 'default';
          if (salon.tipoEvento == 1) {
            tempTipoEvento = 'Desayuno';
          }
          if (salon.tipoEvento == 2) {
            tempTipoEvento = 'Comida';
          }
          if (salon.tipoEvento == 3) {
            tempTipoEvento = 'Cena';
          }
          if (salon.tipoEvento == 4) {
            tempTipoEvento = 'Cocktail';
          }
          if (salon.tipoEvento == 5) {
            tempTipoEvento = 'Sesión';
          }
          if (salon.tipoEvento == 6) {
            tempTipoEvento = 'Breakout';
          }
          if (salon.tipoEvento == 7) {
            tempTipoEvento = 'Oficina';
          }
          if (salon.tipoEvento == 8) {
            tempTipoEvento = 'Bodega';
          }
          if (salon.tipoEvento == 9) {
            tempTipoEvento = 'Otro';
          }
          var tempTipoSalon = 'default';
          if (salon.tipoSalon == 1) {
            tempTipoSalon = 'Auditorios';
          }
          if (salon.tipoSalon == 2) {
            tempTipoSalon = 'Banquete';
          }
          if (salon.tipoSalon == 3) {
            tempTipoSalon = 'Coctel';
          }
          if (salon.tipoSalon == 4) {
            tempTipoSalon = 'Esculela';
          }
          if (salon.tipoSalon == 5) {
            tempTipoSalon = 'Herradura';
          }
          if (salon.tipoSalon == 6) {
            tempTipoSalon = 'Imperial';
          }
          if (salon.tipoSalon == 7) {
            tempTipoSalon = 'Mesas Redondas';
          }
          if (salon.tipoSalon == 8) {
            tempTipoSalon = 'Medias Lunas';
          }
          if (salon.tipoSalon == 9) {
            tempTipoSalon = 'Otro';
          }
          var tempeventos = `
          <div class="body-element" style="width: 100%;display: inline-block;">
            <strong>Nombre del evento</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.nombreEvento+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Fecha</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+moment(salon.fecha).format('DD/MM/YYYY')+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Hora inicio</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaInicio+`</div>
          </div>
          <div class="body-element" style="width: 33%;display: inline-block;">
            <strong>Hora fin</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.horaFin+`</div>
          </div>
          <div class="body-element" style="width: 50%;display: inline-block;">
            <strong>Tipo evento</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoEvento+`</div>
          </div>
          <div class="body-element" style="width: 49%;display: inline-block;">
            <strong>Montaje</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+tempTipoSalon+`</div>
          </div>
          <div class="body-element" style="width: 100%;display: inline-block;">
            <strong>Comentarios adicionales</strong><br>
            <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+salon.comentarios+`</div>
          </div>
          `;
          eventos_for += tempeventos;
        });
      }
      var eventos1 = `<div class="body-section" style="padding: 1em;margin-top: 1em;">`+eventos_for+`</div>`;
      //Contacto
      var contacto = `
      <div class="header-section" style="width: 100%;">
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
        <div class="header-title" style="background-color: #D3E203;display: inline-block;min-width: 30%;text-align: center;color: white;font-size: 2em;padding: 0.5em;">
          Datos de <strong>CLIENTE</strong>
        </div>
        <div class="dots" style="border-bottom: thick dotted rgb(182, 182, 182);display: inline-block;min-width: 30%;"></div>
      </div>
      <div class="body-section" style="padding: 1em;margin-top: 1em;">
        <div class="body-element" style="width: 60%;display: inline-block;">
          <strong>Nombre</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+user.nombre+`</div>
        </div>
        <div class="body-element" style="width: 39%;display: inline-block;">
          <strong>Email</strong><br>
          <div class="element-value" style="margin: 1em;border-radius: 5px;border: thin solid rgb(181, 181, 181);padding: 0.5em;">`+user.username+`</div>
        </div>
      </div>
      `;
      var footer = `
      <div style="background-color:rgb(69, 69, 69); width: 100%;padding: 1em;">
        <p style="color: white;">
          © Powered by <strong>YoPlanner</strong>
        </p>
      </div>
      `;
    var htmlfinal = header + datosGrupo + habSencillas + habDobles + datosGrupo1 + header_eventos + eventos1 + contacto + close + footer;
    smtpTransport.sendMail({
       from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
       to: 'arcaniteamp@gmail.com',
       //to: req.user.username,
       bcc: "oscarman2001@hotmail.com",
       subject: options.subject,
       html: htmlfinal
    }, function(error, info){
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + info.response);
       }
    });
  }
};
