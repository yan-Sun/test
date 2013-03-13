(function(){
 	var vbaitan_com_send = "http://www.vbaitan.com/accept.php?",
	  	vbaitan_vom_receive = "http://www.vbaitan.com/jsonp.php?",
	  	text,
	  	templet = "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
	  	container = document.createElement("div"),
	  	domain = window.location.host,
	  	jsonpTimer;

    var jsonp = {
    	initGet : function(){
			jsonpTimer = setTimeout(function(){
				jsonp.get();
				console.log("settimeout");
				setTimeout(arguments.callee,3000);
			},3000);
    	},
    	initSend : function(){
			chatbox.button.onclick = function(){
				chatbox.message = chatbox.area.value;
				jsonp.send(encodeURIComponent(chatbox.message));
				chatbox.area.value = "";
			};
    	},
    	send : function(text){
    		var send;
    		if(send = id(document,"sendScript")){
    			name(document,"head")[0].removeChild(send);
    		}
    		var sendScript = document.createElement("script");
    		var url = vbaitan_com_send + "url="+domain+"&message="+text+"&time="+Math.random(1);
			sendScript.src = url;
			sendScript.id = "sendScript";
			name(document,"head")[0].appendChild(sendScript);
			console.log("send");
    	},
    	get : function(){
    		var get;
    		if(get = id(document,"getScript")){
    			name(document,"head")[0].removeChild(get);
    		}
    		var getScript = document.createElement("script");
    		var url = vbaitan_vom_receive + "url="+domain+"&callback=render"+"&time="+Math.random(1);
			getScript.src = url;
			getScript.id = "getScript";
			name(document,"head")[0].appendChild(getScript);
			console.log("recieve");
    	}
    };

    var iframe = {
    	initSend : function(){
    		var sendIframe = document.createElement("iframe");
    		sendIframe.src = "#";
    		sendIframe.style.display = "none";
    		document.body.appendChild(sendIframe);
    	}
    };

	var chatbox = {
		templet : "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
		message : "",
		allMessage : "",
		button : null,
		area : null,
		init : function(){
			var container = document.createElement("div");
			document.body.appendChild(container);
			container.innerHTML = templet;
			this.button = name(id(document,"vbaitan_com_send"),"button")[0];
			this.area = name(id(document,"vbaitan_com_send"),"textarea")[0];
		}
	};

	var environment = {
		init : function(){
			window.render = function (data){
				var message;
				chatbox.allMessage = data;
				for(var i = 0; i<data.length; i++){
					message = message ? message+data[i]+"<br />" : data[i]+"<br />";
				}
				id(document,"vbaitan_com_content").innerHTML = message;
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
