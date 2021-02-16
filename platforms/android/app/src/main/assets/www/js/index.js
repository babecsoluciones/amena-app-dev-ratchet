/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.unlock();
        leerNotificaciones();
        iniciarNotificaciones();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function lanzarNotification(titulo,mensaje)
        {
            cordova.plugins.notification.local.schedule({
                title: titulo,
                text: mensaje,
                smallIcon: 'res://icon',
                icon: 'res://icon',
                color: '#FFFFFF',
                foreground: true
            });
        }


function iniciarNotificaciones()
        {
            setInterval(function(){
                leerNotificaciones();
            },60000);
        }

function leerNotificaciones()
{

            var eCodUsuario = document.getElementById('eCodUsuario9');

            var tURL = "";
            var jsonString = "";
            
            if(eCodUsuario)
            { 
                eCodUsuario.value= localStorage.getItem("codigousuario");
                var obj = $('#frmUsuario').serializeJSON();
                
                jsonString = JSON.stringify(obj);
                tURL = "https://cors-anywhere.herokuapp.com/https://app.vivirenpurpura.mx/app/notificaciones.php";
            }
            else
            {
                tURL = "https://cors-anywhere.herokuapp.com/https://app.vivirenpurpura.mx/app/notificaciones.php?eCodUsuario="+localStorage.getItem("codigousuario");
            }
          
          $.ajax({
              type: "POST",
              url: tURL,
              data: jsonString,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  
                if(data.exito==1)
                    {
                        lanzarNotification(data.tipo,data.titulo);
                    }
              },
              failure: function(errMsg) {
                  alert('Error al enviar los datos.');
              }
          });
}