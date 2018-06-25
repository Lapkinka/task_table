import { START, SUCCESS, LOAD_DATA} from '../constants'
import {Record, OrderedMap} from 'immutable'

const FilmRecord = Record({
  salary:{},
  snippet:{},
  archived:undefined,
  premium:undefined,
  name:undefined
})

const ReducerState = new Record({
  entities:new OrderedMap({})
})

export default (stateHH = new ReducerState(),action) => {
  const {type,payload} = action;
  console.log(payload)

  switch (type){
    case LOAD_DATA + START : {
      return stateHH
    }
    case LOAD_DATA + SUCCESS : {
      return stateHH.set('entities',payload.res.items.map(elem => elem))
    }
  }
  return stateHH
}