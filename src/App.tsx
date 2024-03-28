import  { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
import GradeTable from "./components/GradeTable";
/**
 * You will find globals from this file useful!
 */
import {GET_DEFAULT_HEADERS,BASE_API_URL,MY_BU_ID} from "./globals";
import { IUniversityClass } from "./types/api_types";
import { calcAllFinalGrade} from '../src/utils/calculate_grade';

//import { testCalcAllFinalGrade} from '../src/utils/grade_test';  

export default function App() {

  // interface for assignment weights
  interface Weights {
    assignmentId: string;
    weight: number;
  }

  // Function to parse assignment weights from API response
  function parseWeights(data: any[]): Weights[] {
    return data.map((assignment: any) => ({
      assignmentId: assignment.assignmentId,
      weight: assignment.weight,
    }));
  }


  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]); /** We are making an array, specifying that the university
  class info we get from the call will be here */
  const [studentList,setStudentList]=useState<string[]>([]);//students per class in an array
  const [nameList,setNameList]=useState<string[]>([]);

  const [classAssignments, setClassAssignments] = useState<any[]>([]);
  const [weights, setWeights] = useState<Weights[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [finalGrades, setFinalGrades] = useState<{ studentID: string; finalGrade: number; }[]>([]);

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */

  //getting the class List for the dropdown menu
  useEffect(() => {
    const fetchClassList = async () => {
      console.log("Fetching class list..."); // check
      try {
        const response = await fetch(`${BASE_API_URL}/class/listBySemester/fall2022?buid=${MY_BU_ID}`, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Class list:", data); // check
          setClassList(data);
        } else {
          console.error("Error fetching class list:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching class list:", error);
      }
    };
    fetchClassList();
  }, []);

  //getting the student IDs in each class
  useEffect(() => {
    const fetchStudentList = async () => {
      console.log("Fetching student list..."); // check
      try {
        if (currClassId) {
          const response = await fetch(
            `${BASE_API_URL}/class/listStudents/${currClassId}?buid=${MY_BU_ID}`,
            {
              method: "GET",
              headers: GET_DEFAULT_HEADERS(),
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log("Student list:", data); // check
            setStudentList(data);
          } else {
            console.error("Error fetching student list:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching student list:", error);
      }
    };
    fetchStudentList();
  }, [currClassId]);

  //getting the names for each student
  useEffect(() => {
    const fetchNameList = async () => {
      try {
        const names = [];
        for (const studentId of studentList) {
          const response = await fetch(
            `${BASE_API_URL}/student/GetById/${studentId}?buid=${MY_BU_ID}`,
            {
              method: "GET",
              headers: GET_DEFAULT_HEADERS(),
            }
          );
          if (response.ok) {
            const data = await response.json();
            names.push(data[0]?.name); //push name if there is a name, if not then just get undefined
          } else {
            console.error("Error fetching student:", studentId);
            names.push("");
          }
        }
        setNameList(names); //we have filled our array with the student names based on their id
        console.log(nameList)//check
      } catch (error) {
        console.error("Error fetching student names:", error);
      }
    };
    fetchNameList();
  }, [studentList]);

  // Fetching weights for the assignments in the selected class
  useEffect(() => {
    const fetchWeights = async () => {
      console.log("Fetching weights...");
      try {
        if (currClassId) {
          const response = await fetch(
            `${BASE_API_URL}/class/listAssignments/${currClassId}?buid=${MY_BU_ID}`,
            {
              method: "GET",
              headers: GET_DEFAULT_HEADERS(),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const parsedWeights = parseWeights(data);
            console.log("Fetched weights data:", data); // Log the raw weights data
            console.log("Parsed weights:", parsedWeights); // Log the parsed weights
            setWeights(parsedWeights);
          } else {
            console.error("Error fetching weights:", response.statusText);
          }
        }
      } catch (error) {
        console.error("Error fetching weights:", error);
      }
    };
    fetchWeights();
  }, [currClassId]);

// Fetching assignments of the selected class
useEffect(() => {
  const fetchData = async () => {
    try {
      if (currClassId) {
        // Fetch class assignments
        const assignmentsResponse = await fetch(`${BASE_API_URL}/class/listAssignments/${currClassId}?buid=${MY_BU_ID}`, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        if (assignmentsResponse.ok) {
          const assignmentsData = await assignmentsResponse.json();
          setClassAssignments(assignmentsData);
        } else {
          console.error("Error fetching class assignments:", assignmentsResponse.statusText);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();
}, [currClassId]);



// Get grades for each student for each assignment in the current class selected
useEffect(() => {
  const fetchGrades = async () => {
    if (currClassId && studentList.length > 0) {
      try {
        const fetchedGrades = [];
        for (const studentId of studentList) {
          const response = await fetch(
            `${BASE_API_URL}/student/listGrades/${studentId}/${currClassId}/?buid=${MY_BU_ID}`,
            {
              method: "GET",
              headers: GET_DEFAULT_HEADERS(),
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch grades for student ${studentId}`);
          }
          const data = await response.json();
          console.log("Grades fetched for student:", studentId, data.grades);
          fetchedGrades.push({ studentId, grades: data.grades });
        }
        console.log("All grades fetched:", fetchedGrades);
        setGrades(fetchedGrades);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
    }
  };
  fetchGrades();
}, [currClassId, studentList]);

console.log("grades:",grades)


/*testCalculateStudentFinalGrade(); Testing my function */
//testCalcAllFinalGrade();


//get final grades of each student 
useEffect(() => {
  const fetchFinalGrades = async () => {
    try {
      if (currClassId && classAssignments.length > 0 && weights.length > 0 && grades.length > 0) {
        console.log("Fetching final grades...");
        const finalGrades = calcAllFinalGrade(currClassId, classAssignments, weights, grades);
        console.log("Final grades fetched:", finalGrades);

        setFinalGrades(finalGrades);
      }
    } catch (error) {
      console.error("Error fetching final grades:", error);
    }
  };

  // Call the function to fetch final grades
  fetchFinalGrades();
}, [currClassId, classAssignments, weights, grades]); 



return (
  <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select
              fullWidth={true}
              label="Class"
              value={currClassId}
              onChange={(e) => setCurrClassId(e.target.value)}
            >
              {classList.map((classItem) => (
                <MenuItem key={classItem.classId} value={classItem.classId}>
                  {classItem.title}
                </MenuItem> 
              ))}{/* Mapping the class options so that our drop down menu shows them all, and you can select one*/ }
            </Select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable studentList={studentList}
           nameList={nameList} 
           currClassId={currClassId} 
           classList={classList} 
           finalGrades={grades}/>
           {/* Passing the fetched data into the table component*/}
        </Grid>
      </Grid>
    </div>
  );
};
