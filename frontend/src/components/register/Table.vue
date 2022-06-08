<template>
    <DataTable
        :rowHover="true" 
        :value="allOperationsByUser"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="10"
        :paginator="true"
        v-model:filters="filters"
        :globalFilterFields="['categoria']"
        filterDisplay="menu"
    > 
        <Column field="Concepto" header="CONCEPT"></Column>
        <Column field="Monto" header="QUANTITY"></Column>
        <Column field="Fecha" header="DATE">
            <template #body="{data}">
                <div class="d-flex justify-content-start">
                    <span>{{getDate(data.Fecha)}}</span> 
                </div>
            </template>
        </Column>
        <Column field="operacion" header="OPERATION"></Column>
        <Column field="categoria" header="CATEGORY">
            <template #body="{data}">
                {{data.categoria}}
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
            </template>
        </Column>
        <Column header="EDIT">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-pencil" class="p-button-warning " @click="edit(data)"></Button>
                </div>
            </template> 
        </Column>
        <Column header="DELETE">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-trash" class="p-button-danger " @click="delet(data)"></Button>
                </div>
            </template> 
        </Column>  
    </DataTable> 
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import moment from 'moment' 
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
    mounted(){
        this.initFilters()
    },
    data:()=>({
        filters: null,
    }),
    computed:{
        ...mapState("registerStore",["allOperationsByUser"])
    },
    methods:{
        ...mapMutations("registerStore", ["openDialog"]),
        ...mapActions("registerStore", ["getRegisterById", "deleteRegisterById"]),
        getDate(date){
            return moment(date).format('DD/MM/YYYY')
        },
        edit(data){
            this.openDialog({display: true, method: 'UPDATE'});
            this.getRegisterById(data.Id_Operacion) ;
        },
        delet(data){
            this.$confirm.require({
                message: 'Are you sure you want to proceed?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle', 
                accept: async() => { 
                    await this.deleteRegisterById(data.Id_Operacion);
                    this.$toast.add({severity: "success",summary: `Information!`,detail: `Data deleted successful`,life: 3000});
                     
                },
                reject: () => { }
            });
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'categoria': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}, 
            }
        }
    }
}
</script>

<style>

</style>