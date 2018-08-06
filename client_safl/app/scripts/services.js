'use strict';

angular.module('fishingLogApp')
.constant("baseURL", "https://localhost:3443/")


.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function(){
                })
                .error(function(){
                });

        console.log('fileUpload : uploaded file server side : ', file);
        return file.originalname;
    };

}])

.factory('catchFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){


    console.log('In catchFactory 1');
    return $resource(baseURL + "catches", {}, {
        query: { method: "GET", isArray: true },
        create: { method: "POST"},
        get: { method: "GET"},
        remove: { method: "DELETE"},
        update: { method: "PUT"}
    });

//    var catchFac = {};
//
//    catchFac.getAllCatches = function() {
//        //console.log('In newCatchFactory 2 : ', newCatchData);
//        console.log('In catchFactory 3 : ', baseURL + "catches");
//
//
//        $resource(baseURL + "catches", {}, {
//            query: { method: "GET", isArray: true },
//            create: { method: "POST"},
//            get: { method: "GET"},
//            remove: { method: "DELETE"},
//            update: { method: "PUT"}
//        });
//
//
//    };
//
//    catchFac.createCatch = function(newCatchData) {
//        //console.log('In newCatchFactory 2 : ', newCatchData);
//        console.log('In catchFactory 3 : ', baseURL + "catches");
//
//
//        $resource(baseURL + "catches", {}, {
//            query: { method: "GET", isArray: true },
//            create: { method: "POST"},
//            get: { method: "GET"},
//            remove: { method: "DELETE"},
//            update: { method: "PUT"}
//        });
//    };
//
//    return catchFac;
}])

.factory('knotsFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    console.log('In knotsFactory : ', baseURL + "knots");

    return $resource(baseURL + "knots", {}, {
        query: { method: "GET", isArray: true },
        create: { method: "POST"},
        get: { method: "GET"},
        remove: { method: "DELETE"},
        update: { method: "PUT"}
    })
}])
.factory('speciesFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    console.log('In speciesFactory : ', baseURL + "species");

    return $resource(baseURL + "species", {}, {
        query: { method: "GET", isArray: true },
        create: { method: "POST"},
        get: { method: "GET"},
        remove: { method: "DELETE"},
        update: { method: "PUT"}
    })
}])
.factory('UploadFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){


//    return $resource(baseURL + "catches/file", {}, {
//        query: { method: "GET", isArray: true },
//        create: { method: "POST"},
//        get: { method: "GET"},
//        remove: { method: "DELETE"},
//        update: { method: "PUT"}
//    })

    var uploadFac = {};

    uploadFac.saveFile = function(fileData) {
        console.log('fileUpload : uploaded file server side fileData : ', fileData);
        console.log('fileUpload : uploaded file server side $rootScope.uploadedFile : ', $rootScope.uploadedFile);
        var fd = new FormData();
        fd.append('file', $rootScope.uploadedFile);
        return $http.post(baseURL + "catches/file", fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
                .success(function(){
                })
                .error(function(){
                });

    };
    return uploadFac;

}])


.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    };
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var userCount = 0;
    var username = '';
    var authToken = undefined;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token});
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>';
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };

    authFac.userCount = function() {
        $resource(baseURL + "users/count").get(function(response){
            console.log('"users/count response :', response);
            console.log('"users/count response :', response.getBody());
            userCount = response.getBody();
        });
        return userCount;
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])
;