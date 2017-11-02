//Thanks to the Hex-Enhanced-Plus guys for this function
	function gritterNotify(opts) {
        if (!gritterLoaded) {
            $('<link rel="stylesheet" type="text/css" href="css/jquery.gritter.css">').appendTo("head");
            $.getScript("js/jquery.gritter.min.js", function() {
                $.gritter.add({
                    title: opts.title,
                    text: opts.text,
                    image: opts.img,
                    sticky: opts.sticky
                });
            });
            gritterLoaded = true;
            return;
        }
        $.gritter.add({
            title: opts.title,
            text: opts.text,
            image: opts.img,
            sticky: opts.sticky
        });
    }