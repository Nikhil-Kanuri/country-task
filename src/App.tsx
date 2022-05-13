import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TextField, Button } from "@mui/material";
import { setConstantValue } from "typescript";
import { Console } from "console";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { json } from "stream/consumers";

const token = "3ba753768d2862e287b17338aff2e6cf";

interface props {
  val: string;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComp />} />
          <Route path="/table" element={<AllData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;

const MainComp = () => {
  const Nikhil=useNavigate();
  const [val, setval] = useState("");
  //  const token ="3ba753768d2862e287b17338aff2e6cf";

  const GetCountry = (eve: any) => {
    eve.preventDefault();
    fetch(`https://restcountries.com/v2/name/${val}`)
      .then((data) => data.json())
      .then((result) => {
        console.log(result, "result");
        localStorage.setItem("titli", JSON.stringify(result));
      });
    return (
      Nikhil('/table')
    )
  };

  return (
    <div className="App">
      <form className="form" onSubmit={GetCountry}>
        <TextField
          id="filled-basic"
          label="Country"
          variant="filled"
          placeholder="Enter country Name"
          onChange={(event) => {
            setval(event.target.value);
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          disabled={val?.length < 3 ? true : false}
          type="submit"
        >
          Get Deatails
        </Button>
      </form>
    </div>
  );
};

const AllData = () => {
  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    color: "yellow",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [details, setdetails] = React.useState<any>([]);
  const [WeatherData, setWeatherData] = React.useState<any>({});

  React.useEffect(() => {
    const All_data = localStorage.getItem("titli");
    console.log(All_data);
    if (All_data) {
      setdetails(JSON.parse(All_data));
    }
  }, []);

  const GetWeather = (data: any) => {
    //eve.preventDefault();
    fetch(
      `http://api.weatherstack.com/current?access_key=${token}&query=${data}`
    )
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setWeatherData(res?.current);
        setOpen(true);
        console.log(res?.current, "res***");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="display">
      <table className="tab">
        <tr>
          <th>Capital</th>
          <th>Population</th>
          <th>Lon & Lat</th>
          <th>Flag</th>
          <th>Weather?</th>
        </tr>
        {details?.map((data: any) => {
          return (
            <tr>
              <td>{data?.capital}</td>
              <td>{data?.population}</td>
              <td>{data?.latlng.join()}</td>
              <td>
                <img id="flag" src={data?.flag} alt="Flag" />
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => GetWeather(data?.capital)}
                >
                  Get Weather
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3><u>Weather Information </u></h3>
          <h4 id="modal-modal-title">
            Temperature :{WeatherData?.temperature}
          </h4>
          <h4 id="modal-modal-title">
            Precip : {WeatherData?.precip}
          </h4>
        {/*  {WeatherData?.weather_icons[0] ? (
            <img
              src={WeatherData?.weather_icons[0]}
              alt="weather_iocn"
              style={{ height: "100px", width: "100px" }}
            />
          ) : (
            <></>
          )}
          */}

          <h4 id="modal-modal-description" >
            Wind Speed : {WeatherData?.wind_speed}
          </h4>
        </Box>
      </Modal>
    </div>
  );
};
