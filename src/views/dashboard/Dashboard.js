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






export const Dashboard  = () => {


      // ------------------------------
    // ESTADOS GLOBALES
    // ------------------------------

    const [modalVisible, setModalVisible] = useState(false)
    const [modalType, setModalType] = useState(null)  
    const [step, setStep] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState(null)

      // TOAST
    const [toasts, setToasts] = useState([])

    const showToast = (type, message) => {
      setToasts(prev => [...prev, { type, message, id: Date.now() }])
    }

  const tableExample = [
    {
      product:{name: 'Macbook Air M2', category:'Computadores'},
      supplier:{flag:cifUs, name:'Apple'},
      stock:{value:45, color:'primary',lastrestock: 'Nov 9 2024'},
      payment:{icon:cibCcApplePay,cibCcAmex,cibCcMastercard},
      price:'1,220$',
      sales:'1,430',
      lastsale:'30 min ago'
    },
    {
      product:{name: 'Samsung S25 ULTRA', category:'Celulares'},
      supplier:{flag:cifKr, name:'Samsung'},
      stock:{value:30, color:'warning',lastrestock: 'Jun 28 2025'},
      payment:{icon:cibCcApplePay,cibCcAmex,cibCcMastercard},
      price:'1,000$',
      sales:'1,400',
      lastsale:'one week ago'
    },
  ]

    // ---------------------------------
  // ABRIR MODAL (crear, editar, eliminar)
  // ---------------------------------

  const openModal = (type, product = null) => {
    setModalType(type)
    setSelectedProduct(product)
    setStep(1)
    setModalVisible(true)
  }

    // ---------------------------------
  // GUARDAR NUEVO PRODUCTO
  // ---------------------------------

  const saveProduct = () => {
    showToast("success", "Producto guardado correctamente")
    setModalVisible(false)
  }

    // ---------------------------------
  // EDITAR PRODUCTO
  // ---------------------------------
  const updateProduct = () => {
    showToast("primary", "Producto actualizado correctamente")
    setModalVisible(false)
  }

    // ---------------------------------
  // ELIMINAR PRODUCTO
  // ---------------------------------
  const deleteProduct = () => {
    showToast("danger", "Producto eliminado correctamente")
    setModalVisible(false)
  }




return (
      
    <>

    <CCard>
      <CCardBody>
        <div className="d-flex justify-content-between mb-4 ">
        <h4>Productos</h4>
        <CButton  color="primary" onClick={() => openModal("create")}>
          Agregar
          <CIcon className="ms-2" icon={cibAddthis} />
        </CButton>
        </div>



          <CTable align="middle" className="ml-4 mb-4 border" hover responsive>
            <CTableHead color="Auto">
              <CTableRow>
                <CTableHeaderCell>Producto</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Proveedor</CTableHeaderCell>
                <CTableHeaderCell>Stock</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Método</CTableHeaderCell>
                <CTableHeaderCell>Precio</CTableHeaderCell>
                <CTableHeaderCell>Ventas</CTableHeaderCell>
                <CTableHeaderCell>Última venta</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
    {tableExample.map((item, index) => (
        <CTableRow key={index}>
          {/* Información del producto */}
          <CTableDataCell>
            <div className="fw-semibold">{item.product.name}</div>
            <div className="small text-body-secondary text-nowrap">
              {item.product.category}
            </div>
          </CTableDataCell>

          {/* Proveedor */}
          <CTableDataCell className="text-center">
            <CIcon size="xl" icon={item.supplier.flag} title={item.supplier.name} />
          </CTableDataCell>

          {/* Stock y fecha de último reabastecimiento */}
          <CTableDataCell>
            <div className="d-flex justify-content-between text-nowrap">
              <div className="fw-semibold">{item.stock.value} uds</div>
              <div className="ms-3">
                <small className="text-body-secondary">
                  {item.stock.lastrestock}
                </small>
              </div>
            </div>
            <CProgress thin color={item.stock.color} value={item.stock.value} />
          </CTableDataCell>

          {/* Métodos de pago */}
          <CTableDataCell className="text-center">
            {item.payment.icon.map((icono, i) => (
              <CIcon key={i} size="lg" icon={icono} className="mx-1" />
            ))}
          </CTableDataCell>

          {/* Precio */}
          <CTableDataCell>
            <div className="fw-semibold">{item.price}</div>
          </CTableDataCell>

          {/* Ventas */}
          <CTableDataCell>
            <div className="fw-semibold">{item.sales}</div>
          </CTableDataCell>

          {/* Última venta */}
          <CTableDataCell>
            <div className="small text-body-secondary text-nowrap">Última venta</div>
            <div className="fw-semibold text-nowrap">{item.lastsale}</div>
          </CTableDataCell>

        {/* Acciones */}
        <CTableDataCell>
          <CButtonGroup role="group" aria-label="Basic example">
            <CButton color="primary" onClick={() => openModal("edit",item)}>Editar
            <CIcon className="ms-2" icon={cilPencil} />
            </CButton>




            
            <CButton color="danger" onClick={()=> openModal("delete", item)}>Eliminar
            <CIcon className="ms-2" icon={cilTrash} />  
            </CButton>
          </CButtonGroup>
        </CTableDataCell>
        
        </CTableRow>
      ))}

            </CTableBody>
          </CTable>





      </CCardBody>
    </CCard>




      {/* --------------------------
          TOASTER GLOBAL
      --------------------------- */}
      <CToaster placement="top-end">
        {toasts.map(t => (
          <CToast key={t.id} autohide delay={2500} color={t.type} visible>
            <CToastHeader closeButton>
              <strong className="me-auto">{t.message}</strong>
            </CToastHeader>
            <CToastBody>
              ¡Operación realizada con éxito!
            </CToastBody>
          </CToast>
        ))}
      </CToaster>












      <CModal
        size="lg"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            {modalType === "create" && "Registrar Producto"}
            {modalType === "edit" && "Editar Producto"}
            {modalType === "delete" && "Eliminar Producto"}
          </CModalTitle>
        </CModalHeader>

        <CModalBody>

          {/* ELIMINAR */}
          {modalType === "delete" && (
            <>
              <h5>¿Seguro que deseas eliminar este producto?</h5>
              <p>{selectedProduct?.product.name}</p>

              <CButton color="danger"  onClick={deleteProduct}>
                Eliminar
              </CButton>
            </>
          )}

          {/* CREAR / EDITAR */}
          {(modalType === "create" || modalType === "edit") && (
            <>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink active={step === 1}>Información</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={step === 2}>Inventario</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink active={step === 3}>Confirmación</CNavLink>
                </CNavItem>
              </CNav>

              <CTabContent className="mt-4">

                {/* PASO 1 */}
                <CTabPane visible={step === 1}>
                  <CForm>
                    <CFormInput label="Nombre" placeholder="Nombre" />
                    <CFormSelect label="Categoría">
                      <option>Computadores</option>
                      <option>Accesorios</option>
                      <option>Ropa</option>
                    </CFormSelect>
                    <CButton color= "primary" className='mt-3' onClick={() => setStep(2)}>Siguiente</CButton>
                  </CForm>
                </CTabPane>

                {/* PASO 2 */}
                <CTabPane visible={step === 2}>
                  <CForm>
                    <CFormInput label="Precio" type="number" />
                    <CFormInput label="Stock" type="number" />
                    <div className="d-flex justify-content-between mt-4">
                    <CButton color="secondary"onClick={() => setStep(1)}>Atrás</CButton>
                    <CButton color= "primary" onClick={() => setStep(3)}>Siguiente</CButton>
                    </div>
                    
                  </CForm>
                </CTabPane>

                {/* PASO 3 */}
                <CTabPane visible={step === 3}>
                  <h5>Confirmar datos</h5>

                      <div className="d-flex justify-content-between mt-4">
                      <CButton color="secondary" onClick={() => setStep(2)}>
                        Atrás
                      </CButton>

                      {modalType === "create" && (
                        <CButton color="success" onClick={saveProduct}>
                          Guardar
                        </CButton>
                      )}

                      
                      {modalType === "edit" && (
                      <CButton color="primary" onClick={updateProduct}>
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


export default Dashboard
