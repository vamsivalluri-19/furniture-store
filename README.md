# VR Furniture Store - Premium Wood Catalog & VR Showroom

A premium, interactive web application featuring a catalog of luxury timber furniture. The application is built using a Flask backend, SQLite database (with SQLAlchemy), and a highly polished, responsive front-end styled with Vanilla CSS and modern interactive Javascript. The store has been rebranded to **VR Furniture**, showcasing a virtual showroom with a simulated 3D VR environment.

## 🌟 Key Features

### 1. Immersive VR 3D Showcase
- **VR Room Stage**: Click "Enter VR Interactive Preview" from any product to enter a dark-room VR environment styled with a glowing neon grid floor in 3D perspective.
- **HUD Viewport Controls**: Zoom in/out to inspect fine wood grains, and rotate the furniture item left or right in 3D perspective.
- **Dynamic Bindings**: Instantly binds names and high-resolution assets to the VR workspace.

### 2. Premium Timber Materials Guide
- Dedicated **Wood Craftsmanship Showcase** on the homepage featuring custom CSS simulated wood grains for:
  - **Burmese Teak**: High-moisture resistance, gold-brown hue, Janka hardness of 1,070 lbf.
  - **Honduran Mahogany**: Reddish-brown cabinet timber, highly stable, Janka hardness of 900 lbf.
  - **European White Oak**: Prominent ray flecks, robust structure, Janka hardness of 1,360 lbf.
  - **American Walnut**: Premium deep chocolate and caramel tones, Janka hardness of 1,010 lbf.
  - **Indian Rosewood (Sheesham)**: High density, bold contrasting streaks, Janka hardness of 1,660 lbf.
- Integrated filters on the **VR Showroom** page to sort items instantly by their wood type.

### 3. Database Integrations & Security
- **SQLite Database**: Full SQLAlchemy integration to store users and product catalog data.
- **Seeding Script**: Automatic database builder that pre-populates the SQLite catalog with handcrafted masterpieces upon the server's initial launch.
- **Authentication**: Session-based access control. User passwords are encrypted using `werkzeug.security` (PBKDF2-SHA256).

### 4. Rich Aesthetics & Customizations
- **Dual Themes**: Persistent light and dark mode toggling using CSS variables and local storage saving.
- **Frosted Glassmorphism**: Cards and overlays designed using CSS `backdrop-filter`.
- **Product Details Modal**: Allows custom choice of varnish (Natural Oil, Matte Wax, Glossy Lacquer) and item quantities.

---

## 🛠️ Technology Stack

- **Backend**: Python 3.11, Flask, Flask-SQLAlchemy, Flask-CORS, python-dotenv
- **Frontend**: HTML5, Vanilla CSS3, Javascript (ES6), FontAwesome Icons, Google Fonts (Outfit & Inter)
- **Database**: SQLite3

---

## 📂 Project Structure

```text
furniture-store/
│
├── backend/
│   ├── instance/
│   │   └── database.db           # SQLite Database file
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css         # Custom responsive design system
│   │   ├── js/
│   │   │   └── main.js           # VR HUD, modals & theme scripts
│   │   └── images/
│   │       ├── hero_bg.jpg       # AI generated photorealistic assets
│   │       ├── teak_dining.jpg
│   │       ├── mahogany_desk.jpg
│   │       ├── walnut_coffee.jpg
│   │       └── oak_bed.jpg
│   │
│   ├── templates/                # Jinja2 HTML layout templates
│   │   ├── base.html             # Common navigation and footers
│   │   ├── home.html             # Homepage & Wood guide showcase
│   │   ├── shop.html             # Product grid & VR modal HUD
│   │   ├── contact.html          # Contact page and contact forms
│   │   ├── login.html            # Glassmorphism sign-in card
│   │   └── register.html         # Sign-up page
│   │
│   ├── app.py                    # Flask server entrypoint (routing/seeding)
│   ├── models.py                 # SQLAlchemy database schemas
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Flask environment settings
│
├── requirements.txt              # Global requirements
└── README.md                     # Detailed documentation
```

---

## 🚀 Setup & Execution

### 1. Prerequisites
Ensure you have **Python 3.8+** installed.

### 2. Setup Dependencies
From the project root directory, run:
```bash
pip install -r requirements.txt
```

### 3. Launch the Server
Navigate into the `backend/` directory and run:
```bash
cd backend
python app.py
```
This automatically:
1. Creates the SQLite database structure if it doesn't exist.
2. Seeds the database tables with default luxury wood products.
3. Launches the local development server on **[http://127.0.0.1:5000/](http://127.0.0.1:5000/)**.

---

## 💻 Interface Guide

1. **Authentication**: Register a username and password. Logging in grants access to the shop and home routes.
2. **Theme Toggling**: Click the moon/sun icon in the top header action area to toggle themes. The preference will persist across reloads.
3. **VR Preview**: Open details for any item in the showroom, and click **Enter VR Interactive Preview** to view and rotate the item.
4. **Filters & Search**: Use the search input or filter pills (Teak, Walnut, Oak, etc.) to browse specific items.
