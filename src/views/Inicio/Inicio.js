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

    export const Inicio = () => {
        
    return (
        <>
        <CHeader className='mb-4 ms-4'>
        <CCard>
            <CCardHeader>
                <h1 className="mb-1 mt-3">Provisional</h1>
            </CCardHeader>
        <CCardBody>
            <h2>Provisional</h2>
        </CCardBody>
        </CCard>
        </CHeader>
        
        </>
    )
    }
    export default Inicio
