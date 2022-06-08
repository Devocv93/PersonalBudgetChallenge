<template>
  <NavBar v-if="userData !== null" class="nav"/>
  <div class="pages">
    <router-view />
  </div>
  <Toast />
  <ConfirmDialog position="top"></ConfirmDialog>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex'

import NavBar from './components/NavBar/index.vue'

export default {
    components:{
        NavBar,
    },
    data: ()=>({
        dataUser: null,
    }),
    computed: {
        ...mapState('authStore', ['userData'])
    },
    methods:{
        ...mapMutations('authStore', ['setUserData']),
        ...mapActions('authStore', ['getData'])
    },
    created(){
        const data = localStorage.getItem('dataUser');
        this.setUserData(JSON.parse(data));
        this.getData() 
    } 
}
</script>

<style scoped> 
.nav{
    height: 7vh;
    background-color: #4A306D;
    color: #E8D7F1;
    /* https://coolors.co/palette/e8d7f1-d3bccc-a167a5-4a306d-0e273c */
}
.pages{
    height: 93vh; 
}
 
 
</style>
