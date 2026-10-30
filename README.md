# Ayushi Dhiman — Handmade Portfolio

A responsive, gallery-style portfolio for a handmade artist. Built with HTML, CSS, and JavaScript. There is no shop, checkout, or payment functionality.

## Run in VS Code

1. Open this project folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey if it is not already installed.
3. Open `index.html`, then select **Go Live** in the VS Code status bar (or right-click the file and choose **Open with Live Server**).
4. The site opens in your browser. Keep the local server running while you use the page.

The Kalam and Lora fonts are loaded from Google Fonts; the portfolio artwork, including the interactive hero still life, is included locally as SVG illustrations. An internet connection is needed for the web fonts; if they cannot load, handwritten and serif system-font fallbacks are used. No build step or package installation is required.

## Make it yours

### Replace sample artwork with your photographs

- The `images` folder contains the included SVG sample illustrations. Replace any of them with your own optimized JPEG, PNG, or WebP photograph, keeping the same filename but changing its extension in `index.html`. Or add your photo to `images` and update its path.
- The artist illustration is in the **About Me** section. The process timeline and contact section also have image paths you can replace.
- Each portfolio card has both a visible image (`src`) and a larger modal image (`data-image`). Update both to the same photograph so the card and project detail stay in sync.
- Update the card's `alt` and `data-alt` text to describe your photograph, and change its name, category, and `data-description` to tell the story of your piece.
- For best results, use compressed WebP or optimized JPEG images. Portfolio images are displayed in a consistent crop; the modal shows a larger version.

The current images are original vector illustrations, not photographs of actual products. Swap in your own creation photos before publishing so the portfolio accurately represents your work.

### Update artist and contact details

Search `index.html` for `Ayushi Dhiman`, `your.email@gmail.com`, `+91 XXXXX XXXXX`, `your_instagram_id`, and `Your city, your country`. The name is set to Ayushi Dhiman; the mobile, Instagram ID, Gmail, and location are editable placeholders because the actual contact details have not been provided. Replace each placeholder in the visible contact details, footer links, and matching `href` values before publishing.

The WhatsApp button uses the international number in its `https://wa.me/` URL, digits only (country code included, with no `+`, spaces, or punctuation). Replace `91XXXXXXXXXX` in the WhatsApp link and the matching `tel:` link with your real number.

The contact form validates the fields in the browser and opens a prefilled email draft; the website itself does **not** send or store submissions. Replace `your.email@gmail.com` in `script.js` and in the contact/footer links with your real Gmail address. To deliver messages directly without opening the visitor's email app, connect a real email service or backend and update the form submission code accordingly.

### Add or change portfolio work

Each `.project-card` in `index.html` is a portfolio entry. Duplicate a card to add a piece, then update its `data-category`, `data-title`, `data-description`, `data-image`, `data-alt`, image `src`/`alt`, visible category and title, and its small project number. Category values must match a filter's `data-filter` in `index.html`. The **Everything** filter shows every card.

## Notes

- The hero pottery artwork tilts with pointer movement and can be rotated with a tap, click, or keyboard. It is a local SVG and does not require WebGL.
- The project modal, category filters, mobile navigation, email draft form, reduced-motion preference, and current-year footer are implemented in `script.js`. Scroll reveals and hover effects use CSS and the browser's Intersection Observer API.
- Ayushi Dhiman is the portfolio name. The contact links still contain editable placeholder details; replace them before publishing.
