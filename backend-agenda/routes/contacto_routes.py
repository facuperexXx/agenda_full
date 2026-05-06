from flask import Blueprint
from controllers.contacto_controller import *

contacto_bp = Blueprint('contacto_bp', __name__)

@contacto_bp.route('/', methods=['GET'])
def home(): return obtener_todos()

@contacto_bp.route('/nuevo', methods=['POST'])
def create_contacto(): return crear_contacto()

@contacto_bp.route('/buscar/<int:id>', methods=['GET'])
def get_contacto(id): return buscar_contacto(id)

@contacto_bp.route('/eliminar/<int:id>', methods=['DELETE'])
def delete_contacto(id): return eliminar_contacto(id)

@contacto_bp.route('/modificar/<int:id>', methods=['POST'])
def update_contacto(id): return modificar_contacto(id)
