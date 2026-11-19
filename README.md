# Wedding Invitation Website

A responsive, animated wedding invitation: welcome screen, background music, countdown, events, venue map, RSVP form and add-to-calendar. Plain HTML/CSS/JS, so there is no build step.

## 1. Customize
Edit **`js/config.js`** only: names, families, schedule, venues, WhatsApp number (change `919999999999`), hashtag.
Couple photo is `assets/couple.jpg` (replace to change).
Add your song as **`assets/song.mp3`**.

## 2. Test locally
Open `index.html` in a browser, or run:
```bash
npx serve .
```

## 3. Push to GitHub
```bash
git init
git add .
git commit -m "Add wedding invitation website"
git branch -M main
git remote add origin https://github.com/<your-username>/wedding-invite.git
git push -u origin main
```

## 4. Deploy on Netlify
1. Netlify → **Add new site → Import an existing project → GitHub** → pick this repo.
2. Build command: *(leave empty)*. Publish directory: `.`
3. Click **Deploy**. Share the `*.netlify.app` link (rename it under *Site settings → Change site name*).

### RSVP responses
Netlify Forms is already set up. After deploy, open **Site → Forms → rsvp** to see replies (you can enable email notifications there).

## Notes
- Browsers block autoplay, so music starts when guests tap **Open Invitation**.
- Update the date in `config.js` and the countdown changes automatically.
