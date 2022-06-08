<template>
    <Menubar :model="itemsArbol"> 
      <template #items="{items}">
          <label >{{items.label}}</label> 
      </template>
      <template #end> 
          <label  class="form-label">{{currentUser}}</label>
          <Button label="Salir" @click="cerrarSesion" icon="pi pi-fw pi-power-off" class="p-button-outlined p-button-info p-button-text" type="text" />
      </template>
    </Menubar>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex'

export default {
    mounted(){
        const user = JSON.parse(localStorage.getItem("dataUser"));   
        this.currentUser = user.Email;
    },
    data:()=>({ 
        currentUser: '',
        itemsArbol:[ 
            {
                label:'Home', 
                icon:'pi pi-home',
                to: '/'
            }, 
            {
                label:'Operations',
                icon:'pi pi-book',
                to: '/create'
            }
        ],

    }), 
    computed:{
        ...mapState("authStore",["userData"]),
    },
    methods: {
        ...mapMutations('authStore', ['setUserData']),
        cerrarSesion(){   
            this.setUserData(null);
            localStorage.removeItem('dataUser')
            this.$router.push('/login'); 
        },
    },
}
</script>

<style>

</style>