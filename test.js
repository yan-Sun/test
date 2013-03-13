(function(){
 	var vbaitan_com_send = "http://www.vbaitan.com/accept.php",
	  	vbaitan_vom_receive = "http://www.vbaitan.com/jsonp.php",
	  	text,
	  	templet = "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
	  	container = document.createElement("div"),
	  	domain = window.location.host,
	  	getScript,
	  	sendScript,
	  	jsonpTimer;

    var jsonp = {
    	initGet : function(){
    		getScript = document.createElement("script");
			getScript.src = "#";
			name(document,"head")[0].appendChild(getScript);
			jsonpTimer = setTimeout(function(){
				this.get();
				console.log("settimeout");
				setTimeout(arguments.callee,9000);
			},9000);
    	},
    	initSend : function(){
    		sendScript = document.createElement("script");
			sendScript.src = "#";
			name(document,"head")[0].appendChild(sendScript);
			chatbox.button.onClick = function(){
				chatbox.message = chatbox.area.value;
				this.send(encodeURIConponent(chatbox.message));
				chatbox.area.value = "";
			};
    	},
    	send : function(text){
    		var url = vbaitan_com_send + "/url="+domain+"&message="+text+"&time="+Math.random(1);
			sendScript.src = url;
			console.log("send");
    	},
    	get : function(){
    		var url = vbaitan_vom_receive + "/url="+domain+"&callback=render"+"&time="+Math.random(1);
			getScript.src = url;
			console.log("recieve");
    	}
    };

    var iframe = {
    	
    };

	var chatbox = {
		templet : "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
		message,
		allMessage,
		button = name(id(document,"vbaitan_com_send"),"button")[0],
		area = name(id(document,"vbaitan_com_send"),"textarea")[0],
		intBox : function(){
			var container = document.createElement("div");
			document.body.appendChild(container);
			container.innerHTML = templet;
		}
	};
	
	var environment = {
		init : function(){
			window.render = function (data){
				var message;
				chatbox.allMessage = data;
				for(var i = 0; i<data.length; i++){
					message = message + data[i] +"<br />";
				}
				$("#vbaitan_com_content").html(message);
				console.log("show"+data);
			}
			chatbox.init();
			jsonp.initGet();
			jsonp.initSend();
		}
	};
	

	function id(ele,id){
		ele = ele || document;
		return ele.getElementById(id);
	}

	function name(ele,name){
		ele = ele || document;
		return ele.getElementsByTagName(name);
	}

	environment.init();

})();
