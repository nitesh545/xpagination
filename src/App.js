import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Pagination from "./pagination";

export default function App() {
  let [employeeData, setEmployeeData] = useState([]);
  let [pg, setPg] = useState(0);

  let fetchEmployeeData = () => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then((response) => response.json())
        .then((data) => setEmployeeData(data))
        .catch((error) => {console.log(error); alert('failed to fetch data');});
  }

  let handleNextPage = () => {
      if (pg<4){
          setPg(pg+1);
      }
  }

  let handlePreviousPage = () => {
      if(pg>0){
          setPg(pg-1);
      }
  }

  useEffect(() => fetchEmployeeData(), []);

  return (
    <div className="App">
      <h2>Employee Data Table</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            <tbody>
            {
                employeeData.slice(pg*10, pg*10 + 10).map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.role}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        <Pagination pageno={pg} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage}/>
    </div>
  );
}
