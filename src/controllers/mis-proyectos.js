import { getCorralones } from '../database/conecction.js';

// Hacer logica para generar los presupuestos en base a una lista de pedido
// 1. 'Enviar' una lista a corralones que se desea, ponemos los proveedores que tenemos cargados
// 2. De cada uno de los corralones ingresados obtener los materiales que corresponden a la lista enviada
//    en caso que no tenga algun material no pasa nada simplemente no lo tiene []
// 3. Crear la lista con los materiales que tiene cada uno de los proveedores []
// 4. Una vez obtenemos la lista de los materiales debemos comparar segun los filtros asignados:
// > precio total
// > disponibilidad (stock)
// > tiempo de entrega 
// > Calidad de material (se entiende por marca, o especificaciones en caso que las tenga)
// > Descuento, podemos hacer que el proveedor otorgue descuentos (a futuro pero me parece gran idea)
// > costo de envio
// > reputacion, aca tenemos que inventar algun sistema para puntuar o darle mas credito a algunos proveedores.
// 5. Se eligen los parametros para obtener el mejor presupuesto []
// 6. Logica de comparacion [] LO MAS DIFICIL
// 7. Mostramos los resultados []

// Posible pedido: 
// Cemento Portland - 200 bolsas
// Ladrillo común - 5000 unidades
// Cal Hidratada - 100 bolsas
// Arena - 50 m³
// Hierro del 8 - 1000 barras
// Proveedores:

// Los distintos casos que se dan
// Proveedor A (Corralón Premium): No tiene ninguno de los materiales mencionados.
// Proveedor B (Materiales El Triunfo): Tiene todos los materiales mencionados.
// Proveedor C (Los PicaPiedras): Tiene al menos dos de los materiales mencionados (ladrillo común y hierro del 8).
// Proveedor D (Materiales Yrigoyen): No tiene ninguno de los materiales mencionados.

export class ProyectoController {

  static async obtenerPresupuestos(listaMateriales){
    const data = await getCorralones();
    let listaPresupuestos = Array()
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      
    }
    return listaPresupuestos
  }
}