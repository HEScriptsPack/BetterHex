// ==UserScript==
// @name         Better HEx by Logfro
// @namespace    https://logfro.de/
// @version      0.61
// @description  Better HEx adds useful functions to the "legacy" hacker experience
// @author       Logfro
// @match        *://*.hackerexperience.com/*
// @updateURL    https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.meta.js
// @downloadURL  https://gitcdn.xyz/repo/Logfro/BetterHex/master/BetterHex.user.js
// @grant        none
// ==/UserScript==

// IPChecker from Jasper Include
// Credits: Thx to Jasper (Original Repo: https://github.com/jmerle/hacker-experience-ip-checker)
$.getScript("https://gitcdn.xyz/repo/jmerle/hacker-experience-ip-checker/master/he-ip-checker.user.js");
var lang;
if(window.location.href.indexOf("//br.") > -1) {
    lang="br";
}
if(window.location.href.indexOf("//legacy.") > -1) {
    lang="legacy";
}
if(window.location.href.indexOf("//en.") > -1) {
    lang="en";
}
var NO_NUMBER,NOT_NUMBER,NO_IP,NO_IP2,CLEAR_OWN_LOGS_BTN,TIMES,BUY_TIMES,DEL_ENTRIES,LOGGED_INTO,DDOS_BTN;
switch(lang){
        case "en":
        NO_NUMBER = "You need to type in a number!";
        NOT_NUMBER = " Not a number!";
        NO_IP = "Your IP (";
        NO_IP2 = ") isnt present in this log!";
        CLEAR_OWN_LOGS_BTN = "Clear own logs";
        TIMES = "How many times?";
        BUY_TIMES = "Buy x times";
        DEL_ENTRIES = "Remove your entries";
        LOGGED_INTO = "You logged in to the address";
        DDOS_BTN = "Launch DDoS!";
        break;
    case "br":
        NO_NUMBER = "Precisas de inserir um numero!";
        NOT_NUMBER = "Não é um numero!";
        NO_IP = "O teu IP (";
        NO_IP2 = ") não está presente neste log!";
        CLEAR_OWN_LOGS_BTN = "Limpar os teus Logs";
        TIMES = "Comprar quantas vezes?";
        BUY_TIMES = "Comprar x vezes";
        DEL_ENTRIES = "Apaga o teu log";
        LOGGED_INTO = "Você entrou no endereço";
        DDOS_BTN = "lanca ddos!";
        break;
    case "legacy":
        NO_NUMBER = "You need to type in a number!";
        NOT_NUMBER = " Not a number!";
        NO_IP = "Your IP (";
        NO_IP2 = ") isnt present in this log!";
        CLEAR_OWN_LOGS_BTN = "Clear own logs";
        TIMES = "How many times?";
        BUY_TIMES = "Buy x times";
        DEL_ENTRIES = "Remove your entries";
        LOGGED_INTO = "You logged in to the address";
        DDOS_BTN = "Launch DDoS!";
        break;
}
(function () {
    'use strict';

    function clearLogs() {
        var elm = document.getElementsByName("log")[0];
        var x = elm.value;
        var ownIP = document.getElementsByClassName("header-ip-show")[0].innerHTML;
        var button = $("input.btn-inverse").get(1);
        if (x.search(ownIP) === -1) {
            alert(NO_IP + ownIP + NO_IP2);
            return false;
        }
        x = x.replaceAll(ownIP, "");
        elm.value = x;
        button.click();
    }

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    $("#he2").remove();

    function submitBuyForm(times) {
        if (times.length < 1) {
            alert(NO_NUMBER);
            return false;
        }
        if (isNaN(times)) {
            alert(NOT_NUMBER);
            return false;
        }
        var x = 0;
        var val = setInterval(function () {
            if (x === times) {
                clearInterval(val);
            } else {
                x++;
                $("form")[1].submit();
            }
        }, 300);
    }

    function openPopUp(url, name) {
        var w = window.open(url, name, "width=600,height=400,status=yes,scrollbars=yes,resizable=yes");
        return w;
    }

    function clearOwnLogs() {
        $.post("https://"+lang+".hackerexperience.com/logEdit", {id: "1", log: ""}, function (result) {
            var w = openPopUp("https://"+lang+".hackerexperience.com/", "logEdit");
            w.document.open();
            w.document.write(result);
            w.document.close();
            var realConfirm = w.confirm;
            w.confirm = function () {
                w.confirm = realConfirm;
                return true;
            };
            var seconds;
            $(w.document).ready(function () {
                setTimeout(function () {
                    var a = w.$(".elapsed")[0].innerText;
                    a = a.replace("h", "");
                    a = a.replace("m", "");
                    a = a.replace("s", "");
                    a = a.split(':');
                    seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) * 1000 + 1000;
                    console.log(seconds);
                    setTimeout(function () {
                        w.close();
                    }, seconds);
                }, 500);
            });
        });
    }

    function addBarBtn(name, btnId, spanId) {
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

    function addNavButton(name, id) {
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

    function loadLogFunc() {
        addNavButton(DEL_ENTRIES, "LogfroLogClickID");
        $(document).ready(function () {
            $("#LogfroLogClickID").on("click", function () {
                clearLogs();
            });
        });
    }

    function loadClearOwnLogBtn() {
        $(document).ready(function () {
            addBarBtn(CLEAR_OWN_LOGS_BTN, "LogfroClearOwnLogsBtn", "LogfroClearOwnLogsBtnSpan");
            $("#LogfroClearOwnLogsBtn").on("click", function () {
                clearOwnLogs();
            });
        });
    }

    function loadHDDBuyBtn() {
        $(document).ready(function () {
            var btn = document.createElement("input");
            var input = document.createElement("input");
            input.type = "text";
            input.id = "LogfroHDDBuyBtnTimes";
            input.style = "margin: 10px;";
            input.placeholder = TIMES;
            btn.className = "btn btn-success";
            btn.id = "LogfroHDDBuyBtn";
            btn.value = BUY_TIMES;
            btn.type = "button";
            var temp = $("#buy .modal-footer form");
            temp[0].appendChild(btn);
            temp[0].appendChild(input);
            $("#LogfroHDDBuyBtn").on("click", function () {
                submitBuyForm($("#LogfroHDDBuyBtnTimes")[0].value);
            });
        });
    }

    function loadServerBuyBtn() {
        $(document).ready(function () {
            var btn = document.createElement("input");
            var input = document.createElement("input");
            input.type = "text";
            input.id = "LogfroServerBuyBtnTimes";
            input.style = "margin: 10px;";
            input.placeholder = TIMES;
            btn.className = "btn btn-success";
            btn.id = "LogfroServerBuyBtn";
            btn.value = BUY_TIMES;
            btn.type = "button";
            var temp = $("#buy .modal-footer form");
            temp[0].appendChild(btn);
            temp[0].appendChild(input);
            $("#LogfroServerBuyBtn").on("click", function () {
                submitBuyForm($("#LogfroServerBuyBtnTimes")[0].value);
            });
        });
    }

    function loadNoneVbrk(){
        if($("center:contains('DDoS Breaker')").length > 0){
            var form = $("form.ddos_form")[0];
            var btn = document.createElement("input");
            btn.type = "submit";
            btn.className = "btn btn-danger";
            btn.value = DDOS_BTN;
            btn.setAttribute("onClick","$(\"form.ddos_form\")[0].submit();");
            form.appendChild(btn);
        }
    }

    loadClearOwnLogBtn();
    $(document).ready(function () {
        switch (window.location.href) {
            case "https://"+lang+".hackerexperience.com/internet?view=logs":
                if (document.getElementsByName("log").length > 0) {
                    loadLogFunc();
                }
                break;
            case "https://"+lang+".hackerexperience.com/internet":
                if (document.getElementsByName("log").length > 0) {
                    loadLogFunc();
                }
                var temp = $(".alert-success");
                if (temp.length > 1 && $("#btc-login").length < 1 && temp[0].innerText.indexOf(LOGGED_INTO) > -1) {
                    clearOwnLogs();
                }
                break;
            case "https://"+lang+".hackerexperience.com/internet?ip=7.28.21.234":
                var temp = $(".alert-success");
                if (temp.length > 1 && $("#btc-login").length < 1 && temp[0].innerText.indexOf(LOGGED_INTO) > -1) {
                    clearOwnLogs();
                }
                break;
            case "https://"+lang+".hackerexperience.com/list?action=collect&show=last":
                clearOwnLogs();
                break;
            case "https://"+lang+".hackerexperience.com/list?action=ddos":
                loadNoneVbrk();
                break;
            default:
                break;

        }

        if (window.location.href.indexOf("https://"+lang+".hackerexperience.com/hardware?opt=xhd&acc=") > -1) {
            loadHDDBuyBtn();
        }

        if (window.location.href.indexOf("https://"+lang+".hackerexperience.com/hardware?opt=buy&acc=") > -1) {
            loadServerBuyBtn();
        }

        var realConfirm = window.confirm;
        window.confirm = function () {
            window.confirm = realConfirm;
            return true;
        };
    });
})();
