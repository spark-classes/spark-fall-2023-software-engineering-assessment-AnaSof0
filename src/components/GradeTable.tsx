import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface GradeTableProps {
  studentList: string[];
  nameList: string[];
  currClassId: string;
  classList: { classId: string; title: string; description: string; meetingTime: string; meetingLocation: string; semester : string }[]; //defining how we get the data
}

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'Student ID', width: 100 },
  { field: 'StudentName', headerName: 'Student Name', width: 200 },
  { field: 'ClassID', headerName: 'Class ID', width: 100 },
  { field: 'ClassName', headerName: 'Class Name', width: 200 },
  { field: 'Semester', headerName: 'Semester', width: 100 },
  { field: 'FinalGrade', headerName: 'Final Grade', width: 100 },
];

const GradeTable: React.FC<GradeTableProps> = ({ studentList, nameList, currClassId, classList}) => {
  // Find the class object corresponding to the currClassId
  const selectedClass = classList.find(classItem => classItem.classId === currClassId);
  const classTitle = selectedClass ? selectedClass.title : '';
  const sem = selectedClass ? selectedClass.semester:'';

  const rows = studentList.map((student, index) => ({
    id: index,
    ID: student,
    StudentName: nameList[index],
    ClassID: currClassId, // classID from the initial fetch
    ClassName: classTitle, // title of the current class Id array defined at top
    Semester: sem, 
    FinalGrade: '', 
  }));

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default GradeTable;


