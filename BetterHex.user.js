// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.2
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
            x = x.replaceAll(ownIP,"");
            elm.value = x;
            button.click();
    }
    String.prototype.replaceAll = function(search, replacement) {
    var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    function loadLogFunc(){
        if(document.getElementsByName("log").length > 0){
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
    }
    switch(window.location.href){
        case "https://legacy.hackerexperience.com/internet?view=logs":
            if(document.getElementsByClassName("label label-success pull-right").length < 1){
                loadLogFunc();
            }
            break;
        default:
            break;

    }
})();
