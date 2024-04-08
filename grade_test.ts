// calculate_grade.ts
/* TESTING
// Import function to test
import { calculateStudentFinalGrade } from './calculate_grade';
import { calcAllFinalGrade } from './calculate_grade';



function testCalculateStudentFinalGrade() {
  // Sample data
  const studentID = "123";
  const classAssignments = [
    { assignmentId: "1", grade: 90 },
    { assignmentId: "2", grade: 85 },
    { assignmentId: "3", grade: 100 },
    { assignmentId: "4", grade: 2 },
   
  ];

  const weights = [
    { assignmentId: "1", weight: 0.6 },
    { assignmentId: "2", weight: 0.2 },
    { assignmentId: "3", weight: 0.1 },
    { assignmentId: "4", weight: 0.1 },
    
  ];
 
 

  // Call function
  const finalGrade = calculateStudentFinalGrade(classAssignments, weights);

  // result
  console.log("Final grade:", finalGrade);
}


function testCalcAllFinalGrade() {
  // Sample 
  const classID = "cas432";
  const classAssignments = [
    { assignmentId: "1"},
    { assignmentId: "2"},
    { assignmentId: "3"},
    { assignmentId: "4"},
  ];

  const weights = [
    { assignmentId: "1", weight: 0.6 },
    { assignmentId: "2", weight: 0.2 },
    { assignmentId: "3", weight: 0.1 },
    { assignmentId: "4", weight: 0.1 },
  ];

  const studentGrades = [
    {
      studentId: "Maria",
      grades: {
        "1": "0",
        "2": "90",
        "3": "80",
        "4": "70"
      }
    },
    {
      studentId: "Mario",
      grades: {
        "1": "100",
        "2": "100",
        "3": "100",
        "4": "60"
      }
    },

  ];

  // Call function
  const finalGrades = calcAllFinalGrade(classID, classAssignments, weights, studentGrades);

  // Output final grades
  console.log("Final grades:", finalGrades);
}
export { testCalculateStudentFinalGrade };
export {testCalcAllFinalGrade};
*/