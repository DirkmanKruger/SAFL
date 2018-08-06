angular.module('fishingLog.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, AuthFactory) {
  //.controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, /*$cordovaCamera, $cordovaImagePicker,*/ AuthFactory) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    $scope.registration = {};
    $scope.loggedIn = false;

    if(AuthFactory.isAuthenticated()) {
      $scope.loggedIn = true;
      $scope.username = AuthFactory.getUsername();
    }

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);
      $localStorage.storeObject('userinfo',$scope.loginData);

      AuthFactory.login($scope.loginData);

      $scope.closeLogin();
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


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.registerform = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeRegister = function () {
      $scope.registerform.hide();
    };

    // Open the login modal
    $scope.register = function () {
      $scope.registerform.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doRegister = function () {
      console.log('Doing registration', $scope.registration);
      $scope.loginData.username = $scope.registration.username;
      $scope.loginData.password = $scope.registration.password;

      AuthFactory.register($scope.registration);
      $timeout(function () {
        $scope.closeRegister();
      }, 1000);
    };

    $rootScope.$on('registration:Successful', function () {
      $scope.loggedIn = AuthFactory.isAuthenticated();
      $scope.username = AuthFactory.getUsername();
      $localStorage.storeObject('userinfo',$scope.loginData);
    });

    $ionicPlatform.ready(function() {
      var options = {
        quality: 50,
        //destinationType: Camera.DestinationType.DATA_URL,
        //sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        //encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $scope.takePicture = function() {
//        $cordovaCamera.getPicture(options).then(function(imageData) {
//          $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
//        }, function(err) {
//          console.log(err);
//        });
        $scope.registerform.show();
      };

      var pickoptions = {
        maximumImagesCount: 1,
        width: 100,
        height: 100,
        quality: 50
      };

//      $scope.pickImage = function() {
//        $cordovaImagePicker.getPictures(pickoptions)
//          .then(function (results) {
//            for (var i = 0; i < results.length; i++) {
//              console.log('Image URI: ' + results[i]);
//              $scope.registration.imgSrc = results[0];
//            }
//          }, function (error) {
//            // error getting photos
//          });
//      };

    });

  })

  .controller('KnotsController', ['$rootScope', '$scope', 'knotsFactory', function ($rootScope, $scope, knotsFactory) {

    $scope.allKnots = knotsFactory.query();

  }])

  .controller('SpeciesController', ['$rootScope', '$scope', 'speciesFactory', function ($rootScope, $scope, speciesFactory) {

    $scope.allSpecies = speciesFactory.query();

  }])

  .controller('BraggingController', ['$rootScope', '$scope',  'catchFactory', function ($rootScope, $scope, catchFactory) {

    $scope.allCatches = catchFactory.query();

  }])

  .controller('CatchesController', ['$rootScope', '$scope', '$state', 'catchFactory', 'speciesFactory', function ($rootScope, $scope, $state, catchFactory, speciesFactory) {
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

    $scope.submitNewCatch = function () {

      console.log('NewCatch  :', $scope.newCatch);
      console.log('NewCatch  $scope.species:', $scope.species);
      console.log('NewCatch  $scope.allCatches:', $scope.allCatches);
      console.log('NewCatch  $scope.allCatches.length:', $scope.allCatches.length);
      //console.log('$scope.imageSrc  :', $scope.imageSrc);
      catchFactory.create($scope.newCatch);


      $scope.newCatch.data = {};
      $scope.NewCatchForm.$setUntouched();
      $scope.NewCatchForm.$setPristine();


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


    $scope.openPopup = function () {
    };

    $scope.cancel = function () {
    };


    $scope.uploadFile = function () {
//      console.log('$scope.uploadFile $scope : ', $scope);
//      console.log('$scope.uploadFile $rootScope : ', $rootScope);
//      console.log('$scope.uploadFile $rootScope.uploadedFile : ', $rootScope.uploadedFile);
//      var file = $rootScope.uploadedFile;
//      var uploadUrl = "/savedata";
//      fileUpload.uploadFileToUrl(file, uploadUrl);
    };

  }])

  .controller('IndexController', ['$scope', 'baseURL', function ($scope, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

  }])

  .controller('AboutController', ['$scope', 'baseURL', function ($scope, baseURL) {

    $scope.baseURL = baseURL;
    // var userList = AuthFactory.userCount();
    // var catchList = catchFactory.query();

    $scope.noOfUsers = 14;
    $scope.noOfCatches = 55;
    $scope.latestAppVersion = 'v1.5';

  }])
;
