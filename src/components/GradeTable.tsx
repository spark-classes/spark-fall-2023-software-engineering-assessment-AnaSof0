import { DataGrid,GridColDef } from '@mui/x-data-grid';

/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
export function dummyData() {
  return [];
}


/** Making a table */
const columns: GridColDef[]=[
  {field:'ID',headerName:'Student ID',width:100},
  {field:'StudentName',headerName:'Student Name',width:100},
  {field:'ClassID',headerName:'Class ID',width:100},
  {field:'ClassName',headerName:'Class Name',width:100},
  {field:'Semester',headerName:'Semester',width:100},
  {field:'FinalGrade',headerName:'Final Grade',width:100},

];

const rows=[
  { id: 0, StudentName: 'Ana', ClassID: '123', ClassName: 'Math', Semester: 'Fall', FinalGrade: 'A' },
  { id: 1, StudentName: 'Anissa', ClassID: '14', ClassName: 'Science', Semester: 'Fall', FinalGrade: 'B' },
  { id: 2, StudentName: 'Mariana', ClassID: '1', ClassName: 'English', Semester: 'Spring', FinalGrade: 'A' },
  { id: 3, StudentName: 'Anais', ClassID: '123', ClassName: 'Math', Semester: 'Fall', FinalGrade: 'B' },
  { id: 4, StudentName: 'Maya', ClassID: '123', ClassName: 'Math', Semester: 'Fall', FinalGrade: 'C' },
  { id: 5, StudentName: 'Sara', ClassID: '8', ClassName: 'Chemistry', Semester: 'Spring', FinalGrade: 'D' },
  { id: 6, StudentName: 'Michael', ClassID: '23', ClassName: 'Bio', Semester: 'Fall', FinalGrade: 'A-' },
  { id: 7, StudentName: 'Noel', ClassID: '3', ClassName: 'Sports', Semester: 'Spring', FinalGrade: 'B+' }
];

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = () => {

  return(
    <div style ={{ height:300,width:'100%' }}>
      <DataGrid 
      rows={rows}
      columns={columns}
      pageSize={100}
      rowsPerPageOptions={[10]}/>
    </div>
  )
};
