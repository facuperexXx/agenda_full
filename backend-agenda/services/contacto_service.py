from models.Modelos import Contacto
from config.dependencias import db
from sqlalchemy import select, exists

def verificar_existencia_service(id:int):
    consulta = select(exists(Contacto).where(Contacto.id == id))
    existe = db.session.scalar(consulta)

    return existe

def obtener_todos_service():
    # Creo la consulta
    consulta = select(Contacto)

    # Ejecucion de la consulta
    resultado = db.session.execute(consulta)

    # Se entrega los registrs como objetos 
    return resultado.scalars().all()

def crear_contacto_service(nuevo:Contacto):
    db.session.add(nuevo)
    db.session.commit()

    return nuevo

def buscar_por_id_service(id:int):
    consulta = select(Contacto).where(Contacto.id == id)

    resultado = db.session.execute(consulta).scalar_one_or_none()

    return resultado

def eliminar_contacto_service(id:int):
    registro = buscar_por_id_service(id)
    
    db.session.delete(registro)
    db.session.commit()

def modificar_contacto_service(datos:dict, id:int):
    contacto = buscar_por_id_service(id)

    for key, valor in datos.items():
        if hasattr(contacto, key):
            setattr(contacto, key, valor)

    db.session.commit()