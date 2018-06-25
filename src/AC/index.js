import {START,SUCCESS,FAIL,LOAD_DATA} from "../constants"

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