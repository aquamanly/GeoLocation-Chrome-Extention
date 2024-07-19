
const geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "region_id": "A1",
          "name": "A1"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-97.2445999, 33.5068174],
              [-97.2363601, 33.226968],
              [-97.0949112, 33.1430679],
              [-97.0015274, 33.1442177],
              [-97.0289827, 33.1896136],
              [-97.0399795, 33.2396036],
              [-97.0440994, 33.5056723],
              [-97.2445999, 33.5068174]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "region_id": "D1",
          "name": "D1"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
                [-97.2445999, 33.5068174],
                [-97.6812714, 33.4894748],
                [-97.6359528, 33.1049486],
                [-97.5535553, 33.0773355],
                [-97.4958771, 33.0589219],
                [-97.443692, 33.0370508],
                [-97.3310822, 33.0370508],
                [-97.3063629, 33.0243861],
                [-97.2775416, 33.0248717],
                [-97.2940407, 32.997721],
                [-97.2528906, 32.9871741],
                [-97.2364335, 32.9879468],
                [-97.2240921, 33.0117542],
                [-97.2722023, 33.0271207],
                [-97.2459381, 33.0600729],
                [-97.207486, 33.1302531],
                [-97.1704071, 33.1865867],
                [-97.2363601, 33.226968],
                [-97.2445999, 33.5068174],
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "region_id": "K",
          "name": "K"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
                [-97.2364335, 32.9879468],
                [-97.2528906, 32.9871741],
                [-97.2940407, 32.997721],
                [-97.2775416, 33.0248717],
                [-97.3063629, 33.0243861],
                [-97.3310822, 33.0370508],
                [-97.443692, 33.0370508],
                [-97.4875255, 33.0553913],
                [-97.5094982, 33.0617217],
                [-97.6359528, 33.1049486],
                [-97.5287117, 32.9821497],
                [-97.510859, 32.9677488],
                [-97.5033059, 32.9060868],
                [-97.3858895, 32.9447026],
                [-97.3529305, 32.9470075],
                [-97.3488106, 32.9251087],
                [-97.3337044, 32.9239559],
                [-97.3343911, 32.9170393],
                [-97.3103585, 32.9147336],
                [-97.2890725, 32.9147336],
                [-97.291819, 32.9331773],
                [-97.2767128, 32.930872],
                [-97.2677865, 32.9349062],
                [-97.2561135, 32.9337536],
                [-97.2547402, 32.9550742],
                [-97.2364335, 32.9879468]
            ]
          ]
        }
      }
    ]
  };
  

// popup.js
function getFormValues(vars) {
    const htmlString = vars;

    function parseAddressString(htmlString) {
      // Remove leading/trailing whitespace and split into lines
      const lines = htmlString.trim().split('\n');
    
      // Extract address components (assuming address is in the second line)
      const addressLine = lines[1].replace(/<br>/, ','); // Replace <br> with comma
      const addressRegex = /(.+), ([^,]+), ([A-Z]{2}) ([0-9]+)/; // Adjusted regex for zip code
    
      const match = addressLine.match(addressRegex);
    
      if (!match) {
        throw new Error('Address format is incorrect');
      }
    
      const [, address, city, state, zip] = match;
    
      // Create the resulting object
      return {
        address,
        city,
        state,
        zip
      };
    }
    
    try {
      const result = parseAddressString(htmlString);
        // Regular expression to match and remove the label tag
    const labelRegex = /<label[^>]*>[^<]*<\/label>/g;
    
    const cleanString = result.address.replace(labelRegex, '');
    
    result.address = cleanString.trim(); // Output: "        724 Basteen Ln"
    //console.log(result);
    return result.address + ", " + result.city + ", " + result.state + ", " + result.zip

    // Output: { address: "724 Basteen Ln", city: "Justin", state: "TX", zip: "76247" }
    } catch (error) {
      console.error("Error parsing address:", error.message);
    }
    
 }
  
function gimmeTheRoute(zone) {
    //alert("gimmeTheRoute")
    // Define the point to check
    const point = turf.point(zone);
  
    // Function to check if the point is in any region
    function isPointInRegion(point, geojson) {
      for (const feature of geojson.features) {
        if (turf.booleanPointInPolygon(point, feature.geometry)) {
          return feature.properties.region_id;
        }
      }
      return null; // Point is not in any region
    }
  
    const regionId = isPointInRegion(point, geojson);
  
    if (regionId) {
      //console.log(`Point is in region: ${regionId}`);
      //document.getElementById('root').innerHTML = regionId;
      alert("the route is: "+ regionId)
    } else {
      alert("That location don't exist you lint licker!");
      //console.log("Point is not in any region.");
    }
  }
// Function to fetch address location (use your actual function)
function getAddressLocation(address) {
    //alert("we're in address mode, and the address is")
  var newAddy = getFormValues(address)
    //alert(newAddy)
    const url = "https://geocode.maps.co/search?q=" + newAddy + "&api_key=669839f95da0a114272175ghb5341c3";
    //alert(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {

        //alert(data)
        if (data && data[0]) {
         //alert('Location:', data[0].lon);
         gimmeTheRoute([parseFloat(data[0].lon), parseFloat(data[0].lat)]);
      } else {
          alert("No data found for the given address.");
        }
      })
      .catch(error => alert("Error fetching the address location:", error));
  }
  
  // Event listener for the button in the popup
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('call-apis').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_DIV_TEXT' }, function(response) {
          //alert(document.querySelector("#DetailsInfoCard > section > div.read-only > div > div.col-md-7 > div > div").innerHTML)
          //alert(response.text)
            if (response && response.text) {
            const divText = response.text;
            //alert("The Deep")
           // alert(divText)
           // alert("noire")
            getAddressLocation(divText);
          } else {
            alert('No response from content script.');
          }
        });
      });
    });
  });
  