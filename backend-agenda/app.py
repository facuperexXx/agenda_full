import os
from flask import Flask
from config.dependencias import db, ma
from routes.localidad_routes import localidad_bp
from routes.contacto_routes import contacto_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Generacion de base de datos
base = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(base, 'database.db')

# Vinculacion de dependencias
db.init_app(app)
ma.init_app(app)

# Blueprints
app.register_blueprint(localidad_bp, url_prefix='/localidades')
app.register_blueprint(contacto_bp, url_prefix='/contactos')

@app.route('/')
def home():
    return "API en funcionamiento"

# Arranque de programa principal
if __name__ == '__main__':
   
    # Creacion de la tablas en base de datos
    with app.app_context():
        from models.Modelos import *
        db.create_all()

    app.run(debug=True, host="0.0.0.0", port=5000)