var myApp=angular.module('myApp',[]);
myApp.controller('AppCtrl', function($scope,$http)
{	console.log("Hello world from the controller");	
	// $http.get('/contactlist') is to send a get request to the server
	// then( function(response){} is for, after a successful get request what to do with response received from the server
	
	var refresh=function()
	{	$http.get('/contactlist').then( function(response)
		{	console.log("I got the data I requested");
			$scope.contactlist=response.data;	
			$scope.contact= null;	
		});
	};

	refresh();

	$scope.addContact = function()
	{	$scope.contact._id=null;
		console.log($scope.contact);
		$http.post('/contactlist/', $scope.contact).then(function(response)
		{	console.log(response);		
			refresh();	
		});
	};

	$scope.remove = function(id)
	{	console.log(id);
		$http.delete('/contactlist/'+id).then(function(response)
		{	refresh();			
		});		
	};

	$scope.edit = function(id)
	{	console.log(id);
		$http.get('/contactlist/'+id).then(function(response)
		{	$scope.contact=response.data;		
		});		
	};

	$scope.update = function()
	{	console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response)
		{	refresh();			
		});
	};
})

