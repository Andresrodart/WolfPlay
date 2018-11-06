function simpson(f, r, m, a, b, n){
	var dx = (b-a)/n;
	var sum1 = f(a + dx/2, r, m);
	var sum2 = 0;
	for(var i = 1; i < n; i++){
        sum1 += f(a + dx*i + dx/2, r, m);
		sum2 += f(a + dx*i, r, m);        
    }
	return (dx/6) * (f(a, r, m) + f(b, r, m) + 4*sum1 + 2*sum2);
}

function f1(x, r, m){
	return ( Math.exp(-.5 * Math.pow( (x-m) / r, 2)) / (r * Math.sqrt(Math.PI * 2)) );
}

exports.Proba_Post = function(req, res, next){
    let a = parseFloat(req.body.numA);
    let b = parseFloat(req.body.numB);
    let r = parseFloat(req.body.numR);
    let m = parseFloat(req.body.numM);
    if(req.body.numAi)
        a = m - 10*r;
    if(req.body.numBi)
        b = m + 10*r;
    let result = simpson(f1, r, m, a, b , 70)
    console.log(f1, r, m, a, b , 70)
    return res.send(`Resultado: ${result}`);
}