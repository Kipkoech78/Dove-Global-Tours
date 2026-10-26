export const WA='254719200522',EMAIL='doveglobal@gmail.com',PHONE='0719 200 522',NAME='Dove Global Tours & Travel Agencies Ltd';
export const services=[
['Wildlife Safaris & Game Drives','Maasai Mara, Amboseli, Tsavo and Nakuru with expert guides.','🦁'],
['Beach Holidays & Getaways','Diani, Mombasa, Watamu and Zanzibar escapes.','🏖️'],
['Air Ticketing & Travel Help','Local and international flights, visas and travel advice.','✈️'],
['Hotel Reservations','Lodges, camps and resorts to suit every budget.','🏨'],
['Corporate Tours & Team Building','Retreats and incentive trips for teams of any size.','🤝'],
['Adventure & Cultural Tours','Hiking, Maasai culture, Lamu and the Kenyan coast.','⛰️']];

export const places = [
  ['Maasai Mara', 'Home of the Great Migration.', '/places/masai-mara.jpg'],
  ['Amboseli', 'Elephants beneath Mount Kilimanjaro.', '/places/kamboseli.jpeg'],
  ['Diani Beach', 'White sand and warm Indian Ocean water.', '/places/diani-beach.webp'],
  ['Nairobi National Park', 'Wild rhinos and lions with the city skyline behind them.', '/places/nairobi-park.jfif'],
  ['Lamu Island', 'A car-free UNESCO World Heritage town of dhows and Swahili stone houses.', '/places/Lamu-Island.jpg'],
  ['Tsavo National Park', "Kenya's largest park, known for its red elephants and vast open plains.", '/places/tsavo.jpg'],
  ['Lake Nakuru', 'Rhinos, buffalo and birdlife around a soda lake in the Rift Valley.', '/places/LakeNakuru.jfif'],
  ['Lake Turkana', 'The remote Jade Sea, where desert meets a vast turquoise lake.', '/places/LTurkana.jfif'],
];

export const cats=['Big Cats','Wildlife','Migration','Landscapes & Sunsets','Our Travellers'];

const files=import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp,jfif,avif,JPG,JPEG,PNG,WEBP,JFIF}',{eager:true,query:'?url',import:'default'});
const prefix={bigcats:cats[0],wildlife:cats[1],migration:cats[2],landscape:cats[3],travellers:cats[4]};
export const gallery=Object.entries(files).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([path,src],i)=>{
  const name=path.split('/').pop().replace(/\.[^.]+$/,'');
  const key=name.toLowerCase().split(/[-_ ]/)[0];
  const cat=prefix[key]||cats[i%cats.length];
  const text=name.replace(/^(bigcats|wildlife|migration|landscape|travellers)[-_ ]?/i,'').replace(/[-_]+/g,' ').replace(/\d+/g,'').trim();
  return {src,cat,alt:`${text?text+' - ':''}${cat} | Dove Global Tours`};
});
