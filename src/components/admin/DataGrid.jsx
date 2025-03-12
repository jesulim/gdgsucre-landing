import {
  ModuleRegistry,
  ColumnAutoSizeModule,
  PaginationModule,
  TextFilterModule,
  SelectEditorModule,
  ClientSideRowModelModule,
  LocaleModule,
  CsvExportModule
} from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { useEffect, useState, useRef, useCallback } from 'react'

import { app, auth } from '../../firebase/client'

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  PaginationModule,
  TextFilterModule,
  SelectEditorModule,
  ClientSideRowModelModule,
  LocaleModule,
  CsvExportModule
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
  const gridRef = useRef()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        fetch('/api/auth/signout').then(() => {
          window.location.assign('/')
        })
      }
    })

    return () => unsubscribe()
  }, [])

  const downloadCSV = useCallback(() => {
    gridRef.current.api.exportDataAsCsv()
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
    {
      field: 'food_delivered',
      headerName: 'Refrigerio entregado',
      editable: true,
      width: 200,
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor'
    },
    { field: 'validated', headerName: 'Registro válido', editable: true, width: 140 },
    { field: 'voucher', headerName: 'Comprobante', cellRenderer: VoucherLinkRenderer }
  ])

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <button
        className='mb-2 rounded-md border border-green-three p-2 text-sm'
        onClick={downloadCSV}
      >
        Descargar como CSV
      </button>

      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
        getRowId={params => params.data.uid}
        pagination={true}
        paginationAutoPageSize={true}
        localeText={AG_GRID_LOCALE_ES}
        enableCellTextSelection
      />
    </div>
  )
}
