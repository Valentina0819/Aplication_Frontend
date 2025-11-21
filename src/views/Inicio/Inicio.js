    import React from 'react'
    import { Link } from 'react-router-dom'
    import {
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CCol,
    CContainer,
    CRow
    } from '@coreui/react'

    const Usuarios = () => {
    return (
        <CContainer className="mt-4">

        <CCard>
            <CCardHeader className="text-center fs-4">
            Módulos del Sistema
            </CCardHeader>

            <CCardBody>
            <CRow className="text-center">

                {/* CARD 1 */}
                <CCol md={4}>
                <CCard className="p-3 shadow-sm">
                    <h5>Módulo 1</h5>
                    <p>Descripción del módulo 1</p>
                    <Link to="/Products">
                    <CButton color="primary">Entrar</CButton>
                    </Link>
                </CCard>
                </CCol>

                {/* CARD 2 */}
                <CCol md={4}>
                <CCard className="p-3 shadow-sm">
                    <h5>Módulo 2</h5>
                    <p>Descripción del módulo 2</p>
                    <Link to="/Pedidos">
                    <CButton color="success">Entrar</CButton>
                    </Link>
                </CCard>
                </CCol>

                {/* CARD 3 */}
                <CCol md={4}>
                <CCard className="p-3 shadow-sm">
                    <h5>Módulo 3</h5>
                    <p>Descripción del módulo 3</p>
                    <Link to="/Facturacion">
                    <CButton color="warning">Entrar</CButton>
                    </Link>
                </CCard>
                </CCol>

            </CRow>
            </CCardBody>
        </CCard>
        </CContainer>
    )
    }

    export default Usuarios
