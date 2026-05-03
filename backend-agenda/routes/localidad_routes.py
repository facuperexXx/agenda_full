from flask import Blueprint
from controllers.localidad_controller import *

localidad_bp = Blueprint('localidades_bp', __name__)

@localidad_bp.route('/')
def get_all(): return obtener_todos()

@localidad_bp.route('/nuevo', methods=['POST'])
def create_localidad(): return crear_localidad()

@localidad_bp.route('/buscar/<int:id>')
def get_localidad(id): return "Endpoint - Buscar registro Localidad con id"

@localidad_bp.route('/modificar/<int:id>', methods=['POST'])
def update_localidad(id): return "Endpoint - Modificar registro Localidad"

@localidad_bp.route('/eliminar/<int:id>', methods=['DELETE'])
def delete_localidad(id): return "Endpoint - Eliminar registro Localidad"