function clearLogs(){
            var elm = document.getElementsByName("log")[0];
            var x = elm.value;
            var ownIP = document.getElementsByClassName("header-ip-show")[0].innerHTML;
            var button = document.getElementsByClassName("btn btn-inverse")[5];
			if(x.search(ownIP) == -1){
				gritterNotify({
					title: "No IP found",
					text: "The IP <b>"+ownIP+"</b> isnt present in the log",
					image: "",
					sticky: false
				});
				return false;
			}
            x = x.replaceAll(ownIP,"");
            elm.value = x;
            button.click();
    }