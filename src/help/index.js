import {createSelector} from 'reselect'

const arrayGetter = table => table.entities
const typeGetter = table => table.sort_type
const selectedLinkGetter = (table,ownProps) => ownProps.selectedLink

export const typesSelectorFactory = () => createSelector(arrayGetter,typeGetter,selectedLinkGetter,(array_1,type,selectedLink) =>{
    let array = [...array_1]
    switch (type.name){
        case "id" : {
            array = type.action ? array.sort((a,b) => a.id - b.id) : array.sort((a,b) => b.id - a.id)
            break;
        }
        case "randomNum" : {
            array = type.action ? array.sort((a,b) => a.randomNum - b.randomNum) : array.sort((a,b) => b.randomNum - a.randomNum)
            break;
        }
        case "created_at" : {
            array = type.action ? array.sort((a,b) => Date.parse(a.created_at) - Date.parse(b.created_at)) :
                array.sort((a,b) => Date.parse(b.created_at) - Date.parse(a.created_at))
            break;
        }
        case "url" : {
            array = type.action ? array.sort((a,b) =>a.alternate_url.indexOf("hh") || a.alternate_url.indexOf("career")
                - b.alternate_url.indexOf("hh") || b.alternate_url.indexOf("career")) :

                array.sort((a,b) => b.alternate_url.indexOf("hh") || b.alternate_url.indexOf("career")
                    - a.alternate_url.indexOf("hh") || a.alternate_url.indexOf("career"))
            break;
        }
        case "name" : {
            array = type.action ? array.sort((a,b) => a.name[0].toLowerCase().charCodeAt(0) - b.name[0].toLowerCase().charCodeAt(0))
                : array.sort((a,b) => b.name[0].toLowerCase().charCodeAt(0) - a.name[0].toLowerCase().charCodeAt(0))
            break;
        }
    }
    return array.slice((selectedLink - 1)*20,selectedLink * 20)
})