// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.49
// @description  Better HEx adds useful functions to the legacy hacker experience
// @author       Logfro
// @match        https://legacy.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.user.js
// @grant        none
// ==/UserScript==

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
    function upgradeCPU(){
        var servers = $(".widget-content.padding > ul > a");
        var nextIndex = -1;
        var serverLink = "";
        const acc = localStorage.getItem("acc");

        //Find CPU link
        servers.each(function(index) {
            var cpuUnit = $(this).find(".list-user > small").eq(0).text();
            if(cpuUnit != "4 GHz")
            {
                nextIndex = index;
                serverLink = "https://legacy.hackerexperience.com/hardware?opt=upgrade&id=" + $(this).attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
                return false;
            }
        });

        if(nextIndex == -1)
        {
            localStorage.setItem("active","false");
            return false;
        }
        else if($('div.span8 > div:nth-child(1) > div.widget-content.nopadding > table > tbody > tr').length > 1)
        {
            //Buy the CPU
            var dataObject = {};
            dataObject.acc = acc;
            dataObject.act = 'cpu';
            dataObject['part-id'] = '8';
            dataObject.price = '5000';
            $.ajax({
                type: 'POST',
                data: dataObject
            });
        }
        window.location = serverLink;
    }

    /* Thanks Omega for this Function */
    function upgradeHDD(){
        var servers = $(".widget-content.padding > ul > a");
        var nextIndex = -1;
        var serverLink = "";
        const acc = localStorage.getItem("acc");

        //Find HDD link
        servers.each(function(index) {
            var hddUnit = $(this).find(".list-user > small").eq(1).text();
            if(hddUnit != "10 GB")
            {
                nextIndex = index;
                serverLink = "https://legacy.hackerexperience.com/hardware?opt=upgrade&id=" + $(this).attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
                return false;
            }
        });

        if(nextIndex == -1)
        {
            localStorage.setItem("active","false");
            return false;
        }
        else if($('div.span8 > div:nth-child(2) > div.widget-content.nopadding > table > tbody > tr').length > 1)
        {
            //Buy the HDD
            var dataObject = {};
            dataObject.acc = acc;
            dataObject.act = 'hdd';
            dataObject['part-id'] = '6';
            dataObject.price = '8000';
            $.ajax({
                type: 'POST',
                data: dataObject
            });
        }
        window.location = serverLink;
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
	
	function loadUpgradeCPUOfServer(){
		addNavButton("Auto Upgrade CPU","LogfroHWAutoUpgradeCPU");
		$(document).ready(function(){
			$("#LogfroHWAutoUpgradeCPU").on("click",function(){
                if(localStorage.getItem("acc").empty()){
                    var acc = prompt("Input your bank account #");
                    localStorage.setItem("acc",acc);
                }
                if(!acc.empty() && localStorage.getItem("active") != "true"){
                    localStorage.setItem("active","true");
                    upgradeCPU();
                }
			});
		});
	}
	
	function loadUpgradeHDDOfServer(){
		addNavButton("Auto Upgrade HDD","LogfroHWAutoUpgradeHDD");
		$(document).ready(function(){
			$("#LogfroHWAutoUpgradeHDD").on("click",function(){
			    if(localStorage.getItem("acc").empty()){
				    var acc = prompt("Input your bank account #");
				    localStorage.setItem("acc",acc);
                }
                if(!acc.empty() && localStorage.getItem("active") != "true"){
                    localStorage.setItem("active","true");
                    upgradeHDD();
                }
			});
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
		    if(localStorage.getItem("active") != "true"){
                loadUpgradeHDDOfServer();
                loadUpgradeCPUOfServer();
            } else {

            }
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
