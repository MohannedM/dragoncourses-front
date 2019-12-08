<template>
  <div class="home">
    <router-view name="users-view"></router-view>
    <router-view name="admins-view"></router-view>
  </div>
</template>

<script>


export default {
  name: 'home',
}
</script>
