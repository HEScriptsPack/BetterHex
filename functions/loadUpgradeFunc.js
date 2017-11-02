function loadUpgradeFunc(){
		var upgradableServers = [];
		var servers = $(".list-user").each(function(index, item){ checkForBestServer(index, item); });
		
	}