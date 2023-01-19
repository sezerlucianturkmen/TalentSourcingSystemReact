import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilLockLocked,
  cilMagnifyingGlass,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilHome,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    to: '/home',
  },
  {
    component: CNavGroup,
    name: 'Create Habitant',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Create',
        to: '/habitant',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Update Habitant',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Children',
        to: '/habitant/update',
      },
      {
        component: CNavItem,
        name: 'Update Habitant',
        to: '/habitant/updatedetail',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'FindAll Habitant',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'FindAll',
        to: '/habitant/findall',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Search by',
    icon: <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Is Citizen',
        to: '/habitant/isCitizen',
      },
      {
        component: CNavItem,
        name: 'Name Surname',
        to: '/habitant/namesurname',
      },
      {
        component: CNavItem,
        name: 'Has Driving License',
        to: '/habitant/hasdrivinglicense',
      },
      {
        component: CNavItem,
        name: 'Number of Children by Id',
        to: '/habitant/numberofchildren',
      },
      {
        component: CNavItem,
        name: 'Habitant Id',
        to: '/habitant/searchbyid',
      },
    ],
  },
]

export default _nav
