(function () {
  const W = WEDDING;
  const $ = (id) => document.getElementById(id);
  const names = W.groom + " & " + W.bride;
  const weddingDate = new Date(W.date);

  /* ---------- Fill text ---------- */
  document.title = names + " | Wedding Invitation";
  ["introNames", "heroNames", "footNames"].forEach((id) => ($(id).textContent = names));
  $("introDate").textContent = W.dateText;
  $("heroDate").textContent = W.dateText;
  $("heroPlace").textContent = W.city;
  $("blessing").textContent = W.blessing;
  $("heroPhoto").src = W.couplePhoto;
  $("groomName").textContent = W.groom;
  $("brideName").textContent = W.bride;
  const fam = (f) => esc(f.father) + " &amp; " + esc(f.mother);
  $("groomParents").innerHTML = "Son of<br><b>" + fam(W.groomFamily) + "</b>";
  $("brideParents").innerHTML = "Daughter of<br><b>" + fam(W.brideFamily) + "</b>";
  $("hashtag").textContent = W.hashtag;
  $("rsvpNote").textContent = W.rsvp.note;
  $("waLink").href =
    "https://wa.me/" + W.rsvp.whatsapp + "?text=" +
    encodeURIComponent("Namaste! I would love to attend " + names + "'s wedding. 🎉");

  $("timeline").innerHTML = W.days
    .map((d) => {
      const v = W.venues[d.venue];
      const evs = d.events
        .map((e) => `
        <div class="ev ${e.highlight ? "hl" : ""}">
          <span class="ev-icon">${e.icon}</span>
          <div>
            <h4>${esc(e.title)}</h4>
            <p>${e.time ? esc(e.time) : "Details to follow"}</p>
          </div>
        </div>`)
        .join("");
      return `
      <div class="day">
        <div class="date-badge"><b>${esc(d.date)}</b><span>${esc(d.month)}</span><small>${esc(d.weekday)}</small></div>
        <div class="day-body">${evs}<p class="day-venue">&#128205; ${esc(v.name)}, ${esc(v.address.split(",").slice(-3, -1).join(",").trim() || "")}</p></div>
      </div>`;
    })
    .join("");

  $("venueList").innerHTML = [
    ["Deoghar", "Mehandi · Tilakotsav · Sagai &amp; Sangeet · Haldi · Wedding", W.venues.deoghar],
    ["Gaya", "Reception · 11th December", W.venues.gaya]
  ]
    .map(
      ([city, what, v]) => `
    <div class="venue-card">
      <p class="venue-tag">${city}</p>
      <h4>${esc(v.name)}</h4>
      <p class="venue-what">${what}</p>
      <p>${esc(v.address)}</p>
      <a class="btn gold" href="${v.mapLink}" target="_blank" rel="noopener">&#128205; Get Directions</a>
    </div>`
    )
    .join("");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------- Countdown ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    let diff = weddingDate - new Date();
    if (diff <= 0) {
      $("countdown").innerHTML = '<p class="hero-date">Today is the day! 🎉</p>';
      return;
    }
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5); diff -= h * 36e5;
    const m = Math.floor(diff / 6e4); diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    $("cd-d").textContent = pad(d);
    $("cd-h").textContent = pad(h);
    $("cd-m").textContent = pad(m);
    $("cd-s").textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Music ---------- */
  const audio = $("song");
  const musicBtn = $("musicBtn");
  let musicOK = true;
  audio.src = W.song.file;
  audio.volume = 0.6;
  audio.addEventListener("error", () => { musicOK = false; musicBtn.hidden = true; });

  function setPlaying(on) {
    musicBtn.classList.toggle("playing", on);
  }
  musicBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => {});
    else { audio.pause(); setPlaying(false); }
  });

  /* ---------- Open invitation ---------- */
  $("openBtn").addEventListener("click", () => {
    $("intro").classList.add("open");
    document.body.classList.remove("locked");
    setTimeout(() => ($("intro").style.display = "none"), 900);
    if (musicOK) {
      musicBtn.hidden = false;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Petals ---------- */
  const petals = $("petals");
  const icons = ["🌸", "🌺", "🌼", "✨"];
  const count = window.innerWidth < 600 ? 14 : 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.textContent = icons[i % icons.length];
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = 12 + Math.random() * 14 + "px";
    p.style.animationDuration = 9 + Math.random() * 10 + "s";
    p.style.animationDelay = -Math.random() * 15 + "s";
    petals.appendChild(p);
  }

  /* ---------- Add to calendar (.ics) ---------- */
  $("calBtn").addEventListener("click", () => {
    const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(weddingDate.getTime() + 4 * 36e5);
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//EN", "BEGIN:VEVENT",
      "UID:" + Date.now() + "@wedding",
      "DTSTAMP:" + fmt(new Date()),
      "DTSTART:" + fmt(weddingDate),
      "DTEND:" + fmt(end),
      "SUMMARY:Wedding of " + names,
      "LOCATION:" + W.venues.deoghar.name + "\\, " + W.venues.deoghar.address.replace(/,/g, "\\,"),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "wedding.ics";
    a.click();
  });

  /* ---------- RSVP (Netlify Forms) ---------- */
  $("rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const body = new URLSearchParams(new FormData(form)).toString();
    fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })
      .then((r) => { if (!r.ok) throw new Error(); form.reset(); $("rsvpThanks").hidden = false; })
      .catch(() => alert("Could not send right now. Please use the WhatsApp link below."));
  });
})();
