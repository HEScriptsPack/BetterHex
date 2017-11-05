// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.42
// @description  Better HEx adds useful functions to the legacy hacker experience
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

	function upgradeServerMax(){
		$(document).ready(function(){
			setTimeout(function(){
				if($("#cpu4000 td")[3].innerText == "$5,000" && $("#cpu3500").length){
					$("#4000").click();
					setTimeout(function(){
						$("#modal-form").submit();
					},2500);
				}
				if($("#hdd10000 td")[3].innerText == "$8,000" && $("#hdd5000").length){
					$("#10000").click();
					setTimeout(function(){
						$("#modal-form").submit();
					},2500);
				}
			},1000);
		});
	}
	function initUpgradeAllMaxedOut(){
		var upgradableServers = [];
		var index2 = -1;
		$(".list-user").each(function(index, item){ upgradableServers = checkForBestServer(index, item, upgradableServers, "cpu"); index2 = index; });
		$(".list-user").each(function(index, item){ upgradableServers = checkForBestServer(index, item, upgradableServers, "hdd"); index2 = index; });
		var x = 0;
		function openUpgrade(callback){
			if(x == index2){ return false; }
			var url = getUpgradeURL(upgradableServers[x]);
			if(url == "https://legacy.hackerexperience.com/undefined"){ return false; }
			var w = openPopUp(url+"#UpgradeScript", "Upgrade");
			var timer = setInterval(function(){
				if(w.closed){
					clearInterval(timer);
					x++;
					callback(callback);
				} else {
					if(w.$(".alert-success").length > 0){
						w.close();
					}
				}
			},1000);
		}
		if(upgradableServers.length < 1){ alert("There are no servers to upgrade."); return false;}
		openUpgrade(openUpgrade);
	}
	function getUpgradeURL(index){
		var ret = $(".span4 .widget-box .widget-title a").get(index);
		console.log(index);
		return ret.href;
	}

	function markNotFullUpgradedServers(){
		$(".span4 .widget-title").css("background-color","yellow"); $(".span4 .widget-title").css("background-image","none");
	}
	function checkForBestServer(index, item, upgradableServers, type){
		if(type == "cpu"){
			if($(item).children().get(1).innerHTML != "4 GHz"){
				console.log("GHZ "+$(item).children().get(1).innerHTML+" von index "+index);
				var z = upgradableServers.length;
				upgradableServers[z] = index;
			}
		}
		if(type == "hdd"){
			if($(item).children().get(3).innerHTML != "10 GB"){
				console.log("GB "+$(item).children().get(3).innerHTML+" von index "+index);
				var y = upgradableServers.length;
				upgradableServers[y] = index;
			}
		}
		return upgradableServers;
	}

	function openPopUp(url, name){
		var w = window.open(url, name, "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
		return w;
	}
	function clearOwnLogs(){
		$.post("https://legacy.hackerexperience.com/logEdit", { id: "1", log:""}, function(result){
			var w = openPopUp("https://legacy.hackerexperience.com/","logEdit");
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
	function addBarBtn(name, btnId, spanId){
		var parentElem = document.getElementsByClassName("btn-group")[0];
		var li = document.createElement("li");
		var a = document.createElement("a");
		var span = document.createElement("span");
		$(li).addClass("btn btn-inverse");
		li.id = btnId;
		$(li).addClass("text");
		span.id = spanId;
		span.innerText = name;
		a.appendChild(span);
		li.appendChild(a);
		parentElem.insertBefore(li, parentElem.children[1]);
	}

	function addNavButton(name, id){
		var li = document.createElement("li");
		var a = document.createElement("a");
		var span = document.createElement("span");
		var text = document.createTextNode(name);
		span.className = "hide-phone";
		a.id = id;
		li.appendChild(a);
		a.appendChild(span);
		span.appendChild(text);
		li.className = "link";
		document.getElementsByClassName("nav nav-tabs")[0].appendChild(li);
	}
    function loadLogFunc(){
		addNavButton("Remove your entries","LogfroLogClickID");
		$(document).ready(function(){
			$("#LogfroLogClickID").on("click", function(){clearLogs();});
        });
    }

	function loadUpgradeFunc(){
		addNavButton("Auto Upgrade all (Maxed out, except RAM)","LogfroHWAutoUpgradeAll");
		$(document).ready(function(){
			$("#LogfroHWAutoUpgradeAll").on("click",function(){ initUpgradeAllMaxedOut();});
		});
	}
	
	function loadClearOwnLogBtn(){
		$(document).ready(function(){
			addBarBtn("Clear own logs","LogfroClearOwnLogsBtn","LogfroClearOwnLogsBtnSpan");
			$("#LogfroClearOwnLogsBtn").on("click", function(){clearOwnLogs();});
        });
	}

	loadClearOwnLogBtn();
	
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
			if($(".alert-success").length > 1 && $("#btc-login").length < 1 && $(".alert-success")[0].innerText.indexOf("You logged in to the address") > -1){
				clearOwnLogs();
			}
			break;
		case "https://legacy.hackerexperience.com/hardware":
			loadUpgradeFunc();
			break;
        default:
            break;

    }
	if(window.location.href.indexOf("#UpgradeScript") > -1){
		upgradeServerMax();
	}
	var realConfirm=window.confirm;
		window.confirm=function(){
        window.confirm=realConfirm;
        return true;
    };
})();
