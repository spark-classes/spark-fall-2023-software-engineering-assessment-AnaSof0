/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */

import { Weights } from "../types/api_types";
/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export function calculateStudentFinalGrade(
  gradeAssignments: { [assignmentId: string]: string },
  weights: Weights[]
): number {
  try {
    let totalWeightedGrade = 0;
    const gradeList=gradeAssignments[0]
    //console.log("Grade List: ",gradeList)

    // Extract assignment IDs from gradeAssignments
    const assignmentIDs = Object.keys(gradeList);
    //console.log("assignmentIDs: ", assignmentIDs)

    for (const assignmentId of assignmentIDs) {
      // Retrieve the grade for the current assignment
      const gradeString = (gradeList as unknown as { [key: string]: string })[assignmentId];
      /*FIXED ISSUE 
      CHATGPT HELPED:
      """"
      By explicitly asserting gradeList as an object with string keys, you provide TypeScript with more information about the type structure, helping it understand the type of gradeString more accurately.
      Try making your code like this:
        for (const assignmentId of assignmentIDs) {
          // Retrieve the grade for the current assignment
          const gradeString = (gradeList as { [key: string]: string })[assignmentId];
          // Rest of your code...
      """"
          Also, quick fix from vscode helped me set it as unknown first
       */
      const singleGrade = parseFloat(gradeString);

      // Find the weight of the current assignment
      const assignmentWeight = weights.find(weight => weight.assignmentId === assignmentId)?.weight;
      console.log("its weight: ",assignmentWeight)

      // Calculate the weighted grade for the current assignment
      const weightedGrade = singleGrade * (assignmentWeight ?? 0); // Handle case when assignment weight is undefined
      console.log("weighted grade: ", weightedGrade)
      // Accumulate the total weighted grade
      totalWeightedGrade += weightedGrade;
    }
    return totalWeightedGrade;
  } catch (error) {
    console.error('Error calculating final grade:', error);
    return 0;
  }
}

export function calcAllFinalGrade(
  weights: Weights[],
  studentGrades: { studentId: string; grades: { [assignmentId: string]: string }; }[]
): { studentID: string; finalGrade: number; }[] {
  const finalGrades: { studentID: string; finalGrade: number; }[] = [];

  //console.log("weights: " , weights)
  //console.log("studentGrades: ",studentGrades)

  // Iterate over each student
  for (const student of studentGrades) {
    const studentId = student.studentId;
    const gradeAssignments = student.grades; // Object containing grades of the student

    console.log("Student ", studentId , "grades ", gradeAssignments)
  
    // Calculate final grade for each student
    const finalGrade = calculateStudentFinalGrade(gradeAssignments, weights);

    finalGrades.push({ studentID: studentId, finalGrade: finalGrade });
  }

  return finalGrades;
}