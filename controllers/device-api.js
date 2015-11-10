var User = appRequire('/models/user'),
Device = appRequire('/models/device').model;

app.get('/api/users/:username/devices', function(req, res){
	User.getDevices(req.params.username, function(err, user){
		var devices = user ? [] : user.devices
		var jsonResponse = err ? {error: "unable to get devices"} : {devices: devices};
		res.json(jsonResponse);
	});
});

app.post('/api/devices', function(req, res){
	console.log(req.body);
	Device.create(req.body, function(err, device){
		var jsonResponse = err ? [{error: "unable to create device"}] : [{message: "success", added: device}];
		if(jsonResponse[0].message){
	 		User.update(
				{_id: device.user},
				{$push: {devices: device}},
				function(err, device){
					if(err){
						jsonResponse.push({error: "unable to add device to user's devices list"});
					}
					else{
						jsonResponse.push({message: "success", added: device});
					}
				}
			);
		}
		console.log(jsonResponse);
		res.json(jsonResponse);
 	});
});

app.put('/api/devices/:macAddress', function(req, res){
	Device.update(
		{_id: req.params.macAddress},
		{$set: {alias: req.body.alias}},
		function(err, result){
			var jsonResponse = err ? {error: "unable to update device alias"} : {message: "success", updated: result}; 
			console.log(jsonResponse);
			res.json(jsonResponse);
		}
	);
});

app.delete('/api/devices/:macAddress', function(req, res){
	Device.findOneAndRemove({_id: req.params.macAddress}, function(err, device){
		var jsonResponse = err ? [{error: "unable to remove device"}] : [{message: "success", removed: device}]; 
		if(jsonResponse[0].message){
			User.update(
				{_id: device.user},
				{$pull: {devices : {_id: device._id}}},
				function(err, device){
					if(err){
						jsonResponse.push({error: "unable to delete device from user's devices list"});
					}
					else{
						jsonResponse.push({message: "success", removed: device});
					}
					console.log(jsonResponse);

					io.on('connection', function(socket){
						socket.emit(device._id, 'deleted');
					});
					res.json(jsonResponse);
				}
			);	
		}
	});
});