import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {loadData} from "../AC"
import table from '../reducers/table'

class Table extends Component {

  componentWillMount(){
    this.props.loadData()
  }
  // componentWillUpdate(nextProps,nextState){
  //   const {id,info,loadFilmInfo} = nextProps
  //   if(info._map.size < 6) loadFilmInfo(id)
  // }

  render() {
    const {info} = this.props
    console.log("info !!!!!!!",info)
    if(!info || info[0] === undefined) return null
    const body = Array.from({length:20},(undef,index) =>{
      const keys = this.help.call(this,info[index])
      if(!index){
        return <tr>{keys.map(elem => <th>{elem}</th>)}</tr>
      }
      else{
        return <tr>{keys.map(elem => <td>{this.typeCheck.call(this,info[index][elem])}</td>)}</tr>
      }
    })
    return (
        <table className="table_blur">
          <tbody>
          {body}
          </tbody>
        </table>
    );
  }
  help = (obj) =>{
    const arr = []
    for(let key in obj){
      if(obj.hasOwnProperty(key) && (key === "url" || key === "id" || key === "name" || key === "created_at" || key === "archived"))
        arr.push(key)
    }
    return arr
  }
  typeCheck = (type) =>{
    // // const number = typeof Date.parse(type)
    // console.log("Date.parse(type)",Date.parse(type) )
    // console.log("typeof Date.parse(type) === \"number\"",typeof Date.parse(type) === "number")
    // // console.log( )
    // if(true === type) return "да"
    // else if(false === type) return "нет"
    // else if(typeof Date.parse(type) === "number") return new Date(Date.parse(type))
    // else return type
    switch (type){
      case true : return "да"
      case false : return "нет"
      // case typeof Date.parse(type) === "number"  : return new Date(Date.parse(type))
    }
    return type
  }
}

export default connect(({table}) => ({info:table.entities}),{loadData})(Table)


