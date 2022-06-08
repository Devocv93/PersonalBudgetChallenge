<template>
  <Dialog
    :style="{ width: '70%' }"
    :modal="true"
    :header="method === 'CREATE' ? 'New register' : 'Edit register'"
    :visible="showDialog"
    :closable="false"
  >
    <div class="mt-2">
      <form
        @submit.prevent="method === 'CREATE' ? addRegister(register) : putBase(base)"
        id="form-register"
      >
        <div class="col-lg-12 col-md-12 mb-3">
          <label class="form-label">Concept</label>
          <span class="p p-fluid">
            <InputText  
                type="text"
                v-model="register.Concepto" 
                @input="register.Concepto = $event.target.value.toUpperCase()"
            />  
          </span>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6 mb-3">
            <label class="form-label">Quantity</label>
            <span class="p p-fluid"> 
                <InputNumber 
                    v-model="register.Monto" 
                    mode="decimal" 
                    :minFractionDigits="2"
                /> 
            </span>
            </div>
            <div class="col-lg-6 col-md-6 mb-3">
                <label class="form-label">Date</label>
                <span class="p p-fluid"> 
                    <Calendar id="dateformat" v-model="register.Fecha"  dateFormat="dd/mm/yy" />
                </span>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6 col-lg-6">
                <label class="form-label">Operation Type</label>
                <span class="p p-fluid"> 
                    <Dropdown :disabled="method === 'UPDATE'" v-model="register.Tipo_Operacion" :options="operationsTipe" optionLabel="name" optionValue="id" placeholder="Select " />
                </span>
            </div>
            <div v-if="register.tipo_Operacion === 2" class="col-md-6 col-lg-6">
                <label class="form-label">Category</label>
                <span class="p p-fluid"> 
                    <Dropdown v-model="register.Id_Categoria" :options="categories" optionLabel="name" optionValue="id" placeholder="Select " />
                </span>
            </div>
        </div>
      </form>
    </div>
    <div class="d-flex justify-content-end">
      <Button
            label="Cancel"
            class="p-button-outlined p-button-danger me-2"
            iconPos="right"
            @click="closeDialogRegister"
      />
      <Button
            type="submit"
            form="form-register"
            :label="method === 'CREATE' ? 'Guardar' : 'Editar'"
            class="p-button-success"
            icon="pi pi-check"
            iconPos="right"
      />
    </div>
  </Dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    computed: {
        ...mapState("registerStore", ["dialog", "method", "register", "categories", "operationsTipe"]),
        ...mapState("authStore", ["userData"]),
        showDialog() {
            return this.dialog;
        },
    },
    methods:{
        ...mapMutations("registerStore",["closeDialog"]),
        ...mapActions("registerStore",['postRegister']),
        addRegister(register){
            if(register.Concepto.trim() === "" || register.Concepto.length <1 ){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Concept is required!`,life: 3000});
                return;
            }
            if(register.Monto < 1 ){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Quantity is required!`,life: 3000});
                return;
            }
            if(register.Fecha  === ""  ){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Date is required!`,life: 3000});
                return;
            }
            if(register.Tipo_Operacion  === 0  ){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Operation type is required!`,life: 3000});
                return;
            }
            if( register.Tipo_Operacion === 2 && register.Id_Categoria  === 0  ){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Category type is required!`,life: 3000});
                return;
            }
            const user = JSON.parse(this.userData);
            register.Id_Usuario = user.Id_Usuario;  
            this.postRegister(register);
        },
        closeDialogRegister(){
            this.closeDialog()
        }
    }
};
</script>

<style>
</style>