import { createStore } from 'vuex'
import authStore from '../modules/auth';
import { registerStore } from '../modules/register';

export default createStore({
    modules:{
        authStore,
        registerStore,
    }
});