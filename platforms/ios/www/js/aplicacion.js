var tURL = "https://cors-anywhere.herokuapp.com/https://app.vivirenpurpura.mx/app/app-01-02.php";
function iniciarSesion()
{
          var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
          $.ajax({
              type: "POST",
              /*beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
                  
            },*/
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  
                  if(data.exito==1)
                  {
                      localStorage.setItem("codigousuario", data.codigousuario);
                      localStorage.setItem("usuario", data.usuario);
                      localStorage.setItem("correo", data.correo);
                      localStorage.setItem("password", data.password);
                      localStorage.setItem("telefono", data.telefono);
                      localStorage.setItem("apellidos", data.apellidos);
                       window.location="../inicio.html";
                  }
                  else
                  {
                          var mensaje="";
                     
                         mensaje += (data.error ? data.error : data.errores)+"\n";
                     
                          alert(mensaje);
                
                //document.getElementById('divErrores').innerHTML = "<div class=\"alert alert-danger\"><strong>"+data.error+"</div>";
                //$('#resError').modal('show');
                //setTimeout(function(){
                //$('#resError').modal('hide');
                //},2000);
                          //alert("Error al procesar la solicitud.\n<-Valide la siguiente informacion->\n\n"+mensaje);
                         
                  }
              },
             /* complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                  
                },*/
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });
            
      
        }

function reiniciarSesion()
{
          var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
    
            localStorage.removeItem("codigousuario");
            localStorage.removeItem("usuario");
            localStorage.removeItem("correo");
            localStorage.removeItem("password");
          
          $.ajax({
              type: "POST",
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                 
                  
                      localStorage.setItem("codigousuario", data.codigousuario);
                      localStorage.setItem("usuario", data.usuario);
                      localStorage.setItem("correo", data.correo);
                      localStorage.setItem("password", data.password);
                       window.location="inicio.html";
                  
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });
            
      
        }

function cerrarSesion()
{
          if(confirm("\u{BF}Deseas cerrar la sesi\u{F3}n?"))
              {
                localStorage.clear();
                window.location="log/index.html"; 
              }
          
        }
function validarSesion()
{
    if(localStorage.getItem("codigousuario"))
       {
           var cmbUsuario = document.querySelectorAll("[id^=eCodUsuario]");
           cmbUsuario.forEach(function(nodo){
               nodo.value = localStorage.getItem("codigousuario");
           });
            
           var tUsuario = document.getElementById('tUsuario');
           
           if(tUsuario)
               {
           document.getElementById('tUsuario').innerHTML = localStorage.getItem("usuario");
           
            document.getElementById('nombre').value = localStorage.getItem("usuario");
            document.getElementById('apellidos').value = localStorage.getItem("apellidos");
            document.getElementById('telefono').value = localStorage.getItem("telefono");
            document.getElementById('correo').value = localStorage.getItem("correo");
            document.getElementById('password').value = localStorage.getItem("password");
               }
    }   
    else
        {
            window.location="log/index.html"; 
        }
    
}

function checarSesion()
{
    if(localStorage.getItem("codigousuario"))
       {
           window.location="inicio.html"; 
    }   
    else
        {
            window.location="log/index.html"; 
        }
    
}

function enviarDatos()
{           
            var obj = $('#frmUsuario').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
                  
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  if(data.exito==1)
                  {
                      alert("Informacion almacenada exitosamente");
                      setTimeout(function(){ window.location="index.html"; }, 500);
                      
                  }
                  else
                      {
                         
                          var mensaje="";
                          for(var i=0;i<data.errores.length;i++)
                     {
                         mensaje += "-"+data.errores[i]+"\n";
                     }
                          alert("Error al procesar la solicitud.\n<-Valide la siguiente informacion->\n\n"+mensaje);
                         
                      }
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                  
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });    
        }

function cargarInicio()
{
      var obj = $('#frmInicio').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var listInicio = document.getElementById('ini-con');
          
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  listInicio.innerHTML = data.tHTML;
                  $("#ini-con").listview("refresh");
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function cargarBlog()
{
      var obj = $('#frmBlog').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var listBlog = document.getElementById('blg-con');
          var syncAlertas = document.getElementById('syncAlert');
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  listBlog.innerHTML = data.tHTML;
                  $("#blg-con").listview("refresh");
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function cargarNoticias()
{
      var obj = $('#frmNoticias').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var listBlog = document.getElementById('not-con');
          var syncAlertas = document.getElementById('syncAlert');
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  listBlog.innerHTML = data.tHTML;
                  $("#not-con").listview("refresh");
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function verPublicacion(codigo)
{
    localStorage.setItem("codigopublicacion", codigo);
    document.location="blog.html";
}

function cargarPublicacion()
{
    document.getElementById('codigo').value = localStorage.getItem("codigopublicacion");
    
    var obj = $('#frmDetalle').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var listBlog = document.getElementById('not-det');
          var syncAlertas = document.getElementById('syncAlert');
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  listBlog.innerHTML = data.tHTML;
                  $("#not-det").listview("refresh");
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
    
}

function cargarMensajes()
{
      var obj = $('#frmMensajes').serializeJSON();
          var jsonString = JSON.stringify(obj);
          var lstMensajes = document.getElementById('lstMensajes');
          var syncAlertas = document.getElementById('syncMessages');
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  lstMensajes.innerHTML = data.tHTML;
                  $("#lstMensajes").listview("refresh");
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function generarRegistro()
{
      var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  if(data.exito==1)
                      {
                          alert("Registro exitoso, inicia sesión para continuar");
                          document.location="index.html";
                      }
                  else
                      {
                          alert("Error al almacenar tus datos, intenta nuevamente");
                      }
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function consultarMensaje()
{
      var obj = $('#datos').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  document.getElementById('txtMsg').innerHTML = data.tHTML;
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}

function actualizarPerfil()
{
      var obj = $('#perfil').serializeJSON();
          var jsonString = JSON.stringify(obj);
          
    
          $.ajax({
              type: "POST",
              beforeSend: function(){
                  $('.ajax-loader').css("visibility", "visible");
            },
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  if(data.exito==1)
                      {
                          alert("Se actualizaron tus datos. Favor de iniciar sesion nuevamente...");
                          localStorage.clear();
                          window.location="log/index.html"; 
                      }
                  else
                      {
                          alert("Error al almacenar tus datos, intenta nuevamente");
                      }
              },
              complete: function(){
                  $('.ajax-loader').css("visibility", "hidden");
                },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          }); 
        
}