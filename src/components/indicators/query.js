export const queries = 
{   // 11.1
 "1":[['node["landuse"="residential"]', 'way["residential"="*"]'],['way["residential"~"irregular_settlement|slum|informal_settlement"]']],
 "2":[['node["public_transport"="platform"]'], ['node["public_transport"="platform"]["wheelchair"="yes"]']],
 "3":[['way["landuse"~"grass|recreation_ground|village_green|meadow|forest"]']],
 "4":[['nwr["tourism"="museum"]'], ['nwr["building"]["heritage"~"1|2|3|4|5"]']], // area["name"="Paris"]->.searchArea;
 "5":[['nwr["emergency"="assembly_point"]'], ['nwr["amenity"="fire_station"]'], ['nwr["amenity"="shelter"]']],
 "6":[['nwr["amenity"="recycling"]["recycling_type"="centre"]'], ['nwr["man_made"="wastewater_plant"]']],
 "7":[['nwr["leisure"="park"]'], ['nwr["leisure"="playground"]']],
}

export const labels = 
{ "1": ["Residential building", "Slums"],
  "2": ["platform", "Platform with wheelchair access"],
  "3": ["Rural/Undeveloped land in the city"],
  "4": ["Museums", "Heritage buildings"],
  "5": ["Disaster Assembly Points", "FireStations", "Shelter"],
  "6": ["Recycling facilities", "Sewage treatment plants"],
  "7": ["Park", "Playground"],
}

export const graphtitle = 
{ "1": ["Housing per 100000 in"],
  "2": ["Public Transport per 100000 in"],
  "3": ["Rural/Undeveloped land per 100000 in "],
  "4": ["Cultural and heritage sites per 100000 in "],
  "5": ["Disaster Related Facilities per 100000 in "],
  "6": ["Waste Related Facilities per 100000 in "],
  "7": ["Leisure Related Facilities per 100000 in "],
}