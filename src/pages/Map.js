import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "./css/Map.css";
import * as turf from "@turf/turf";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;


const Map = ({polygons, setPolygons}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-81.054569351878904);
  const [lat, setLat] = useState(29.203030324830272);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      styles: [
        {
          "id": "gl-draw-polygon-fill-inactive",
          "type": "fill",
          "filter": [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "fill-color": [
              "case", ["==", ["get", "user_class_id"], 1], "#ff0034", ["==", ["get", "user_class_id"], 2], "#ff0034",
              "#a020f0"
            ],
            "fill-outline-color": "#ff0034",
            "fill-opacity": 0.5
          }
        },
        {
          "id": "gl-draw-polygon-fill-active",
          "type": "fill",
          "filter": ["all", ["==", "active", "true"],
            ["==", "$type", "Polygon"]
          ],
          "paint": {
            "fill-color": "#ff0034",
            "fill-outline-color": "#ff0034",
            "fill-opacity": 0.1
          }
        },
        {
          "id": "gl-draw-polygon-midpoint",
          "type": "circle",
          "filter": ["all", ["==", "$type", "Point"],
            ["==", "meta", "midpoint"]
          ],
          "paint": {
            "circle-radius": 3,
            "circle-color": "#ff0034"
          }
        },
        {
          "id": "gl-draw-polygon-stroke-inactive",
          "type": "line",
          "filter": ["all", ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#a020f0",
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-polygon-stroke-active",
          "type": "line",
          "filter": ["all", ["==", "active", "true"],
            ["==", "$type", "Polygon"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#ff0034",
            "line-dasharray": [0.2, 2],
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-line-inactive",
          "type": "line",
          "filter": ["all", ["==", "active", "false"],
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#3bb2d0",
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-line-active",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["==", "active", "true"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#fbb03b",
            "line-dasharray": [0.2, 2],
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-polygon-and-line-vertex-stroke-inactive",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 5,
            "circle-color": "#fff"
          }
        },
        {
          "id": "gl-draw-polygon-and-line-vertex-inactive",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 3,
            "circle-color": "#fbb03b"
          }
        },
        {
          "id": "gl-draw-point-point-stroke-inactive",
          "type": "circle",
          "filter": ["all", ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 5,
            "circle-opacity": 1,
            "circle-color": "#fff"
          }
        },
        {
          "id": "gl-draw-point-inactive",
          "type": "circle",
          "filter": ["all", ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 3,
            "circle-color": "#3bb2d0"
          }
        },
        {
          "id": "gl-draw-point-stroke-active",
          "type": "circle",
          "filter": ["all", ["==", "$type", "Point"],
            ["==", "active", "true"],
            ["!=", "meta", "midpoint"]
          ],
          "paint": {
            "circle-radius": 7,
            "circle-color": "#fff"
          }
        },
        {
          "id": "gl-draw-point-active",
          "type": "circle",
          "filter": ["all", ["==", "$type", "Point"],
            ["!=", "meta", "midpoint"],
            ["==", "active", "true"]
          ],
          "paint": {
            "circle-radius": 5,
            "circle-color": "#fbb03b"
          }
        },
        {
          "id": "gl-draw-polygon-fill-static",
          "type": "fill",
          "filter": ["all", ["==", "mode", "static"],
            ["==", "$type", "Polygon"]
          ],
          "paint": {
            "fill-color": "#404040",
            "fill-outline-color": "#404040",
            "fill-opacity": 0.1
          }
        },
        {
          "id": "gl-draw-polygon-stroke-static",
          "type": "line",
          "filter": ["all", ["==", "mode", "static"],
            ["==", "$type", "Polygon"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#404040",
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-line-static",
          "type": "line",
          "filter": ["all", ["==", "mode", "static"],
            ["==", "$type", "LineString"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#404040",
            "line-width": 2
          }
        },
        {
          "id": "gl-draw-point-static",
          "type": "circle",
          "filter": ["all", ["==", "mode", "static"],
            ["==", "$type", "Point"]
          ],
          "paint": {
            "circle-radius": 5,
            "circle-color": "#404040"
          }
        }
      ],
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon"
    });


    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(draw)

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);
    
    function updateArea(e) {
      const data = draw.getAll();
      setPolygons(data.features[0].geometry.coordinates[0])
      console.log("Z", data.features[0].geometry.coordinates[0])

      const answer = document.getElementById("calculated-area");
      if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area) / 1000000;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square kilometers</p>`;
      } else {
        answer.innerHTML = "";
        if (e.type !== "draw.delete")
          alert("Click the map to draw a polygon.");
      }
    }

    // function printPolygon(e) {
    //     const data = draw.getAll();
    //     setPolygons(data.features[0].geometry.coordinates)
    //     console.log('Z',polygons)
    // }

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />

      <div className='sidebar'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div>
          {process.env.NODE_ENV}
        </div>
      </div>
      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
    </div>
  );
};

export default Map;
