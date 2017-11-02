// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.21
// @description  Better Hex adds useful functions to the legacy hacker experience
// @author       Logfro
// @match        https://legacy.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
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
