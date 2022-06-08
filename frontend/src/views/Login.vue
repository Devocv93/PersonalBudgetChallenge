<template>
  <div class="login">
    <div class="card">
      <form>
        <h3 class="text-center my-4">Personal Budget System</h3>
        <h4 class="text-center mt-5 mb-5">
          {{ signup ? "Sign Up" : "Welcome" }}
        </h4>
        <div class="row p-4">
          <div class="col-lg-12 col-md-12 mb-4 mt-3">
            <span class="p-fluid">
              <InputText 
                required
                type="email"
                v-model="user.Email"
                placeholder="email"
              />
            </span>
          </div>
          <div class="col-lg-12 col-md-12 mb-4 mt-4">
            <span class="p-fluid">
              <Password  v-model="user.Password"  toggleMask></Password>
            </span>
          </div>
        </div>
        <div class="text-center">
          <InputSwitch v-model="signup" />
        </div>
        <div class="text-center mb-5">
          <h6>Switch to {{ signup ? "Sign In" : "create an account" }}</h6>
        </div>
        <div>
          <span class="p-fluid">
            <Button
              @click="onClick"
              form="form-login"
              :label="signup ? 'Create Account' : 'Sign In'"
            />
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex'

import { url } from "../helpers/connectionDb";

export default {
  data: () => ({
    signup: false,
    user: {
      Email: "",
      Password: "",
    },
  }),
  methods: {
    ...mapMutations('authStore',['setUserData']),
    async onClick() {
        try {
            if(this.user.Email.trim()===""|| this.user.Email.length === 0){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Email is required!`,life: 3000});
                return
            }
            if (!this.validEmail(this.user.Email)) {
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Email is invalid!`,life: 3000});
                return
            }
            if(this.user.Password.trim()===""|| this.user.Password.length === 0){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Password is required!`,life: 3000});
                return
            }
            if(this.user.Password.length < 5){
                this.$toast.add({severity: "warn",summary: `Information!`,detail: `Password minimum 5 characters allowed!`,life: 3000});
                return
            }

            if (this.signup) {
                const resp = await axios.post(`${url}/user/addUser`, this.user);
                if (resp.status === 201) {
                    this.$toast.add({severity: "success",summary: `Success!`,detail: `${resp.data.msg}`,life: 3000});
                    
                    this.user.Email="";
                    this.user.Password="";
                } else {
                    this.$toast.add({severity: "warn",summary: "Information!",detail: resp.data.msg,life: 3000});

                    this.user.Email="";
                    this.user.Password="";
                }
                this.signup = false;
            } else {
                const resp = await axios.post(`${url}/user/login`, this.user);
                if(resp.status === 204){
                    this.$toast.add({severity: "error",summary: "USER NOT FOUND!",detail: "",life: 3500,});
                }else if(resp.status === 200){  
                    localStorage.setItem("dataUser",JSON.stringify(resp.data[0]));
                    this.setUserData(resp.data[0]); 
                    this.$router.push('/'); 
                }else  this.$toast.add({severity: "warn",summary: "Something went wrong!",detail: "Try again!",life: 3500,});
            }
        } catch (error) {
            console.log(error);
        }
    },
    validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
  },
};
</script>

<style >
.login {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: 100vh;
}
.shadow {
  border-color: #4a306d;
  box-shadow: 2px 20px 15px #4a306d;
}
</style>