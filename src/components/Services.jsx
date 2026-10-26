// npm i lucide-react   (skip if it's already in your project)
import { Binoculars, Waves, Plane, BedDouble, Users, Mountain } from 'lucide-react';

/* ---------- 1) In ../data.js: replace the emoji with an icon key ---------- */
export const services = [
  ['Wildlife Safaris & Game Drives', 'Maasai Mara, Amboseli, Tsavo and Nakuru with expert guides.', 'wildlife'],
  ['Beach Holidays & Getaways', 'Diani, Mombasa, Watamu and Zanzibar escapes.', 'beach'],
  ['Air Ticketing & Travel Help', 'Local and international flights, visas and travel advice.', 'flights'],
  ['Hotel Reservations', 'Lodges, camps and resorts to suit every budget.', 'hotels'],
  ['Corporate Tours & Team Building', 'Retreats and incentive trips for teams of any size.', 'corporate'],
  ['Adventure & Cultural Tours', 'Hiking, Maasai culture, Lamu and the Kenyan coast.', 'adventure'],
];

/* ---------- 2) In the page: map each key to an icon ---------- */
const ICONS = {
  wildlife: Binoculars,
  beach: Waves,
  flights: Plane,
  hotels: BedDouble,
  corporate: Users,
  adventure: Mountain,
};

export const ServicesSection = ({Head}) => (
  <section className="max-w-7xl mx-auto px-5 py-20">
    <Head
      tag="What we do"
      title="Our Services"
      sub="Everything you need for a smooth, memorable trip, handled by one friendly team."
    />

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map(([title, desc, icon]) => {
        const Icon = ICONS[icon];
        return (
          <div
            key={title}
            className="group p-7 rounded-2xl bg-white shadow-md border border-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-gold">
              {Icon && <Icon size={24} strokeWidth={1.75} aria-hidden="true" />}
            </div>
            <h3 className="mt-5 text-xl font-bold text-brand">{title}</h3>
            <p className="mt-2 text-gray-600">{desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);