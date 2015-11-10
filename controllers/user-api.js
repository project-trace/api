var user = appRequire('/models/user');

app.get('/api/users/:username', function(req, res){
	user.getUser(req.params.username, function(err, user){
		var jsonResponse = user ? user : {error: "invalid username parameter"};
		res.json(jsonResponse);
	});
});