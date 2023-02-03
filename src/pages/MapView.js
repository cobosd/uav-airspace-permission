import { useState } from "react";
import Map from "./Map";
import {fetchData} from "../functions/queryAthena";
import "./css/MapView.css";


function MapView() {
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
      <button className="map-button" onClick={handleClick}> Request Approval </button>
      {/* <div className="array-box">
            <div id="array-area">
              <p>{JSON.stringify(polygons)}</p>
            </div>
        </div> */}
    </div>
  )
}

export default MapView;
