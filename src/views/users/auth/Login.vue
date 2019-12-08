<template>
    <div>
        <v-content>
        <v-container
            fluid
            fill-height
        >
            <v-layout
            align-center
            justify-center
            >
            <v-flex
                xs12
                sm10
                md6
                class="mt-4"
            >
                <v-card class="elevation-12">
                <v-toolbar
                    color="red lighten-2"
                    dark
                    flat
                >
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                    <v-form>
                    <v-text-field
                        label="Email"
                        name="Email"
                        v-model="user.email"
                        type="text"
                    ></v-text-field>

                    <v-text-field
                        label="Password"
                        name="password"
                        v-model="user.password"
                        type="password"
                    ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red lighten-2 white--text" @click="login">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:{
                email:"",
                password:""
            }
        }
    },
    methods:{
        login(){
            this.$store.dispatch("login", this.user)
        }
    }
}
</script>