import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VotingData.css";
import Cookies from "universal-cookie";

const VotingData = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidates, setCandidates] = useState([]);

  const cookies = new Cookies();

  const token = cookies.get("access_token");

  const getCandidates = async () => {
    try {
      const url = "http://localhost:5000/candidate/getcandidatevotes";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setCandidates(response.data.candidatevotes);
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div>
      {isAdmin ? (
        <table border={"2px"}>
          <tr>
            <th>Candidate Name</th>
            <th>Votes secured</th>
          </tr>
          {candidates &&
            candidates.map((candidate) => {
              return (
                <tr key={candidate._id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.count}</td>
                </tr>
              );
            })}
        </table>
      ) : (
        <>Sorry only admins can view this page</>
      )}
    </div>
  );
};

export default VotingData;
