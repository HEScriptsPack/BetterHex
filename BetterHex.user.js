// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.3
// @description  Better Hex adds useful functions to the legacy hacker experience
// @author       Logfro
// @match        https://legacy.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function clearLogs(){
            var elm = document.getElementsByName("log")[0];
            var x = elm.value;
            var ownIP = document.getElementsByClassName("header-ip-show")[0].innerHTML;
            var button = document.getElementsByClassName("btn btn-inverse")[5];
			if(x.search(ownIP) == -1){
				alert("Your IP ("+ownIP+") isnt present in this log!");
				return false;
			}
            x = x.replaceAll(ownIP,"");
            elm.value = x;
            button.click();
    }
    String.prototype.replaceAll = function(search, replacement) {
    var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
	
	function checkForBestServer(index, item){
			$(item).children("small").each(function(childIndex, childItem){
				switch(childIndex){
					case 0:
						if(childItem.innerHTML != "4 GHz"){
							broke = true;
							var x = upgradableServers.length;
							upgradableServers[x] = index;
							return false;
						}
						break;
					case 1:
						if(childItem.innerHTML != "10 GB"){
							if(broke == true){ break;}
							var x = upgradableServers.length;
							upgradableServers[x] = index;
							return false;
						}
						break;
					case 2:
						broke = false;
						break;
				}
			});
	}
	
		
	function clearOwnLogs(){
		$.post("https://legacy.hackerexperience.com/logEdit", { id: "1", log:""}, function(result){
			var w = window.open("https://legacy.hackerexperience.com/", "logEdit", "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
			w.document.open();
			w.document.write(result);
			w.document.close();
			var realConfirm=w.confirm;
				w.confirm=function(){
				w.confirm=realConfirm;
				return true;
			};
			var seconds = 4500;
			setTimeout(function(){
				var a = w.$(".elapsed")[0].innerText;
				a = a.split(':');
				seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) * 1000;
			},500);
			$(w.document).ready(function(){
				setTimeout(function(){
					w.close();
				},seconds);
			});
		});
	}
    function loadLogFunc(){
		var li = document.createElement("li");
		var a = document.createElement("a");
		var span = document.createElement("span");
		var text = document.createTextNode("Remove your entries");
		span.className = "hide-phone";
		a.id = "LogfroLogClickID";
		li.appendChild(a);
		a.appendChild(span);
		span.appendChild(text);
		li.className = "link";
		document.getElementsByClassName("nav nav-tabs")[0].appendChild(li);
		$(document).ready(function(){
			$("#LogfroLogClickID").on("click", function(){clearLogs();});
        });
    }
	
	function loadUpgradeFunc(){
		var upgradableServers = [];
		var servers = $(".list-user").each(function(index, item){ checkForBestServer(index, item); });
		
	}
	

    switch(window.location.href){
        case "https://legacy.hackerexperience.com/internet?view=logs":
            if(document.getElementsByName("log").length > 0){
                loadLogFunc();
            }
            break;
        case "https://legacy.hackerexperience.com/internet":
            if(document.getElementsByName("log").length > 0){
                loadLogFunc();
            }
            break;
		case "https://legacy.hackerexperience.com/internet?ip=160.7.191.179":
			if($(".alert-success").length > 1 && $("#btc-login").length < 0){
				clearOwnLogs();
			}
			break;
        default:
            break;

    }
	var realConfirm=window.confirm;
		window.confirm=function(){
        window.confirm=realConfirm;
        return true;
    };
})();
