//Romario Augusto Estrada Flórez//
app.factory('Utils', function() {
    return {
        //Inicio de las utilidades
        isThisIE: function() {
            var resp = false;
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE");
            var edge = ua.indexOf("Edge");
            if (msie > 0 || edge > 0) {
                resp = true;
            }
            return resp;
        },
        getMonthString: function(monthNumber) {
            switch (monthNumber) {
                case 1:
                    return "Enero";
                    break;
                case 2:
                    return "Febrero";
                    break;
                case 3:
                    return "Marzo";
                    break;
                case 4:
                    return "Abril";
                    break;
                case 5:
                    return "Mayo";
                    break;
                case 6:
                    return "Junio";
                    break;
                case 7:
                    return "Julio";
                    break;
                case 8:
                    return "Agosto";
                    break;
                case 9:
                    return "Septiembre";
                    break;
                case 10:
                    return "Octubre";
                    break;
                case 11:
                    return "Noviembre";
                    break;
                case 12:
                    return "Diciembre";
                    break;
                default:
                    return "Enero";
                    break;
            }
        },
        scrollPageTo: function(DOMPROP) {
            $("html, body").animate({
                scrollTop: $(DOMPROP).scrollTop() + $(DOMPROP).height()
            }, 1000);
        },
        varIsObject: function(val) {
            if (val === null) {
                return false;
            }
            return ((typeof val === 'function') || (typeof val === 'object'));
        },
        converToDate: function(s) {
            var f = s.split("T")[0].split("-");
            var b = f[1].split("0");
            var m = "";
            if (b[0] === "") m = b[1] - 1;
            else m = b[0] - 1;
            var c = f[2].split("0");
            var n = "";
            if (c[0] === "") n = c[1];
            else n = c[0];
            if (parseInt(f[2]) >= 10) n = f[2];
            return new Date(f[0], m, n);
        },
        theValueExist: function(value) {
            if ((value == '') || (value == null) || (value == undefined) || (value == [])) {
                return false;
            } else {
                return true;
            }
        },
        armarObjetoNuevo: function(obj) {
            var objetoNuevo = {};
            for (propiedad in obj) {
                objetoNuevo['' + propiedad] = obj[propiedad];
            }
            return objetoNuevo;
        },
        tienePropiedades: function(obj) {
            var tienePropiedades = false;
            for (propiedad in obj) {
                if (propiedad != '') {
                    tienePropiedades = true;
                }
            }
            return tienePropiedades;
        },
        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        /**
         * Autor - Romario Augusto Estrada Flórez - romarioestrada.ff@hotmail.com
         * [limpiarPropiedadesObjeto esto pone las propiedades que vengan vacías o undefined 
         * y las pone en null]
         * @param  {[Object]} jsonObject [el objeto]
         * @return {[Object]}            [el objeto con propiedades limpias]
         */
        limpiarPropiedadesObjeto: function(jsonObject) {
            var objectClean = {};
            var tienePropiedades = false;
            for (propiedad in jsonObject) {
                if (propiedad != '') {
                    tienePropiedades = true;
                }
            }
            if (tienePropiedades) {
                for (propiedad in jsonObject) {
                    if (jsonObject['' + propiedad] == undefined || jsonObject['' + propiedad] == '') {
                        objectClean['' + propiedad] = null;
                    }
                    objectClean['' + propiedad] = jsonObject['' + propiedad];
                }
                return objectClean;
            } else {
                return 'El objeto enviado a limpiarse no tiene propiedades.';
            }
        },
        existePropiedadTalConTalValor: function(objeto, nombre) {
            var seraQueSi = false;
            for (propiedad in objeto) {
                if (nombre == '' + propiedad && seraQueSi == false) {
                    if (((objeto[propiedad] != '') || (objeto[propiedad] != null) || (objeto[propiedad] != undefined))) {
                        seraQueSi = true;
                    }
                }
            }
            return seraQueSi;
        },
        print_r: function(printthis, returnoutput) {
            var output = '';
            if ($.isArray(printthis) || typeof(printthis) == 'object') {
                for (var i in printthis) {
                    output += i + ' : ' + print_r(printthis[i], true) + '\n';
                }
            } else {
                output += printthis;
            }
            if (returnoutput && returnoutput == true) {
                return output;
            } else {
                alert(output);
            }
        },
        /**
         * [dataURLtoFile convierte un base64 en binario.]
         * @param  {[String]} dataurl  [example = data:image/jpeg;base64,'la imagen en base64']
         * @param  {[String]} filename [El nombre del archivo]
         * @return {[]}          [valores separados en coma, son el binario de la imagen.]
         */
        dataURLtoFile: function(dataurl, filename) {
            var arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return u8arr;
            // return new File([u8arr], filename, {type:mime});
        },
        /**
         * Autor -> romarioestrada.ff@hotmail.com
         * [agregarPunto recibe valor en string y le agrega punto al valor cada 3 cifras. 10000 -> 10.000]
         * @param  {[String]} valor [valor en numero string sin puntos ni nada, entero.]
         * @return {[String]}       [valor con puntos]
         */
        agregarPunto: function(valor) {
            var value = valor;
            value += '';
            x = value.split('.');
            x1 = x[0];
            // alert(x1);
            // x2 = x1.length > 1 ? ',' + x1[1] : '';
            // alert(x2);
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {

                x1 = x1.replace(rgx, '$1' + '.' + '$2');
                value = x1;
            }
            return value;
        },
        getWidth: function() {
            if (self.innerWidth) {
                return self.innerWidth;
            }

            if (document.documentElement && document.documentElement.clientWidth) {
                return document.documentElement.clientWidth;
            }

            if (document.body) {
                return document.body.clientWidth;
            }
        },
        getHeight: function() {
            if (self.innerHeight) {
                return self.innerHeight;
            }

            if (document.documentElement && document.documentElement.clientHeight) {
                return document.documentElement.clientHeight;
            }

            if (document.body) {
                return document.body.clientHeight;
            }
        },
        disableScrolling: function(){
            var x=window.scrollX;
            var y=window.scrollY;
            window.onscroll=function(){window.scrollTo(x, y);};
        },
        enableScrolling: function(){
            window.onscroll=function(){};
        },
        /**
        * Autor - Romario Augusto Estrada Flórez - romarioestrada.ff@hotmail.com
        * [sacaRepetidosYunicos Esconde los items repetidos de un array con indice, de tipo JSON según 
        el campo que tu digas que debe ser único. lo que hace es agregar una propiedad a cada objeto llamada 'mostrar',
        hay do ciclos, el primero busca y deja los objetos unicos con 'mostrar' = true
        el segundo busca y deja los objetos repetidos con 'mostrar' = false
        y ya con angular uso ng-show para que compare cada objeto que venga y solo muestre los que tengan la propiedad 'mostrar' = true.
        * var data = [{ "name": "Lenovo Thinkpad 41A4298", "website": "google" },
            { "name": "Lenovo Thinkpad 41A2222", "website": "google" },
            { "name": "Lenovo Thinkpad 41Awww33", "website": "yahoo" },
            { "name": "Lenovo Thinkpad 41A424448", "website": "google" },
            { "name": "Lenovo Thinkpad 41A429rr8", "website": "ebay" },
            { "name": "Lenovo Thinkpad 41A429ff8", "website": "ebay" },
            { "name": "Lenovo Thinkpad 41A429ss8", "website": "rediff" },
            { "name": "Lenovo Thinkpad 41A429sg8", "website": "yahoo" }
        ];]
        * @param  {[Array]} data  [Arreglo de items en forma de objeto JSON]
        * @param  {[String]} campo [es el nombre del campo por el que se guía la función para esconder repetidos.]
        * @return {[Array]}       [Arreglo con datos repetidos escondidos según el nombre del campo.]
        */
        sacaRepetidosYunicos: function(data, campo) {
            var uniqueNames = [];
            var unicosArray = [];
            var uniquisimos = [];
            var repetidosDos = [];
            var repetidosArray = [];
            var unicoAuxiliar = {};
            var repetidoAuxiliar = {}
            // codigo para unicos open
            for (i = 0; i < data.length; i++) {
                if (uniqueNames.indexOf(data[i][campo]) === -1) {
                    unicoAuxiliar = data[i];
                    // unicoAuxiliar.mostrar = true;
                    unicosArray.push(unicoAuxiliar);
                    uniqueNames.push(data[i][campo]);
                } else {
                    repetidoAuxiliar = data[i];
                    // repetidoAuxiliar.mostrar = false;
                    repetidosArray.push(repetidoAuxiliar);
                }
                repetidoAuxiliar = {};
                unicoAuxiliar = {};
                data[i] = {};
            }
            // codigo para unicos close
            
            // codigo para repetidos open
            var objectNow = {
                nombre: null,
                idmedia: null
            };
            for (var e = 0; e < unicosArray.length; e++) {
                objectNow = {
                    nombre: unicosArray[e].nombre,
                    idlanguage: unicosArray[e].idlanguage
                };
                uniquisimos.push(objectNow);
                objectNow = {};
            }
            var objectNowDos = {
                nombre: null,
                idlanguage: null
            };
            for (var e = 0; e < repetidosArray.length; e++) {
                objectNowDos = {
                    nombre: repetidosArray[e].nombre,
                    idlanguage: repetidosArray[e].idlanguage
                };
                repetidosDos.push(objectNowDos);
                objectNowDos = {};
            }
            // codigo para repetidos close
            var data = {
                array_unicos: uniquisimos,
                array_repetidos: repetidosDos
            };
            return data.array_unicos.concat(repetidosDos);
        },
        removeDuplicates: (originalArray, prop)=> {
            var newArray = [];
            var lookupObject  = {};
       
            for(var i in originalArray) {
               lookupObject[originalArray[i][prop]] = originalArray[i];
            }
       
            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
             return newArray;
        }
        //Fin de las utilidades
    };
});