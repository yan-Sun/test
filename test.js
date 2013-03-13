(function(){
 	var vbaitan_com_send = "http://www.vbaitan.com/accept.php?",
	  	vbaitan_vom_receive = "http://www.vbaitan.com/jsonp.php?",
	  	text,
	  	templet = "<div id='vbaitan_com_box'><div id='vbaitan_com_content'></div><div id='vbaitan_com_send'><button>send</button><textarea></textarea></div></div>",
	  	container = document.createElement("div"),
	  	domain = window.location.host,
	  	jsonpTimer,
	  	//代理文件url
	  	vbaitan_proxy = "http://www.vbaitan.com/proxy.html",
	  	response,
	  	split = "!^^!";

    var jsonp = {
    	initGet : function(){
			jsonpTimer = setTimeout(function(){
				jsonp.get();
				console.log("settimeout");
				setTimeout(arguments.callee,9000);
			},9000);
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
    	//通过window.name跨域传送数据
    	initSend : function(){
    		chatbox.button.onclick = function(){
				chatbox.message = chatbox.area.value;
				iframe.send(encodeURIComponent(chatbox.message));
				chatbox.area.value = "";
			};
    	},
    	send : function(message){
    		 var state = 0;
   			 var iframe = document.createElement('iframe');
    		 var loadfn = function() {
    		 	//即将把域切换为代理域，并传message到代理域
    		 	if(state === 0){
    		 		console.log("state 0");
    		 		state = 1;
            		iframe.contentWindow.name = message +split +domain; //传递当前域给其他域，从而可以从其他域转到当前域
            		iframe.contentWindow.location.href = vbaitan_proxy;
            	//域为代理域，准备切换为当前域
    		 	}else if(state === 1){
    		 		console.log("state 1");
    		 		state = 2;
    		 	}else if(state === 2){
    		 		console.log("state 2");
    		 		response = iframe.contentWindow.name;
    		 		//移除iframe
    		 		document.body.removeChild(iframe);
    		 	}
        
   			 };
    		iframe.src = domain;
    		iframe.style.display = "none";
    		if (iframe.attachEvent) {
       	   		 iframe.attachEvent('onload', loadfn);
   		    } else {
       			 iframe.onload  = loadfn;
  		    }
    		document.body.appendChild(iframe);
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
			//jsonp.initSend();
			iframe.initSend();
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
