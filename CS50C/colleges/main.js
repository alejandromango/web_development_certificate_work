/* Students: Please use this week's project for Week 8: Assignment 8: Class Map.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */

    let coords = {"srjc":[38.46514459144138, -122.72045916604009 ],
                  "ucsc":[ 36.99133236549722, -122.05830652792436 ],
                  "cabrillo":[ 36.98776495719803, -121.92548299081886 ],
                  "coa":[ 37.782396846138994, -122.27827148990382 ],
                  "sjsu":[ 37.335196156818505, -121.8808848442377 ],
                  "mjc":[37.651256327406784, -121.00896955328815]
};

    let myzoom = 9;
    let mymap = L.map('map1').setView( coords.coa, myzoom );
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
    var mymarker;
    for (const [name, coord] of Object.entries(coords)) {
        console.log(`${name}: ${coord}`);
        mymarker = L.marker( coord );
        mymarker.addTo(mymap);
        mymarker.bindPopup(name).openPopup();
      }

    let myshape = L.polygon(
        [
          coords.srjc,
          [ coords.srjc[0], coords.mjc[1] ],
          [ coords.cabrillo[0],coords.mjc[1] ],
          [coords.cabrillo[0], coords.srjc[1]]
        ]
      );
    myshape.addTo(mymap);