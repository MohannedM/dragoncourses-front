import axios from 'axios'
import auth from './auth'
const state = {
    categories:[]
}
const getters = {
    allCategories(state){
        return state.categories;
    }
}
const mutations = {
    setCategories(state, catArray){
        state.categories = catArray;
    }
}
const actions = {
    getCategories({commit}){
        axios.get("http://localhost:8000/categories",{
            headers:{
                Authorization: 'Bearer ' + auth.state.user.token
            }
        })
        .then(res=>{
            commit('setCategories', res.data.categories);
        })
        .catch(err=>console.log(err));
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}

