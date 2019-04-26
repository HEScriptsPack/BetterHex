// ==UserScript==
// @name         Better Tutorial by Logfro
// @namespace    https://logfro.de/
// @version      0.01
// @description  Skips Tutorial and/or does it for you
// @author       Logfro
// @match        https://legacy.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterTutorial.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterTutorial.user.js
// @grant        none
// ==/UserScript==
(function () {
    setTimeout(function () {
        const URL = window.location.href;
        if (URL.indexOf("https://legacy.hackerexperience.com/software?action=install&id=") > -1) return false;
        if (URL.indexOf("https://legacy.hackerexperience.com/internet?action=hack&method=bf") > -1) return false;
        if (URL.indexOf("https://legacy.hackerexperience.com/processes?pid=") > -1) return false;
        if (URL.indexOf("https://legacy.hackerexperience.com/internet?view=software&cmd=up&id=") > -1) return false;
        if (URL.indexOf("https://legacy.hackerexperience.com/internet?view=software&cmd=install&id=") > -1) return false;
        var times = localStorage.getItem("times");
        var step = localStorage.getItem("step");
        var pressed = localStorage.getItem("pressed");
        if (times == null) {
            localStorage.setItem("times", "0");
            localStorage.setItem("step", "0");
            times = 0;
        }
        if (times == 3) {
            localStorage.setItem("step", ++step);
            hackTutorial();
        } else {
            switch (URL) {
                case "https://legacy.hackerexperience.com/welcome.php":
                    window.location = "https://legacy.hackerexperience.com/university?opt=certification";
                    break;
                case "https://legacy.hackerexperience.com/university?opt=certification":
                    if (document.getElementById("learn") != null) {
                        document.getElementById("learn").click();
                    }
                    $(".buycert")[times].click();
                    localStorage.setItem("times", ++times);
                    if (times == 3) {
                        window.location = window.location.href;
                    }
                    break;
                default:
                    break;

            }
            if (URL.indexOf("https://legacy.hackerexperience.com/university?opt=certification&learn=") > -1) {
                skipBtn();
            }
        }

        function skipBtn() {
            $(".btn-success")[0].click();
        }

        function hackTutorial() {
            switch (step) {
                case 1:
                    window.location = "https://legacy.hackerexperience.com/software";
                    break;
                case 2:
                    $(".tip-top")[2].click();
                    break;
                case 3:
                    window.location = $("td")[1].children[0].href;
                    break;
                case 4:
                    window.location = "https://legacy.hackerexperience.com/missions";
                    break;
                case 5:
                    $(".black")[0].click();
                    break;
                case 6:
                    window.location = "https://legacy.hackerexperience.com/internet?action=hack&method=bf";
                    break;
                case 7:
                    $("#loginform").submit();
                    break;
                case 8:
                    clearLogs();
                    break;
                case 9:
                    window.location = "https://legacy.hackerexperience.com/internet?view=software";
                    break;
                case 10:
                    window.location = "https://legacy.hackerexperience.com/internet?view=logs";
                    break;
                case 11:
                    window.location = "https://legacy.hackerexperience.com/internet?view=logout";
                    break;
                case 12:
                    window.location = "https://legacy.hackerexperience.com/missions";
                    break;
                case 13:
                    $(".black")[0].click();
                    break;
                case 14:
                    window.location = "https://legacy.hackerexperience.com/internet?action=hack&method=bf";
                    break;
                case 15:
                    $("#loginform").submit();
                    break;
                case 16:
                    clearLogs();
                    break;
                case 17:
                    window.location = "https://legacy.hackerexperience.com/software";
                    break;
                case 18:
                    window.location = "https://legacy.hackerexperience.com/internet?view=software&cmd=up&id=" + $("tr")[2].id;
                    break;
                case 19:
                    $(".tip-top")[3].click();
                    break;
                case 20:
                    window.location = "https://legacy.hackerexperience.com/missions";
                    break;
                case 21:
                    $(".mission-complete")[0].click();
                    setTimeout(function () {
                        $("#modal-submit").click();
                    }, 1500);
                    break;
                case 22:
                    reset();
                    break;
            }
        }

        function clearLogs() {
            var elm = document.getElementsByName("log")[0];
            var x = elm.value;
            var ownIP = document.getElementsByClassName("header-ip-show")[0].innerHTML;
            var button = $("input.btn-inverse").get(1);
            if (x.search(ownIP) == -1) {
                alert("Your IP (" + ownIP + ") isnt present in this log!");
                return false;
            }
            x = x.replaceAll(ownIP, "");
            elm.value = x;
            button.click();
        }

        function getIP() {
            var log = document.getElementsByName("log")[0];
            var logCopy = log.value;
            var ips = [];
            while (logCopy.indexOf("[") > 0) {
                var indexStart = logCopy.indexOf("[");
                var stopIndex = logCopy.indexOf("]");
                var s = logCopy.substring(indexStart + 1, stopIndex);
                var l = ips.length;
                if (ips.indexOf(s) == -1) {
                    ips[l] = s;
                }
                logCopy = logCopy.substring(stopIndex + 1);
            }
            console.log("done");
            console.log(ips);
            return ips[0];
        }

        function reset(){
            localStorage.removeItem("times");
            localStorage.removeItem("step");
        }
    }, 2000);
})();