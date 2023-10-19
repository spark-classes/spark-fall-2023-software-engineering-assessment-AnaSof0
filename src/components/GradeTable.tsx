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
/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = () => {
  return <>
  </>;
};
