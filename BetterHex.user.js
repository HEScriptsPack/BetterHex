// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.46
// @description  Better HEx adds useful functions to the legacy hacker experience
// @author       Logfro
// @match        https://legacy.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.user.js
// @grant        none
// ==/UserScript==

var totalServers = $(".widget-content.padding > ul > a").length;
var index = 0;
var interval;

(function() {
    'use strict';
    function clearLogs(ram){
            var elm = document.getElementsByName("log")[0];
            var x = elm.value;
            var ownIP = document.getElementsByClassName("header-ip-show")[0].innerHTML;
            var button = $("input.btn-inverse").get(1);
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
	
	/* Thanks Omega for this Function */
	function upgradeWORAM(acc){
		$('.label.label-info').html("Completed: " + index + "/" + totalServers);

		var server = $(".widget-content.padding > ul > a").eq(index);
		var cpuUnit = server.find(".list-user > small").eq(0).text();
		var hddUnit = server.find(".list-user > small").eq(1).text();

		while(cpuUnit == "4 GHz" && hddUnit == "10 GB" && index < totalServers)
		{
			index++;
			server = $(".widget-content.padding > ul > a").eq(index);
			cpuUnit = server.find(".list-user > small").eq(0).text();
			hddUnit = server.find(".list-user > small").eq(1).text();
		}
		if(index >= totalServers)
		{
			clearInterval(interval);
			$('.label.label-info').html("Done :)");
		}
		else
		{
			var serverID = server.attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
			getDataWORAM('upgrade', serverID, acc);
		}
	}

	function upgradeWRAM(acc){
		$('.label.label-info').html("Completed: " + index + "/" + totalServers);

		var server = $(".widget-content.padding > ul > a").eq(index);
		var cpuUnit = server.find(".list-user > small").eq(0).text();
		var hddUnit = server.find(".list-user > small").eq(1).text();
		var ramUnit = server.find(".list-user > small").eq(2).text();

		while(cpuUnit == "4 GHz" && hddUnit == "10 GB" && ramUnit == "2048 MB" && index < totalServers)
		{
			index++;
			server = $(".widget-content.padding > ul > a").eq(index);
			cpuUnit = server.find(".list-user > small").eq(0).text();
			hddUnit = server.find(".list-user > small").eq(1).text();
			ramUnit = server.find(".list-user > small").eq(2).text();
		}
		if(index >= totalServers)
		{
			clearInterval(interval);
			$('.label.label-info').html("Done :)");
		}
		else
		{
			var serverID = server.attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
			getDataWRAM('upgrade', serverID, acc);
		}
	}
	
	/* Thanks Omega for this Function */
	function getDataWORAM(itemToBuy, id, account){
		$.ajax({
			type: 'GET',
			url: "/hardware?opt=" + itemToBuy + "&id=" + id,
			data: {
				opt: itemToBuy,
				acc: account
			},
			success: function(data) {
				console.log("Success");
				postData('cpu','5000','8', account);
				postData('hdd','8000','6', account);
				index++;
			}
		});
	}

	
	function getDataWRAM(itemToBuy, id, account){
		$.ajax({
			type: 'GET',
			url: "/hardware?opt=" + itemToBuy + "&id=" + id,
			data: {
				opt: itemToBuy,
				acc: account
			},
			success: function(data) {
				console.log("Success");
				postData('cpu','5000','8', account);
				postData('hdd','8000','6', account);
				postData('ram','2500','4', account);
				index++;
			}
		});
	}

	/* Thanks Omega for this Function */
	function postData(itemToBuy, itemCost, itemId, account){
		var dataObject = {};
		dataObject.acc = account;
		dataObject.act = itemToBuy;
		dataObject['part-id'] = itemId;
		dataObject.price = itemCost;
		$.ajax({
			type: 'POST',
			data: dataObject,
			error: function() {
			console.log("Already upgraded!");
		}
		});
	}
	
	function upgradeHDDMaxedOut(){
		
	}

	function buyNewHDD(times){
		if(times.length < 1){
			alert("You need to type in a number!");
			return false;
		}
		if(isNaN(times)){
			alert("Not a number!");
			return false;
		}
		var x = 0;
		function upgrade(){
			var acc = $("#select-bank-acc")[0].value;
			var w = openPopUp("https://legacy.hackerexperience.com/hardware?opt=xhd&acc="+acc+"#buy","UpgradePopUp");
			var timer = setInterval(function(){
				if(w.closed){
					clearInterval(timer);
					x++;
					if(x < times){
						upgrade();
					}
				} else {
					if(w.$(".alert-success").length > 0){
						w.close();
					}
				}
			},1000);
		}
		upgrade();
	}
	
	function buyHDD(){
		$(document).ready(function(){
			$("form")[1].submit();
		});
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
			var seconds;
			$(w.document).ready(function(){
				setTimeout(function(){
					var a = w.$(".elapsed")[0].innerText;
					a = a.replace("h","");
					a = a.replace("m","");
					a = a.replace("s","");
					a = a.split(':');
					seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) * 1000 + 1000;
					console.log(seconds);
					setTimeout(function(){
						w.close();
					},seconds);
				},500);
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

	function loadUpgradeFuncWORAM(){
		addNavButton("Auto Upgrade all (Maxed out, except RAM)","LogfroHWAutoUpgradeAll");
		$(document).ready(function(){
			$("#LogfroHWAutoUpgradeAll").on("click",function(){var x = prompt("Please put in your bank account id"); if(x.length > 0){ interval = setInterval(upgradeWORAM(x),1250);}});
		});
	}
	
	function loadUpgradeFuncWRAM(){
		addNavButton("Auto Upgrade all (Maxed out, with RAM)","LogfroHWAutoUpgradeAllWRAM");
		$(document).ready(function(){
			$("#LogfroHWAutoUpgradeAllWRAM").on("click",function(){var x = prompt("Please put in your bank account id"); if(x.length > 0){ interval = setInterval(upgradeWRAM(x),1250);}});
		});
	}
	
	function loadClearOwnLogBtn(){
		$(document).ready(function(){
			addBarBtn("Clear own logs","LogfroClearOwnLogsBtn","LogfroClearOwnLogsBtnSpan");
			$("#LogfroClearOwnLogsBtn").on("click", function(){clearOwnLogs();});
        });
	}

	function loadHDDUpgradeBtn(){
		$(document).ready(function(){
			var btn = document.createElement("input");
			var input = document.createElement("input");
			input.type = "text";
			input.id = "LogfroHDDUpgradeBtnTimes";
			input.style = "margin: 10px;";
			input.placeholder = "How many times?";
			btn.className = "btn btn-success";
			btn.id = "LogfroHDDUpgradeBtn";
			btn.value = "Upgrade selected times";
			btn.type = "button";
			$("form")[0].appendChild(btn);
			$("form")[0].appendChild(input);
			$("#LogfroHDDUpgradeBtn").on("click", function(){buyNewHDD($("#LogfroHDDUpgradeBtnTimes")[0].value);});
			addNavButton("Auto upgrade Ext. HDD (Maxed out)","LogfroAutoUpgradeHDDMaxedOut");
			$("#LogfroAutoUpgradeHDDMaxedOut").on("click", function(){upgradeHDDMaxedOut();});
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
			loadUpgradeFuncWORAM();
			loadUpgradeFuncWRAM();
			break;
		case "https://legacy.hackerexperience.com/list?action=collect&show=last":
			clearOwnLogs();
			break;
		case "https://legacy.hackerexperience.com/hardware?opt=xhd":
			loadHDDUpgradeBtn();
			break;
        default:
            break;

    }
	if(window.location.href.indexOf("#UpgradeScript") > -1){
		upgradeServerMax();
	}
	if(window.location.href.indexOf("https://legacy.hackerexperience.com/hardware?opt=xhd&acc=") > -1){
		buyHDD();
	}
	var realConfirm=window.confirm;
		window.confirm=function(){
        window.confirm=realConfirm;
        return true;
    };
})();
