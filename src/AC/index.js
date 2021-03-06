import {START,SUCCESS,FAIL,LOAD_DATA,CHANGE_NUMBERS} from "../constants"

export function loadData() {
  return (dispatch) =>{
    dispatch({
      type:LOAD_DATA + START
    })
    fetch(`https://api.hh.ru/vacancies?text=кассир&&per_page=100&page=0`)
      .then(res => res.json())
      .then(res => dispatch({
        type:LOAD_DATA + SUCCESS,
        payload: {res}
      }))
      .catch(err => dispatch({
        type:LOAD_DATA + FAIL,
        payload:{err}
      }))
  }
}

export function changeNumbers(type) {
    return (dispatch) =>{
        dispatch({
            type:CHANGE_NUMBERS,
            payload: { type }
        })
    }
}