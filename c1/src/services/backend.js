var backendModule = angular.module("backendModule",[]);

backendModule.service('appDataService',  function(){
		this.profile = {
			"name":"",
			"password":""
		};

		this.setUserDetails = function(id,name,passwd)
		{
				this.profile["name"] = name;
				this.profile["password"] = passwd;
				this.profile["id"] = id;
		}

});



backendModule.factory('backend', ['$http', function($http){
	var apiNameObject = {
		"LOGIN_API":"login"
	};
	var serviceObj = {
			sendRequest:function(data)
			{
				var params = this.getParameter(data['param']);	
				var apiName = data["api"];
				var promObj = $http.get(apiNameObject[apiName]+"?"+params);
				promObj.success(function(responseData)
									{
										if(responseData !== undefined && Object.keys(responseData).length > 0)
												{

													data["success"](responseData);	
												}
												else
												{
													data["warning"]();
												}
									 });

				promObj.error(function(responseData){
												data["error"]();
											  });
			},
			getParameter : function(obj)
			{
				var str = "";
				var i =0,andStr ="&";
				for(key in obj)
				{
					if(i==0)
						andStr = "";
					else
						andStr ="&";

					str += andStr+""+key+"="+obj[key];

					i++;
				};
				console.log(str);
				return str;	

			}


	}
	return serviceObj;
}]);