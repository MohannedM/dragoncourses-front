<template>
    <div>
            <v-card
            class="mx-auto"
            flat
            >
            <v-list>
                <v-subheader>All Categories</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                <v-list-item
                    v-for="(category, i) in categories"
                    :key="i"
                >

                    <v-list-item-content>
                    <v-list-item-title v-text="category.name"></v-list-item-title>
                    </v-list-item-content>
                    <v-btn class="mr-4" text>Edit</v-btn>
                    <v-btn class="red" text>Delete</v-btn>
                </v-list-item>
                </v-list-item-group>
            </v-list>
            </v-card>
    </div>
</template>
<script>
export default {
    computed:{
        categories(){
            return this.$store.getters.allCategories;
        }
    }
}
</script>