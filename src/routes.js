import React from 'react'

const HomeList = React.lazy(() => import('./views/pages/homeList/HomeList'))
const CandidateDetail = React.lazy(() => import('./views/pages/candidate/CandidateDetail'))
const CreateCandidate = React.lazy(() => import('./views/pages/candidate/CandidateCreate'))
const StatusCandidate = React.lazy(() => import('./views/pages/candidate/CandidateStatus'))
const UpdateCandidate = React.lazy(() => import('./views/pages/candidate/CandidateEdit'))
const DeleteCandidate = React.lazy(() => import('./views/pages/candidate/CandidateDelete'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/*', name: 'HomeList', element: HomeList },
  { path: '/savecandidate', name: 'Create Candidate', element: CreateCandidate },
  { path: '/statuscandidate', name: 'Status Candidate', element: StatusCandidate },
  { path: '/updatecandidate', name: 'Update Candidate', element: UpdateCandidate },
  { path: '/deletecandidate', name: 'Delete Candidate', element: DeleteCandidate },

  {
    path: '/candidatedetail/:id',
    name: 'Candidate Detail',
    element: CandidateDetail,
  },
]
export default routes
