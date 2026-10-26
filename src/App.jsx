import { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { WA, EMAIL, PHONE, NAME, services, places, cats, gallery } from './data';
import Hero from './components/Hero';
import { ServicesSection } from './components/Services';
import {  MessageCircleMore } from 'lucide-react';

const wa = (t = 'Hello Dove Global Tours, I would like to plan a trip.') => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const Img = ({ src, alt, className = '' }) => <img src={src} alt={alt} loading="lazy" className={`bg-gradient-to-br from-brand to-emerald-700 object-cover ${className}`} onError={e => { e.currentTarget.style.opacity = .35 }} />;
function Seo({ title, desc }) { useEffect(() => { document.title = `${title} | Dove Global Tours`; document.querySelector('meta[name=description]')?.setAttribute('content', desc); window.scrollTo(0, 0) }, [title, desc]); return null }
const Head = ({ tag, title, sub }) => <div className="text-center max-w-2xl mx-auto mb-12"><p className="text-gold font-semibold tracking-widest uppercase text-sm">{tag}</p><h2 className="text-3xl md:text-4xl font-bold text-brand mt-2">{title}</h2>{sub && <p className="mt-3 text-gray-600">{sub}</p>}</div>;
const Btn = ({ to, href, children, alt }) => { const c = `inline-block px-7 py-3 rounded-full font-semibold transition ${alt ? 'border-2 border-white text-white hover:bg-white hover:text-brand' : 'bg-gold text-brand hover:brightness-110 shadow-lg'}`; return href ? <a href={href} target="_blank" rel="noopener" className={c}>{children}</a> : <Link to={to} className={c}>{children}</Link> };

function Nav() {
    const [o, setO] = useState(false); const l = [['/', 'Home'], ['/about', 'About'], ['/destinations', 'Destinations'], ['/gallery', 'Gallery'], ['/contact', 'Contact']];
    return <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm"><div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold text-brand leading-none">DOVE GLOBAL<span className="block text-[10px] tracking-widest text-gold font-sans">TOURS & TRAVEL</span></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">{l.map(([t, n]) => <NavLink key={t} to={t} className={({ isActive }) => isActive ? 'text-gold' : 'hover:text-brand'}>{n}</NavLink>)}
            <Link to="/contact" className="bg-brand text-white px-5 py-2 rounded-full hover:bg-emerald-800">Book Your Stay</Link></nav>
        <button aria-label="Menu" className="md:hidden text-2xl" onClick={() => setO(!o)}>{o ? '✕' : '☰'}</button></div>
        {o && <nav className="md:hidden px-5 pb-4 flex flex-col gap-3 bg-white" onClick={() => setO(false)}>{l.map(([t, n]) => <Link key={t} to={t}>{n}</Link>)}<Link to="/contact" className="bg-brand text-white text-center py-2 rounded-full">Book Your Stay</Link></nav>}</header>
}

function Footer() {
    return <footer className="bg-brand text-white mt-20"><div className="max-w-7xl mx-auto px-5 py-14 grid gap-10 md:grid-cols-4">
        <div>
            <h3 className="text-xl font-bold">
                {NAME}
            </h3>
            <p className="mt-3 text-white/80 text-sm">
                Personalised tours and travel for individuals, families, groups, corporate clients and international visitors. Explore more. Travel better. Create memories.
            </p>
        </div>
        <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
                {['', 'about', 'destinations', 'gallery', 'contact'].map(p => <li key={p}><Link to={'/' + p} className="hover:text-gold capitalize">{p || 'home'}</Link></li>)}
            </ul>
        </div>
        <div>
            <h4 className="font-semibold mb-3">Our Services</h4>
            <ul className="space-y-2 text-sm text-white/80">{services.map(s => <li key={s[0]}>{s[0]}</li>)}
            </ul>
        </div>
        <div>
            <h4 className="font-semibold mb-3">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-white/80">
                <li>
                    <a href={wa()}>WhatsApp {PHONE}</a></li><li>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>Nairobi, Kenya</li>
            </ul>
        </div>
    </div>
        <p className="border-t border-white/20 text-center text-xs py-5 text-white/70">© {new Date().getFullYear()} {NAME}. All rights reserved. Your Journey, Our Passion.
        </p>
    </footer>
}


function Home() {
    return <><Seo title="Kenya Safaris, Beach Holidays & Air Tickets" desc="Personalised Kenya safaris, beach holidays, air ticketing and corporate tours from Dove Global Tours & Travel Agencies Ltd." />
        {/* <Hero tall title="Seamless journeys, unforgettable memories." sub="Handcrafted safaris, beach holidays and travel services across Kenya and beyond." /> */}
        <Hero tall eyebrow="Karibu Kenya"
            title="Seamless journeys, unforgettable memories."
            sub="Handcrafted safaris, beach holidays and travel services across Kenya and beyond." />

        <section className="bg-sand">
            <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+', 'Happy travellers'], ['6', 'Signature destinations'], ['24/7', 'WhatsApp support'], ['100%', 'Tailor-made trips']].map(([a, b]) => <div key={b}><p className="text-3xl font-display font-bold text-brand">{a}</p>
                <p className="text-sm text-gray-600">{b}</p></div>)}
                </div>
        </section>
        <ServicesSection Head={Head} />
        
        <section className="bg-sand py-20">
            <div className="max-w-7xl mx-auto px-5">
                <Head tag="Explore" title="Popular Destinations" />
                <Places limit={6} />
                <div className="text-center mt-10">
                    <Btn to="/destinations">View all destinations</Btn>
                </div>
            </div>
        </section>
        <section className="max-w-7xl mx-auto px-5 py-20"><Head tag="Why us" title="Why Travel With Dove Global" /><div className="grid md:grid-cols-3 gap-6">{[['Local experts', 'Guides who know every park, trail and hidden gem.'], ['Fair, clear pricing', 'Transparent quotes with no surprises.'], ['Personal service', 'One team from first enquiry to safe return.']].map(([t, d]) => <div key={t} className="text-center p-6"><div className="w-14 h-14 mx-auto rounded-full bg-gold/20 text-gold text-2xl grid place-items-center">★</div><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="text-gray-600 mt-2">{d}</p></div>)}</div></section>
        <CTA /></>
}

