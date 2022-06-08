<template>
  <div class="container"> 
      <h5 class="mt-5 text-center">HOME</h5>
      <div class="text-center mt-5">
        <InputSwitch v-model="chartTypePie" />
      </div>
      <h6 class="mt-1 text-center">Chart Type</h6>
      <div class="d-flex justify-content-center mt-5" v-if="chartTypePie">
        <Chart  type="pie" :data="chartData" :options="lightOptions" /> 
      </div> 
      <div v-else>
        <Chart type="bar" :data="basicData" :options="basicOptions" />
      </div>
      <div class="mt-5 mx-3 ">
        <h6 class="text-center">LAST 10 REGISTERS</h6>
        <div class="d-flex justify-content-around border mb-3 p-2" > 
          <div class="text-center">DATE </div>
          <div class="text-center">CONCEPT </div>
          <div class="text-center">QUANTITY </div> 
        </div>
        <div class="row border mb-1 p-2" v-for="item in lastTen" :key="item.Id_Operacion"> 
          <div class="col-lg-4 col-md-4 col-sm-1 text-center">{{ConvertDate(item.Fecha)}}</div>
          <div class="col-lg-4 col-md-4 col-sm-1 text-center">{{item.Concepto}}</div>
          <div class="col-lg-4 col-md-4 col-sm-1 text-center">{{item.Monto}}</div>          
        </div>
      </div> 
    </div> 
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'; 
import moment from 'moment';

export default {
  computed:{
    ...mapState("registerStore",["totals", 'chartData', 'basicData','allOperationsByUser']), 
    lastTen(){
      return this.allOperationsByUser.slice(-10)
    }
  },
  data() {
        return {
          chartTypePie: true,
          lightOptions: {
            plugins: {
              legend: {
                labels: {
                  color: '#495057'
                }
              }
            }
          }
        }
  },
  
  methods:{
    ...mapActions("registerStore",["getTotaLQuantitesIO","getRegisterByUser"]), 
    async getQuantities(){
      const user = JSON.parse(localStorage.getItem("dataUser"));   
      await this.getTotaLQuantitesIO(user.Id_Usuario)
    },
    ConvertDate(date){   
        return moment(date).format('DD/MM/YYYY')
    } 
  },
  mounted(){
    this.getQuantities(); 
    const user = JSON.parse(localStorage.getItem("dataUser")); 
    this.getRegisterByUser(user.Id_Usuario);
  }
};
</script>
<style>
  .chartPie{
    height: 200px;  
  }
  .border{
    border-radius: 10px;
    border-width: 2;
    border-color: aquamarine;
    background-color: rgb(129, 127, 255);
    color: white;
  }
</style>
