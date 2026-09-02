import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');
const phoneDisplay = '(337) 564-9037';
const phoneHref = 'tel:+13375649037';
const facebook = 'https://www.facebook.com/profile.php?id=100094370396482';
const ownerName = 'Tyler Washington';
const ownerFacebook = 'https://www.facebook.com/tyler.washington.78197';
const siteUrl = (process.env.URL || 'https://washington-lawncare-la.netlify.app').replace(/\/$/, '');

const services = [
  {
    slug: 'lawn-care',
    name: 'Lawn Care',
    short: 'Mowing, trimming, edging and a clean blow-off—done with a sharp eye for the finish.',
    image: 'lawn-stripes.webp',
    intro: 'Routine lawn work that keeps the whole property looking cared for, not just cut.',
    title: 'Lawn Care in Lake Charles & Calcasieu Parish',
    body: [
      ['Complete Lawn Maintenance', 'Good lawn service is easy to spot. The height is even, the edges are crisp, clippings are off the hard surfaces and the property feels finished when the gate closes. That is the standard we work toward on every stop.'],
      ['Routine Service', 'Mowing for the turf and season, string trimming around fixed features, edging along accessible walks and drives, and blowing clippings from paved areas. We can also talk through overgrown areas or extra cleanup before recurring service begins.'],
      ['Southwest Louisiana Lawn Care', 'Calcasieu Parish lawns can move fast in warm, wet weather. We schedule with local conditions in mind and communicate when rain changes the plan. The goal is steady care without shortcuts when the grass is growing hardest.']
    ],
    includes: ['Residential mowing', 'String trimming around beds and obstacles', 'Edging along sidewalks and driveways', 'Clipping blow-off from hard surfaces', 'One-time or recurring service discussions'],
    faq: [
      ['Do you offer recurring lawn service?', 'Yes. Call or send the estimate form with your address and the schedule you have in mind.'],
      ['What happens after heavy rain?', 'Wet ground can affect both the finish and the lawn. If conditions are not workable, scheduling is adjusted rather than forcing a poor cut.'],
      ['Can you handle larger yards?', 'Yes. Share the property address and any access details so the right equipment and timing can be planned.']
    ]
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    short: 'Straightforward bed cleanup and landscape maintenance that makes the yard feel pulled together.',
    image: 'landscape-bed.webp',
    intro: 'Practical landscape work for a cleaner, better-kept property.',
    title: 'Landscaping Services in Calcasieu Parish',
    body: [
      ['Landscape Bed Cleanup', 'Landscape beds frame the house. When weeds, tired edges and overgrowth take over, the whole yard can feel unfinished. We focus on the hands-on work that restores order and makes routine maintenance easier.'],
      ['Property-Specific Service', 'Every bed and property is different, so the first step is a look at the space. We can discuss cleanup, redefining bed edges, freshening mulch and other practical maintenance based on what the property actually needs.'],
      ['Lawn & Landscape Finish', 'The best result comes from treating the lawn and the beds as one property. We keep transitions clean and pay attention to the spots people notice first: the entry, driveway, walkways and street-facing beds.']
    ],
    includes: ['Landscape bed cleanup', 'Weed removal', 'Bed-edge definition', 'Mulch refresh discussions', 'Seasonal property cleanup'],
    faq: [
      ['Do you take on small landscaping jobs?', 'Yes. Smaller cleanup and refresh projects are welcome. Send photos or request a property visit for an estimate.'],
      ['Can landscaping be added to lawn service?', 'Often, yes. The work can be discussed as a separate project alongside routine lawn maintenance.'],
      ['Do you install large hardscapes?', 'The current focus is lawn and landscape maintenance. Call with the project details so the scope can be confirmed before scheduling.']
    ]
  },
  {
    slug: 'hedge-trimming',
    name: 'Hedge Trimming',
    short: 'Neat lines, controlled growth and a complete cleanup around shrubs and hedges.',
    image: 'front-yard-finish.webp',
    intro: 'Shape and control without leaving the cleanup behind.',
    title: 'Hedge & Shrub Trimming in Calcasieu Parish',
    body: [
      ['Hedge & Shrub Shaping', 'Overgrown shrubs crowd walks, cover windows and blur the lines of the landscape. Careful trimming brings back the intended shape while keeping the result appropriate for the plant and the property.'],
      ['Careful Trimming & Cleanup', 'The work starts with the growth pattern and the finished size you want. We trim accessible hedges and shrubs, clear the cut material and leave the surrounding lawn and hard surfaces tidy.'],
      ['Entry & Curb Appeal', 'Hedges sit close to the house and entry, so small improvements read quickly from the street. Pair trimming with lawn service or a bed cleanup for a more complete reset.']
    ],
    includes: ['Routine hedge shaping', 'Shrub height and width control', 'Walkway and entry clearance', 'Cut-material cleanup', 'Add-on trimming with lawn service'],
    faq: [
      ['How often should hedges be trimmed?', 'It depends on the plant, season and desired shape. Fast-growing hedges may need attention more often during the warm months.'],
      ['Is debris removed after trimming?', 'Cleanup of the trimmings from the work area is part of the quoted scope.'],
      ['Can you trim very tall hedges?', 'Send a photo or request an estimate. Height, access and equipment needs must be checked before the work is confirmed.']
    ]
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    short: 'Surface cleaning for driveways, walks and other suitable exterior areas.',
    image: 'pressure-washing.webp',
    intro: 'Cut through outdoor buildup and brighten the surfaces around the yard.',
    title: 'Pressure Washing in Lake Charles & Nearby Areas',
    body: [
      ['Exterior Surface Cleaning', 'A freshly cut lawn looks even better beside a clean drive and walkway. Pressure washing lifts the outdoor buildup that can make concrete look dull and neglected.'],
      ['Surface-Specific Cleaning', 'Not every exterior material should be handled the same way. We look at the surface, buildup, drainage and nearby landscaping before confirming the work. That keeps the scope clear and the cleaning appropriate.'],
      ['Property Care Add-On', 'Pressure washing can be quoted as a stand-alone job or discussed alongside lawn and landscape work. It is especially useful before gatherings, listing photos or a broader property cleanup.']
    ],
    includes: ['Driveway cleaning', 'Walkway and patio cleaning', 'Surface assessment before work', 'Stand-alone service estimates', 'Property-care add-on discussions'],
    faq: [
      ['What surfaces do you pressure wash?', 'Concrete drives, walks and other suitable exterior surfaces can be evaluated. The material and condition are checked before the service is confirmed.'],
      ['Do I need to be home?', 'Access, water availability and the exact work area should be arranged in advance. Whether you need to be present depends on the property.'],
      ['Can pressure washing be bundled with lawn service?', 'Yes. Ask for both when requesting the estimate so the work can be planned together.']
    ]
  }
];

