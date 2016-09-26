angular.module('app', [])
.controller('PasswordController', function PasswordController($scope) {
  $scope.password = '';
  $scope.grades = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else if (size >1) {
      $scope.strength = 'weak';
    }else {
      $scope.strength = 'hell';
    }
  };
});
