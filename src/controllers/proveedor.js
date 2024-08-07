const ListaMateriales = require('../servicios/lista_materiales_service.js');
const Proveedores = require('../servicios/proveedores_service.js');
const Presupuesto = require('../servicios/presupuestos_service.js');

exports.obtenerProveedor = async (req, res) => {
  const { cuit } = req.params
  const result = await Proveedores.obtenerProveedor(cuit);
  res.status(200).send(result)
}

exports.obtenerMaterialesProveedor = async (req, res) => {
  const { cuit } = req.params
  const result = await Proveedores.obtenerMaterialesProveedor(cuit);
  res.status(200).send(result)
}

exports.obtenerListadosPendiente = async (req, res) => {
  const { cuit } = req.params
  const result = await Proveedores.obtenerListadoPendiente(cuit)
  const listados = result.listadoPendiente
  let listadosMateriales = Array()
  let lista = Array();
  for (let i = 0; i < listados.length; i++) {
    lista = await ListaMateriales.obtenerListaMateriales(listados[i])
    listadosMateriales.push({
      idListado: listados[i],
      materiales: lista
    })
  }
  res.status(200).send(listadosMateriales)
}

exports.presupuestoProveedor = async (cuit, listaId, vencimiento) => {
  const listaMateriales = await ListaMateriales.obtenerListaMateriales(listaId)
  let presupuestoMateriales = Array();
  let precioFinal = 0
  const infoProveedor = await Proveedores.obtenerInformacionProveedor(cuit)
  const listaMaterialesProveedor = await Proveedores.obtenerMaterialesProveedor(cuit);
  // console.log(listaMaterialesProveedor);
  listaMateriales.materiales.forEach(material => {
    // console.log(material);
    for (let i = 0; i < listaMaterialesProveedor.length; i++) {
      if(listaMaterialesProveedor[i].nombre.includes(material.nombre) && 
         listaMaterialesProveedor[i].stock >= parseInt(material.cantidad) && 
         listaMaterialesProveedor[i].marca === material.marca ){ // listaMaterialesProveedor[i].nombre
        // console.log("cumple todo")
        let precio = material.cantidad * listaMaterialesProveedor[i].precio
        presupuestoMateriales.push({
            nombre: listaMaterialesProveedor[i].nombre, 
            marca: listaMaterialesProveedor[i].marca,
            categoria: listaMaterialesProveedor[i].categoria,
            unidad: listaMaterialesProveedor[i].unidad,
            cantidad: material.cantidad,
            precio: precio
          })
        precioFinal += precio
        }
        // console.log(presupuestoMateriales);
      }
      
    });
    
  let presupuesto = {
    listaId: listaId,
    nombreProveedor: infoProveedor.nombreProveedor,
    reputacion: infoProveedor.reputacion,
    tiempoEntrega: infoProveedor.tiempoEntrega,
    vencimiento: vencimiento,
    precioTotal: precioFinal,
    precioEnvio: infoProveedor.precioEnvio,
    materiales: presupuestoMateriales
  }
  const idPresupuesto = await Presupuesto.guardarPresupuesto(presupuesto)
  return idPresupuesto 
}

exports.generarPresupuesto = async (req, res) => {
  const { listaId, vencimiento } = req.body
  const { cuit } = req.params
  const idPresupuesto =  await exports.presupuestoProveedor(cuit, listaId, vencimiento)
  await Proveedores.eliminarDelListadoPendiente(cuit, listaId)
  res.status(200).send({
    idPresupuesto: idPresupuesto,
    message: "Presupuestos generado correctamente."
  })
}

