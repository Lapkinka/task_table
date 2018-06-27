import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {loadData,changeNumbers} from "../AC"
import table from '../reducers/table'
import {typesSelectorFactory} from '../help'

class Table extends Component {

  componentWillMount(){
    this.props.loadData()
  }
  // componentWillUpdate(nextProps,nextState){
  //   const {id,info,loadFilmInfo} = nextProps
  //   if(info._map.size < 6) loadFilmInfo(id)
  // }

  render() {
    const {info,sort_type} = this.props
      // console.log(sort_type,"sort_type")
    console.log("info !!!!!!!",info)
    if(!info || info[0] === undefined) return null
    const body = Array.from({length:20},(undef,index) => {
        const keys = this.help.call(this, info[index])
        if (!index) return <tr>{keys.map(elem => <th datatype={[elem,elem === sort_type.name ? sort_type.action : false]}
                                                     onClick={this.eventCheck}>{elem}</th>)}</tr>
        else {
            return <tr>{
              keys.map(elem => {
                if(elem === "randomNum"){
                    return <td className={info[index][elem] >= 0 ? !info[index][elem] ? "" : "red" : "blue"}>{info[index][elem]}</td>
                }
                else return <td>{this.typeCheck.call(this,info[index][elem])}</td>
              })
            }</tr>
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
      if(obj.hasOwnProperty(key) && (key === "url" || key === "id" ||
          key === "name" || key === "created_at" ||
          key === "archived" || key === "randomNum")) arr.push(key)
    }
    return arr
  }
  typeCheck = (type) =>{
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    };
    if(true === type) return "да"
    else if(false === type) return "нет"
    else if(!isNaN(Date.parse(type))) return new Date(Date.parse(type)).toLocaleString("en-US", options)
    else return type
  }
  eventCheck = (ev) =>{
    const {target} = ev,
        type = target.getAttribute("datatype").split(",")
      type[1] = type[1] === "false"
      this.props.changeNumbers(type)
  }
}

const mapStateToProps = () => {
    const commentSelector = typesSelectorFactory()
    return({table}) => {
        return {
            info:commentSelector(table),
            sort_type:table.sort_type
        }
    }
}

export default connect(mapStateToProps,{loadData,changeNumbers})(Table)


