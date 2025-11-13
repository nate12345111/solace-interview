"use client";

import { useEffect, useState } from "react";
const GET_ADVOCATES_URL = "http://localhost:3000/api/advocates";


export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates("");
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    fetchAdvocates(searchTerm);
  };

  const fetchAdvocates = async (searchTerm: string) => {
    const params = {
      query: searchTerm
    };

    const url = new URL(GET_ADVOCATES_URL);
    url.search = new URLSearchParams(params).toString();

    fetch(url).then((response) => {
      response.json().then((jsonResponse) => {
       if ((searchTerm ==  "") && (advocates.length == 0)) {
        setAdvocates(jsonResponse.data);
       }
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
