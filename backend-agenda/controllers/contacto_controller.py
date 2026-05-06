from models.Respuesta import respuesta_schema, Respuesta
from services.contacto_service import *
from schemas.contacto_schema import contacto_schema, contactos_schema
from flask import jsonify, request

def obtener_todos():
    contactos = obtener_todos_service()

    # Verifica recoleccion de datos
    if not contactos:
        resp = Respuesta(False, [], message="No se obtuvieron datos", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404
    
    # Filtro superado - se crea respuesta con datos
    ok = True
    count = len(contactos)
    data = contactos_schema.dump(contactos)
    message = ""

    # Creacion de respuesta
    respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

    # Se envia respuesta serializada
    return jsonify(respuesta_schema.dump(respuesta))

def crear_contacto():
    try: 
        nuevo_contacto = contacto_schema.load(request.json) 

        crear_contacto_service(nuevo_contacto)

        # Contacto guardado - creacion de respuesta
        ok = True
        data = [contacto_schema.dump(nuevo_contacto)]
        count = len(data)
        message = "Contacto creado"

        respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

        return jsonify(respuesta_schema.dump(respuesta))

    except:
        resp = Respuesta(False, [], message="No se creo el contacto", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404

def buscar_contacto(id:int):
    try:
        contacto = [ buscar_por_id_service(id) ]

        if not contacto:
            resp = Respuesta(False, [], message="No se encontro registro", count=0)
            return jsonify(respuesta_schema.dump(resp)), 404
        
        # Registro obtenido 
        data = contactos_schema.dump(contacto) 
        ok = True
        count = len(contacto)
        message = "Contacto obtenido"

        respuesta = respuesta_schema.make_respuesta(ok, data, message, count)

        return jsonify(respuesta_schema.dump(respuesta))

    except:
        resp = Respuesta(False, [], message="Error de consulta - Contacto controlador ", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404
    
def eliminar_contacto(id:int):
    try:
        exite = verificar_existencia_service(id)

        if exite:
            eliminar_contacto_service(id)

            resp = Respuesta(True, [], message="Registro eliminado ", count=0)
            return jsonify(respuesta_schema.dump(resp))
        
        # Registro no encontrado 
        resp = Respuesta(False, [], message="Registro no existe", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    

    except:
        resp = Respuesta(False, [], message="No se elimino el registro - contacto controller", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    
    
def modificar_contacto(id:int):
    try:
        existe = verificar_existencia_service(id)

        if existe:
            datos = request.json

            modificar_contacto_service(datos, id)

            registro_actualizado = [ buscar_por_id_service(id) ]

            # Creacion de la respuesta
            ok = True
            data = contactos_schema.dump(registro_actualizado)
            count = len(data)
            message = "Registro modificado"

            respuesta = respuesta_schema.make_respuesta(ok, data, message, count)
            return jsonify(respuesta_schema.dump(respuesta))

    except:
        # Registro no encontrado 
        resp = Respuesta(False, [], message="Registro no existe", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    