    import React, { useState } from 'react'
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
    } from '@coreui/react'

    import CIcon from '@coreui/icons-react'
    import { cilTrash } from '@coreui/icons'

    export const Pedidos = () => {
    // ---------------------- TOAST ---------------------- //
    const [toasts, setToasts] = useState([])

    const showToast = (type, message) => {
        setToasts((prev) => [...prev, { id: Date.now(), type, message }])
    }

    // ---------------------- MODAL ---------------------- //
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const openModal = (type, item = null) => {
        setModalType(type)
        setSelectedItem(item)
        setModalVisible(true)
    }

    // ---------------------- ACCIONES ---------------------- //
    const saveItem = () => {
        showToast("success", "Presupuesto registrado correctamente")
        setModalVisible(false)
    }

    const deleteItem = () => {
        showToast("danger", "Producto eliminado correctamente")
        setModalVisible(false)
    }
    
    const updateProduct = (prod) => {
        console.log("Producto agregado:", prod)
        showToast("primary", "Producto agregado Correctamente")
        setModalVisible(false)
    }

    // ----------- DATA DE PRODUCTOS PARA FILTRO ----------- //
    const products = [
        { ID: 1, Nombre: "Laptop HP", Categoria: "Tecnología", Estatus: "Disponible" },
        { ID: 2, Nombre: "Escritorio Ejecutivo", Categoria: "Mobiliario", Estatus: "Agotado" },
        { ID: 3, Nombre: "Silla giratoria", Categoria: "Oficina", Estatus: "Disponible" },
    ]

    // ----------- FILTROS ----------- //
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    
    const filteredProducts = products.filter((p) => {
        const matchesSearch =
        p.ID.toString().includes(searchTerm.toLowerCase()) ||
        p.Nombre.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
        categoryFilter === "" || p.Categoria === categoryFilter;

        const matchesStatus =
        statusFilter === "" || p.Estatus === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // ---------------------- DATA PRUEBA TABLA PRINCIPAL ---------------------- //
    const productData = [
        {
        id: 10,
        producto: "[S11203LUX] ALTAVOZ",
        categoria: "Tecnología",
        vendedor: "Carlos SAF",
        cantidad: 1,
        precio: 121.55,
        impuesto: "IVA (16%)",
        subtotal: 121.55,
        }
    ]

    return (
        <>
        <CContainer>
            <CCard className="mb-4">
            <CCardHeader>
                <strong>Nuevo Presupuesto</strong>
            </CCardHeader>

            <CCardBody>
                <CForm>
                {/* ====================== DATOS CLIENTE ====================== */}
                <CRow className="mb-4">
                    <CCol md={6}>
                    <CFormLabel>Cliente</CFormLabel>
                    <CFormInput className="mb-3" />

                    <CFormLabel>RIF</CFormLabel>
                    <CFormInput className="mb-3" />

                    <CFormLabel>Dirección de factura</CFormLabel>
                    <CFormInput className="mb-3" />

                    <CFormLabel>Dirección de entrega</CFormLabel>
                    <CFormInput className="mb-3" />

                    <CFormLabel>Sucursal</CFormLabel>
                    <CFormInput className="mb-3" />
                    </CCol>

                    <CCol md={6}>
                    <CFormLabel>Fecha cancelación</CFormLabel>
                    <CFormInput type="date" className="mb-3" />

                    <CFormLabel>Expiración</CFormLabel>
                    <CFormInput type="date" className="mb-3" />

                    <CFormLabel>Términos de Pago</CFormLabel>
                    <CFormSelect className="mb-3">
                        <option>Contado</option>
                        <option>Crédito 15 días</option>
                    </CFormSelect>

                    <CFormLabel>Tasa</CFormLabel>
                    <CFormInput className="mb-3" />

                    <CFormLabel>Ruta de transporte</CFormLabel>
                    <CFormInput />
                    </CCol>
                </CRow>

                {/* ====================== TABLA PRODUCTO ====================== */}
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
                            <CTableHeaderCell>Vendedor</CTableHeaderCell>
                            <CTableHeaderCell>Cantidad</CTableHeaderCell>
                            <CTableHeaderCell>Precio Unit.</CTableHeaderCell>
                            <CTableHeaderCell>Impuestos</CTableHeaderCell>
                            <CTableHeaderCell>Subtotal</CTableHeaderCell>
                            <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                        </CTableRow>
                        </CTableHead>

                        <CTableBody>
                        {productData.map((item, index) => (
                            <CTableRow key={index}>
                            <CTableDataCell>{item.id}</CTableDataCell>
                            <CTableDataCell>{item.producto}</CTableDataCell>
                            <CTableDataCell>{item.categoria}</CTableDataCell>
                            <CTableDataCell>{item.vendedor}</CTableDataCell>
                            <CTableDataCell>{item.cantidad}</CTableDataCell>
                            <CTableDataCell>{item.precio}</CTableDataCell>
                            <CTableDataCell>{item.impuesto}</CTableDataCell>
                            <CTableDataCell>{item.subtotal}</CTableDataCell>

                            <CTableDataCell className="text-center">
                                <CButton
                                color="danger"
                                size="sm"
                                onClick={() => openModal("delete", item)}
                                >
                                <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                            </CTableRow>
                        ))}
                        </CTableBody>
                    </CTable>

                    <CButton 
                        color="primary" 
                        className="mt-3"
                        onClick={() => openModal("update")}
                    >
                        Agregar producto
                    </CButton>
                    </CCardBody>
                </CCard>

                <CButton color="success" className="mt-4" onClick={() => openModal("save")}>
                    Guardar Presupuesto
                </CButton>
                </CForm>
            </CCardBody>
            </CCard>
        </CContainer>

        {/* TOASTS */}
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

        {/* MODAL */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
            <CModalTitle>
                {modalType === "save" && "Guardar Presupuesto"}
                {modalType === "delete" && "Eliminar Producto"}
                {modalType === "update" && "Agregar Producto"}
            </CModalTitle>
            </CModalHeader>

            <CModalBody>
            {modalType === "save" && (
                <>
                <h5>¿Seguro que deseas guardar este presupuesto?</h5>
                <CButton color="success" className="mt-3" onClick={saveItem}>
                    Guardar
                </CButton>
                </>
            )}

            {modalType === "delete" && (
                <>
                <h5>¿Seguro que deseas eliminar este producto?</h5>
                <p className="fw-bold">{selectedItem?.producto}</p>

                <CButton color="danger" className="mt-3" onClick={deleteItem}>
                    Eliminar
                </CButton>
                </>
            )}

            {modalType === "update" && (
                <>
                <h5 className="mb-3">¿Qué producto deseas agregar?</h5>

                <CForm className="mb-4">
                    <CRow className="g-3 align-items-end">
                    
                    <CCol xs={12} md={4}>
                        <CFormLabel>Buscar (ID o Nombre)</CFormLabel>
                        <CFormInput
                        placeholder="Ej: 1 o Laptop"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </CCol>

                    <CCol xs={12} md={4}>
                        <CFormLabel>Categoría</CFormLabel>
                        <CFormSelect
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                        <option value="">Todas</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Mobiliario">Mobiliario</option>
                        <option value="Oficina">Oficina</option>
                        </CFormSelect>
                    </CCol>

                    <CCol xs={12} md={4}>
                        <CFormLabel>Estatus</CFormLabel>
                        <CFormSelect
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        >
                        <option value="">Todos</option>
                        <option value="Disponible">Disponible</option>
                        <option value="Agotado">Agotado</option>
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
                        <CTableDataCell colSpan={5} className="text-center">
                            No se encontraron productos
                        </CTableDataCell>
                        </CTableRow>
                    ) : (
                        filteredProducts.map((prod) => (
                        <CTableRow key={prod.ID}>
                            <CTableDataCell>{prod.ID}</CTableDataCell>
                            <CTableDataCell>{prod.Nombre}</CTableDataCell>
                            <CTableDataCell>{prod.Categoria}</CTableDataCell>
                            <CTableDataCell>{prod.Estatus}</CTableDataCell>
                            <CTableDataCell>
                            <CButton
                                color="primary"
                                size="sm"
                                onClick={() => updateProduct(prod)}
                            >
                                Agregar
                            </CButton>
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
