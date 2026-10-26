import { useEffect, useState } from 'react';
const Btn = ({ to, href, children, alt }) => { const c = `inline-block px-7 py-3 rounded-full font-semibold transition ${alt ? 'border-2 border-white text-white hover:bg-white hover:text-brand' : 'bg-gold text-brand hover:brightness-110 shadow-lg'}`; return href ? <a href={href} target="_blank" rel="noopener" className={c}>{children}</a> : <Link to={to} className={c}>{children}</Link> };
const wa = (t = 'Hello Dove Global Tours, I would like to plan a trip.') => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
import { WA, EMAIL, PHONE, NAME, services, places, cats, gallery } from '../data';
import { Link } from 'react-router-dom';
// Swap these for your own images. Each one gets a different drift direction.


const SLIDES = [
  { src: '/images/Enchanting-Travels-Tanzania.webp', alt: 'Safari landscape at sunset' },
  { src: '/images/governors-camp-g3.webp', alt: 'Beach on the Kenyan coast at golden hour' },
  { src: '/images/mombasabeach.jfif', alt: 'Elephants walking below Mount Kilimanjaro' },
];

const INTERVAL = 7000; // time each image stays (ms)
const SCRIPT = { fontFamily: "'Dancing Script', cursive" };
const SERIF = { fontFamily: "'Playfair Display', serif" };

const Hero = ({ eyebrow, title, sub, crumbs, slides = SLIDES, tall }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, slides.length]);

  // Reveal the headline word by word
  const words = typeof title === 'string' ? title.split(' ') : null;

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden text-center text-white ${
        tall ? 'min-h-[88vh]' : 'min-h-[50vh]'
      }`}
    >
      <style>{`
        @keyframes hero-drift-0 { from { transform: scale(1.04) translate3d(0,0,0); }      to { transform: scale(1.24) translate3d(-4%,-3%,0); } }
        @keyframes hero-drift-1 { from { transform: scale(1.24) translate3d(-4%,3%,0); }    to { transform: scale(1.06) translate3d(3%,-2%,0); } }
        @keyframes hero-drift-2 { from { transform: scale(1.08) translate3d(3%,1%,0); }     to { transform: scale(1.26) translate3d(-3%,-4%,0); } }
        @keyframes hero-rise    { from { opacity: 0; transform: translate3d(0,30px,0); }   to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes hero-fade    { from { opacity: 0; transform: translate3d(0,-10px,0); }  to { opacity: 1; transform: translate3d(0,0,0); } }
        @keyframes hero-fill    { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .hero-drift { animation-duration: 14s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; will-change: transform; }
        .hero-rise  { opacity: 0; animation: hero-rise 1s cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-fade  { opacity: 0; animation: hero-fade 1s ease-out forwards; }
        .hero-fill  { transform-origin: left; animation: hero-fill ${INTERVAL}ms linear forwards; }

        @media (prefers-reduced-motion: reduce) {
          .hero-drift, .hero-rise, .hero-fade, .hero-fill { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Moving images */}
      <div className="absolute inset-0 bg-stone-900" aria-hidden="true">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            className="hero-drift absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0, animationName: `hero-drift-${i % 3}` }}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{slides[active].alt}</p>

      {/* Overlay: darker at the top and centre for legibility, lets the warm sky glow at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/30" />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 py-20">
        {eyebrow && (
          <p
            className="hero-fade text-2xl text-[#f2b65d] md:text-3xl"
            style={{ ...SCRIPT, animationDelay: '100ms' }}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className="mt-2 text-5xl font-bold leading-[1.1] md:text-7xl"
          style={SERIF}
        >
          {words ? (
            words.map((w, i) => (
              <span
                key={i}
                className="hero-rise inline-block"
                style={{ animationDelay: `${250 + i * 110}ms`, marginRight: '0.28em' }}
              >
                {w}
              </span>
            ))
          ) : (
            title
          )}
        </h1>

        {sub && (
          <p
            className="hero-rise mt-5 max-w-2xl text-base text-white/90 md:text-lg"
            style={{ animationDelay: `${450 + (words?.length || 0) * 110}ms` }}
          >
            {sub}
          </p>
        )}

        {/* Action buttons (home / landing hero) */}
        {tall && (
          <div
            className="hero-rise mt-9 flex flex-wrap justify-center gap-4"
            style={{ animationDelay: `${650 + (words?.length || 0) * 110}ms` }}
          >
            <Btn to="/contact">Book Your Stay</Btn>
            <Btn href={wa()} alt>Chat on WhatsApp</Btn>
          </div>
        )}

        {/* Breadcrumb pill (inner pages) */}
        {!tall && crumbs?.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="hero-rise mt-8 inline-flex items-center gap-3 rounded-full bg-white/15 px-6 py-3 text-sm backdrop-blur-sm"
            style={{ animationDelay: `${650 + (words?.length || 0) * 110}ms` }}
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-white/70">›</span>}
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-[#f2b65d]">{c.label}</Link>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      {/* Slide progress bars */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 px-5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}: ${s.alt}`}
              aria-current={i === active}
              className="h-6 w-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:w-16"
            >
              <span className="block h-0.5 w-full overflow-hidden bg-white/35">
                {i === active && <span key={active} className="hero-fill block h-full bg-white" />}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;

/* Landing page (with action buttons)
<Hero
  tall
  eyebrow="Karibu Kenya"
  title="Seamless journeys, unforgettable memories."
  sub="Handcrafted safaris, beach holidays and travel services across Kenya and beyond."
/>

Inner page (breadcrumb pill, like the Gallery screenshot)
<Hero
  eyebrow="Moments Captured"
  title="Our Gallery"
  sub="Wildlife, wide landscapes, golden sunsets and happy travellers. A glimpse of the memories waiting for you."
  crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
/>
*/