const areas = [
  { slug: 'lake-charles', name: 'Lake Charles', zips: ['70601', '70605', '70607', '70611', '70615'], image: 'hero-lawn.webp', note: 'From established central neighborhoods to larger yards toward Moss Bluff and south Lake Charles, lawn growth and drainage can vary block by block.' },
  { slug: 'sulphur', name: 'Sulphur', zips: ['70663', '70665'], image: 'large-backyard.webp', note: 'Routine mowing and property cleanup help Sulphur lawns stay manageable through the long Southwest Louisiana growing season.' },
  { slug: 'westlake', name: 'Westlake', zips: ['70669'], image: 'front-yard-finish.webp', note: 'Westlake homeowners can request lawn care, hedge trimming, landscape cleanup and pressure washing from one local crew.' },
  { slug: 'dequincy', name: 'DeQuincy', zips: ['70633'], image: 'house-and-stripes.webp', note: 'For homes and larger lots around DeQuincy, the first estimate confirms travel, access and the right service schedule.' },
  { slug: 'iowa', name: 'Iowa', zips: ['70647'], image: 'wide-striped-lawn.webp', note: 'Iowa properties often have room to work. Share the address and lot details so equipment and timing can be planned correctly.' },
  { slug: 'vinton', name: 'Vinton', zips: ['70668'], image: 'clean-residential-lawn.webp', note: 'Vinton is part of the Calcasieu Parish service area, with scheduling confirmed by property address.' }
];

