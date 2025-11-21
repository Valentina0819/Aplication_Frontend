import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <CContainer className="mt-4">

      <CRow className="g-4">
        {/* CARD 1 */}
        <CCol md={4}>
          <CCard className="text-center shadow-sm">
            <CCardHeader>Gestión de Usuarios</CCardHeader>
            <CCardBody>
              <Link to="/usuarios">
                <CButton color="primary">Entrar</CButton>
              </Link>
            </CCardBody>
          </CCard>
        </CCol>

        {/* CARD 2 */}
        <CCol md={4}>
          <CCard className="text-center shadow-sm">
            <CCardHeader>Gestión de Roles</CCardHeader>
            <CCardBody>
              <Link to="/roles">
                <CButton color="primary">Entrar</CButton>
              </Link>
            </CCardBody>
          </CCard>
        </CCol>

        {/* CARD 3 */}
        <CCol md={4}>
          <CCard className="text-center shadow-sm">
            <CCardHeader>Permisos</CCardHeader>
            <CCardBody>
              <Link to="/permisos">
                <CButton color="primary">Entrar</CButton>
              </Link>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </CContainer>
  )
}

export default Dashboard
