import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all' 

import Operation from '../models/operation'
import { ConvertDate, url } from '../helpers/connectionDb';

const registerStore = {
    namespaced: true,
    state:()=>({
        register: new Operation(),
        method: 'CREATE',
        dialog: false,
        categories: [
            {
                id: 1,
                name: "Food",
            },
            {
                id: 2,
                name: "School",
            },
            {
                id: 3,
                name: "Gym",
            },
            {
                id: 4,
                name: "Clothes",
            },
            {
                id:5,
                name: "Rent"
            }
        ],
        operationsTipe: [
            {
                id: 1,
                name: "Income",
            },
            {
                id: 2,
                name: "Outflow",
            }, 
        ],
        allOperationsByUser:[], 
        chartData: { 
            labels: ['Income','Outflow'],
            datasets: [
                {
                  data: [],
                  backgroundColor: ["#66BB6A","#FFA726"],
                  hoverBackgroundColor: ["#81C784","#FFB74D"]
                }
            ]
        },
        basicData: {
            labels: ['Operation Type' ],
            datasets: [
                {
                    label: 'Income',
                    backgroundColor: '#42A5F5',
                    data: []
                },
                {
                    label: 'Outflow',
                    backgroundColor: '#FFA726',
                    data: []
                }
            ]
        },
    }),
    mutations:{
        openDialog(state, {display, method}){
            state.method = method;
            state.dialog = display
        },
        closeDialog(state){
            state.dialog = false;
            state.method = 'CREATE';
            state.register = new Operation();
        },
        setAllOperationsByUser(state, data){
            state.allOperationsByUser = data;
        },
        setRegister(state, data){
            state.register = data[0]
            state.register.Fecha = ConvertDate(data[0].Fecha)
        },
        setTotals(state, data){
            state.chartData.datasets[0].data[0] = data.totalEntradas;
            state.chartData.datasets[0].data[1] = data.totalSalidas; 

            state.basicData.datasets[0].data[0] = data.totalEntradas;
            state.basicData.datasets[1].data[0] = data.totalSalidas; 
 
        }
    },
    actions:{
        async postRegister({dispatch, state}, data){
            try {
                const response = await axios.post(`${url}/register`, data); 
                if(response.status === 201){
                    state.dialog = false;
                    state.register = new Operation();
                    Swal.fire({
                        title: 'Data added successful!',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });

                    dispatch("getRegisterByUser", data.id_Usuario );
                } 
            } catch (error) {
                console.log(error.response);
            }
        },
        async getRegisterByUser({dispatch,commit, state}, idUser){
            try {
                const response = await axios.get(`${url}/register/byuser/${idUser}`); 
                if(response.status === 200){  
                    commit('setAllOperationsByUser', response.data[0]);                    
                } 
            } catch (error) {
                console.log(error.response);
            }
        },
        async getRegisterById({dispatch,commit, state}, idOperation){
            try {
                const response = await axios.get(`${url}/register/byoperation/${idOperation}`); 
                if(response.status === 200){ 
                    commit('setRegister', response.data[0]);               
                } 
            } catch (error) {
                console.log(error.response);
            }
        },
        async getTotaLQuantitesIO({dispatch,commit, state}, id_Usuario){
            try { 
                const response = await axios.get(`${url}/register/totalquantities/${id_Usuario}`); 
                if(response.status === 200){ 
                    commit('setTotals', response.data[0][0]);          
                } 
            } catch (error) {
                console.log(error.response);
            }
        },
        async deleteRegisterById({dispatch,commit, state}, idRegistro){
            try {
                const response = await axios.delete(`${url}/register/byid/${idRegistro}`); 
                if(response.status === 200){  
                    const user = JSON.parse(localStorage.getItem("dataUser"));  
                    dispatch("getRegisterByUser", user.Id_Usuario )                    
                } 
            } catch (error) {
                console.log(error.response);
            }
        },
    }
}

export {
    registerStore,
}