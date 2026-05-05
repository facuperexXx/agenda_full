from flask import Blueprint
from controllers.localidad_controller import *

localidad_bp = Blueprint('localidades_bp', __name__)

@localidad_bp.route('/', methods=['GET'])
def get_all(): return obtener_todos()

@localidad_bp.route('/nuevo', methods=['POST'])
def create_localidad(): return crear_localidad()

@localidad_bp.route('/buscar/<int:id>', methods=['GET'])
def get_localidad(id): return buscar_localidad(id)

@localidad_bp.route('/eliminar/<int:id>', methods=['DELETE'])
def delete_localidad(id): return eliminar_localidad(id)

@localidad_bp.route('/modificar/<int:id>', methods=['POST'])
def update_localidad(id): return modificar_localidad(id)
