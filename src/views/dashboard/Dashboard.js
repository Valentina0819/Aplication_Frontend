import React from 'react'
import classNames from 'classnames'
import { useState } from 'react'

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
  CContainer,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cifBr,
  cifUs,
  cifKr,
  cifCn,
  cilPencil,
  cifIt,
  cibAddthis,
  cilTrash
} from '@coreui/icons'

import {
  CModalFooter,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'

import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import {CForm, CFormInput, CFormSelect } from '@coreui/react'
import { Link } from 'react-router-dom'






export const Dashboard  = () => {


return (
      
    <>
    <CContainer>
      <CCard>
        <CCardHeader>TITULO</CCardHeader>
        <CCardBody>
          <Link>
            <CButton>
              HOLA HOLA
            </CButton>
          </Link>
        </CCardBody>
      </CCard>
    </CContainer>

    </>
  )
}


export default Dashboard
