import  { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { MenuItem, Select, Typography } from "@mui/material";
import {} from "./globals";
/**
 * You will find globals from this file useful!
 */
import {GET_DEFAULT_HEADERS} from "./globals";
import { IUniversityClass } from "./types/api_types";
import { GradeTable } from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]); /** We are making an array, specifying that the university
  class info we get from the call will be here */
  const [students,setStudents]=useState<string[]>([]);//students per class in an array


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
      console.log("Fetching..."); // Fetch call to check
      try {
        const data = await fetch("https://spark-se-assessment-api.azurewebsites.net/api/class/listBySemester/fall2022?buid=U84054577", {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        if (data.ok) {
          const classList = await data.json();
          console.log(classList); // API check
          setClassList(classList);
  
          const classIds = classList.map((item: { classId: any; }) => item.classId); // mapping the classId's
          console.log("Class IDs:", classIds); // Log class IDs to check
        } else {
          console.error("Error fetching classes:", data.statusText);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchData(); // Fetch data as website loads
  
  }, []);
  

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
