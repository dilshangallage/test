var app = angular.module("MyApp", []);

app.controller("TodoController",function($scope,$http,Todos){
    $scope.appTitle = "ToDo List";
        $scope.formData =  {};

    Todos.get().success(function(data) {
                $scope.todos = data;
                 console.log(data);
             });

    $scope.addTodo = function() {

        Todos.add( $scope.formData ).success(function(data) {
            $scope.formData =  {};
            $scope.todos = data;
            console.log(data);
        });
    };

    $scope.update = function(inde) {
        Todos.update(inde).success(function(data) {
            $scope.todos = data;
            console.log(data);
        });
    };
     $scope.all = function() {
         Todos.all().success(function(data) {
             $scope.todos = data;
             console.log(data);
         });
    };

    $scope.delete = function (inde) {
        Todos.delete(inde).success(function(data) {
            $scope.todos = data;
            console.log(data);
        });
    };

    $scope.archive=function(){
        Todos.archive().success(function(data) {
            $scope.todos = data;
            console.log(data);
        });
    }

});

/////services for node server////
app.service('Todos', function($http) {
    return {
        get : function() {
            return $http.get('/todo');
        },
        add : function(todoData) {
            return $http.post('/todo',todoData);
        },
        delete : function(id) {
            return $http.post('/remove'+id);
        },
        update : function(id) {
            return $http.post('/update'+id);
        },
        all : function() {
            return $http.post('/all');
        },
        archive : function() {
            return $http.post('/archive');
        }
    }

});

