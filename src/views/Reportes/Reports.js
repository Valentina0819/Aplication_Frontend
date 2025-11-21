import React, { useState } from 'react'
    import {
    CContainer,
    CAvatar,
    CCard,
    CCardBody,
    CFormInput,
    CButton,
    CCardHeader,
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CForm,
    CHeader,
    } from '@coreui/react'

    import CIcon from '@coreui/icons-react'
    import { cilUser, cilEnvelopeOpen, cilLockLocked, cilClock } from '@coreui/icons'

    const API_BASE = 'http://localhost:4000'
    const API_FACTURAS = `${API_BASE}/facturas`
    const API_REPORTES = `${API_BASE}/reportes`


    export const Reports = () => {
    // ------------------ TOAST ------------------
    const [toasts, setToasts] = useState([])

    const showToast = (type, message) => {
        setToasts((prev) => [...prev, { id: Date.now(), type, message }])
    }

    // ------------------ MODAL ------------------
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)

    const openModal = (type) => {
        setModalType(type)
        setModalVisible(true)
    }

    // ------------------ FACTURAS ------------------
    const [facturaId, setFacturaId] = useState("")
    const [cart, setCart] = useState([])
    const [facturaDatos, setFacturaDatos] = useState(null)

    // --------- CARGAR Factura DESDE API ---------
    const cargarFactura = async () => {
        if (!facturaId.trim()) {
        showToast("warning", "Debe ingresar un ID de factura.")
        return
        }

        try {
        const resp = await fetch(`${API_FACTURAS}/${facturaId}`)

        if (!resp.ok) {
            showToast("danger", "No existe una factura con ese ID.")
            return
        }

        const factura = await resp.json()

        // Pedidos puede guardar las líneas en `lines` (nuevo) o `productos` (antiguo)
        const items = factura.lines ?? factura.productos ?? []

        // Normalizamos cada item a campos { nombre, cantidad, precio }
        const normalized = items.map((it) => ({
            nombre: it.nombre ?? it.producto ?? it.name ?? '',
            cantidad: Number(it.cantidad ?? it.qty ?? 0),
            precio: Number(it.precio ?? it.Precio_Unit ?? it.price ?? 0),
            raw: it,
        }))

        setFacturaDatos(factura)
        setCart(normalized)

        showToast("success", "Factura cargada correctamente.")
        } catch (err) {
        console.error(err)
        showToast("danger", "No se pudo conectar con el servidor.")
        }
    }

    // ------------------ ELIMINAR PRODUCTO ------------------
    const removeFromCart = (index) => {
        const updated = cart.filter((_, i) => i !== index)
        setCart(updated)
        showToast("warning", "Producto eliminado.")
    }

    // ------------------ TOTALES ------------------
    const subtotal = cart.reduce((acc, item) => {
        const precio = Number(item.precio) || 0
        const cantidad = Number(item.cantidad) || 0
        return acc + precio * cantidad
    }, 0)

    const impuesto = subtotal * 0.16
    const total = subtotal + impuesto

    // ------------------ GUARDAR FACTURA ------------------
    const saveItem = async () => {
        if (!facturaDatos) {
        showToast("danger", "No hay datos de la factura para guardar.")
        return
        }

        if (cart.length === 0) {
        showToast("danger", "La factura no contiene productos.")
        return
        }

        const facturaAGuardar = {
        pedidoId: facturaDatos.id, // ⚠️ corregido
        productos: cart.map((c) => ({
            nombre: c.nombre,
            cantidad: c.cantidad,
            precio: c.precio,
        })),
        subtotal,
        impuesto,
        total,
        fecha: new Date().toISOString(),
        }

        try {
        const resp = await fetch(API_FACTURAS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(facturaAGuardar),
        })

        if (!resp.ok) {
            showToast("danger", "No se pudo guardar la factura.")
            return
        }

        showToast("success", "Factura generada correctamente.")
        setModalVisible(false)
        } catch (err) {
        console.error(err)
        showToast("danger", "Error de conexión con el servidor.")
        }
    }




    return (
        <>

        
        <CCard>
            <CCardBody>

        <h1 className="mb-1">Provisional</h1>
        <br></br>
            </CCardBody>
        </CCard>

        </>
    )
    }
    export default Reports

    //PROVISIONAL FALTA IMPLEMENTAR 