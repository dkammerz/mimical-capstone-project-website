import { format } from 'date-fns';


export const COLUMNS = [
  {
    Header: 'Nr',
    accessor: 'Nr',
    Footer: 'Nr',
    // Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'Vorname',
    accessor: 'prename',
    Footer: 'Vorname'
    // Filter: ColumnFilter
  },
  {
    Header: 'Nachname',
    accessor: 'lastname',
    Footer: 'Nachname'
    // Filter: ColumnFilter
  },
  {
    Header: 'Email',
    accessor: 'email',
    Footer: 'Email',
    // Filter: ColumnFilter
  },
  {
    Header: 'Telefonnummer',
    accessor: 'tel',
    Footer: 'Telefonnummer'
    // Filter: ColumnFilter
  },
  {
    Header: 'Krankenversicherungs Nr.',
    accessor: 'knr',
    Footer: 'Krankenversicherungs Nr.'
    // Filter: ColumnFilter
  }
];