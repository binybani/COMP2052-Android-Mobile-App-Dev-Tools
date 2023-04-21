// Define the campus class
class Campus {
  // constructor function
  constructor(name, address, description, link) {
    this.name = name;
    this.address = address;
    this.description = description;
    this.link = link;
  }
  // describe campus object
  describeSelf() {
    // make the first letter in uppercase
    let returnString = `<h3 class="bold">${this.name} Campus</h3>`;
    returnString += `<p class="bold"> Address: ${this.address}</p>`;
    returnString += `<p> Short Description: ${this.description}</p>`;
    returnString += `<a href="${this.link}" alt="${this.name} Campus link">${this.name} Campus link</a>`;
    return returnString;
  }
}

const downtown = new Campus(
  "Downtown",
  "555 Seymour St, Vancouver, BC V6B 3H6",
  "BCIT Downtown is one of the world’s top ‘smart’ buildings, using state-of-the-art telecommunication and information technology to ensure quality, flexible spaces.",
  "https://www.bcit.ca/sustainability/operations/buildings/downtown-campus/"
);

const burnaby = new Campus(
  "Burnaby",
  "265 W Esplanade, North Vancouver, BC V7M 1A5",
  "The largest BCIT campus is home to hundreds of specialized learning spaces, including classrooms, shops, labs, simulators, broadcast studios, green roofs, energy grids, forests, and waterways.",
  "https://www.bcit.ca/about/visit/campuses-directions/burnaby/"
);

const marine = new Campus(
  "Marine",
  "3700 Willingdon Avenue Burnaby, BC V5G 3H2",
  " We offer programs in navigation, marine engineering, seamanship, and maritime safety and security.",
  "https://www.bcit.ca/about/visit/campuses-directions/burnaby/"
);

const aerospaceTechnology = new Campus(
  "Aerospace Technology",
  "3800 Cessna Dr, Richmond, BC V7B 0A1",
  "The campus is centred on a 40,000-square-foot hangar housing BCIT’s fleet of light piston, turboprop, corporate, and jet transport aircraft, including light and medium helicopters.",
  "https://www.bcit.ca/about/visit/campuses-directions/aerospace/"
);

const annacisIsland = new Campus(
  "Annacis Island",
  "1608 Cliveden Ave, Delta, BC V3M 6P1",
  "The 142,000-square-foot facility is home to our motive power programs. These programs train heavy-duty mechanics, transport trailer mechanics, diesel mechanics, commercial transportation mechanics, railway conductors and forklift operators.",
  "https://www.bcit.ca/about/visit/campuses-directions/annacis-island/"
);
