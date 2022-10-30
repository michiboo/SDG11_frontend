const queryOverpass = require('@derhuerst/query-overpass')
const apiRoot = ['https://lz4.overpass-api.de/api/interpreter', "https://overpass-api.de/api/interpreter", "https://z.overpass-api.de/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}
export function fetchCityAreaCode(city, country, setFuc) {
	city = city[0].toUpperCase() + city.substring(1);
	country = country[0].toUpperCase() + country.substring(1);
	fetch(`https://nominatim.openstreetmap.org/search?q=${city}%2C+${country}&format=json`).then((response) => response.json())
		.then((data) => {
			for (var i = 0; i < data.length; i++) {
				{

					if (data[i].osm_type != undefined && data[i].osm_id != undefined) {
						if (data[i].osm_type == "way") {
							setFuc(data[i].osm_id + 2400000000);
							return
						} else if (data[i].osm_type == "relation") {
							setFuc(data[i].osm_id + 3600000000);
							return;
						}

					}
				}
			}
		});

}

export function fetchAmenityV2(areaID, key, setFunc, dicName, loadingFuc, goalkey) {
	console.log(`fetching ${dicName} for ${areaID}`)
	if (loadingFuc != undefined) {
		{
			loadingFuc(
				(currentData) => {
					const newCardsArray = [...currentData]
					newCardsArray[parseInt(goalkey)] = true
					console.log(`set loading to true for ${goalkey}`)
					return newCardsArray
				}
			)
		}
	}
	// search by name var apirul = `https://overpass-api.de/api/interpreter?data=area["name"="${cityName}"]->.searchArea;(${key[0]}(area.searchArea);); out count;`
	if (key.length == 1)
		var apirul = `${apiRoot[0]}?data=area(${areaID})->.searchArea;(${key[0]}(area.searchArea);); out count;`
	else
		var apirul = `${apiRoot[1]}?data=area(${areaID})->.searchArea;(${key[0]};${key[1]}(area.searchArea);); out count;`
	fetch(apirul)
		.then(response => response.text())
		.then(str => {
			
			var xmlres = new window.DOMParser().parseFromString(str, "text/xml");
			
			console.log(xmlres.getElementsByTagName("count")[0].getElementsByTagName("tag")[4].getAttribute("v"))
			setFunc((currentData) => {
				try{
				currentData[goalkey][dicName] = xmlres.getElementsByTagName("count")[0].getElementsByTagName("tag")[4].getAttribute("v");
				}catch{}
				return currentData;
			});
			console.log(`finished fetching ${dicName} for ${areaID}, result ${xmlres.getElementsByTagName("count")[0].getElementsByTagName("tag")[4].getAttribute("v")}`)
			if (loadingFuc != undefined) {
				loadingFuc(
					(currentData) => {
						const newCardsArray = [...currentData]
						newCardsArray[parseInt(goalkey)] = false
						console.log(`set loading to false for ${goalkey}`)
						return newCardsArray
					}
				)
			}
		}
		)
}

export function fetchCentrality(lng, lat, setImage, setCentrality, setloading, loadingIndex) {
	setloading(
		(currentData) => {
			const newCardsArray = [...currentData]
			newCardsArray[loadingIndex] = true
			return newCardsArray
		}
	)
	
	const rootapi = 'https://tracksdg11.com'
	const apiurl = `${rootapi}/networkcentrality/${lng}/${lat}`
	// const apiurl = 'http://192.168.0.100:5000/networkcentrality/'+lng+'/'+lat
	fetch(apiurl)
		.then((response) => response.json()).then((taskID) => {
			checkStatus(`${rootapi}/getcentrality/${taskID['id']}`).then((data) => {
				setImage("data:image/png;base64," + data['image'])
				setCentrality(data['stat'])
				setloading(
					(currentData) => {
						const newCardsArray = [...currentData]
						newCardsArray[loadingIndex] = false
						return newCardsArray
					}
				)
			});
		})
}

function checkStatus(url) {
	const intervalFunc = new Promise(function (resolve, reject) {
		
		const interval = setInterval(async function myfunc(){
		const response = await fetch(url);
		const text = await response.json();
		console.log(`checking status of ${url}, status is ${text['status']}`)
		if (text['status'] == undefined)
		{
			clearInterval(interval);
			resolve(text)
		} 
	  }, 60000)})
	  return intervalFunc
}

export function fetchWalkability(lng, lat, setImage, setloading, loadingIndex) {
	setloading(
		(currentData) => {
			const newCardsArray = [...currentData]
			newCardsArray[loadingIndex] = true
			return newCardsArray
		}
	)
	const rootapi = 'https://tracksdg11.com'
	const apiurl = `${rootapi}/walkability/${lng}/${lat}`
	fetch(apiurl)
		.then((response) => response.json()).then((taskID) => {
			checkStatus(`${rootapi}/getwalkabilityres/${taskID['id']}`).then((data) => {
				console.log(`task finished with result:`)
				console.log(data['image'])
				setImage("data:image/png;base64," + data['image'])
				setloading(
					(currentData) => {
						const newCardsArray = [...currentData]
						newCardsArray[loadingIndex] = false
						return newCardsArray
					}
				)
			})
		})
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function fetchTimeseries(areaID, key, setFunc, dicName, loadingFuc, goalkey, dateRange) {

	loadingFuc(
		(currentData) => {
			const newCardsArray = [...currentData]
			newCardsArray[parseInt(goalkey)] = true
			console.log(`set loading to true for ${goalkey} timeseries`)
			return newCardsArray
		}
	)
	for (var i = 0; i < dateRange.length; i++) {
		console.log(`fetching ${dicName} for ${areaID} and year ${dateRange[i]}`)
		const year = dateRange[i]
		if (key.length == 1)
			//getRandomInt(4)
			var apirul = `${apiRoot[3]}?data=[timeout:1200][maxsize:2000000000][date:"${dateRange[i]}-01-01T00:00:00Z"];area(${areaID})->.searchArea;(${key[0]}(area.searchArea);); out count;`
		else
			var apirul = `${apiRoot[1]}?data=[timeout:1200][maxsize:2000000000][date:"${dateRange[i]}-01-01T00:00:00Z"];area(${areaID})->.searchArea;(${key[0]};${key[1]}(area.searchArea);); out count;`

		fetch(apirul)
			.then(response => response.text())
			.then(str => {
				var xmlres = new window.DOMParser().parseFromString(str, "text/xml");
				setFunc(currentData => {
					console.log(`set ${dicName} for ${areaID} and year ${year}`)
					if (currentData[goalkey][dicName] == undefined) {
						currentData[goalkey][dicName] = {}
					}
					var ret = Object.assign({}, currentData[goalkey][dicName]);
					try {
						console.log(`finished ${goalkey} fetching ${dicName} for ${areaID} and year ${year}, result ${xmlres.getElementsByTagName("count")[0].getElementsByTagName("tag")[4].getAttribute("v")}`)
						ret[year] = xmlres.getElementsByTagName("count")[0].getElementsByTagName("tag")[4].getAttribute("v");
					} catch {
						console.log(`fetching failed ${dicName} for ${areaID} and year ${year}`)
						return currentData
					}
					currentData[goalkey][dicName] = ret
					const updatedDict = Object.assign({}, currentData);
					return updatedDict;
				});

			}
			).catch((error) => {


			})
			.then(() => {
				loadingFuc(
					(currentData) => {
						const newCardsArray = [...currentData]
						newCardsArray[parseInt(goalkey)] = false
						console.log(`set loading to false for ${goalkey} timeseries`)
						return newCardsArray
					}
				)
			})
	}

}