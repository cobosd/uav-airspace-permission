import React, {useState} from "react";
import {
  withStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./App.css";
import Map from "./Map";
// import axios from 'axios';

import {fetchData} from "./functions/queryAthena";

const CustomButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #810cf5 30%, #810cf5 70%)",
    border: 0,
    color: "white",
    width: 250,
    height: 50,
    borderRadius: 40,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    position: "absolute",
    top: 10,
    right: 100,
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    textTransform: "capitalize"
  }
})(props => <Button {...props} />);


function App() {
  const [polygons, setPolygons] = useState([]);

  // function updateArrayBox() {
  //   // console.log('UA',polygons)
  //   const answer = document.getElementById('array-area');
  //   answer.innerHTML = `<p>eu to aqui</p><p>square meters</p>`;
  //   answer.innerHTML = '';
  //   }

  const handleClick = async ()=>{
    fetchData(polygons).then((res)=> console.log(res))
    // alert('Run lambda...')
    // // console.log(polygons)
    // updateArrayBox()
    // let my_list = []
    // polygons.map((item)=> my_list.push(item))
    // console.log('here',my_list[0])

  }

  return (
    <div>
      <Map polygons={polygons} setPolygons={setPolygons}/>
      <CustomButton onClick={handleClick}> Request Approval </CustomButton>
      {/* <div className="array-box">
            <div id="array-area">
              <p>{JSON.stringify(polygons)}</p>
            </div>
        </div> */}
    </div>
  )
}

export default App;
