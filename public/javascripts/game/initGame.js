(function($){
    $(function(){
        

        $('.sidenav').sidenav();
        $('.fixed-action-btn').floatingActionButton();
        $('.tap-target').tapTarget();
        $('#gameHolder').on("gameEnd", {foo: "bar"}, function( event, arg1 ) {
            //event.preventDefault();
            $.post(window.location, arg1, function( data ) {
                if (data == 'succes' ) {
                    console.log("Bissnes");
                }
                else{
                    console.log("NoBissnes");
                }
           });
        })
    }); // end of document ready
})(jQuery); // end of jQuery name space

var genericOptions = {
	method: 'POST', 		// *GET, POST, PUT, DELETE, etc.
	mode: 'cors',			// no-cors, *cors, same-origin
	cache: 'no-cache', 		// *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, *same-origin, omit
	headers: {'Content-Type': 'application/json'},
	redirect: 'follow', // manual, *follow, error
	referrerPolicy: 'no-referrer', // no-referrer, *client
	body: null
};

function genericPost(url, options, callback){
	return fetch(url, options)
	.then((response) => {
		if (response.redirected) window.location.href = response.url;
		else return response.json();
		return true;
	})
	.then((data) => {
		console.log(data);
		if(callback) callback(data);
		else return new Promise(resolve => resolve(data));
	});
}

function genericGet(url, callback) {
	fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		callback(data);
	});
}
window.onload = (event) => {
	genericGet('/h_score', data => {
		console.log(data);
		document.getElementById('text_score').textContent = 'High Score: ' + data.user + ' - ' + data.score;
	});
};