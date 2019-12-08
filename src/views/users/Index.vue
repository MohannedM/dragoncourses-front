<template>
    <div>
        <v-toolbar flat color="red lighten-1 white--text">
            <router-link tag="span" :to="{name: 'coursesIndex'}" style="cursor:pointer;">
                <v-toolbar-title>Dragon Courses</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <!-- If not logged in -->
            <template v-if="!isLoggedIn">
                <router-link tag="span" :to="{name: 'signup'}">
                    <v-btn text class="white--text">
                        Signup
                    </v-btn>
                </router-link>
                <router-link tag="span" :to="{name: 'login'}">
                    <v-btn text class="white--text">
                        Login
                    </v-btn>
                </router-link>
            </template>
            <template v-else>
                <!-- If is admin and isloggein -->
                <router-link tag="span" :to="{name: 'adminIndex'}" v-if="isAdminstrator">       
                <v-btn text class="blue-grey--text">
                    Admin Dashboard
                </v-btn>          
                 </router-link> 
                <!-- end -->
                <v-btn text class="white--text">
                    <span>{{user.name}}</span>
                </v-btn>     
                <router-link tag="span" :to="{name: 'dashboard'}">       
                <v-btn text class="white--text">
                    My courses
                </v-btn>          
                 </router-link>  
                <v-btn text class="white--text" @click="logout">
                    <span>Logout</span>
                </v-btn>
            </template>
                     
        </v-toolbar>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    computed:{
        user(){
            return this.$store.getters.userData;
        },
        isLoggedIn(){
            return this.$store.getters.isAuth;
        },
        isAdminstrator(){
            return this.$store.getters.isAdmin;
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
        },
    }
}
</script>
<style>
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 0.5s;
    }
    .fade-leave-active{
        transition: opacity 0.5s;
        opacity: 0;
    }

</style>