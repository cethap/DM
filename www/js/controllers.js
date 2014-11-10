angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('InitCtrl', function ($scope, ModuloService) {
    ModuloService.findAll().then(function (Modulos) {
        $scope.Modulos = Modulos;
    });
})


.controller('ExplrdorPrdccionCtrl', function ($scope,GetData,$timeout) {
    GET();
    function GET(){
        GetData.findAll(
            {
                'consulta_param[tipo]': 0,
                'consulta_param[target]':'',
                'consulta_param[tipo_target]':'',
                'consulta[tipoConsulta][sort]':'NOMBRE ASC',
                'Ram':'_6238rg3xu',
                'ignore':10,
                'r': 'Archivo/Sries/action/consulta/consulta[creadoPor]//consulta[descripcion]//consulta[estado]//consulta[nombre]//consulta[tipoConsulta][like]//expl//consulta[tipoConsulta][target]//'
            }
        ).then(function (dta) {
            if(dta){
                $scope.icon = "icon-archive-1";
                $scope.Series = dta.rows;
            }
        }, function(reason) {
          alert('Failed: ' + reason);
        });
    }
})

.controller('SriePrdccionCtrl', function ($scope,GetData,$timeout,$stateParams) {
    GET();

    function GET(){        
        GetData.findAll(
            {
                'consulta_param[tipo]': 0,
                'consulta_param[target]':'',
                'consulta_param[tipo_target]':'',
                'consulta[tipoConsulta][sort]':'NOMBRE ASC',
                'Ram':'_6238rg3xu',
                'ignore':10,
                'r': 'Archivo/Crptas/action/consulta/serie/'+$stateParams.SrieId+
                '/tpocarpeta//consulta[serie]/'+$stateParams.SrieId+
                '/consulta[tpocarpeta]//consulta[creadoPor]//consulta[descripcion]//consulta[estado]/0/consulta[fechaCreacionInicio]//consulta[fechaCreacionFin]//consulta[indice1]//consulta[indice2]//consulta[indice3]//consulta[indice4]//consulta[nombre]//consulta[tipoConsulta][like]/M/consulta[tipoConsulta][target]/C/expl/1/consulta[ubicacion]/'
            }
        ).then(function (dta) {
            if(dta){
                $scope.icon = "icon-folder-1";
                $scope.Carpetas = dta.rows;
            }
        }, function(reason) {
          alert('Failed: ' + reason);
        });
    }
})


