(function(){
  var vbaitan_com_send = "http://www.vbaitan.com/accept.php",
		vbaitan_vom_receive = "http://www.vbaitan.com/jsonp.php",
		text,
		templet = "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
		container = document.createElement("div"),
		domain = window.location.host,
		getScript,
		sendScript;

	//init action environment
	getScript = document.createElement("script");
	getScript.src = "#";
	document.getElementsByTagName("head")[0].appendChild(getScript);
	sendScript = document.createElement("script");
	sendScript.src = "#";
	document.getElementsByTagName("head")[0].appendChild(sendScript);

	//init chatbox	
	document.body.appendChild(container);
	container.innerHTML = templet;
	$("#vbaitan_com_send button").click(function(){
		text = $("#vbaitan_com_send textarea").val();
		send(text);
		$("#vbaitan_com_send textarea").val("");
	});

	//receive message
	setTimeout(function(){
		receive();
		console.log("settimeout");
		setTimeout(arguments.callee,9000);
	},9000);

	//
	function send(text){
		var url = vbaitan_com_send + "/url="+domain+"&message="+text+"&time="+Math.random(1);
		sendScript.src = url;
		console.log("send");
	}

	//use jsonp
	function receive(){
		var url = vbaitan_vom_receive + "/url="+domain+"&callback=render"+"&time="+Math.random(1);
		getScript.src = url;
		console.log("recieve");
	}

	//render data
	window.render = function (data){
		var message;
		for(var i = 0; i<data.length; i++){
			message = message + data[i] +"<br />";
		}
		$("#vbaitan_com_content").html(message);
		console.log("show"+data);
	}

})();
