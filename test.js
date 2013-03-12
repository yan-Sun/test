(function(){
  var vbaitan_com_send = "www.vbaitan.com/accept.php",
		vbaitan_vom_receive = "www.vbaitan.com/jsonp.php",
		text,
		templet = "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
		container = document.createElement("div"),
		domain = window.location.host,
		actionScript;

	//init action environment
	actionScript = document.createElement("script");
	document.getElementsByTagName("head")[0].append(actionScript);

	//init chatbox	
	document.body.append(container);
	container.innerHTML = templet;
	$("#vbaitan_com_send").click(function(){
		text = $("#vbaitan_com_send textarea").text();
		send(text);
		$("#vbaitan_com_send textarea").text("");
	});

	//receive message
	setTimeout(function(){
		receive();
	},3000);

	//
	function send(text){
		var url = vbaitan_com_send + "/url="+domain+"&message="+text+"&time="+Math.random(1);
		actionScript.src = url;
	}

	//use jsonp
	function receive(){
		var url = vbaitan_vom_receive + "/url="+domain+"&callback=render"
		actionScript.src = url;
	}

	//render data
	window.render = function (data){
		var message;
		for(var i = 0; i<data.length; i++){
			message = message + data[i] +"<br />";
		}
		$("#vbaitan_com_content").html(message);
	}

})();
