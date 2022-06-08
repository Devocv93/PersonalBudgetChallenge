import { createApp } from 'vue'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import store from './store'
import router from './router'

import 'primevue/resources/themes/saga-purple/theme.css'       //theme
import "primevue/resources/primevue.min.css "                //core css
import "primeicons/primeicons.css "                          //icons

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InputSwitch from 'primevue/inputswitch';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row'; 
import Chart from 'primevue/chart';
import Message from 'primevue/message';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';

let app = createApp(App)
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('InputSwitch', InputSwitch);
app.component('Toast', Toast);
app.component('Dialog', Dialog);
app.component('InputNumber', InputNumber);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('Chart', Chart);
app.component('Message', Message);  
app.component('ConfirmDialog', ConfirmDialog);

app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue);

 
app.use(store).use(router).mount('#app')
