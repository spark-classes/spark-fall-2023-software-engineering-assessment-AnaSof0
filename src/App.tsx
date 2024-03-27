import  { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
import GradeTable from "./components/GradeTable";
/**
 * You will find globals from this file useful!
 */
import {GET_DEFAULT_HEADERS,BASE_API_URL,MY_BU_ID} from "./globals";
import { IUniversityClass } from "./types/api_types";


function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]); /** We are making an array, specifying that the university
  class info we get from the call will be here */
  const [studentList,setStudentList]=useState<string[]>([]);//students per class in an array
  const [nameList,setNameList]=useState<string[]>([]);


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
            names.push(data[0]?.name);
          } else {
            console.error("Error fetching student:", studentId);
            names.push("");
          }
        }
        setNameList(names);
      } catch (error) {
        console.error("Error fetching student names:", error);
      }
    };
    fetchNameList();
  }, [studentList]);


  

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
          <GradeTable studentList={studentList} nameList={nameList} currClassId={currClassId} classList={classList} />  {/* Passing the fetched data into the table component*/}
           
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
