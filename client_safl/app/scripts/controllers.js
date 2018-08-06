'use strict';

/*angular.module("fishingLogApp", [/!*"ngAnimate", "ngSanitize", "ui.bootstrap"*!/])*/
angular.module("fishingLogApp")

.controller('CatchesController', ['$rootScope', '$scope', '$state', '$stateParams', 'ngDialog', 'catchFactory', 'knotsFactory', 'speciesFactory', 'UploadFactory','fileUpload', function ($rootScope, $scope, $state, $stateParams, ngDialog, catchFactory, knotsFactory, speciesFactory, UploadFactory, fileUpload) {
    $scope.newCatch = {
        specie: "",
        lure: "",
        location: "",
        waterType: "",
        length: 0,
        weight: 0,
        released: false,
        image: '../images/logos/default-img.png'
    };

    $scope.species = speciesFactory.query();
    $scope.allCatches = catchFactory.query();
        console.log('NewCatch  allCatches:', $scope.allCatches);

    $scope.submitNewCatch = function() {

        console.log('NewCatch  :', $scope.newCatch);
        console.log('NewCatch  $scope.species:', $scope.species);
        console.log('NewCatch  $scope.allCatches:', $scope.allCatches);
        console.log('NewCatch  $scope.allCatches.length:', $scope.allCatches.length);
        //console.log('$scope.imageSrc  :', $scope.imageSrc);
        catchFactory.create($scope.newCatch);
        //catchFactory.createCatch($scope.newCatch);


        //$scope.uploadFile();
        //UploadFactory.create($rootScope.uploadedFile);
        UploadFactory.saveFile($rootScope.uploadedFile);

        $scope.newCatch.data = {};
        $scope.NewCatchForm.$setUntouched();
        $scope.NewCatchForm.$setPristine();
        //$scope.openPopup().then(
        //        //$scope.cancel()
        //);

        $scope.openPopup();

        $state.go('app.catcheslookup', {}, {reload: true});
    };

    $scope.lures = [{
        value: "artificial",
        label: "Artificial"
    }, {
        value: "bait",
        label: "Bait"
    }];

    $scope.releasedOptions = [{
        value: "yes",
        label: "yes"
    }, {
        value: "no",
        label: "no"
    }];

    $scope.waterOptions = [{
        value: "salt",
        label: "Salt Water"
    }, {
        value: "fresh",
        label: "Fresh Water"
    }];



    $scope.ngDialog = ngDialog;
    $scope.openPopup = function () {
        ngDialog.openConfirm({ template: 'views/popup.html', scope: $scope, className: 'ngdialog-theme-default', controller:"CatchesController" });

    };

    $scope.cancel = function () {
        ngDialog.close('OK');
    };


    $scope.uploadFile = function(){
        console.log('$scope.uploadFile $scope : ', $scope);
        console.log('$scope.uploadFile $rootScope : ', $rootScope);
        console.log('$scope.uploadFile $rootScope.uploadedFile : ', $rootScope.uploadedFile);
        var file = $rootScope.uploadedFile;
        var uploadUrl = "/savedata";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}])

.controller('KnotsController', ['$rootScope', '$scope', '$state', '$stateParams', 'ngDialog', 'knotsFactory',  function ($rootScope, $scope, $state, $stateParams, ngDialog, knotsFactory) {

    $scope.allKnots = knotsFactory.query();

}])

.controller('SpeciesController', ['$rootScope', '$scope', '$state', '$stateParams', 'ngDialog','speciesFactory',  function ($rootScope, $scope, $state, $stateParams, ngDialog, speciesFactory) {

    $scope.allSpecies = speciesFactory.query();

}])

.controller('BraggingController', ['$rootScope', '$scope', '$state', '$stateParams', 'ngDialog', 'catchFactory',  function ($rootScope, $scope, $state, $stateParams, ngDialog, catchFactory) {

    $scope.allCatches = catchFactory.query();

}])

.controller('HomeController', ['$scope', function ($scope) {

}])

.controller('AboutController', ['$scope', '$rootScope', 'catchFactory', 'AuthFactory', function ($scope, $rootScope, catchFactory, AuthFactory) {

    var userList = AuthFactory.userCount();
    var catchList = catchFactory.query();

    $scope.noOfUsers = 14;
    $scope.noOfCatches = 55;
    $scope.latestAppVersion = 'v1.5';

    console.log('catchList : ',  catchList);
    console.log('catchList.length : ',  catchList.length);
    console.log('userList : ',  userList);
    console.log('noOfUsers : ',  $scope.noOfUsers);
    console.log('noOfCatches : ',  $scope.noOfCatches);
    console.log('latestAppVersion : ',  $scope.latestAppVersion);

}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])

.controller("UploadController", ['$scope', '$rootScope', 'fileReader', function ($scope, $rootScope, fileReader) {
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
        .then(function (result) {
            $scope.imageSrc = result;
            $rootScope.uploadedFile = $scope.file;
            console.log("$scope.file :", $scope.file);
            console.log("$rootScope.uploadedFile :", $rootScope.uploadedFile);
        });
    };

    $scope.$on("fileProgress", function (e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });

}])

.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })
        }
    }
})

.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
;