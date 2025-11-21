import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  // ---------------------- TOAST ---------------------- //
  const [toasts, setToasts] = useState([])
  const showToast = (type, message) => {
    setToasts((prev) => [...prev, { id: Date.now(), type, message }])
  }

  // ---------------------- FORM ---------------------- //
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const API = 'http://localhost:4000/users'

  // ---------------------- REGISTRO ---------------------- //
  const registerUser = async () => {
    const { username, email, password, repeatPassword } = formData

    if (!username || !email || !password || !repeatPassword) {
      showToast('danger', 'Todos los campos son obligatorios')
      return
    }

    if (password !== repeatPassword) {
      showToast('danger', 'Las contraseñas no coinciden')
      return
    }

    try {
      // Verificar si el usuario ya existe
      const resCheck = await fetch(`${API}?username=${username}`)
      const existingUsers = await resCheck.json()

      if (existingUsers.length > 0) {
        showToast('danger', 'El usuario ya existe')
        return
      }

      // Guardar usuario
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      showToast('success', 'Usuario registrado correctamente')

      // Login automático
      loginUser({ username, password })
    } catch (error) {
      console.error(error)
      showToast('danger', 'Error registrando el usuario')
    }
  }

  // ---------------------- LOGIN AUTOMÁTICO ---------------------- //
  const loginUser = async ({ username, password }) => {
    try {
      const res = await fetch(`${API}?username=${username}&password=${password}`)
      const data = await res.json()

      if (data.length > 0) {
        localStorage.setItem('user', JSON.stringify(data[0]))
        showToast('success', `Bienvenido ${data[0].username}`)
      } else {
        showToast('danger', 'Error iniciando sesión')
      }
    } catch (error) {
      console.error(error)
      showToast('danger', 'Error iniciando sesión')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Username */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </CInputGroup>

                  {/* Email */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </CInputGroup>

                  {/* Password */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  {/* Repeat Password */}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={registerUser}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

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
      </CContainer>
    </div>
  )
}

export default Register

//Agregar seleccionable para que pueda escoger el role 