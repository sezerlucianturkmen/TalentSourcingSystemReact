import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSourcedCandidates, getCandidates } from 'src/store/features/candidateSlice'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'
import { cilUserPlus, cilTag, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const HomeList = () => {
  const candidateList = useSelector((state) => state.candidate.candidateList)
  const candidateListSourced = useSelector((state) => state.candidate.candidateSourcedList)
  const updateChanges = useSelector((state) => state.candidate.isUpdated)

  const dispatch = useDispatch()

  const getCandidatesAll = () => {
    dispatch(getCandidates())
  }
  const getCandidatesSourced = () => {
    dispatch(getSourcedCandidates())
  }

  useEffect(() => {
    getCandidatesAll()
    getCandidatesSourced()
  }, [candidateList.size, updateChanges])

  return (
    <>
      <CCard className="mb-4 backCard">
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol xs="auto" className="me-auto">
                <h5 className="card-title fs-4 fw-semibold m-2"> HOME </h5>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="auto" className="me-auto">
                <h5 className="card-title fs-4 fw-semibold m-2"> Sourced Candidate List</h5>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="auto" className="me-auto">
                <p className=" m-2">Number of Sourced Candidates : {candidateListSourced.length}</p>
              </CCol>
            </CRow>
            <br></br>
            <CRow className="justify-content-center mb-3 mt-3">
              <CCol xs={2}>
                <Link to={`/savecandidate`}>
                  <CButton className="butonSize" color="success" variant="outline">
                    <CIcon icon={cilUserPlus} /> New Candidate
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={2}>
                <Link to={`/statuscandidate`}>
                  <CButton className="butonSize" color="secondary" variant="outline">
                    <CIcon icon={cilTag} /> Change Status
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={2}>
                <Link to={`/updatecandidate`}>
                  <CButton className="butonSize" color="warning" variant="outline">
                    <CIcon icon={cilPencil} /> Edit Candidate
                  </CButton>
                </Link>
              </CCol>
              <CCol xs={2}>
                <Link to={`/deletecandidate`}>
                  <CButton className="butonSize" color="danger" variant="outline">
                    <CIcon icon={cilTrash} /> Delete Candidate
                  </CButton>
                </Link>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Name Surname</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">E-Mail</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {candidateListSourced.map((type, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.nameSurname}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.email}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.phone}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.status}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/candidatedetail/${type.id}`} className="col align-self-end">
                        <CButton color="secondary" shape="rounded-pill">
                          More Details
                        </CButton>
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CContainer>
        </CCardBody>
      </CCard>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <CContainer>
            <CRow>
              <CCol xs="auto" className="me-auto">
                <h5 className="card-title fs-4 fw-semibold m-2"> All Candidate List</h5>
              </CCol>
            </CRow>
          </CContainer>
          <CContainer>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableBody>
                {candidateList.map((type, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.nameSurname}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.email}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.phone}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{type?.status}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/candidatedetail/${type.id}`} className="col align-self-end">
                        <CButton color="secondary" shape="rounded-pill">
                          More Details
                        </CButton>
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default HomeList
