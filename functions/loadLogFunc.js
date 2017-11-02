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