const Places = ({ limit }) => {
    const list = limit ? places.slice(0, limit) : places;
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map(([n, d, i]) =>
                <Link to="/contact" key={n} className="group relative rounded-2xl overflow-hidden h-72 shadow-lg">
                    <Img
                        src={'/images/' + i}
                        alt={`${n}, Kenya`}
                        onError={(e) => { e.currentTarget.src = '/images/places/placeholder.webp'; }}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-5 text-white">
                        <h3 className="text-2xl font-bold">{n}</h3>
                        <p className="text-sm text-white/85">{d}</p>
                    </div>
                </Link>)}
        </div>
    );
};
const CTA = () => <section className="relative text-white text-center py-20"><div className="absolute inset-0 bg-brand" /><div className="relative max-w-2xl mx-auto px-5"><h2 className="text-3xl md:text-4xl font-bold">Ready To Make Your Own Memories?</h2><p className="mt-3 text-white/85">Tell us your dates, group size and budget and we will plan your trip.</p><div className="mt-7 flex gap-4 justify-center flex-wrap"><Btn to="/contact">Book Your Stay</Btn><Btn href={wa()} alt>WhatsApp Us</Btn></div></div></section>;

const About = () => <>
<Seo title="About Us" desc="Learn about Dove Global Tours & Travel Agencies Ltd, a Kenyan travel company creating personalised safaris and holidays." />
<Hero title="About Dove Global Tours" 
sub="Your journey, our passion."
crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
 />
    <section className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center"><div><Head tag="Our story" title="Travel, Done Personally" /><p className="text-gray-700 leading-relaxed">{NAME} is a Kenyan travel company offering personalised tours and travel services for individuals, families, groups, corporate clients and international visitors. We combine local knowledge with attentive service so every trip feels effortless.</p><p className="mt-4 text-gray-700 leading-relaxed">Our mission is simple: explore more, travel better and create memories that last.</p></div><Img src="/images/about.jpg" alt="Dove Global Tours guide with guests on safari" className="rounded-2xl h-80 w-full shadow-xl" /></section><CTA /></>;
const Dest = () => <><Seo title="Destinations & Services" desc="Explore Maasai Mara, Amboseli, Diani, Lake Nakuru, Tsavo and Lamu with Dove Global Tours." />
<Hero eyebrow="Our Destinations" title="Destinations"
  sub="Wild plains, golden beaches and living culture."
  crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />
    <section className="max-w-7xl mx-auto px-5 py-20">
        <Places />
    </section>
    <CTA />
</>;

