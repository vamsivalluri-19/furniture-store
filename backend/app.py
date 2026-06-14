from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from models import db, User, Product

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "mysecretkey_furniture_store")

# Configure database
base_dir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(base_dir, 'database.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

def seed_database():
    # Create tables
    db.create_all()
    
    # Seed products if empty
    if Product.query.count() == 0:
        products = [
            Product(
                name="Burmese Teak Dining Table",
                price=899.00,
                wood_type="Teak",
                description="Crafted from premium grade-A Burmese Teak, this 6-seater dining table showcases exceptional grain depth and rich golden tones. Known for its legendary durability and natural resistance to elements, it features a hand-polished oil finish that enhances the wood's organic character.",
                image="/static/images/teak_dining.jpg"
            ),
            Product(
                name="Teak Adirondack Lounge Chair",
                price=320.00,
                wood_type="Teak",
                description="Designed for ultimate outdoor or indoor comfort. Made from sustainably sourced plantation teak with stainless steel hardware. This chair naturally repels moisture and pests, aging gracefully over time to a silver-grey patina if left unsealed.",
                image="/static/images/teak_chair.jpg"
            ),
            Product(
                name="Mahogany Executive Double-Pedestal Desk",
                price=1250.00,
                wood_type="Mahogany",
                description="Command respect in your home office with this mahogany masterpiece. Features a deep reddish-brown luster, elegant hand-carved edge details, and drawers lined with premium felt. Mahogany is selected for its superior stability and lack of soft spots.",
                image="/static/images/mahogany_desk.jpg"
            ),
            Product(
                name="Classic Mahogany Wardrobe",
                price=1450.00,
                wood_type="Mahogany",
                description="An heirloom-quality piece with rich grain matching. Offers double hanging space, three integrated drawers with dovetail joints, and solid brass locks. The mahogany wood is sealed with a semi-gloss protective coat.",
                image="/static/images/mahogany_wardrobe.jpg"
            ),
            Product(
                name="European White Oak Platform Bed",
                price=799.00,
                wood_type="Oak",
                description="A minimalist platform bed showcasing the strength and beauty of European White Oak. The prominent grain and light straw-colored tones offer a modern Scandinavian aesthetic, complemented by solid wooden slat support.",
                image="/static/images/oak_bed.jpg"
            ),
            Product(
                name="Rustic Oak Five-Tier Bookshelf",
                price=420.00,
                wood_type="Oak",
                description="Constructed from rustic American Oak, this bookshelf highlights natural knotting and strong oak fibers. Finished in a matte wire-brushed texture for a weathered, tactile feel. Built to last generations.",
                image="/static/images/oak_bookshelf.jpg"
            ),
            Product(
                name="Live-Edge American Walnut Coffee Table",
                price=550.00,
                wood_type="Walnut",
                description="Each coffee table is unique, highlighting the natural live edge of American Black Walnut. The dark chocolate and caramel hues are accentuated by a premium satin wax finish, supported by minimalist industrial steel hairpin legs.",
                image="/static/images/walnut_coffee.jpg"
            ),
            Product(
                name="Mid-Century Walnut Credenza",
                price=1100.00,
                wood_type="Walnut",
                description="A stunning sideboard featuring book-matched walnut veneers and solid walnut legs. Offers soft-close cabinet doors and shelving, displaying the rich, dark, fine-grained beauty walnut is highly prized for.",
                image="/static/images/walnut_sideboard.jpg"
            ),
            Product(
                name="Indian Rosewood Entryway Console Table",
                price=480.00,
                wood_type="Rosewood",
                description="Crafted from Indian Rosewood (Sheesham), this console table is defined by its dramatic, high-contrast dark and golden streaks. Its dense structure provides exceptional durability, making it ideal for high-traffic entryways.",
                image="/static/images/rosewood_console.jpg"
            )
        ]
        db.session.bulk_save_objects(products)
        db.session.commit()
        print("Database seeded with products successfully!")

with app.app_context():
    seed_database()

@app.route("/")
def index():
    if "user" in session:
        return redirect(url_for("home"))
    return redirect(url_for("login"))

@app.route("/register", methods=["GET", "POST"])
def register():
    if "user" in session:
        return redirect(url_for("home"))
        
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Username and password are required.", "danger")
            return render_template("register.html")

        # Check database
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash("Username already exists! Please choose another.", "danger")
            return render_template("register.html")

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        flash("Registration successful! Please log in.", "success")
        return redirect(url_for("login"))
        
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if "user" in session:
        return redirect(url_for("home"))

    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "").strip()

        if not username or not password:
            flash("Please enter both username and password.", "danger")
            return render_template("login.html")

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session["user"] = username
            flash("Logged in successfully!", "success")
            return redirect(url_for("home"))
        else:
            flash("Invalid username or password!", "danger")
            return render_template("login.html")
            
    return render_template("login.html")

@app.route("/home")
def home():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("home.html", user=session["user"])

@app.route("/shop")
def shop():
    if "user" not in session:
        return redirect(url_for("login"))
    
    wood_filter = request.args.get("wood", "All")
    search_query = request.args.get("q", "").strip()
    
    query = Product.query
    if wood_filter != "All":
        query = query.filter_by(wood_type=wood_filter)
    if search_query:
        query = query.filter(Product.name.like(f"%{search_query}%") | Product.description.like(f"%{search_query}%"))
        
    products = query.all()
    
    # Get distinct wood types for filter buttons
    wood_types = ["Teak", "Mahogany", "Oak", "Walnut", "Rosewood"]
    
    return render_template("shop.html", products=products, wood_types=wood_types, active_wood=wood_filter, search_query=search_query, user=session["user"])

@app.route("/contact")
def contact():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("contact.html", user=session["user"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    flash("Logged out successfully.", "info")
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
