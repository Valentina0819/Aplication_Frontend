    import React, { useState } from 'react'
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
    CFormLabel
    } from '@coreui/react'

    import CIcon from '@coreui/icons-react'
    import { 
    cilUser, 
    cilEnvelopeOpen, 
    cilLockLocked, 
    cilClock, 
    cilPencil, 
    cilTrash,
    cilMagnifyingGlass
    } from '@coreui/icons'

    // Importar íconos
    import { cibAddthis } from '@coreui/icons'

    export const PanelRRHH = () => {
    // Función para manejar las acciones
    const handleEdit = (item) => {
        console.log('Editar:', item)
    }

    const handleDelete = (item) => {
        console.log('Eliminar:', item)
    }

    // Estados para los filtros
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [departmentFilter, setDepartmentFilter] = useState('')

    // Datos corregidos
    const tableExample = [
        {
        ID: 2,
        Asunto: 'EJEMPLO 2, DENUNCIA',
        FechaCreacion: '2024-11-01',
        Estatus: 'EN PROCESO',
        DEPARTAMENTO: 'RRHH',
        },
        {
        ID: 9,
        Asunto: 'EJEMPLO 2, FALTA',
        FechaCreacion: '2025-10-17',
        Estatus: 'FINALIZADO',
        DEPARTAMENTO: 'RRHH',
        },
        {
        ID: 2,
        Asunto: 'EJEMPLO 3, Reunion',
        FechaCreacion: '2025-10-20',
        Estatus: 'Pendiente',
        DEPARTAMENTO: 'RRHH',
        },
    ]

    return (
        <>

        <h1>Resumen General</h1>




        <CContainer>
            {/* Primera tarjeta para estadísticas */}
            <CCard className="mb-4">
            <CCardBody>
                <CRow>
                <CCol>
                    <p>Aquí puedes agregar estadísticas o KPIs</p>
                </CCol>
                </CRow>
            </CCardBody>
            </CCard>


            {/* Tabla*/}
            <CCard>
            <CCardBody>


                <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Gestion Administrativa</h4>
                <CButton color="primary">
                    Nuevo Tramite
                    <CIcon className="ms-2" icon={cibAddthis} />
                </CButton>
                </div>



                <CForm className="mb-4">
                <CRow className="g-3 align-items-end">

                    {/* Búsqueda */}
                    <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="searchInput">Buscar</CFormLabel>
                    <CFormInput
                        id="searchInput"
                        type="text"
                        placeholder="Buscar por asunto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    </CCol>

                    {/* Filtro de Estatus */}
                    <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="statusSelect">Estatus</CFormLabel>
                    <CFormSelect
                        id="statusSelect"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos los estatus</option>
                        <option value="EN PROCESO">En Proceso</option>
                        <option value="FINALIZADO">Finalizado</option>
                        <option value="PENDIENTE">Pendiente</option>
                    </CFormSelect>
                    </CCol>

                    {/* Filtro de Fecha */}
                    <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="dateSelect">Fecha</CFormLabel>
                    <CFormSelect
                        id="dateSelect"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="">Todas las fechas</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="recientes">Más recientes</option>
                        <option value="antiguos">Más antiguos</option>
                    </CFormSelect>
                    </CCol>

                    {/* Filtro de Departamento */}
                    <CCol xs={12} md={3}>
                    <CFormLabel htmlFor="departmentSelect">Departamento</CFormLabel>
                    <CFormSelect
                        id="departmentSelect"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <option value="">Todos los departamentos</option>
                        <option value="RRHH">RRHH</option>
                        <option value="Gestion Administrativa">Gestión Administrativa</option>
                    </CFormSelect>
                    </CCol>
                    <CCol xs={12} md={3}>
    
                        <CButton color='secondary'> Buscar<CIcon className="ms-2" icon={cilMagnifyingGlass} /></CButton>

                    </CCol>

                </CRow>
                </CForm>

                {/* Tabla */}
                <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                    <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Asunto</CTableHeaderCell>
                    <CTableHeaderCell>Fecha de creación</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Estatus</CTableHeaderCell>
                    <CTableHeaderCell>Departamento</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {tableExample.map((item, index) => (
                    <CTableRow key={index}>
                        {/* ID */}
                        <CTableDataCell>
                        <div className="fw-semibold">{item.ID}</div>
                        </CTableDataCell>

                        {/* Asunto */}
                        <CTableDataCell className="text-center">
                        <div className="fw-semibold">{item.Asunto}</div>
                        </CTableDataCell>

                        {/* Fecha de creación */}
                        <CTableDataCell>
                        <div className="fw-semibold">{item.FechaCreacion}</div>
                        </CTableDataCell>
                    
                        {/* Estatus */}
                        <CTableDataCell className="text-center">
                        <div className="fw-semibold">{item.Estatus}</div>
                        </CTableDataCell>

                        {/* Departamento */}
                        <CTableDataCell>
                        <div className="fw-semibold">{item.DEPARTAMENTO}</div>
                        </CTableDataCell>

                        {/* Acciones */}
                        <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Acciones del producto">
                            <CButton 
                            color="primary" 
                            size="sm"
                            onClick={() => handleEdit(item)}
                            >
                            Editar
                            <CIcon className="ms-2" icon={cilPencil} />
                            </CButton>

                            <CButton 
                            color="danger" 
                            size="sm"
                            onClick={() => handleDelete(item)}
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
            <CCardFooter>
                <div className="text-muted">
                Mostrando {tableExample.length} trámites
                </div>
            </CCardFooter>
            </CCard>
        </CContainer>
        </>
    )
    }

    export default PanelRRHH