function Gallery() {
    const [c, setC] = useState('All Photos'); const [i, setI] = useState(null); const list = c === 'All Photos' ? gallery : gallery.filter(g => g.cat === c);
    useEffect(() => {
        const k = e => {
            if (i === null)
                return;
            if (e.key === 'Escape') setI(null);
            if (e.key === 'ArrowRight') setI((i + 1) % list.length);
            if (e.key === 'ArrowLeft') setI((i - 1 + list.length) % list.length)
        };
        window.addEventListener('keydown', k); return () => removeEventListener('keydown', k)
    });
    return <>
        <Seo title="Photo Gallery" desc="Safari wildlife, landscapes, sunsets and happy travellers from Dove Global Tours trips." />
        {/* <Hero title="Our Gallery" sub="Wildlife, wide landscapes, golden sunsets and happy travellers." /> */}
        <Hero eyebrow="Moments Captured" title="Our Gallery"
            sub="Wildlife, wide landscapes, golden sunsets and happy travellers. A glimpse of the memories waiting for you."
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />
        <section className="max-w-7xl mx-auto px-5 py-16">
            <Head tag="Photo Gallery" title="Memories From The Wild" sub="Tap any photo to view it full size, then use the arrows to keep exploring." />
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {['All Photos', ...cats].map(x => <button key={x} onClick={() => setC(x)} className={`px-4 py-2 rounded-full text-sm font-medium ${c === x ? 'bg-brand text-white' : 'bg-sand hover:bg-gold/30'}`}>{x} {x === 'All Photos' ? gallery.length : gallery.filter(g => g.cat === x).length}</button>)}</div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">{list.map((g, n) => <button key={g.src} onClick={() => setI(n)} className="block w-full overflow-hidden rounded-xl group"><Img src={g.src} alt={g.alt} className="w-full min-h-40 group-hover:scale-105 transition duration-500" /></button>)}</div></section>
        <section className="bg-sand py-16"><div className="max-w-7xl mx-auto px-5"><Head tag="Photo Tips" title="Make The Most Of Your Shots" /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[['Chase Golden Hour', 'Early morning and late afternoon give soft light and active wildlife.'], ['Be Ready', 'Keep your camera or phone charged and within reach.'], ['Be Patient', 'Great shots come after quietly waiting and watching.'], ['Respect Wildlife', 'Stay in the vehicle, keep distance and follow your guide.']].map(([t, d]) => <div key={t} className="bg-white p-6 rounded-2xl shadow"><h3 className="font-bold text-brand">{t}</h3><p className="text-sm text-gray-600 mt-2">{d}</p></div>)}</div></div></section><CTA />
        {i !== null && <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center" onClick={() => setI(null)}><button className="absolute left-4 text-white text-4xl" aria-label="Previous" onClick={e => { e.stopPropagation(); setI((i - 1 + list.length) % list.length) }}>‹</button><img src={list[i].src} alt={list[i].alt} className="max-h-[85vh] max-w-[90vw] rounded-lg" onClick={e => e.stopPropagation()} /><button className="absolute right-4 text-white text-4xl" aria-label="Next" onClick={e => { e.stopPropagation(); setI((i + 1) % list.length) }}>›</button><button className="absolute top-4 right-5 text-white text-3xl" aria-label="Close">✕</button></div>}</>
}

function Contact() {
    const f = useRef(); const [s, setS] = useState('');
    const send = e => { e.preventDefault(); setS('sending'); emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, f.current, { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }).then(() => { setS('ok'); f.current.reset() }).catch(() => setS('err')) };
    const I = 'w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold';
    return <>
        <Seo title="Contact & Book Your Stay" desc="Book your Kenya safari or holiday. WhatsApp 0719 200 522 or email doveglobal@gmail.com." />
        <Hero
            title="Book Your Stay"
            sub="Tell us your dates, group size and budget and we will plan your trip."
            crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        />
        <section id="book" className="max-w-6xl mx-auto px-5 py-20 grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-5">
                <h2 className="text-3xl font-bold text-brand">Get In Touch</h2>
                <a href={wa()} className="flex items-center gap-4 p-5 rounded-2xl bg-green-50 hover:shadow-lg">
                    <span className="text-3xl"> <MessageCircleMore /> </span>
                    <span><b>WhatsApp</b>
                        <br />{PHONE}</span></a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-5 rounded-2xl bg-sand hover:shadow-lg">
                    <span className="text-3xl">✉️</span><span><b>Email</b><br />
                        {EMAIL}</span></a>
                <p className="text-sm text-gray-600">We reply within a few hours, every day.</p>
            </div>
            <form ref={f} onSubmit={send} className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-xl grid gap-4 sm:grid-cols-2">
                <input
                    name="name" required placeholder="Full name"
                    className={I} />
                <input name="email" type="email" required placeholder="Email" className={I} />
                <input name="phone" placeholder="Phone / WhatsApp" className={I} />
                <select name="service" className={I}>{services.map(x => <option key={x[0]}>{x[0]}</option>)}
                </select>
                <input name="date" type="date" className={I} />
                <input name="guests" type="number" min="1" placeholder="Number of guests" className={I} />
                <textarea name="message" rows="4" required placeholder="Tell us about your dream trip and budget" className={I + ' sm:col-span-2'} />
                <button disabled={s === 'sending'}
                    className="sm:col-span-2 bg-brand text-white py-3 rounded-full font-semibold hover:bg-emerald-800">
                    {s === 'sending' ? 'Sending...' : 'Send Enquiry'}</button>
                {s === 'ok' && <p className="sm:col-span-2 text-green-700">Thank you! We will contact you shortly.</p>}{s === 'err' &&
                    <p className="sm:col-span-2 text-red-600">Could not send. Please Purchase this Web App to enable email Communication direct to your Gmail.</p>}
            </form>
        </section>
    </>
}

export default function App() {
    return <>
        <Nav />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/destinations" element={<Dest />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </main>
        <Footer />
        <a href={wa()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 bg-green-500 text-white w-14 h-14 rounded-full grid place-items-center text-2xl shadow-xl hover:scale-110 transition">💬</a></>
}