const image = (name, alt, cls = '') => `<img class="${cls}" src="/assets/images/${name}" alt="${alt}" loading="lazy" decoding="async">`;
const button = (href, label, cls = '') => `<a class="button ${cls}" href="${href}">${label} <span aria-hidden="true">→</span></a>`;
const heroCtas = (href = '/contact/', label = 'Request a Free Estimate') => `<div class="hero-actions page-hero-actions">${button(href, label)}${button(phoneHref, `Call ${phoneDisplay}`, 'dark')}</div>`;

function header(active = '') {
  const current = (id) => active === id ? ' aria-current="page"' : '';
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div class="topbar"><div class="wrap"><span>Serving Lake Charles & Calcasieu Parish</span><span>Free estimates · <a href="${phoneHref}">${phoneDisplay}</a></span></div></div>
  <header class="site-header">
    <div class="wrap nav-shell">
      <a class="brand" href="/">${image('logo.webp', '', '')}<span>Washington Lawn Care & Service</span></a>
      <button class="menu-button" type="button" data-menu aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="nav-links" id="site-nav" data-nav aria-label="Main navigation">
        <a href="/services/"${current('services')}>Services</a>
        <a href="/areas/"${current('areas')}>Areas</a>
        <a href="/about/"${current('about')}>About</a>
        <a href="/contact/"${current('contact')}>Estimate</a>
      </nav>
      <a class="button nav-cta" href="${phoneHref}">Call ${phoneDisplay}</a>
    </div>
  </header>`;
}

function footer() {
  return `<section class="cta"><div class="wrap"><h2>Request a Free Estimate</h2>${button('/contact/', 'Start your estimate')}</div></section>
  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">${image('logo.webp', 'Washington Lawn Care and Service logo')}<h3>Washington Lawn Care & Service</h3><p>Owned and operated by ${ownerName}. Serving Lake Charles and communities across Calcasieu Parish.</p></div>
      <div class="footer-col"><strong>Explore</strong><a href="/services/">Services</a><a href="/areas/">Areas we serve</a><a href="/about/">About</a><a href="/contact/">Free estimate</a></div>
      <div class="footer-col"><strong>Contact</strong><a href="${phoneHref}">${phoneDisplay}</a><a href="${facebook}" target="_blank" rel="noopener">Business Facebook ↗</a><a href="${ownerFacebook}" target="_blank" rel="noopener">Tyler Washington ↗</a><a href="/areas/lake-charles/">Lake Charles, Louisiana</a></div>
    </div>
    <div class="wrap footer-base"><span>© <span data-year></span> Washington Lawn Care & Service</span><span>Serving Calcasieu Parish, Louisiana</span></div>
  </footer>`;
}

function jsonLd(extra = {}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Washington Lawn Care & Service',
    image: `${siteUrl}/assets/images/logo.webp`,
    url: siteUrl,
    telephone: '+1-337-564-9037',
    priceRange: '$$',
    areaServed: areas.map(area => ({ '@type': 'City', name: `${area.name}, Louisiana` })),
    founder: { '@type': 'Person', name: ownerName, sameAs: ownerFacebook },
    sameAs: [facebook, ownerFacebook],
    ...extra
  });
}

function layout({ title, description, pathName = '/', active = '', content, schema = jsonLd() }) {
  const canonical = `${siteUrl}${pathName}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#163719">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${siteUrl}/assets/images/hero-lawn.webp">
  <link rel="icon" href="/assets/images/logo.webp" type="image/webp">
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${schema}</script>
  <script src="/assets/site.js" defer></script>
</head>
<body>
  ${header(active)}
  <main id="main">${content}</main>
  ${footer()}
</body>
</html>`;
}

const serviceCards = () => `<div class="service-grid">${services.map((service) => `
  <article class="service-card" data-reveal>
    ${image(service.image, `${service.name} work by Washington Lawn Care and Service`)}
    <div class="service-card-content"><h3>${service.name}</h3><p>${service.short}</p><a href="/services/${service.slug}/">View ${service.name} →</a></div>
  </article>`).join('')}</div>`;

const serviceOverviews = () => `<div class="service-overview-list">${services.map((service) => `
  <article class="service-overview" data-reveal>
    <div class="service-overview-media">${image(service.image, `${service.name} project by Washington Lawn Care and Service`)}</div>
    <div class="service-overview-copy">
      <div class="eyebrow">Residential Property Care</div>
      <h2>${service.name}</h2>
      <p class="service-lead">${service.intro}</p>
      <p>${service.body[0][1]}</p>
      <ul class="overview-list">${service.includes.slice(0, 4).map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="overview-actions">${button(`/services/${service.slug}/`, `Explore ${service.name}`)}<a class="text-link" href="/contact/?service=${service.slug}">Request an estimate →</a></div>
    </div>
  </article>`).join('')}</div>`;

const home = layout({
  title: 'Washington Lawn Care & Service | Lake Charles, LA',
  description: 'Lawn care, landscaping, hedge trimming and pressure washing in Lake Charles and Calcasieu Parish. Call (337) 564-9037 for a free estimate.',
  content: `<section class="hero">
    ${image('hero-lawn.webp', 'Freshly striped residential lawn in the Lake Charles area', 'hero-media')}
    <div class="wrap"><div class="hero-content"><div class="eyebrow">Lake Charles, Louisiana</div><h1>Lawn Care &<br>Property Services</h1><p class="hero-copy">Lawn care and exterior property work for people who want the job done right—and the place left looking sharp.</p><div class="hero-actions">${button('/contact/', 'Get a free estimate')}${button(phoneHref, `Call ${phoneDisplay}`, 'dark')}</div></div></div>
  </section>
  <div class="trust-strip"><div class="wrap"><div class="trust-item">Free estimates</div><div class="trust-item">Local service</div><div class="trust-item">Real project photos</div><div class="trust-item">Call or message</div></div></div>
  <section class="section cream"><div class="wrap"><div class="section-intro" data-reveal><div><div class="eyebrow">What We Do</div><h2>Lawn & Property Services</h2></div><div><p>Four core services. One local number. Tell us what needs attention and we’ll give you a clear next step.</p><a class="text-link" href="/services/">View all services →</a></div></div>${serviceCards()}</div></section>
  <section class="section"><div class="wrap split"><div class="split-copy" data-reveal><div class="eyebrow">Owned & Operated Locally</div><h2>A Clean Finish on Every Property</h2><p>${ownerName} owns and operates Washington Lawn Care & Service, handling the details people notice: even mowing, clean edges, controlled shrubs, tidy beds and hard surfaces cleared of debris.</p><ul class="check-list"><li>Direct estimates by phone or online</li><li>Service across Calcasieu Parish</li><li>One-time work and recurring lawn-care discussions</li></ul>${button('/about/', 'Meet Tyler Washington')}</div><div class="split-media" data-reveal>${image('owner-portrait.webp', `${ownerName}, owner of Washington Lawn Care and Service`)}</div></div></section>
  <section class="section dark"><div class="wrap"><div class="section-intro" data-reveal><div><div class="eyebrow">Recent Work</div><h2>Recent Lawn Care Work</h2></div><p>No stock photography here. These are properties our crew has worked on around Southwest Louisiana.</p></div><div class="project-rail"><figure data-reveal>${image('wide-striped-lawn.webp', 'Wide front lawn with fresh mowing stripes')}<figcaption>Fresh stripe pattern</figcaption></figure><figure data-reveal>${image('fresh-edge-drive.webp', 'Clean lawn edge beside a residential driveway')}<figcaption>Clean driveway edge</figcaption></figure><figure data-reveal>${image('landscape-bed.webp', 'Maintained landscape bed and lawn')}<figcaption>Lawn and bed finish</figcaption></figure></div></div></section>
  <section class="section area-band"><div class="wrap area-layout"><div data-reveal><div class="eyebrow">Areas We Serve</div><h2>Serving Calcasieu Parish</h2><p>Scheduling is confirmed by address, with regular service focused throughout the Lake Charles area and the parish’s six municipalities.</p>${button('/areas/', 'Check your area', 'dark')}</div><div class="area-links" data-reveal>${areas.map(a => `<a href="/areas/${a.slug}/">${a.name} <span aria-hidden="true">→</span></a>`).join('')}</div></div></section>
  <section class="section cream"><div class="wrap"><div class="section-intro" data-reveal><div><div class="eyebrow">How It Works</div><h2>How to Request Service</h2></div><p>Give us the property details, we look at the work, and you get an estimate before scheduling.</p></div><div class="step-grid"><div class="step" data-reveal><h3>Property Details</h3><p>Call or send the form with your address, service and any helpful notes.</p></div><div class="step" data-reveal><h3>Service Estimate</h3><p>We review access, size and the current condition before pricing the work.</p></div><div class="step" data-reveal><h3>Service Scheduling</h3><p>Once the estimate is approved, we confirm timing and get it on the route.</p></div></div></div></section>`
});

const servicesHub = layout({
  title: 'Lawn & Property Services | Washington Lawn Care',
  description: 'Explore lawn care, landscaping, hedge trimming and pressure washing services in Lake Charles and Calcasieu Parish.',
  pathName: '/services/', active: 'services',
  content: `<section class="page-hero" data-mark="04"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / Services</div><h1>Lawn & Property Services</h1><p>From regular mowing to exterior cleanup, each estimate is based on the property, the current condition and the finish you want.</p>${heroCtas()}</div></section><section class="section cream service-overviews-section"><div class="wrap"><div class="section-intro"><div><div class="eyebrow">Available Services</div><h2>What We Can Handle</h2></div><p>Review the work included with each service, then request an estimate for one service or combine several into a complete property cleanup.</p></div>${serviceOverviews()}</div></section><section class="section"><div class="wrap split reverse"><div class="split-media" data-reveal>${image('truck-and-mower.webp', 'Washington Lawn Care and Service truck and mower')}</div><div class="split-copy" data-reveal><div class="eyebrow">Local Equipment & Local Work</div><h2>Recurring Care & One-Time Service</h2><p>Every estimate starts with the property—not a generic package. Size, access, growth and the finish you want all shape the plan.</p>${button('/contact/', 'Request an estimate')}</div></div></section>`
});

function servicePage(service) {
  const faq = service.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');
  const content = `<section class="page-hero" data-mark="${String(services.indexOf(service) + 1).padStart(2, '0')}"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / <a href="/services/">Services</a> / ${service.name}</div><h1>${service.title}</h1><p>${service.intro}</p>${heroCtas(`/contact/?service=${service.slug}`)}</div></section>
  <section class="section"><div class="wrap detail-grid"><article class="prose">${service.body.map(([h, p], i) => `${i === 1 ? image(service.image, `${service.name} project in Calcasieu Parish`) : ''}<h2>${h}</h2><p>${p}</p>`).join('')}</article><aside class="side-card"><h3>Service Options</h3><ul>${service.includes.map(i => `<li>${i}</li>`).join('')}</ul><a class="button" href="/contact/?service=${service.slug}">Get a free estimate</a><a class="button dark" href="${phoneHref}">Call ${phoneDisplay}</a><p class="small">Service availability and scheduling are confirmed by property address.</p></aside></div></section>
  <section class="section cream"><div class="wrap"><div class="section-intro"><div><div class="eyebrow">Common questions</div><h2>${service.name} FAQ</h2></div><p>Have a property-specific question? Call or include it with your estimate request.</p></div><div class="faq">${faq}</div></div></section>`;
  return layout({ title: `${service.name} Lake Charles, LA | Washington Lawn Care`, description: `${service.name} for homes in Lake Charles and Calcasieu Parish. Call Washington Lawn Care & Service at ${phoneDisplay} for a free estimate.`, pathName: `/services/${service.slug}/`, active: 'services', content, schema: jsonLd({ '@type': 'HomeAndConstructionBusiness', makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name } } }) });
}

const about = layout({
  title: 'About Washington Lawn Care & Service | Lake Charles',
  description: 'Meet the local operator behind Washington Lawn Care & Service and see real lawn projects completed around Southwest Louisiana.',
  pathName: '/about/', active: 'about',
  content: `<section class="page-hero" data-mark="TW"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / About</div><h1>Tyler Washington, Owner</h1><p>Washington Lawn Care & Service is owned and operated by Tyler Washington, providing hands-on property care throughout Lake Charles and Calcasieu Parish.</p>${heroCtas()}</div></section>
  <section class="section"><div class="wrap split"><div class="split-copy" data-reveal><div class="eyebrow">About the Business</div><h2>Local Lawn Care in Lake Charles</h2><p>The work is local and personal. From large backyards to tight residential edges, each property gets a real look before the scope is set.</p><p>Tyler serves Lake Charles and surrounding Calcasieu Parish communities with lawn care, landscaping maintenance, hedge trimming and pressure washing.</p><p>Have an unusual property or a job that needs more explanation? Call. A short conversation is often the fastest way to get the right answer.</p>${button('/contact/', 'Talk about your property')} <a class="text-link owner-link" href="${ownerFacebook}" target="_blank" rel="noopener">Tyler on Facebook →</a></div><div class="split-media" data-reveal>${image('crew-on-lawn.webp', 'Tyler Washington on a freshly mowed lawn')}</div></div></section>
  <section class="section dark"><div class="wrap split reverse"><div class="split-media" data-reveal>${image('work-rig.webp', 'Lawn care truck and mower ready for work')}</div><div class="split-copy" data-reveal><div class="eyebrow">Service Standards</div><h2>Property Care Standards</h2><ul class="check-list"><li>Confirm the job before work begins</li><li>Use equipment appropriate for the property</li><li>Pay attention to edges and transitions</li><li>Clean up the work area before leaving</li><li>Communicate when weather affects scheduling</li></ul><a class="text-link" href="${facebook}" target="_blank" rel="noopener" style="color:var(--lime)">Follow the latest work on Facebook →</a></div></div></section>`
});

const areasHub = layout({
  title: 'Areas We Serve | Calcasieu Parish Lawn Care',
  description: 'Washington Lawn Care & Service serves Lake Charles, Sulphur, Westlake, DeQuincy, Iowa and Vinton in Calcasieu Parish, Louisiana.',
  pathName: '/areas/', active: 'areas',
  content: `<section class="page-hero" data-mark="337"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / Areas we serve</div><h1>Calcasieu Parish Service Areas</h1><p>We serve the parish’s six municipalities and nearby residential areas. The property address is always used to confirm route availability.</p>${heroCtas()}</div></section>
  <section class="section cream"><div class="wrap"><div class="section-intro"><div><div class="eyebrow">Service Area</div><h2>Cities & Towns We Serve</h2></div><p>ZIP codes are a quick guide. Final availability depends on the exact address, service requested and current route schedule.</p></div><div class="service-grid">${areas.map((area) => `<article class="service-card" data-reveal>${image(area.image, `Completed lawn project serving ${area.name}, Louisiana`)}<div class="service-card-content"><h3>${area.name}</h3><p>ZIP ${area.zips.join(', ')}</p><a href="/areas/${area.slug}/">View ${area.name} Service Area →</a></div></article>`).join('')}</div></div></section>`
});

function areaPage(area) {
  const nearby = areas.filter(a => a.slug !== area.slug).slice(0, 3);
  const content = `<section class="page-hero" data-mark="${area.zips[0].slice(-2)}"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / <a href="/areas/">Areas</a> / ${area.name}</div><h1>Lawn Care in ${area.name}, Louisiana</h1><p>${area.note}</p><div class="zip-row">${area.zips.map(z => `<span class="zip">${z}</span>`).join('')}</div>${heroCtas()}</div></section>
  <section class="section"><div class="wrap split"><div class="split-copy" data-reveal><div class="eyebrow">${area.name} Service</div><h2>Lawn & Property Services</h2><p>Washington Lawn Care & Service provides mowing, landscaping maintenance, hedge trimming and pressure washing for residential properties in and around ${area.name}.</p><p>Send the property address, the service you need and a few notes about access or current condition. We will confirm the route and set up the estimate.</p><ul class="check-list">${services.map(s => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join('')}</ul>${button('/contact/', `Get a ${area.name} estimate`)}</div><div class="split-media" data-reveal>${image(area.image, `Fresh lawn maintained near ${area.name}, Louisiana`)}</div></div></section>
  <section class="section cream"><div class="wrap"><div class="section-intro"><div><div class="eyebrow">ZIP Code Guide</div><h2>${area.name} ZIP Codes</h2></div><div><p>Common residential ZIP ${area.zips.length > 1 ? 'codes' : 'code'}: <strong>${area.zips.join(', ')}</strong>.</p><p>ZIP codes cover broad delivery areas and do not set the final service boundary. Call with the street address to confirm.</p></div></div><div class="step-grid"><div class="step"><h3>Property Address</h3><p>It confirms the route, drive time and property location.</p></div><div class="step"><h3>Requested Service</h3><p>Tell us whether this is routine care, cleanup, trimming or washing.</p></div><div class="step"><h3>Service Estimate</h3><p>We review the work and confirm pricing before scheduling.</p></div></div></div></section>
  <section class="section dark"><div class="wrap"><div class="section-intro"><div><div class="eyebrow">Nearby</div><h2>Nearby Service Areas</h2></div><p>Also looking after a family property or rental nearby? Start with the community page below.</p></div><div class="area-links">${nearby.map(a => `<a href="/areas/${a.slug}/">${a.name} <span aria-hidden="true">→</span></a>`).join('')}</div></div></section>`;
  return layout({ title: `Lawn Care ${area.name}, LA | Washington Lawn Care`, description: `Lawn care, landscaping, hedge trimming and pressure washing in ${area.name}, Louisiana ${area.zips.join(', ')}. Free estimates: ${phoneDisplay}.`, pathName: `/areas/${area.slug}/`, active: 'areas', content, schema: jsonLd({ areaServed: { '@type': 'City', name: `${area.name}, Louisiana` } }) });
}

const galleryImages = [
  ['lawn-stripes.webp', 'Long mowing stripes across a large backyard'],
  ['backyard-mower.webp', 'Freshly mowed backyard with mower'],
  ['mower-at-home.webp', 'Lawn mower on a completed residential lawn'],
  ['pressure-washing.webp', 'Driveway pressure washing in progress'],
  ['lawn-treatment.webp', 'Lawn treatment application near a drainage area'],
  ['landscape-bed.webp', 'Maintained shrubs and landscape bed beside a brick home'],
  ['wide-striped-lawn.webp', 'Wide striped front lawn under blue skies'],
  ['fresh-edge-drive.webp', 'Straight lawn edge along concrete driveway'],
  ['front-yard-finish.webp', 'Finished front yard and clean sidewalk edge'],
  ['truck-and-mower.webp', 'Truck and lawn mower on a residential property'],
  ['large-backyard.webp', 'Large backyard with even stripe pattern'],
  ['lawn-equipment.webp', 'Lawn equipment on a freshly cut backyard']
];

const gallery = layout({
  title: 'Project Gallery | Washington Lawn Care & Service',
  description: 'See real lawn care, landscaping and pressure-washing work completed by Washington Lawn Care & Service around Southwest Louisiana.',
  pathName: '/gallery/',
  content: `<section class="page-hero" data-mark="WORK"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / Gallery</div><h1>Project Gallery</h1><p>Real properties, real equipment and the finished details from jobs around Southwest Louisiana.</p>${heroCtas()}</div></section><section class="section cream"><div class="wrap"><div class="gallery-grid">${galleryImages.map(([srcName, alt]) => `<figure data-reveal>${image(srcName, alt)}</figure>`).join('')}</div></div></section>`
});

const contact = layout({
  title: 'Free Lawn Care Estimate | Washington Lawn Care',
  description: 'Request a free estimate for lawn care, landscaping, hedge trimming or pressure washing in Lake Charles and Calcasieu Parish.',
  pathName: '/contact/', active: 'contact',
  content: `<section class="page-hero" data-mark="CALL"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / Free estimate</div><h1>Request a Free Estimate</h1><p>Call for the fastest response, or send the form with enough detail for us to understand the job.</p>${heroCtas('#estimate-form', 'Start the Estimate Form')}</div></section>
  <section class="section cream"><div class="wrap quote-panel"><div class="quote-copy"><div class="eyebrow">Contact</div><h2>Free Estimates</h2><p>Include the property address, the service you need and anything that affects access. Photos can be shared through Facebook after the first message.</p><h3><a href="${phoneHref}">${phoneDisplay}</a></h3><p>Lake Charles & Calcasieu Parish, Louisiana</p><p><a href="${facebook}" target="_blank" rel="noopener">Message on Facebook →</a></p></div>
    <form class="quote-form" id="estimate-form" name="estimate" method="POST" data-netlify="true" netlify-honeypot="company-site" action="/thanks/">
      <input type="hidden" name="form-name" value="estimate"><p hidden><label>Do not fill this out: <input name="company-site"></label></p>
      <div class="form-grid"><div class="field"><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" required></div><div class="field full"><label for="address">Property address or nearest cross street</label><input id="address" name="address" autocomplete="street-address" required></div><div class="field"><label for="service">Service</label><select id="service" name="service" required><option value="">Choose one</option>${services.map(s => `<option value="${s.slug}">${s.name}</option>`).join('')}<option value="multiple">More than one</option></select></div><div class="field"><label for="schedule">Timing</label><select id="schedule" name="timing"><option>As soon as available</option><option>Within two weeks</option><option>Planning ahead</option></select></div><div class="field full"><label for="details">Property details</label><textarea id="details" name="details" placeholder="Lot size, gate access, overgrowth, areas to clean, or anything else we should know."></textarea></div><div class="field full"><button class="button" type="submit">Send estimate request →</button></div></div>
    </form></div></section>`
});

const thanks = layout({ title: 'Estimate Request Received | Washington Lawn Care', description: 'Your estimate request has been sent to Washington Lawn Care & Service.', pathName: '/thanks/', content: `<section class="page-hero" data-mark="✓"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / Request received</div><h1>Estimate Request Received</h1><p>We’ll use the information you sent to follow up about the property. For a time-sensitive job, call ${phoneDisplay}.</p><div style="margin-top:2rem">${button(phoneHref, `Call ${phoneDisplay}`)}</div></div></section>` });

const notFound = layout({ title: 'Page Not Found | Washington Lawn Care', description: 'The requested page could not be found.', pathName: '/404.html', content: `<section class="page-hero" data-mark="404"><div class="wrap"><div class="breadcrumb"><a href="/">Home</a> / 404</div><h1>Page Not Found</h1><p>Use the links below to get back to the services or request an estimate.</p><div class="hero-actions">${button('/services/', 'View services')}${button('/contact/', 'Request an estimate', 'dark')}</div></div></section>` });

const pages = new Map([
  ['index.html', home],
  ['services/index.html', servicesHub],
  ...services.map(service => [`services/${service.slug}/index.html`, servicePage(service)]),
  ['about/index.html', about],
  ['areas/index.html', areasHub],
  ...areas.map(area => [`areas/${area.slug}/index.html`, areaPage(area)]),
  ['gallery/index.html', gallery],
  ['contact/index.html', contact],
  ['thanks/index.html', thanks],
  ['404.html', notFound]
]);

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'assets'), { recursive: true });
await cp(path.join(src, 'assets'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(src, 'styles.css'), path.join(dist, 'assets', 'styles.css'));
await cp(path.join(src, 'site.js'), path.join(dist, 'assets', 'site.js'));

for (const [relative, html] of pages) {
  const target = path.join(dist, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
}

const publicPaths = [...pages.keys()].filter(p => p !== '404.html' && !p.startsWith('thanks/')).map(p => p === 'index.html' ? '/' : `/${p.replace(/index\.html$/, '')}`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map(p => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
await writeFile(path.join(dist, '_redirects'), `/facebook ${facebook} 302\n`, 'utf8');

console.log(`Built ${pages.size} pages in ${dist}`);
