var app = angular.module("myApp",[]);
app.controller('myCtrl',function($scope, $http){

	$http.get('http://geek:3000/user/select').then(function(res){
		let a =res.data.map((a)=>{return a['Tables_in_project']});
		let b =[];
		a.forEach(function(elem) {
			if(/^table/ig.test(elem)){
				b.push(elem);
			}
		});
		$scope.selData = b;
		
	})

	
	$scope.getTable = function(arg){

		// $http.get("http://geek:3000/user/gen").then(function(res){
		// 	$scope.myData = res.data;
		// 	console.log($scope.myData);
		// });

		$http({
			method: 'POST',
			url: 'http://127.0.0.1:3000/user/gen',
			data : arg,
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		}).success(function(data){
			$scope.myData = data;
			console.log(data);
		})

		$scope.arg = arg;
		$scope.result = {};
		$scope.showResult = false;

		// $scope.resResult={};
		// $scope.arr = Object.values($scope.resResult);
	}
	$scope.getTable('table1');


	// console.log($scope.result);
	$scope.sub = function(){
		console.log($scope.result);
		$http({
			method: 'POST',
			url: 'http://geek:3000/user/tongji',
			data: {
				a:$scope.result,
				b:$scope.arg
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(data){
			alert('提交成功！');
			console.log(data);
			$scope.showResult = true;
			let len = Object.keys(data[0]).length;
			let keys = Object.keys(data[0]).slice(1);
			
			let obj ={};
			for (let k of keys){
				let {Acount,Bcount,Ccount,Dcount} ={Acount:0,Bcount:0,Ccount:0,Dcount:0};
			
				for(let d of data){

					if(d[k]==='A') Acount ++;
					if(d[k]==='B') Bcount ++;
					if(d[k]==='C') Ccount ++;
					if(d[k]==='D') Dcount ++;
					

					obj[k] = {
						'A':Acount,
						'B':Bcount,
						'C':Ccount,
						'D':Dcount
					}
				}
			}

			$scope.resResult = obj;
			$scope.count = data;
			$scope.arr = Object.values($scope.resResult);
			

		})
	};

});
