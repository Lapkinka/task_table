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
    }
    return array
})