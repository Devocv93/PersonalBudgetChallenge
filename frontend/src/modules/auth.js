import Swal from 'sweetalert2'

const authStore = {
    namespaced: true,
    state: ()=>({
        userData: null
    }),
    mutations: {
        setUserData(state, data){
            state.userData = data; 
        }
    },
    actions:{
        getData({commit}){ 
            if(localStorage.getItem('dataUser')) {
                commit('setUserData', localStorage.getItem('dataUser'));
              } else {
                commit('setUserData', null);
              }
        }
    }
}

export default authStore;