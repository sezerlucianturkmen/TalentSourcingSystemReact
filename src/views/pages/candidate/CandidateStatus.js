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
  CContainer,
  CFormSelect,
} from '@coreui/react'

const CandidateStatus = () => {
  const candidateList = useSelector((state) => state.candidate.candidateList)
  const updateChanges = useSelector((state) => state.candidate.isUpdated)

  const [status, setStatus] = useState('')

  const statusList = ['SOURCED', 'INTERVIEWING', 'OFFER_SENT', 'HIRED']

  const dispatch = useDispatch()

  const getAllCandidates = () => {
    dispatch(getCandidates())
  }

  const updateStatus = async (value) => {
    console.log(value)
    dispatch(
      update({
        id: value,
        status: status,
        phone: '',
        email: '',
        nameSurname: '',
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
                <h5 className="card-title fs-4 fw-semibold m-2"> Change Status</h5>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer>
            <CTable align="middle" className="mt-5 mb-2 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Name Surname</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
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
                      <div>{candidate?.nameSurname}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormSelect
                        aria-label="Default select example"
                        onChange={(event) => {
                          setStatus(event.target.value)
                        }}
                      >
                        <option>{candidate?.status}</option>
                        {statusList.map((data, index) => (
                          <option key={index} value={data}>
                            {data}
                          </option>
                        ))}
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="secondary"
                        shape="rounded-pill"
                        onClick={(e) => updateStatus(candidate.id)}
                      >
                        Update Status
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

export default CandidateStatus
