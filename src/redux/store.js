import { createStore } from "redux";


function reducer(state, action) {
    if (action.type === "change_arrow_color") {
        return {
            ...state
            ,
            arrow_color: state.colors[Math.floor(Math.random() * 3)]
        }
    } else if (action.type === "increase_speed") {
        return {
            ...state,
            arrow_speed: action.payload.speed
        }
    }
    return state;
}

const store = createStore(reducer, {
    colors: [
        "red", "orange", "blue", "green"
    ],
    arrow_color: "red",
})

export default store;
