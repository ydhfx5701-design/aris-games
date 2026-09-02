import type { Dictionary } from "./ko";

const en: Dictionary = {
  meta: {
    siteName: "ARIS GAMES",
    defaultTitle: "ARIS GAMES | A Studio Beyond Genre",
    defaultDescription:
      "ARIS GAMES is a game development studio crafting action, strategy, simulation, RPG, and mobile experiences across genres.",
  },
  nav: {
    home: "HOME",
    games: "GAMES",
    about: "ABOUT",
    news: "NEWS",
    support: "SUPPORT",
    contact: "CONTACT",
  },
  header: {
    language: "Language",
  },
  hero: {
    eyebrow: "CREATE THE WORLD, PLAY THE FUTURE",
    titleLines: ["PLAY.", "EXPERIENCE.", "BEYOND."],
    subtitle: "We craft new experiences across every genre of play.",
    ctaPrimary: "OUR GAMES",
    ctaSecondary: "ABOUT ARIS",
  },
  games: {
    eyebrow: "OUR GAMES",
    heading: ["Discovery, across", "every genre"],
    viewAll: "View all games",
    detailCta: "Learn more",
    platformLabel: "Platform",
    genreLabel: "Genre",
    emptyEyebrow: "IN DEVELOPMENT",
    emptyTitle: "Our next project is underway",
    emptyBody:
      "ARIS GAMES isn't bound to a single genre. The moment our first title is ready to share, you'll see it here first.",
    genresHeading: "Genres ARIS will build",
    genresBody: "No genre is off limits — we design experiences without boundaries.",
    backToList: "Back to games",
    tba: "TBA",
  },
  about: {
    eyebrow: "ABOUT ARIS GAMES",
    heading: ["Starting from imagination,", "beyond ordinary fun"],
    body: "ARIS GAMES is a studio that refuses to be defined by a single genre. From action to strategy, simulation, casual, racing, and RPG — we design new kinds of fun across platforms and genres.",
    cta: "MORE ABOUT US",
    pageIntroLabel: "OUR STUDIO",
    pageHeading: ["Not a genre.", "A craft for fun."],
    pageBody:
      "ARIS GAMES spans action, strategy, simulation, casual, racing, RPG, mobile, and PC. We don't lock our identity to one genre or one universe — instead, every project finds the form of fun that suits it best.",
    missionHeading: "How we make games",
    missionBody:
      "We believe a great idea doesn't care about genre. ARIS GAMES focuses on what makes each project uniquely fun, then chooses the genre and platform that expresses it best.",
    values: [
      {
        title: "CREATIVE",
        body: "Fresh, original ideas that stand apart.",
      },
      {
        title: "PASSION",
        body: "A relentless focus on making games we love.",
      },
      {
        title: "PLAYER FIRST",
        body: "Every decision starts with the player's experience.",
      },
      {
        title: "GLOBAL",
        body: "Built to grow alongside players around the world.",
      },
    ],
  },
  news: {
    eyebrow: "LATEST NEWS",
    heading: "News from ARIS GAMES",
    viewAll: "View all news",
    emptyTitle: "New stories are on the way",
    emptyBody: "Development updates and announcements will appear here first.",
    backToList: "Back to news",
  },
  footer: {
    tagline: "A game studio building new fun beyond genre.",
    columnsTitle: "SITE",
    legalTitle: "LEGAL",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: `© ${new Date().getFullYear()} ARIS GAMES. All rights reserved.`,
    followTitle: "FOLLOW",
  },
  support: {
    eyebrow: "SUPPORT",
    heading: "How can we help?",
    body: "Choose a game to see its FAQ and contact categories.",
    selectGameLabel: "Select a game",
    noGamesTitle: "No games are live yet",
    noGamesBody:
      "Once a game launches, its dedicated support page will appear here. Until then, please use the general inquiry categories below.",
    generalHeading: "General inquiry categories",
    categories: [
      { title: "FAQ", body: "Browse frequently asked questions." },
      { title: "Bug Report", body: "Report an in-game issue or bug." },
      { title: "Billing", body: "Questions about payments and refunds." },
      { title: "Account", body: "Help with account access and info." },
      { title: "Other", body: "Anything else on your mind." },
    ],
    contactCta: "Contact us",
  },
  contact: {
    eyebrow: "CONTACT",
    heading: "Get in touch with ARIS GAMES",
    body: "For partnerships, careers, or media inquiries, leave a message and we'll get back to you.",
    formName: "Name",
    formEmail: "Email",
    formSubject: "Subject",
    formMessage: "Message",
    formSubmit: "Send",
    formNote: "* Our inquiry channel is being finalized and will open officially soon.",
  },
  legal: {
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Service",
    placeholderNotice:
      "This page is a draft in preparation and will be replaced with final content after legal review.",
    lastUpdated: "Last updated",
  },
  common: {
    comingSoon: "COMING SOON",
    tba: "TBA",
    backHome: "Back home",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has moved.",
  },
};

export default en;
