import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import for useNavigate
import './MobileMenu.css';

function AnalyzeData() {
    const [data, setData] = useState([]);
    const navigate = useNavigate(); // Updated for current version of react-router-dom

    
    useEffect(() => {
        const storedemail = localStorage.getItem('currentSession');
        
        if (storedemail) {
          const sessionjson = JSON.parse(storedemail);
          console.log(sessionjson.idemail)
        
        fetch('https://bolsta.nyraleadership.com/webcam-api/api/show_analyze_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: sessionjson.idemail
            })
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log('Error fetching data:', error));
    }
    }, []);


    const handleShowDetails = (id) => {
        // Navigate to the details page with userId as a parameter using the updated navigate method
        navigate(`/user-details/${id}`);
    };

    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    return (
        <div className="container-fluid" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <div className="row flex-nowrap" style={{'--bs-gutter-x' : '0px'}}>


  <div
      style={{
        width: "0%",
        padding: 0,
        margin: 0,
        transition: "width 0.3s ease",
      }}
      className="outer-container"
    >

                        {/* Hamburger Icon */}
                        {!isOpen && (
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div style={{display:'flex',position:'fixed',left:0,paddingLeft: '17px',flexDirection: 'column'}}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
          </div>
          <img
                className="img-fluid"
                src="/bolsta_logo.png"
                alt="Logo"
                style={{paddingRight: '10px', width: '120px'}}
              />
        </div>
      )}


      {/* Sidebar Menu */}
      <div className={`sidebar-menu ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        {isOpen && (
          <button className="close-button" onClick={toggleMenu}>
            ✕
          </button>
        )}

        <div className="d-flex flex-column align-items-sm-start px-4 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 pt-4 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-5 d-inline">
              <img
                className="img-fluid"
                src="/video/images/black_bolsta_logo.png"
                alt="Logo"
              />
            </span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-auto align-items-center align-items-sm-start"
            id="menu"
            style={{ width: "100%" }}
          >
            <li
              className="nav-item mt-2"
              style={{
                width: "100%",
              }}
            >
              <Link
                to="/practice"
                className="nav-link align-middle px-0"
                style={{
                  color: "black",
                }}
              >
                <img
                  className="img-fluid"
                  src="/video/images/Vector.png"
                  alt="Practice Icon"
                  style={{ paddingLeft: 10 }}
                />
                <span className="ms-1 d-inline">Practice</span>
              </Link>
            </li>
            <li className="nav-item mt-2" style={{ width: "100%",background:
                  "linear-gradient(90deg, rgba(92, 230, 172, 1) 0%, rgb(58 220 255) 100%)",
                borderRadius: 27, }}>
              <Link
                to="/analyze-data"
                className="nav-link px-0 align-middle"
                style={{
                  color: "black",
                }}
              >
                <img
                  className="img-fluid"
                  src="/video/images/Vector.png"
                  alt="Video Icon"
                  style={{ paddingLeft: 10 }}
                />{" "}
                <span className="d-inline">My Video</span>
              </Link>
            </li>
          </ul>
          <hr />
          <Link
                to="/"
                className="nav-link px-0 mb-4 align-middle"
                style={{
                  color: "black",
                  position: 'absolute',
                  bottom: 0
                }}
              >
                <img
                  className="img-fluid"
                  src="/video/images/Vector.png"
                  alt="Video Icon"
                  style={{ paddingLeft: 10 }}
                />{" "}
                <span className="d-inline">Log Out</span>
              </Link>
        </div>
      </div>
    </div>
<div className="container belowdivanalyse analyzedatadiv">
    <div className="table-responsive">
        <table className="table table-bordered text-center">
            <thead className="thead-light">
                <tr>
                    <th>ID</th>
                    <th>Pace</th>
                    <th>Filler Words (%)</th>
                    <th>Smiling Percentage (%)</th>
                    <th>Weak Words (%)</th>
                    <th>conciseness (%)</th>
                    <th>Date </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.user_id}>
                        <td>{item.user_id}</td>
                        <td>{item.speed} WPM</td>
                        <td>{item.filler_words_percentage} %</td>
                        <td>{item.smiling_percentage} %</td>
                        <td>{item.weak_words_percentage} %</td>
                        <td>{item.conciseness_score} %</td>
                        <td>{item.date} </td>
                        <td>
                            <button
                                onClick={() => handleShowDetails(item.id)}
                                className="btn btn-info btn-sm"
                            >
                                Show Details
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>


            </div>
        </div>
    );
}

export default AnalyzeData;
