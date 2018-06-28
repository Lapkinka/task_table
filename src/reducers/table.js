import { START, SUCCESS, LOAD_DATA,CHANGE_NUMBERS,CHANGE_LINK} from '../constants'
import {Record, OrderedMap} from 'immutable'

const SortRecord = Record({
  name:undefined,
  action:undefined,
})

const ReducerState = new Record({
    entities:new OrderedMap({}),
    sort_type:new OrderedMap({})
})

export default (stateHH = new ReducerState(),action) => {
  const {type,payload} = action;

  switch (type){
    case LOAD_DATA + START : {
      return stateHH
    }
    case LOAD_DATA + SUCCESS : {
      return stateHH.set('entities',payload.res.items.map(elem => {
        elem["randomNum"] = Number((-5 + Math.random() * 10).toFixed(1))
        return elem
      }))
    }
    case CHANGE_NUMBERS : {
      return stateHH.set('sort_type', new SortRecord({name:payload.type[0],action:payload.type[1]}))
    }
  }
  return stateHH
}