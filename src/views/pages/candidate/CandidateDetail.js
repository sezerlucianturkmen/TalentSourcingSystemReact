import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAll,
  createInteraction,
  deleteInteraction,
  updateInteraction,
} from 'src/store/features/interactionSlice'
import { findCandidate } from 'src/store/features/candidateSlice'
import { Link, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CFormInput,
  CFormSelect,
  CImage,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from '@coreui/react'
import { cilUserPlus, cilTag, cilPencil, cilTrash, cilSave, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import userImage from '../../../assets/images/user.webp'

const CandidateDetail = () => {
  const { id } = useParams()
  const [typeInteraction, setTypeInteraction] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [reponse, SetResponse] = useState('')

  const typeList = ['PHONE', 'MAIL']
  const responseList = ['YES', 'NO']

  const interactions = useSelector((state) => state.interaction.interactionList)
  const candidate = useSelector((state) => state.candidate.candidate)
  const updateChanges = useSelector((state) => state.interaction.isUpdated)

  const dispatch = useDispatch()
  const newInteraction = async () => {
    if (typeInteraction === '') {
      alert('Please select the interaction type!')
    } else if (content === '') {
      alert('Please enter any content!')
    } else if (date === '') {
      alert('Please select the date!')
    } else if (reponse === '') {
      alert('Please select the response status!')
    } else {
      dispatch(
        createInteraction({
          candidateid: id,
          interactionType: typeInteraction,
          content: content,
          date: date,
          candidateResponded: reponse === 'YES' ? true : false,
        }),
      )
      setContent('')
      setDate('')
      setTypeInteraction('')
      SetResponse('')
    }
  }
  const updateAction = async (value) => {
    console.log(value)
    dispatch(
      updateInteraction({
        id: value,
        candidateid: id,
        content: content,
      }),
    )
    setContent('')
  }

  const deleteAction = async (value) => {
    console.log(value)
    dispatch(deleteInteraction(value))
  }

  const getInteractions = () => {
    dispatch(getAll(id))
  }

  const getCandidate = () => {
    dispatch(findCandidate(id))
  }

  useEffect(() => {
    getInteractions()
    getCandidate()
  }, [interactions.size, updateChanges])

  return (
    <>
      <CCard className="mb-4 backCardSecondary">
        <CCardBody>
          <div className="mt-2 col text-center justify-content-center clearfix">
            <CImage className="mt-3 circularLandscape" align="center" src={userImage} />
            <p className="mt-2 text-center">
              <strong>{candidate.nameSurname}</strong>
            </p>
            <p className="text-center" style={{ color: 'gray' }}>
              {candidate.email}
            </p>
            <p className="text-center" style={{ color: 'gray' }}>
              {candidate.phone}
            </p>
          </div>
        </CCardBody>
      </CCard>
      <CCard className="mb-2 backCard">
        <CCardBody>
          <CContainer>
            <CTable align="middle" className="mb-4 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Index</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Type</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Content</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Response</CTableHeaderCell>
                  <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in tableItems" color="dark">
                  <CTableDataCell className="text-center" color="dark">
                    <CIcon icon={cilPlus} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center" color="dark">
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(event) => {
                        setTypeInteraction(event.target.value)
                      }}
                    >
                      <option>...</option>
                      {typeList.map((data, index) => (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      ))}
                    </CFormSelect>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" color="dark">
                    <CFormInput
                      placeholder="description"
                      type="text"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-center" color="dark">
                    <CFormInput type="date" onChange={(e) => setDate(e.target.value)} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(event) => {
                        SetResponse(event.target.value)
                      }}
                    >
                      <option>...</option>
                      {responseList.map((data, index) => (
                        <option key={index} value={data}>
                          {data}
                        </option>
                      ))}
                    </CFormSelect>
                  </CTableDataCell>
                  <CTableDataCell className="text-center" color="dark">
                    <CButton color="light" variant="outline" size="lg" onClick={newInteraction}>
                      <CIcon icon={cilUserPlus} /> New
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>

              <CTableBody className="mt-3">
                {interactions.map((type, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <div>{index + 1}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{type?.interactionType}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CFormInput
                        placeholder={type?.content}
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{type?.date}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {type?.candidateResponded === true ? 'YES' : 'NO'}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton
                        color="success"
                        variant="outline"
                        onClick={(e) => updateAction(type.id)}
                      >
                        <CIcon icon={cilSave} />
                      </CButton>

                      <CButton
                        color="danger"
                        variant="outline"
                        onClick={(e) => deleteAction(type.id)}
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <Link to={'/home'} className="justify-content-end mt-5">
              <CButton className="justify-content-end" size="lg" color="dark">
                Go Back to Home
              </CButton>
            </Link>
          </CContainer>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CandidateDetail
