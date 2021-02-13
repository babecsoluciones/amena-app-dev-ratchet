/*var tURL = "https://cors-anywhere.herokuapp.com/https://app.vivirenpurpura.mx/app/app-01-02.php";
var tURL = "https://app.vivirenpurpura.mx/app/app-01-02.php";
var tURL = "https://thingproxy.freeboard.io/fetch/https://app.vivirenpurpura.mx/app/app-01-02.php";*/
var tURL = "https://3.140.203.13/vep/app-01-02.php";

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
                       window.location="../index.html";
                  }
                  else
                  {
                          var mensaje="";
                     
                         mensaje += (data.error ? data.error : data.errores)+"\n";
                     
                          alert(mensaje);
                
                         
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

function validarCorreo()
          {
              
              var obj = $('#datos').serializeJSON();
              var jsonString = JSON.stringify(obj);
              
              $.ajax({
                  type: "POST",
                  url: "https://3.140.203.13/vep/email-validate.php",
                  data: jsonString,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function(data){
                      
                    if(data.existe==1)
                        {
                            //mostrarAlerta('El correo especificado ya existe',false);
                            alert('El correo especificado ya existe');
                            document.getElementById('tCorreo').value="";
                        }
                  },
                  failure: function(errMsg) {
                      alert('Error al enviar los datos.');
                  }
              });
              
        }

function alertarRegistro()
{
    
    alert("Es necesario completar algunos datos...");
    setTimeout(function(){
        var ref = window.open(encodeURI('https://comunidad.vivirenpurpura.mx'),'_blank','location=yes');
    },2500);
}

function aplicarDonacion()
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
                        //mostrarAlerta("Registro correcto!",false);
                        alert("Registro correcto!");
                        setTimeout(function(){
                            document.location="index.html";
                        },2500);
                          //alert("Registro correcto!");
                          
                      }
                  else
                      {
                          alert("Error de registro!");
                        //mostrarAlerta(data.mensaje,false);
                          //alert(data.mensaje);
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