export const WA='254719200522',EMAIL='doveglobal@gmail.com',PHONE='0719 200 522',NAME='Dove Global Tours & Travel Agencies Ltd';
export const services=[
['Wildlife Safaris & Game Drives','Maasai Mara, Amboseli, Tsavo and Nakuru with expert guides.','🦁'],
['Beach Holidays & Getaways','Diani, Mombasa, Watamu and Zanzibar escapes.','🏖️'],
['Air Ticketing & Travel Help','Local and international flights, visas and travel advice.','✈️'],
['Hotel Reservations','Lodges, camps and resorts to suit every budget.','🏨'],
['Corporate Tours & Team Building','Retreats and incentive trips for teams of any size.','🤝'],
['Adventure & Cultural Tours','Hiking, Maasai culture, Lamu and the Kenyan coast.','⛰️']];
export const places=[
['Maasai Mara','Home of the Great Migration and Big Cats.','hero.jpg'],['Amboseli','Elephants beneath Mount Kilimanjaro.','amboseli.jpg'],
['Diani Beach','White sand and turquoise Indian Ocean.','diani.jpg'],['Lake Nakuru','Flamingos, rhinos and rich birdlife.','nakuru.jpg'],
['Tsavo','Vast wilderness and red elephants.','tsavo.jpg'],['Lamu Island','Swahili heritage and slow island life.','lamu.jpg']];
export const cats=['Big Cats','Wildlife','Migration','Landscapes & Sunsets','Our Travellers'];
// Drop ANY images (jpg, jpeg, png, webp, jfif, avif) into src/assets/gallery/ - they load automatically.
// To choose a category, start the file name with: bigcats-, wildlife-, migration-, landscape-, travellers-
// e.g. bigcats-lion-01.jpg. Files without a prefix are spread across categories.
const files=import.meta.glob('../public/images/gallery/*.{jpg,jpeg,png,webp,jfif,avif,JPG,JPEG,PNG,WEBP,JFIF}',{eager:true,query:'?url',import:'default'});
const prefix={bigcats:cats[0],wildlife:cats[1],migration:cats[2],landscape:cats[3],travellers:cats[4]};
export const gallery=Object.entries(files).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([path,src],i)=>{
  const name=path.split('/').pop().replace(/\.[^.]+$/,'');
  const key=name.toLowerCase().split(/[-_ ]/)[0];
  const cat=prefix[key]||cats[i%cats.length];
  const text=name.replace(/^(bigcats|wildlife|migration|landscape|travellers)[-_ ]?/i,'').replace(/[-_]+/g,' ').replace(/\d+/g,'').trim();
  return {src,cat,alt:`${text?text+' - ':''}${cat} | Dove Global Tours`};
});
