const { UUID } = require('mongodb');
const ListaMateriales = require('../servicios/lista_materiales_service.js');
const Proveedores = require('../servicios/proveedores_service.js');

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

exports.generarPresupuesto = async (req, res) => {
  const { listaId, vencimiento } = req.body
  const { cuit } = req.params
  const listaMateriales = await ListaMateriales.obtenerListaMateriales(listaId)

  let presupuestoMateriales = Array();
  let precioFinal = 0
  const infoProveedor = await Proveedores.obtenerInformacionProveedor(cuit)
  const listaMaterialesProveedor = await Proveedores.obtenerMaterialesProveedor(cuit);
  listaMateriales.forEach(material => {
    for (let i = 0; i < listaMaterialesProveedor.length; i++) {
      if(listaMaterialesProveedor[i].nombre.includes(material.nombre) && listaMaterialesProveedor[i].stock >= material.cantidad){ // listaMaterialesProveedor[i].nombre
        let precio = material.cantidad * listaMaterialesProveedor[i].precio
        presupuestoMateriales.push({
            nombre: listaMaterialesProveedor[i].nombre, 
            marca: listaMaterialesProveedor[i].marca,
            categoria: listaMaterialesProveedor[i].categoria,
            cantidad: material.cantidad,
            precio: precio
          })
        precioFinal += precio
        }
      }
    });
  let presupuesto = {
    NombreProveedor: infoProveedor.nombreProveedor,
    reputacion: infoProveedor.reputacion,
    tiempoEntrega: infoProveedor.tiempoEntrega,
    vencimiento: vencimiento,
    precioTotal: precioFinal,
    precioEnvio: infoProveedor.precioEnvio,
    materiales: presupuestoMateriales
  }

  res.status(200).send(presupuesto)
}

