import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VotingPage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [votedCandidate, setSVotedCandidate] = useState("");
  const navigate = useNavigate();

  const cookies = new Cookies();

  const token = cookies.get("access_token");

  const handleCandidateSelect = (e) => {
    setSelectedCandidate(e.target.value);
    setSelectedCandidateId(e.target.name);
  };

  const handleVote = async () => {
    const url = "http://localhost:5000/candidate/updatecandidatevotes";
    const body = {
      id: selectedCandidateId,
    };
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibW9uaXNoQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibW9uaXNoIiwidXNlcl90eXBlIjoidm90ZXIiLCJpc3ZvdGVkIjpmYWxzZX0sImlhdCI6MTY5MDQ0OTI3OSwiZXhwIjoxNjkxMDU0MDc5fQ.YUsgUbjwlHTuEXhiGD-HYZXZ0-XOVC0Ay41hwWccObw";
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      navigate(0);
    }
    console.log("dsds", selectedCandidate);
  };

  const checkVotingStatus = async () => {
    try {
      const url = "http://localhost:5000/user/checkVotingStatus";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.isvoted) {
        setIsVoted(true);
        setSVotedCandidate(response.data.candidate.name);
      }
    } catch (error) {
      console.log("rerer", error);
    }
  };

  const getCandidates = async () => {
    const url = "http://localhost:5000/candidate/listofcandidate";
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibW9uaXNoQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoibW9uaXNoIiwidXNlcl90eXBlIjoidm90ZXIiLCJpc3ZvdGVkIjpmYWxzZX0sImlhdCI6MTY5MDQ0OTI3OSwiZXhwIjoxNjkxMDU0MDc5fQ.YUsgUbjwlHTuEXhiGD-HYZXZ0-XOVC0Ay41hwWccObw";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data) {
      setCandidates(response.data.candidatedetails);
    }
  };

  useEffect(() => {
    checkVotingStatus();
    if (!isVoted) getCandidates();
  }, []);

  return (
    <div>
      <h2>Voting Page</h2>
      {isVoted ? (
        <div>You voted to {votedCandidate}</div>
      ) : (
        <form>
          {candidates.length > 0 ? (
            candidates.map((candidate) => {
              return (
                <div key={candidate._id}>
                  <input
                    type="radio"
                    name={candidate._id}
                    value={candidate.name}
                    checked={selectedCandidate === candidate.name}
                    onChange={(e) => handleCandidateSelect(e)}
                  />
                  <label htmlFor={candidate.name}>{candidate.name}</label>
                </div>
              );
            })
          ) : (
            <p>Loading candidates...</p>
          )}
          <br />
          <button type="button" onClick={handleVote}>
            Vote
          </button>
        </form>
      )}
    </div>
  );
};

export default VotingPage;
