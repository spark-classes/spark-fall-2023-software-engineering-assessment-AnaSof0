import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface GradeTableProps {
  studentList: string[];
}

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'Student ID', width: 100 },
  { field: 'StudentName', headerName: 'Student Name', width: 100 },
  { field: 'StudentName', headerName: 'Class ID', width: 100 },
  { field: 'StudentName', headerName: 'Class Name', width: 100 },
  { field: 'StudentName', headerName: 'Semester', width: 100 },
  { field: 'StudentName', headerName: 'Final Grade', width: 100 },
 
];

const GradeTable: React.FC<GradeTableProps> = ({ studentList }) => {
  const rows = studentList.map((student, index) => ({
    id: index,
    ID: student,
    StudentName: student, 
  }));

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default GradeTable;


