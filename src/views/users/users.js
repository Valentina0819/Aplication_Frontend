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

    export const Users = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [toasts, setToasts] = useState([])

    const showToast = (type, message) => {
        setToasts((prev) => [...prev, { type, message, id: Date.now() }])
    }

    const updatePassword = () => {
        showToast('success', 'Contraseña actualizada correctamente')
        setModalVisible(false)
    }

    const user = {
        name: 'Juan Pérez',
        email: 'juanperez@mail.com',
        role: 'Administrador',
        avatar: 'https://i.pravatar.cc/300',
        lastLogin: 'Hace 2 horas',
    }

    return (
        <>

        
        <CCard>
            <CCardBody>
        <h5 className="mb-1">Mi título</h5>
        <br></br>
        <small className="d-block">Subtítulo línea 1</small>
        <small className="d-block">Subtítulo línea 2</small>
            </CCardBody>
        </CCard>









        {/* CONTENEDOR PRINCIPAL */}
        <CContainer fluid className="mt-4">
            <div className="row g-4 justify-content-center">
            
            
            
            
            {/* PERFIL */}
            
            
            
            
            <div className="col-md-4 col-lg-3">
                <CCard className="shadow-lg border-0 text-center">
                <CCardBody>
                    <CAvatar size="xxl" src={user.avatar} className="mb-3 shadow" />
                    <h4 className="fw-bold mb-1">{user.name}</h4>
                    <p className="text-muted mb-0">{user.email}</p>
                    <small className="text-secondary">Rol: {user.role}</small>
                </CCardBody>
                </CCard>
            </div>








            {/* DATOS DE USUARIO */}
            <div className="col-md-6 col-lg-5">
                <CCard className="shadow-sm border-light">
                <CCardHeader className="bg-primary text-white fw-semibold">
                    <CIcon icon={cilUser} className="me-2" />
                    Datos del {user.role}
                </CCardHeader>
                <CCardBody className="pt-3">
                    <p>
                    <CIcon icon={cilUser} className="me-2 text-primary" />
                    <strong>Nombre:</strong> {user.name}
                    </p>
                    <p>
                    <CIcon icon={cilEnvelopeOpen} className="me-2 text-success" />
                    <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                    <CIcon icon={cilClock} className="me-2 text-warning" />
                    <strong>Último acceso:</strong> {user.lastLogin}
                    </p>
                </CCardBody>
                </CCard>
            </div>














            {/* ACCIONES */}
            <div className="col-md-4 col-lg-3">
                <CCard className="shadow border-0 text-center">
                <CCardHeader className="bg-warning text-dark fw-semibold">
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Seguridad
                </CCardHeader>
                <CCardBody>
                    <p className="text-muted mb-3">
                    Cambia tu contraseña para mantener tu cuenta segura.
                    </p>
                    <CButton
                    color="warning"
                    className="w-100 fw-bold text-dark shadow-sm"
                    onClick={() => setModalVisible(true)}
                    >
                    Cambiar Contraseña
                    </CButton>
                </CCardBody>
                </CCard>
            </div>
            </div>
        </CContainer>















        {/* TOASTS */}
        <CToaster placement="top-end">
            {toasts.map((t) => (
            <CToast
                key={t.id}
                autohide
                delay={2500}
                color={t.type}
                visible
                className="rounded-3 shadow"
            >
                <CToastHeader closeButton>
                <strong className="me-auto">{t.message}</strong>
                </CToastHeader>
                <CToastBody>¡Operación realizada con éxito!</CToastBody>
            </CToast>
            ))}
        </CToaster>






        {/* MODAL */}
        <CModal
            size="lg"
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
        >
            <CModalHeader>
            <CModalTitle>
                <CIcon icon={cilLockLocked} className="me-2" />
                Cambiar Contraseña
            </CModalTitle>
            </CModalHeader>
            <CModalBody>
            <CForm>
                <CFormInput
                className="mb-3"
                type="password"
                placeholder="Contraseña Actual"
                label="Contraseña Actual"
                />
                <CFormInput
                className="mb-3"
                type="password"
                placeholder="Nueva Contraseña"
                label="Nueva Contraseña"
                />
                <CButton color="success" onClick={updatePassword} className="mt-2">
                Guardar Cambios
                </CButton>
            </CForm>
            </CModalBody>
        </CModal>
        </>
    )
    }

    export default Users
