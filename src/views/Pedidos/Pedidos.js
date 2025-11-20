        import React, { useEffect, useState } from 'react'
        import {
        CCard,
        CCardBody,
        CCardHeader,
        CContainer,
        CRow,
        CCol,
        CForm,
        CFormLabel,
        CFormInput,
        CFormSelect,
        CButton,
        CTable,
        CTableHead,
        CTableRow,
        CTableHeaderCell,
        CTableBody,
        CTableDataCell,
        CModal,
        CModalHeader,
        CModalTitle,
        CModalBody,
        CToast,
        CToastBody,
        CToastHeader,
        CToaster,
        CInputGroup,
        CInputGroupText
        } from '@coreui/react'
    
        import CIcon from '@coreui/icons-react'
        import { cilTrash, cilPlus, cilPencil } from '@coreui/icons'
    
        // Pedidos - CRUD completo usando json-server
        // Requisitos: json-server con endpoints /products y /pedidos corriendo en http://localhost:3000
    
        const API_BASE = 'http://localhost:4000'
        const API_PRODUCTS = `${API_BASE}/products`
        const API_PEDIDOS = `${API_BASE}/pedidos`
    
        const emptyForm = () => ({
        cliente: '',
        rif: '',
        direccionFactura: '',
        direccionEntrega: '',
        sucursal: '',
        fechaCancelacion: '',
        expiracion: '',
        terminosPago: 'Contado',
        tasa: '',
        transporte: ''
        })
    
        const Pedidos = () => {
        // Toasts
        const [toasts, setToasts] = useState([])
        const showToast = (type, message) => {
            setToasts((prev) => [...prev, { id: Date.now(), type, message }])
        }
    
        // Modal
        const [modalVisible, setModalVisible] = useState(false)
        const [modalType, setModalType] = useState(null) // 'create' | 'edit' | 'delete' | 'addProduct'
        const [selectedPedido, setSelectedPedido] = useState(null)
    
        // Form (pedido header)
        const [formData, setFormData] = useState(emptyForm())
    
        // Line items for current pedido
        const [lines, setLines] = useState([]) // { id, productoId, nombre, categoria, precio, cantidad, subtotal }
    
        // Products catalog (from json-server)
        const [products, setProducts] = useState([])
        const [filteredProducts, setFilteredProducts] = useState([])
        const [searchTerm, setSearchTerm] = useState('')
        const [categoryFilter, setCategoryFilter] = useState('')
        const [statusFilter, setStatusFilter] = useState('')
    
        // Pedidos list
        const [pedidos, setPedidos] = useState([])
    
        // Load products and pedidos once
        useEffect(() => {
            loadProducts()
            loadPedidos()
        }, [])
    
        // Fetch functions
        const loadProducts = async () => {
            try {
            const res = await fetch(API_PRODUCTS)
            const data = await res.json()
            setProducts(data)
            setFilteredProducts(data)
            } catch (err) {
            console.error(err)
            showToast('danger', 'No se pudieron cargar los productos')
            }
        }
    
        const loadPedidos = async () => {
            try {
            const res = await fetch(API_PEDIDOS)
            const data = await res.json()
            setPedidos(data)
            } catch (err) {
            console.error(err)
            showToast('danger', 'No se pudieron cargar los pedidos')
            }
        }
    
        // Helpers
        const resetForm = () => {
            setFormData(emptyForm())
            setLines([])
            setSelectedPedido(null)
        }
    
    
        const openModal = (type, item = null) => {
        setModalType(type)
        setModalVisible(true)
    
        // SOLO reseteamos si es una creación desde cero (Botón Nuevo Pedido)
        // Si es 'confirmar', mantenemos los datos que el usuario escribió
        if (type === 'create') {
            resetForm()
        }
    
        if (type === 'edit' && item) {
            setSelectedPedido(item)
            // ... (resto de tu lógica de edit) ...
            setFormData({
                cliente: item.cliente || '',
                rif: item.rif || '',
                direccionFactura: item.direccionFactura || '',
                direccionEntrega: item.direccionEntrega || '',
                sucursal: item.sucursal || '',
                fechaCancelacion: item.fechaCancelacion || '',
                expiracion: item.expiracion || '',
                terminosPago: item.terminosPago || 'Contado',
                tasa: item.tasa || '',
                transporte: item.transporte || ''
            })
            setLines(item.lines || [])
        }
    
        if (type === 'delete' && item) {
            setSelectedPedido(item)
        }
    
        if (type === 'addProduct') {
            // ... (tu lógica de addProduct) ...
            setSearchTerm('')
            setCategoryFilter('')
            setStatusFilter('')
            setFilteredProducts(products)
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
        const closeModal = () => {
            setModalVisible(false)
            setModalType(null)
            setSelectedPedido(null)
        }
    
        const handleFormChange = (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    
        // Line item operations
        const addProductLine = (product, qty = 1) => {
            const existing = lines.find((l) => l.productoId === product.id)
            if (existing) {
            // increment
            setLines((prev) => prev.map((l) => l.productoId === product.id ? { ...l, cantidad: l.cantidad + qty, subtotal: (l.cantidad + qty) * parseFloat(l.precio) } : l))
            } else {
            const line = {
                id: Date.now(),
                productoId: product.id,
                nombre: product.Nombre || product.name || 'Sin nombre',
                categoria: product.Categoria || product.category || '',
                precio: Number(product.Precio_Unit ?? product.price ?? 0),
                cantidad: Number(qty),
                subtotal: Number(qty) * Number(product.Precio_Unit ?? product.price ?? 0)
            }
            setLines((prev) => [...prev, line])
            }
            showToast('primary', 'Producto agregado correctamente')
            setModalVisible(false)
        }
    
        const removeLine = (lineId) => {
            setLines((prev) => prev.filter((l) => l.id !== lineId))
            showToast('danger', 'Línea eliminada')
        }
    
        const updateLineQuantity = (lineId, qty) => {
            setLines((prev) => prev.map((l) => l.id === lineId ? { ...l, cantidad: Number(qty), subtotal: Number(qty) * Number(l.precio) } : l))
        }
    
        const calculateTotals = () => {
            const subtotal = lines.reduce((s, l) => s + Number(l.subtotal || 0), 0)
            const taxRate = 0 // puedes calcular según tasa
            const taxes = subtotal * taxRate
            const total = subtotal + taxes
            return { subtotal, taxes, total }
        }
    
    
    //Crud
    
    const savePedido = async () => {
        // 1. Validaciones
        if (!formData.cliente) {
            showToast('danger', 'Cliente es obligatorio')
            return
        }
        if (lines.length === 0) {
            showToast('danger', 'Agrega al menos un producto')
            return
        }
    
        // 2. Preparar Payload
        // json-server genera el ID automáticamente, no hace falta enviarlo si es nuevo
        const payload = { 
            ...formData, 
            lines,
            fechaCreacion: new Date().toISOString() // Es útil tener la fecha de registro
        }
    
        console.log("Enviando payload:", payload) // DEBUG: Ver qué enviamos en consola
    
        try {
            const res = await fetch(API_PEDIDOS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
    
            // 3. Detección de Errores HTTP (Importante)
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                throw new Error(`Error del servidor: ${res.status} ${res.statusText}`)
            }
    
            const data = await res.json()
            console.log("Respuesta del servidor:", data) // DEBUG: Ver confirmación
    
            showToast('success', 'Pedido guardado exitosamente')
            closeModal()
            loadPedidos() // Recargar la lista
            resetForm()
    
        } catch (err) {
            console.error("Error en savePedido:", err)
            showToast('danger', `Error guardando pedido: ${err.message}`)
        }
    }
    
    
    
    
    
    
    
    
    
    
        const updatePedido = async () => {
            if (!selectedPedido) return
            const payload = { ...formData, lines }
            try {
            await fetch(`${API_PEDIDOS}/${selectedPedido.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            showToast('primary', 'Pedido actualizado')
            closeModal()
            loadPedidos()
            resetForm()
            } catch (err) {
            console.error(err)
            showToast('danger', 'Error actualizando pedido')
            }
        }
    
        const deletePedido = async () => {
            if (!selectedPedido) return
            try {
            await fetch(`${API_PEDIDOS}/${selectedPedido.id}`, { method: 'DELETE' })
            showToast('danger', 'Pedido eliminado')
            closeModal()
            loadPedidos()
            } catch (err) {
            console.error(err)
            showToast('danger', 'Error eliminando pedido')
            }
        }
    
        // Search/filter products inside add product modal
        useEffect(() => {
            const q = searchTerm.trim().toLowerCase()
            const filtered = products.filter((p) => {
            const matchesSearch = !q || String(p.ID ?? p.id).toLowerCase().includes(q) || (String(p.Nombre || p.name || '').toLowerCase().includes(q))
            const matchesCategory = !categoryFilter || (p.Categoria || p.category) === categoryFilter
            const matchesStatus = !statusFilter || (p.Estatus || p.status) === statusFilter
            return matchesSearch && matchesCategory && matchesStatus
            })
            setFilteredProducts(filtered)
        }, [searchTerm, categoryFilter, statusFilter, products])
    
        const { subtotal, taxes, total } = calculateTotals()
    
        // Render
        return (
            <>
            <CContainer>
                <CCard className="mb-4">
                <CCardHeader>
                    <strong>Nuevo Presupuesto / Pedidos</strong>
                    <CButton color="primary" className="float-end" onClick={() => openModal('create')}>
                    Nuevo Pedido
                    </CButton>
                </CCardHeader>
    
                <CCardBody>
                    <CForm>
                    <CRow className="mb-4">
                        <CCol md={6}>
                        <CFormLabel>Cliente</CFormLabel>
                        <CFormInput name="cliente" value={formData.cliente} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>RIF</CFormLabel>
                        <CFormInput name="rif" value={formData.rif} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Dirección de factura</CFormLabel>
                        <CFormInput name="direccionFactura" value={formData.direccionFactura} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Dirección de entrega</CFormLabel>
                        <CFormInput name="direccionEntrega" value={formData.direccionEntrega} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Sucursal</CFormLabel>
                        <CFormInput name="sucursal" value={formData.sucursal} onChange={handleFormChange} className="mb-3" />
                        </CCol>
    
                        <CCol md={6}>
                        <CFormLabel>Fecha cancelación</CFormLabel>
                        <CFormInput type="date" name="fechaCancelacion" value={formData.fechaCancelacion} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Expiración</CFormLabel>
                        <CFormInput type="date" name="expiracion" value={formData.expiracion} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Términos de Pago</CFormLabel>
                        <CFormSelect name="terminosPago" value={formData.terminosPago} onChange={handleFormChange} className="mb-3">
                            <option>Contado</option>
                            <option>Crédito 15 días</option>
                        </CFormSelect>
    
                        <CFormLabel>Tasa</CFormLabel>
                        <CFormInput name="tasa" value={formData.tasa} onChange={handleFormChange} className="mb-3" />
    
                        <CFormLabel>Ruta de transporte</CFormLabel>
                        <CFormInput name="transporte" value={formData.transporte} onChange={handleFormChange} />
                        </CCol>
                    </CRow>
    
                    <CCard className="mt-4">
                        <CCardHeader>
                        <strong>Líneas del pedido</strong>
                        </CCardHeader>
    
                        <CCardBody>
                        <CTable hover bordered>
                            <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>ID</CTableHeaderCell>
                                <CTableHeaderCell>Producto</CTableHeaderCell>
                                <CTableHeaderCell>Categoría</CTableHeaderCell>
                                <CTableHeaderCell>Cantidad</CTableHeaderCell>
                                <CTableHeaderCell>Precio Unit.</CTableHeaderCell>
                                <CTableHeaderCell>Subtotal</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                            </CTableRow>
                            </CTableHead>
    
                            <CTableBody>
                            {lines.length === 0 ? (
                                <CTableRow>
                                <CTableDataCell colSpan={7} className="text-center">No hay líneas agregadas</CTableDataCell>
                                </CTableRow>
                            ) : (
                                lines.map((l) => (
                                <CTableRow key={l.id}>
                                    <CTableDataCell>{l.productoId}</CTableDataCell>
                                    <CTableDataCell>{l.nombre}</CTableDataCell>
                                    <CTableDataCell>{l.categoria}</CTableDataCell>
                                    <CTableDataCell>
                                    <CInputGroup>
                                        <CFormInput type="number" min={1} value={l.cantidad} onChange={(e) => updateLineQuantity(l.id, e.target.value)} />
                                        <CInputGroupText>u</CInputGroupText>
                                    </CInputGroup>
                                    </CTableDataCell>
                                    <CTableDataCell>{l.precio}</CTableDataCell>
                                    <CTableDataCell>{l.subtotal.toFixed(2)}</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                    <CButton size="sm" color="danger" onClick={() => removeLine(l.id)}>
                                        <CIcon icon={cilTrash} />
                                    </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                                ))
                            )}
                            </CTableBody>
                        </CTable>
    
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                            <CButton color="primary" onClick={() => openModal('addProduct')}>
                                <CIcon icon={cilPlus} className="me-2" /> Agregar producto
                            </CButton>
                            </div>
    
                            <div className="text-end">
                            <div>Subtotal: <strong>{subtotal.toFixed(2)}</strong></div>
                            <div>Impuestos: <strong>{taxes.toFixed(2)}</strong></div>
                            <div>Total: <strong>{total.toFixed(2)}</strong></div>
                            </div>
                        </div>
                        </CCardBody>
                    </CCard>
    
                    <div className="mt-4">
                        {/* CAMBIO AQUÍ: Usamos 'confirmar' en lugar de 'create' */}
                        <CButton type='button' color="success" onClick={() => openModal('confirmar')}>
                            Guardar Presupuesto
                        </CButton>
                        
                        <CButton type='button' color="secondary" className="ms-2" onClick={() => { resetForm(); showToast('primary', 'Formulario limpiado') }}>
                            Limpiar
                        </CButton>
                    </div>
    
    
    
    
    
    
                    </CForm>
    
                    {/* Lista de pedidos guardados */}
                    <CCard className="mt-4">
                    <CCardHeader>
                        <strong>Pedidos guardados</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable hover bordered>
                        <CTableHead>
                            <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Cliente</CTableHeaderCell>
                            <CTableHeaderCell>Sucursal</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {pedidos.map((p) => (
                            <CTableRow key={p.id}>
                                <CTableDataCell>{p.id}</CTableDataCell>
                                <CTableDataCell>{p.cliente}</CTableDataCell>
                                <CTableDataCell>{p.sucursal}</CTableDataCell>
                                <CTableDataCell className="text-center">
                                <CButton size="sm" color="primary" className="me-2" onClick={() => openModal('edit', p)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton size="sm" color="danger" onClick={() => openModal('delete', p)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                                </CTableDataCell>
                            </CTableRow>
                            ))}
                        </CTableBody>
                        </CTable>
                    </CCardBody>
                    </CCard>
    
                </CCardBody>
                </CCard>
            </CContainer>
    
            {/* TOASTER */}
            <CToaster placement="top-end">
                {toasts.map((t) => (
                <CToast key={t.id} autohide delay={2600} color={t.type} visible>
                    <CToastHeader closeButton>
                    <strong>{t.message}</strong>
                    </CToastHeader>
                    <CToastBody>Operación realizada correctamente.</CToastBody>
                </CToast>
                ))}
            </CToaster>
    
            {/* MODAL GENERAL */}
            <CModal visible={modalVisible} onClose={closeModal}>
                <CModalHeader>
                <CModalTitle>
                    {modalType === 'create' && 'Guardar Presupuesto'}
                    {modalType === 'edit' && 'Editar Pedido'}
                    {modalType === 'delete' && 'Eliminar Pedido'}
                    {modalType === 'addProduct' && 'Agregar Producto'}
                </CModalTitle>
                </CModalHeader>
    
                <CModalBody>
                {modalType === 'delete' && (
                    <>
                    <h5>¿Seguro que deseas eliminar este pedido?</h5>
                    <p className="fw-bold">{selectedPedido?.cliente}</p>
                    <div className="mt-3">
                        <CButton color="danger" onClick={deletePedido}>Eliminar</CButton>
                        <CButton color="secondary" className="ms-2" onClick={closeModal}>Cancelar</CButton>
                    </div>
                    </>
                )}
    
    
                {/* Agregamos || modalType === 'confirmar' a la condición */}
                {(modalType === 'create' || modalType === 'edit' || modalType === 'confirmar') && (
                    <>
                        <h5 className="mb-3">Confirma los datos del pedido</h5>
                        <div className="d-flex justify-content-end">
                            {/* Si es create O confirmar, usamos savePedido */}
                            {modalType === 'create' || modalType === 'confirmar' ? (
                                <CButton color="success" onClick={savePedido}>Guardar</CButton>
                            ) : (
                                <CButton color="primary" onClick={updatePedido}>Actualizar</CButton>
                            )}
                            <CButton color="secondary" className="ms-2" onClick={closeModal}>Cancelar</CButton>
                        </div>
                    </>
                )}
    
    
    
    
    
    
                {modalType === 'addProduct' && (
                    <>
                    <h5 className="mb-3">Buscar y agregar producto</h5>
    
                    <CForm className="mb-3">
                        <CRow className="g-3 align-items-end">
                        <CCol xs={12} md={4}>
                            <CFormLabel>Buscar (ID o Nombre)</CFormLabel>
                            <CFormInput placeholder="Ej: 1 o Laptop" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </CCol>
    
                        <CCol xs={12} md={4}>
                            <CFormLabel>Categoría</CFormLabel>
                            <CFormSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="">Todas</option>
                            {[...new Set(products.map(p => p.Categoria).filter(Boolean))].map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                            </CFormSelect>
                        </CCol>
    
                        <CCol xs={12} md={4}>
                            <CFormLabel>Estatus</CFormLabel>
                            <CFormSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">Todos</option>
                            {[...new Set(products.map(p => p.Estatus).filter(Boolean))].map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                            </CFormSelect>
                        </CCol>
                        </CRow>
                    </CForm>
    
                    <CTable hover striped>
                        <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>ID</CTableHeaderCell>
                            <CTableHeaderCell>Nombre</CTableHeaderCell>
                            <CTableHeaderCell>Categoría</CTableHeaderCell>
                            <CTableHeaderCell>Estatus</CTableHeaderCell>
                            <CTableHeaderCell>Acción</CTableHeaderCell>
                        </CTableRow>
                        </CTableHead>
                        <CTableBody>
                        {filteredProducts.length === 0 ? (
                            <CTableRow>
                            <CTableDataCell colSpan={5} className="text-center">No se encontraron productos</CTableDataCell>
                            </CTableRow>
                        ) : (
                            filteredProducts.map((prod) => (
                            <CTableRow key={prod.id ?? prod.ID}>
                                <CTableDataCell>{prod.id ?? prod.ID}</CTableDataCell>
                                <CTableDataCell>{prod.Nombre ?? prod.name}</CTableDataCell>
                                <CTableDataCell>{prod.Categoria ?? prod.category}</CTableDataCell>
                                <CTableDataCell>{prod.Estatus ?? prod.status}</CTableDataCell>
                                <CTableDataCell>
                                <CButton color="primary" size="sm" onClick={() => addProductLine(prod, 1)}>Agregar</CButton>
                                </CTableDataCell>
                            </CTableRow>
                            ))
                        )}
                        </CTableBody>
                    </CTable>
                    </>
                )}
                </CModalBody>
            </CModal>
            </>
        )
        }
    
        export default Pedidos
    