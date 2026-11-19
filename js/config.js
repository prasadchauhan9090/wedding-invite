/* ============================================================
   EDIT ONLY THIS FILE to change names, dates, venue, song, etc.
   ============================================================ */
const WEDDING = {
  groom: "Ayush Kumar",
  bride: "Priyanka Kumari",

  // Main wedding ceremony (ISO format, India time = +05:30)
  date: "2026-12-09T18:00:00+05:30",
  dateText: "9th December 2026",
  city: "Deoghar, Jharkhand",

  blessing:
    "With the blessings of our elders and the love of our families, we joyfully invite you to celebrate the beautiful beginning of our life together. Your presence and blessings will make our celebration complete.",

  groomFamily: { father: "Rabindra Kumar Dubey", mother: "Kiran Dubey" },
  brideFamily: { father: "Sudhir Kumar", mother: "Guddi Devi" },

  couplePhoto: "assets/couple.jpg",

  venues: {
    deoghar: {
      name: "Baidyanath Garden",
      address: "Near Hotel TMG Chocolate Inn, Bompas Town, Deoghar, Jharkhand 814114",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Baidyanath+Garden+Bompas+Town+Deoghar+Jharkhand+814114"
    },
    gaya: {
      name: "Hotel Gharana Tree",
      address: "In front of Rampur Thana, Jail Road, AP Colony, Gaya, Bihar 823001",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Hotel+Gharana+Tree+Jail+Road+AP+Colony+Gaya+Bihar+823001"
    }
  },

  // Day-wise schedule. time can be "" if not decided.
  days: [
    { date: "7", month: "Dec", weekday: "Monday", venue: "deoghar",
      events: [ { icon: "🌿", title: "Mehandi", time: "" } ] },
    { date: "8", month: "Dec", weekday: "Tuesday", venue: "deoghar",
      events: [ { icon: "🪔", title: "Tilakotsav", time: "11:00 AM onwards" },
                { icon: "💍", title: "Sagai & Sangeet", time: "6:00 PM onwards" } ] },
    { date: "9", month: "Dec", weekday: "Wednesday", venue: "deoghar",
      events: [ { icon: "🌼", title: "Haldi", time: "9:00 AM onwards" },
                { icon: "🔥", title: "Wedding Ceremony", time: "6:00 PM onwards", highlight: true } ] },
    { date: "11", month: "Dec", weekday: "Friday", venue: "gaya",
      events: [ { icon: "🥂", title: "Reception", time: "" } ] }
  ],

  rsvp: {
    note: "Kindly confirm your presence so we can welcome you with love.",
    // WhatsApp number with country code, no + or spaces  (CHANGE THIS)
    whatsapp: "919999999999"
  },

  // Put your mp3 in the assets folder as song.mp3
  song: { file: "assets/song.mp3", title: "Our Wedding Song" },

  hashtag: "#AyushWedsPriyanka"
};
