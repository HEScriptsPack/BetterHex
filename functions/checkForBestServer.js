function checkForBestServer(index, item){
			// console.log("DEBUG: Index = "+index);
			// console.log("DEBUG: Item = "+item);
			$(item).children("small").each(function(childIndex, childItem){
				switch(childIndex){
					case 0:
						if(childItem.innerHTML != "4 GHz"){
							broke = true;
							var x = upgradableServers.length;
							upgradableServers[x] = index;
							return false;
						}
						break;
					case 1:
						if(childItem.innerHTML != "10 GB"){
							if(broke == true){ break;}
							var x = upgradableServers.length;
							upgradableServers[x] = index;
							return false;
						}
						break;
					case 2:
						broke = false;
						break;
				}
			});
	}