import axios from 'axios'
import router from '../../router'

const state = {
    user:{
        userId: null,
        token: null,
        name: null,
        email: null,
        is_admin: null,
        expiresIn: null
    }
}

const getters = {
    isAuth(){
        return state.user.token !== null;
    },
    isAdmin(){
        return state.user.is_admin == 1;
    },
    userData(state){
        if(state.user.token){
            return{
                name: state.user.name,
                email: state.user.email,
                is_admin: state.user.is_admin,
                token: state.user.token
            }
        }
    }
}

const mutations = {
    setUser(state, user){
        state.user = user;
    },
    clearUser(state){
        state.user.userId = null;
        state.user.token = null;
        state.user.name = null;
        state.user.email = null;
        state.user.is_admin = null;
        state.user.expiresIn = null;
    }
}

const actions = {
    signup({commit}, userData){
        axios.post("http://localhost:8000/auth/signup", {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword
        },
        {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            if(res.status === 200 || res.status === 201){
                return router.push("/login");
            }
        })
        .catch(err=>console.log(err));
    },
    login({commit, dispatch}, userData){
        axios.post("http://localhost:8000/auth/login", {
            email: userData.email,
            password: userData.password
        })
        .then(res=>{
            const userId = res.data.userId;
            const token = res.data.token;
            const name = res.data.name;
            const email = res.data.email;
            const is_admin = res.data.is_admin;
            const expiresIn = new Date().getTime() + (res.data.expiresIn * 1000);
            commit('setUser',{
                userId,
                token,
                name,
                email,
                is_admin,
                expiresIn
            });
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('is_admin', is_admin);
            localStorage.setItem('expiresIn', expiresIn);
            dispatch('logoutTimer');
            router.push("/");
        })
        .catch(err=>console.log(err));
    },
    setAuth({commit}){
        const localUserId = localStorage.getItem("userId");
        const localToken = localStorage.getItem("token");
        const localName = localStorage.getItem("name");
        const localEmail = localStorage.getItem("email");
        const localIsAdmin = localStorage.getItem("is_admin");
        const localExpiresIn = localStorage.getItem("expiresIn");
        if(localToken && localUserId && localName && localEmail && localIsAdmin &&   localExpiresIn > new Date().getTime()){
            commit('setUser', {
                userId: localUserId,
                token: localToken,
                name: localName,
                email: localEmail,
                is_admin: localIsAdmin,
                expiresIn: localExpiresIn 
            });
        }
    },
    logoutTimer({dispatch, state}){
        setInterval(()=>{
            const localToken = localStorage.getItem('token');
            if(new Date().getTime() > state.user.expiresIn && localToken){
                dispatch('logout');
            }
        }, 10000);
    },
    logout({commit}){
        commit('clearUser');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('expiresIn');
        router.push("/login");
    }

}


export default{
    state,
    getters,
    mutations,
    actions
}