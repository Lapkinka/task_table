import {createSelector} from 'reselect'

const arrayGetter = table => table.entities
const typeGetter = table => table.sort_type

export const typesSelectorFactory = () => createSelector(arrayGetter,typeGetter,(array,type) =>{
    switch (type.name){
        case "id" : {
            return array = type.action ? array.sort((a,b) => a.id - b.id) : array.sort((a,b) => b.id - a.id)
        }
        case "randomNum" : {
            return array = type.action ? array.sort((a,b) => a.randomNum - b.randomNum) : array.sort((a,b) => b.randomNum - a.randomNum)
        }
        case "created_at" : {
            return array = type.action ? array.sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at)) :
                array.sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        }
        case "url" : {
            return array = type.action ? array.sort((a,b) =>a.alternate_url.indexOf("hh") || a.alternate_url.indexOf("career")
                - b.alternate_url.indexOf("hh") || b.alternate_url.indexOf("career")) :

                array.sort((a,b) => b.alternate_url.indexOf("hh") || b.alternate_url.indexOf("career")
                    - a.alternate_url.indexOf("hh") || a.alternate_url.indexOf("career"))
        }
        case "name" : {
            return array = type.action ? array.sort((a,b) => a.name[0].toLowerCase().charCodeAt(0) - b.name[0].toLowerCase().charCodeAt(0))
                : array.sort((a,b) => b.name[0].toLowerCase().charCodeAt(0) - a.name[0].toLowerCase().charCodeAt(0))
        }
    }
    return array
})