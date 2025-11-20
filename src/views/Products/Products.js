    import React, { useState } from "react"
    import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CAlert,
    CAlertHeading,
    CToast,
    CToastBody,
    CToaster,
    CToastHeader,
    CHeader,
    CContainer,
    CCol,
    CWidgetStatsF,
    CForm,
    CFormInput,
    CFormSelect,
    CFormLabel,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    } from "@coreui/react"

    import CIcon from "@coreui/icons-react"
    import {
    cilPencil,
    cilTrash,
    cilMagnifyingGlass,
    } from "@coreui/icons"
    import { cibAddthis } from "@coreui/icons"



    const Products = () => {

    // ---------------------- TOAST ---------------------- //
    const [toasts, setToasts] = useState([])

    const showToast = (type, message) => {
        setToasts(prev => [...prev, { id: Date.now(), type, message }])
    }


    // ---------------------- MODAL ---------------------- //
    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [step, setStep] = useState(1)
    const [selectedItem, setSelectedItem] = useState(null)

    const openModal = (type, item = null) => {
        setModalType(type)
        setSelectedItem(item)
        setStep(1)
        setModalVisible(true)
    }


    // ---------------------- FILTROS ---------------------- //
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [yearFilter, setYearFilter] = useState("")


    // ---------------------- DATA ---------------------- //
    const productData = [
        {
        ID: 1,
        Nombre: "Laptop Lenovo",
        FechaIngreso: "2024-05-12",
        Categoria: "Tecnología",
        Estatus: "Disponible",
        },
        {
        ID: 2,
        Nombre: "Escritorio Ejecutivo",
        FechaIngreso: "2025-01-18",
        Categoria: "Mobiliario",
        Estatus: "Agotado",
        },
        {
        ID: 3,
        Nombre: "Mouse Inalámbrico",
        FechaIngreso: "2025-02-03",
        Categoria: "Tecnología",
        Estatus: "Disponible",
        },
    ]



    // ---------------------- ACCIONES ---------------------- //
    const saveItem = () => {
        showToast("success", "Producto registrado correctamente")
        setModalVisible(false)
    }

    const updateItem = () => {
        showToast("primary", "Producto actualizado correctamente")
        setModalVisible(false)
    }

    const deleteItem = () => {
        showToast("danger", "Producto eliminado correctamente")
        setModalVisible(false)
    }



    return (
        <>

        <h1>Gestión de Productos</h1>

        <CContainer>

            {/* ---------- RESUMEN ---------- */}
            <CCard className="mb-4">
            <CCardBody>
                <p>Aquí puedes mostrar métricas o estadísticas de productos.</p>
            </CCardBody>
            </CCard>


            {/* ---------- TABLA ---------- */}
            <CCard>
            <CCardBody>

                {/* Barra superior */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Listado de Productos</h4>

                <CButton color="primary" onClick={() => openModal("create")}>
                    Nuevo Producto
                    <CIcon className="ms-2" icon={cibAddthis} />
                </CButton>
                </div>


                {/* -------- FILTROS -------- */}
                <CForm className="mb-4">
                <CRow className="g-3 align-items-end">

                    {/* Buscar */}
                    <CCol xs={12} md={3}>
                    <CFormLabel>Buscar</CFormLabel>
                    <CFormInput
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </CCol>

                    {/* Categoría */}
                    <CCol xs={12} md={3}>
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

                    {/* Estatus */}
                    <CCol xs={12} md={3}>
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

                    {/* Año */}
                    <CCol xs={12} md={3}>
                    <CFormLabel>Año ingreso</CFormLabel>
                    <CFormSelect
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </CFormSelect>
                    </CCol>

                    <CCol xs={12} md={3}>
                    <CButton color="secondary">
                        Buscar
                        <CIcon className="ms-2" icon={cilMagnifyingGlass} />
                    </CButton>
                    </CCol>

                </CRow>
                </CForm>


                {/* -------- TABLA -------- */}
                <CTable hover align="middle" className="border">
                <CTableHead>
                    <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Fecha Ingreso</CTableHeaderCell>
                    <CTableHeaderCell>Categoría</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    {productData.map((item, i) => (
                    <CTableRow key={i}>

                        <CTableDataCell>{item.ID}</CTableDataCell>

                        <CTableDataCell className="text-center fw-semibold">
                        {item.Nombre}
                        </CTableDataCell>

                        <CTableDataCell>{item.FechaIngreso}</CTableDataCell>

                        <CTableDataCell>{item.Categoria}</CTableDataCell>

                        <CTableDataCell className="text-center">{item.Estatus}</CTableDataCell>


                        <CTableDataCell>
                        <CButtonGroup>
                            <CButton color="primary" size="sm"
                            onClick={() => openModal("edit", item)}
                            >
                            Editar
                            <CIcon className="ms-2" icon={cilPencil} />
                            </CButton>

                            <CButton color="danger" size="sm"
                            onClick={() => openModal("delete", item)}
                            >
                            Eliminar
                            <CIcon className="ms-2" icon={cilTrash} />
                            </CButton>
                        </CButtonGroup>
                        </CTableDataCell>

                    </CTableRow>
                    ))}
                </CTableBody>
                </CTable>

            </CCardBody>

            <CCardFooter className="text-muted">
                Mostrando {productData.length} productos
            </CCardFooter>
            </CCard>

        </CContainer>





        {/* -----------------------------------------------------
            TOASTER GLOBAL
        ----------------------------------------------------- */}
        <CToaster placement="top-end">
            {toasts.map(t => (
            <CToast key={t.id} autohide delay={2600} color={t.type} visible>
                <CToastHeader closeButton>
                <strong>{t.message}</strong>
                </CToastHeader>
                <CToastBody>Operación realizada correctamente.</CToastBody>
            </CToast>
            ))}
        </CToaster>




        {/* -----------------------------------------------------
                MODAL GLOBAL
        ----------------------------------------------------- */}
        <CModal size="lg" visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader>
            <CModalTitle>
                {modalType === "create" && "Registrar Producto"}
                {modalType === "edit" && "Editar Producto"}
                {modalType === "delete" && "Eliminar Producto"}
            </CModalTitle>
            </CModalHeader>

            <CModalBody>


            {/* ---------------- ELIMINAR ---------------- */}
            {modalType === "delete" && (
                <>
                <h5>¿Seguro que deseas eliminar este producto?</h5>
                <p className="fw-bold">{selectedItem?.Nombre}</p>

                <CButton color="danger" onClick={deleteItem}>Eliminar</CButton>
                </>
            )}


            {/* ---------------- CREAR / EDITAR : MULTIPASO ---------------- */}
            {(modalType === "create" || modalType === "edit") && (
                <>
                <CNav variant="tabs">
                    <CNavItem><CNavLink active={step === 1}>Información</CNavLink></CNavItem>
                    <CNavItem><CNavLink active={step === 2}>Detalles</CNavLink></CNavItem>
                    <CNavItem><CNavLink active={step === 3}>Confirmación</CNavLink></CNavItem>
                </CNav>

                <CTabContent className="mt-4">

                    {/* ------- PASO 1 ------- */}
                    <CTabPane visible={step === 1}>
                    <CForm>
                        <CFormInput
                        label="Nombre del producto"
                        placeholder="Ej: Laptop Dell"
                        />

                        <CFormSelect label="Categoría">
                        <option>Tecnología</option>
                        <option>Mobiliario</option>
                        <option>Oficina</option>
                        </CFormSelect>

                        <CButton className="mt-3" color="primary" onClick={() => setStep(2)}>
                        Siguiente
                        </CButton>
                    </CForm>
                    </CTabPane>


                    {/* ------- PASO 2 ------- */}
                    <CTabPane visible={step === 2}>
                    <CForm>

                        <CFormSelect label="Estatus">
                        <option>Disponible</option>
                        <option>Agotado</option>
                        </CFormSelect>

                        <div className="d-flex justify-content-between mt-3">
                        <CButton color="secondary" onClick={() => setStep(1)}>
                            Atrás
                        </CButton>

                        <CButton color="primary" onClick={() => setStep(3)}>
                            Siguiente
                        </CButton>
                        </div>

                    </CForm>
                    </CTabPane>


                    {/* ------- PASO 3 ------- */}
                    <CTabPane visible={step === 3}>
                    <h5 className="mb-4">Confirmar datos del producto</h5>

                    <div className="d-flex justify-content-between">
                        <CButton color="secondary" onClick={() => setStep(2)}>
                        Atrás
                        </CButton>

                        {modalType === "create" && (
                        <CButton color="success" onClick={saveItem}>
                            Guardar
                        </CButton>
                        )}

                        {modalType === "edit" && (
                        <CButton color="primary" onClick={updateItem}>
                            Actualizar
                        </CButton>
                        )}
                    </div>

                    </CTabPane>

                </CTabContent>
                </>
            )}

            </CModalBody>
        </CModal>


        </>
    )
    }

    export default Products