.controller('CrptaPrdccionCtrl', function (
    $scope,
    GetData,
    $timeout,
    $stateParams,
    $ionicActionSheet,
    $location,
    $ionicModal,
    URI
) {


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/Archivo/Expl/VerImagen.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeVer = function() {
      $scope.modal.hide();
    };

    $scope.show = function(D) {

      if(D.NUM_ARCHIVOS > 0){
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '<b>Ver Imagen</b>' },
            { text: 'Propiedades' }
          ],
          titleText: 'Opciones del documento',
          cancelText: 'Cancelar',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            if(index == 0){
              $scope.C_D = D;
              $scope.modal.show();

              $("#Ima").attr("src","");

              var downFile = URI+
                "?r=Archivo/MnjoArchvos/action/descargar/serie/"+D.CODIGO_SERIE+
                "/tpocarpeta/"+D.TPO_CRPTA_CODIGO+"/tpodocumento/"+D.CODIGOTIPO+
                "/documento/"+D.CODIGO;

              $("#Ima").attr("src",downFile);

            }
            return true;
          }
        });
        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
          hideSheet();
        }, 3000);
      }else{
        if(D.TOTALSB || D.TOTALSB){
          $location.path(
            "/app/DcmntoPrdccion/"+D.CODIGO_SERIE+
            "/"+D.TPO_CRPTA_CODIGO+
            "/"+D.CODIGO_CARPETA+
            "/"+D.CODIGOTIPO+
            "/"+D.CODIGO
          ).search();
        }
      }

    };

    GET();
    function GET(){        
        GetData.findAll(
            {
            'consulta_param[tipo]': 0,
            'consulta_param[target]':'',
            'consulta_param[tipo_target]':'',
            'consulta[tipoConsulta][sort]':'NOMBRE ASC',
            'Ram':'_6238rg3xu',
            'ignore':10,
            'r': 'Archivo/Dcmntos/action/consulta/serie/'+$stateParams.SrieId+
            '/tpocarpeta/'+$stateParams.TpoCrptaId+
            '/consulta[serie]/'+$stateParams.SrieId+
            '/consulta[IdDcmnto]//consulta[tpocarpeta]/'+$stateParams.TpoCrptaId+
            '/consulta[crpta]/'+$stateParams.CrptaId+
            '/consulta[tpo_dcmnto]//consulta[creadoPor]//consulta[descripcion]//consulta[estado]/0/consulta[fechaCreacionInicio]//consulta[fechaCreacionFin]//consulta[indice1]//consulta[indice2]//consulta[indice3]//consulta[indice4]//consulta[indice5]//consulta[indice6]//consulta[indice7]//consulta[indice8]//consulta[indice9]//consulta[nombre]//consulta[tipoConsulta][like]/M/consulta[tipoConsulta][target]/D/expl/1/consulta[ubicacion]/'
            }
        ).then(function (dta) {
            if(dta){
                $scope.icon = "icon-documento";
                $scope.Documentos = dta.rows;
            }
        }, function(reason) {
          alert('Failed: ' + reason);
        });
    }
})

.controller('DcmntoPrdccionCtrl', function ($scope,GetData,$timeout,$stateParams,$ionicActionSheet,$location) {

    $scope.show = function(D) {

      if(D.NUM_ARCHIVOS > 0){
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
          buttons: [
            { text: '<b>Ver Imagen</b>' },
            { text: 'Propiedades' }
          ],
          titleText: 'Opciones del documento',
          cancelText: 'Cancelar',
          cancel: function() {
            // add cancel code..
          },
          buttonClicked: function(index) {
            return true;
          }
        });
        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
          hideSheet();
        }, 3000);
      }

    };

    GET();
    function GET(){        
        GetData.findAll(
            {
            'consulta_param[tipo]': 0,
            'consulta_param[target]':'',
            'consulta_param[tipo_target]':'',
            'consulta[tipoConsulta][sort]':'NOMBRE ASC',
            'Ram':'_samlas60y',
            'ignore':10,
            'r': 'Archivo/sbDcmntos/action/consulta/serie/'+$stateParams.SrieId+
            '/tpocarpeta/'+$stateParams.TpoCrptaId+
            '/consulta[serie]/'+$stateParams.SrieId+
            '/consulta[IdSbdcmnto]/'+
            '/consulta[tpocarpeta]/'+$stateParams.TpoCrptaId+
            '/consulta[crpta]/'+$stateParams.CrptaId+
            '/consulta[tpo_dcmnto]/'+$stateParams.TpoDcmntoId+
            '/consulta[dcmnto]/'+$stateParams.DcmntoId+
            '/consulta[tpo_sbdcmnto]//consulta[creadoPor]//consulta[descripcion]//consulta[estado]/0/consulta[fechaCreacionInicio]//consulta[fechaCreacionFin]//consulta[indice1]//consulta[indice2]//consulta[indice3]//consulta[indice4]//consulta[indice5]//consulta[indice6]//consulta[indice7]//consulta[indice8]//consulta[indice9]//consulta[indice10]//consulta[indice11]//consulta[indice12]//consulta[nombre]//consulta[tipoConsulta][like]/M/consulta[tipoConsulta][target]/S/expl//consulta[ubicacion]/'
            }
        ).then(function (dta) {
            if(dta){
                $scope.icon = "icon-subdocumento";
                $scope.Subdocumentos = dta.rows;
            }
        }, function(reason) {
          alert('Failed: ' + reason);
        });
    }
});