import React, {Component} from 'react';
import {connect} from "react-redux"
import {loadData,changeNumbers} from "../AC"
import table from '../reducers/table'
import {NavLink} from "react-router-dom"
import {typesSelectorFactory} from '../help'

class Table extends Component {
  componentWillMount(){
    this.props.loadData()
  }

  render() {
    const {info,sort_type,numberOfLinks} = this.props
    if(!info || info[0] === undefined) return null
    const countLinks = Math.ceil(numberOfLinks / 20)
    const links = Array.from({length:countLinks},(undef,i) =><NavLink to={`/${i+1}`} key={`link_${i}`}>{i+1}</NavLink>)
    const body = Array.from({length:20},(undef,index) => {
        const keys = this.help.call(this, info[index])
        if (!index){
            return <tr key={index}>
                {keys.map(elem => <th key={`${elem}_${index}`}
                                      className={sort_type.name === elem && sort_type.action !== undefined ? !sort_type.action ? "blue" :  "red" : ""}
                                      datatype={[elem,elem === sort_type.name ? sort_type.action : false]}
                                      onClick={elem !== "archived" ? this.eventCheck : null}>{elem}</th>
                )}</tr>
        }
        else{
            return <tr key={index}>{
              keys.map(elem => {
                if(elem === "randomNum"){
                    return <td key={`${elem}_${index}`} className={info[index][elem] >= 0 ? !info[index][elem] ? "" : "red" : "blue"}>
                        {info[index][elem]}
                        </td>
                }
                else return <td key={`${elem}_${index}`}>{this.typeCheck.call(this,info[index][elem === "url" ? "alternate_url" : elem])}</td>
              })
            }</tr>
        }
    })
    return (
        <div>
            {links}
            <table className="table_blur">
              <tbody>
              {body}
              </tbody>
            </table>
        </div>
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
    const typesSelector = typesSelectorFactory()
    return({table},ownProps) => {
        return {
            info:typesSelector(table,ownProps),
            sort_type:table.sort_type,
            numberOfLinks:table.entities.length
        }
    }
}

export default connect(mapStateToProps,{loadData,changeNumbers})(Table)