from flask import Blueprint

contacto_bp = Blueprint('contacto_bp', __name__)

@contacto_bp.route('/')
def home(): return "Endpoint Home - Entrega todos los registros Contacto"

@contacto_bp.route('/nuevo')
def create_contacto(): return "Endpoint - Crear nuevo registro Contacto"

@contacto_bp.route('/buscar')
def get_contacto(): return "Endpoint - Buscar registro Contacto con id"

@contacto_bp.route('/modificar')
def update_contacto(): return "Endpoint - Modificar registro Contacto"

@contacto_bp.route('/eliminar')
def delete_contacto(): return "Endpoint - Eliminar registro Contacto"