/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass } from "../types/api_types";

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */

// Define the interface for assignment weights
export interface Weights {
  assignmentId: string;
  weight: number;
}
type gradeList = {
  [assignmentId: string]: string;
};


export function calculateStudentFinalGrade(
  gradeAssignments: { [assignmentId: string]: string },
  weights: Weights[] 
): number {
  try {
    
    let totalWeightedGrade = 0;
    const gradeList = gradeAssignments[0]
    const assignmentIDs = Object.keys(gradeList);
    console.log("GradeList: ", gradeList)
    console.log("assignmentIDs: ",assignmentIDs)
    console.log("weights: ", weights);
    
    for (const assignmentId of assignmentIDs) {
      const gradeString = gradeList[assignmentId]; //error but dont know why exactly
      console.log("Assignment ID:", assignmentId);
      console.log("Grade:", gradeString);
      const singleGrade = parseFloat(gradeString);
      console.log("SingleGrade: " , singleGrade)
      const assignmentWeight = weights.find(weight => weight.assignmentId === assignmentId)?.weight;
      console.log("its weight: ",assignmentWeight)
      const weightedGrade = singleGrade * (assignmentWeight ?? 0); // Handle case when assignment weight is undefined
      totalWeightedGrade += weightedGrade;
    }
    console.log("Grade calculated: ", totalWeightedGrade)

    return totalWeightedGrade;
  } catch (error) {
    console.error('Error calculating final grade:', error);
    return 0;
  }
}

export function calcAllFinalGrade(
  classID: string,
  classAssignments: any[],
  weights: Weights[],
  studentGrades: { studentId: string; grades: { [assignmentId: string]: string }; }[]
): { studentID: string; finalGrade: number; }[] {
  const finalGrades: { studentID: string; finalGrade: number; }[] = [];

  // Iterate over each student
  for (const student of studentGrades) {
    const studentId = student.studentId;
    const gradeAssignments = student.grades; // Object containing grades of the student

    // Calculate final grade for each student
    const finalGrade = calculateStudentFinalGrade(gradeAssignments, weights);

   
    finalGrades.push({ studentID: studentId, finalGrade: finalGrade });
  }

  return finalGrades;
}
