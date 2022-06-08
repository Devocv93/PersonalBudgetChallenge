<template>
    <div class="container">
        <div class="row mt-5 mb-5">
            <div class="col-lg-12 col-md-12">
                <Button
                    label="New"
                    class="p-button-outlined p-button-help"
                    icon="pi pi-plus"
                    iconPos="right"
                    @click="openDialogRegister"
                />
            </div>
        </div>
        <Message severity="info">Use the filter icon to filter categories</Message>
        <TableOperations />
    </div>
    <DialogRegister />
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import DialogRegister from "../components/register/Dialgo.vue";
import TableOperations from "../components/register/Table.vue"

export default {
    components: {
        DialogRegister,
        TableOperations
    },
    computed: {
        ...mapState("authStore", ["userData"]),
    },
    methods:{
        ...mapActions("registerStore",['getRegisterByUser']),
        ...mapMutations("registerStore",["openDialog"]),
        openDialogRegister(){
            this.openDialog({
                display: true,
                method: 'CREATE'
            })
        }
    },
    mounted(){ 
        const user = JSON.parse(localStorage.getItem("dataUser")); 
        this.getRegisterByUser(user.Id_Usuario);
    }
}
</script>

<style>

</style>