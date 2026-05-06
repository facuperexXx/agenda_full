from models.Respuesta import respuesta_schema, Respuesta
from services.localidad_service import *
from schemas.localidad_schema import localidad_schema, localidades_schema
from flask import jsonify, request

def obtener_todos():
    localidades = obtener_todos_service()

    # Verifica recoleccion de datos
    if not localidades:
        resp = Respuesta(False, [], message="No se obtuvieron datos", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404
    
    # Filtro superado - se crea respuesta con datos
    ok = True
    count = len(localidades)
    data = localidades_schema.dump(localidades)
    message = ""

    # Creacion de respuesta
    respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

    # Se envia respuesta serializada
    return jsonify(respuesta_schema.dump(respuesta))

def crear_localidad():
    try:
        # Verificacion de la estructura de datos
        localidad = localidad_schema.load(request.json)

        # Envio de datos para guardar
        nueva_localidad = crear_localidad_service(localidad)

        # Creacion de la respuesta
        ok = True
        data = [localidad_schema.dump(nueva_localidad)]
        count = len(data)
        message = ""

        respuesta = respuesta_schema.make_respuesta(ok, count=count, data=data, message=message)

        return jsonify(respuesta_schema.dump(respuesta))

    except:
            resp = Respuesta(False, [], message="No se creo el registro Localidad", count=0)
            return jsonify(respuesta_schema.dump(resp)), 404
  
def buscar_localidad(id):
    try:
        localidad = [ buscar_por_id_service(id) ] # Devuelve un solo registro - Lo meto en una lista

        # Verificacion de existencia de registro
        if not localidad:
            resp = Respuesta(False, [], message="No se encontro registro", count=0)
            return jsonify(respuesta_schema.dump(resp)), 404

        # Filtro pasado - registro obtenido
        data = localidades_schema.dump(localidad) 
        ok = True
        count = len(localidad)
        message = "Localidad obtenida"

        respuesta = respuesta_schema.make_respuesta(ok, data, message, count)

        return jsonify(respuesta_schema.dump(respuesta))

    except:
        resp = Respuesta(False, [], message="Error de consulta - Localidad controlador", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404

def eliminar_localidad(id):
    try:
        existe = verificar_existencia_service(id)

        # Filtro de existencia - eliminacion de registro
        if existe:
            eliminar_localidad_service(id)

            resp = Respuesta(True, [], message="Registro eliminado", count=0)
            return jsonify(respuesta_schema.dump(resp))

        # Registro no encontrado 
        resp = Respuesta(False, [], message="Registro no existe", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    

    except:
        resp = Respuesta(False, [], message="No se elimino el registro - localidad controller", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    

def modificar_localidad(id):
    try:
        existe = verificar_existencia_service(id)
        
        # Filtro de existencia 
        if existe:
            datos = request.json
            
            modificar_localidad_service(datos, id)
            
            # Se recupera registro con cambios
            registro_actualizado = [ buscar_por_id_service(id) ]

            # Creacion de la respuesta
            ok = True
            data = localidades_schema.dump(registro_actualizado)
            count = len(data)
            message = "Registro modificado"

            respuesta = respuesta_schema.make_respuesta(ok, data, message, count)
            return jsonify(respuesta_schema.dump(respuesta))

    except:
        # Registro no encontrado 
        resp = Respuesta(False, [], message="Registro no existe", count=0)
        return jsonify(respuesta_schema.dump(resp)), 404    
