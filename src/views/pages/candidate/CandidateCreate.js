import React, { useState, useEffect } from 'react'
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
  CLink,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAddressBook, cilUser, cilEnvelopeClosed } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { create } from '../../../store/features/candidateSlice'

const CandidateCreate = () => {
  const [nameSurname, setNameSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const data = useSelector((state) => state.candidate.candidate)
  const created = useSelector((state) => state.candidate.isCreated)

  const dispatch = useDispatch()

  console.log(data)

  const createHabitant = async () => {
    if (nameSurname === '') {
      alert('Please enter  name and surname of the candidate!')
    } else if (email === '' || !email.includes('@') || !email.includes('.')) {
      alert('Please enter any e-mail!')
    } else if (phone === '') {
      alert('Please enter any phone number!')
    } else {
      dispatch(
        create({
          nameSurname: nameSurname,
          email: email,
          phone: phone,
        }),
      )
    }
  }
  useEffect(() => {}, [created])

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center ">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={7}>
              <CCard className="mx-3 backCardSecondary">
                <CCardBody className="p-5">
                  <CForm>
                    <h1>Create New Candidate</h1>
                    <p className="text-medium-emphasis ">Please fill in the information...</p>
                    <br></br>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="floatingInputInvalid"
                        floatingLabel="Name Surname"
                        placeholder="NameSurname"
                        autoComplete="NameSurname"
                        onChange={(event) => {
                          setNameSurname(event.target.value)
                        }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="floatingInputInvalid"
                        floatingLabel="E-mail"
                        placeholder="E-mail"
                        autoComplete="E-mail"
                        onChange={(event) => {
                          setEmail(event.target.value)
                        }}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilAddressBook} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="floatingInputInvalid"
                        floatingLabel="Phone"
                        placeholder="Phone"
                        autoComplete="Phone"
                        onChange={(event) => {
                          setPhone(event.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow className="d-grid gap-3 d-md-block ">
                      <Link to={created ? '/home' : `/savecandidate`}>
                        <CButton size="lg" color="success" onClick={createHabitant}>
                          Create Candidate
                        </CButton>
                      </Link>

                      <Link to={'/home'}>
                        <CButton size="lg" color="dark">
                          Go Back to Home
                        </CButton>
                      </Link>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default CandidateCreate
