import {
  ModuleRegistry,
  ColumnAutoSizeModule,
  PaginationModule,
  TextFilterModule,
  SelectEditorModule,
  ClientSideRowModelModule,
  LocaleModule
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { app, auth } from '../../firebase/client'

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  PaginationModule,
  TextFilterModule,
  SelectEditorModule,
  ClientSideRowModelModule,
  LocaleModule
])

const db = getFirestore(app)

async function updateRegister(rowData) {
  try {
    const { uid, ...data } = rowData

    const docRef = doc(db, 'registro-iwd2025', uid)
    await updateDoc(docRef, data)
  } catch (error) {
    console.error('Error updating document:', error)
  }
}

const onCellValueChanged = event => {
  updateRegister(event.data)
}

const VoucherLinkRenderer = ({ value }) => (
  <span>
    {value && (
      <a
        href={value}
        className='text-blue-three hover:underline dark:text-blue-two'
        target='_blank'
        rel='noopener noreferrer'
      >
        Comprobante
      </a>
    )}
  </span>
)

export const DataGrid = ({ registerList }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) window.location.assign('/')
    })

    return () => unsubscribe()
  }, [])

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(registerList)

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      field: 'firstname',
      headerName: 'Nombre(s)',
      sort: 'asc',
      filter: true,
      floatingFilter: true,
      minWidth: 140,
      flex: 2
    },
    {
      field: 'lastname',
      headerName: 'Apellido(s)',
      filter: true,
      floatingFilter: true,
      minWidth: 140,
      flex: 2
    },
    {
      field: 'role',
      headerName: 'Rol',
      editable: true,
      width: 120,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Participante', 'Organizador']
      }
    },
    { field: 'package', headerName: 'Paquete', width: 120 },
    { field: 'dietaryRestriction', headerName: 'Restricción alimentaria' },
    { field: 'checkin', headerName: 'Check-in', editable: true, width: 100 },
    { field: 'validated', headerName: 'Registro válido', editable: true, width: 140 },
    { field: 'voucher', headerName: 'Comprobante', cellRenderer: VoucherLinkRenderer }
  ])

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        getRowId={params => params.data.uid}
        pagination={true}
        paginationAutoPageSize={true}
        localeText={AG_GRID_LOCALE_ES}
      />
    </div>
  )
}
