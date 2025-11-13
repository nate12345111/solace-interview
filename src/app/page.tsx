"use client";

import { useEffect, useState } from "react";
const GET_ADVOCATES_URL = "http://localhost:3000/api/advocates";


export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates("");
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;



    setCurrentSearchTerm(searchTerm);
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

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
    setCurrentSearchTerm("")
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
        <button class="bg-blue-700 hover:bg-blue-500 text-white py-1 px-2 rounded-full ml-2" onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>Full Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr class="pt-3 pb-3">
                <td>{advocate.firstName} {advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div class="inline-flex m-1 rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ">{s}</div>
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
