import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCandidates, update } from 'src/store/features/candidateSlice'
import { Link, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CContainer,
  CFormSelect,
} from '@coreui/react'
import { cilUserPlus, cilTag, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const CandidateEdit = () => {
  const candidateList = useSelector((state) => state.candidate.candidateList)
  const updateChanges = useSelector((state) => state.candidate.isUpdated)

  const [nameSurname, setNameSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()

  const getAllCandidates = () => {
    dispatch(getCandidates())
  }

  const updateCandidate = async (value) => {
    dispatch(
      update({
        id: value,
        nameSurname: nameSurname,
        email: email,
        phone: phone,
        status: '',
      }),
    )
  }

  useEffect(() => {
    getAllCandidates()
  }, [updateChanges])

  return (
    <>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <CContainer>
            <CRow className="align-items-center mb-5">
              <CCol xs="auto" className="me-auto">
                <h5 className="card-title fs-4 fw-semibold m-2"> Edit Candidates</h5>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer>
            <CTable align="middle" className="mt-5 mb-2 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Name Surname</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">E-Mail</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {candidateList.map((candidate, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        placeholder={candidate?.nameSurname}
                        type="text"
                        onChange={(e) => setNameSurname(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        placeholder={candidate?.email}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        placeholder={candidate?.phone}
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="secondary"
                        shape="rounded-pill"
                        onClick={(e) => updateCandidate(candidate.id)}
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <CRow className="justify-content-end mt-3">
              <Link to={'/home'} className="justify-content-end">
                <CButton className="justify-content-end" size="lg" color="dark">
                  Go Back to Home
                </CButton>
              </Link>
            </CRow>
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CandidateEdit
