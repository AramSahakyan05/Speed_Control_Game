import { useRef } from "react";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";

const selectArrowColor = (state) => state.arrow_color;
const selectColors = (state) => state.colors;

function App() {
  const arrowRef = useRef(null);
  const cubeRef = useRef(null);
  const dispatch = useDispatch();
  const arrowColor = useSelector(selectArrowColor);
  const colors = useSelector(selectColors);
  const gameData = useRef({
    arrowSpeed: 4,
    rotateDeg: 0,
  });

  return (
    <div className="App">
      <div className="board" ref={cubeRef}>
        <div
          className="arrow"
          ref={arrowRef}
          style={{ backgroundColor: arrowColor }}
        ></div>
        <div className="circle"></div>
      </div>
      <button
        onClick={(e) => {
          const matrix = window
            .getComputedStyle(arrowRef.current)
            .getPropertyValue("transform");

          const deg = getAngleOfDiv(matrix);
          const checkedColor = checkColor(deg, colors);
          if (checkedColor === arrowColor) {
            speed(gameData, arrowRef);
            rotate(gameData, cubeRef);
            dispatch({
              type: "change_arrow_color",
            });
          } else {
            alert("Error");
          }
        }}
      >
        Click
      </button>
    </div>
  );
}

function getAngleOfDiv(coord) {
  let coordinates = coord.slice(7, -7);
  coordinates = coordinates.split(",");
  const radians = Math.atan2(coordinates[2], coordinates[0]);
  const degrees = (radians * 180) / Math.PI;

  return -degrees;
}

function checkColor(deg, colors) {
  if (deg <= 45 && deg >= -45) {
    return colors[1];
  } else if (deg >= 45 && deg <= 135) {
    return colors[2];
  } else if (deg <= 135 && deg >= -135) {
    return colors[0];
  } else {
    return colors[3];
  }
}

function speed(data, arrow) {
  if (data.current.arrowSpeed !== 0.5) {
    data.current.arrowSpeed = data.current.arrowSpeed - 0.5;
  }
  arrow.current.style.animation = `rotate ${data.current.arrowSpeed}s linear infinite`;
}

function rotate(data, cubeRef) {
  data.current.rotateDeg += 90;
  cubeRef.current.style.transform = `rotate(${data.current.rotateDeg}deg)`;
}
export default App;
