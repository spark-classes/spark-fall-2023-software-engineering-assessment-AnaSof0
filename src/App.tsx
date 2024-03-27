import  { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
import {} from "./globals";
/**
 * You will find globals from this file useful!
 */
import {GET_DEFAULT_HEADERS,BASE_API_URL,MY_BU_ID} from "./globals";
import { IUniversityClass } from "./types/api_types";
import { GradeTable } from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]); /** We are making an array, specifying that the university
  class info we get from the call will be here */
  const [studentsList,setStudentsList]=useState<string[]>([]);//students per class in an array


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
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching classes...");
      try {
        const response = await fetch(`${BASE_API_URL}/class/listBySemester/fall2022?buid=${MY_BU_ID}`, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        if (response.ok) {
          const classListData = await response.json();
          console.log("Class List:", classListData);
          setClassList(classListData);
        } else {
          console.error("Error fetching classes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (studentsList.length === 0) {
      const fetchStudents = async () => {
      console.log("Fetching students...");
      try {
        const names = [];
        for (const studentId of studentsList) {
          const response = await fetch(`${BASE_API_URL}/student/GetById/${studentId}?buid=${MY_BU_ID}`, {
            method: "GET",
            headers: GET_DEFAULT_HEADERS(),
          });

          console.log("Response status:", response.status);
          if (response.ok) {
            const studentData = await response.json();
            console.log("Fetched data for student ID", studentId, ":", studentData);
            names.push(studentData[0]?.name);
          } else {
            console.error("Failed to fetch student with ID:", studentId);
            throw new Error(`Failed to fetch student with ID: ${studentId}`);
          }
        }

        setStudentsList(names);
        console.log("Student names:", names);
      } catch (error) {
        console.error("Error fetching student names:", error);
      }
    };

    fetchStudents();
  }
  }, [studentsList]);
  

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
            ))}
          </Select>
        </div>
      </Grid>
      <Grid xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Final Grades
        </Typography>
        <div> {/* Render your GradeTable component here */}</div>
      </Grid>
    </Grid>
  </div>
);
}

export default App;
