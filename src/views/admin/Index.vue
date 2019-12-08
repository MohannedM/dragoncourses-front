<template>
    <div>
                <v-toolbar flat color="blue-grey white--text">
            <router-link tag="span" :to="{name: 'adminIndex'}" style="cursor:pointer;">
                <v-toolbar-title>Admin Dashboard</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>


                <v-btn text class="white--text">
                    <span>MohannedM</span>
                </v-btn>     
                <router-link tag="span" :to="{name: 'AdminCourses'}">       
                <v-btn text class="white--text">
                    Courses
                </v-btn> 
                 </router-link>  
                <router-link tag="span"  :to="{name: 'AdminCategories'}">       
                <v-btn text class="white--text">
                    Categories
                </v-btn>  
                 </router-link>  
                <v-btn text class="white--text">
                    Users
                </v-btn>   
                <router-link tag="span"  :to="{name: 'coursesIndex'}">       
                <v-btn text class="white--text">
                    Homepage
                </v-btn>            
                 </router-link>  
                <v-btn text class="white--text" @click="logout">
                    <span>Logout</span>
                </v-btn>
        </v-toolbar>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('logout');
        },
    },
    created (){
        // console.log(this.$store.getters.userData.token)
        this.$store.dispatch('getCategories');
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
