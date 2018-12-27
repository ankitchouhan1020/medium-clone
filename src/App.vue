<template>
  <div>
    <TheNav></TheNav>
    <router-view/>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheNav from "./components/TheNav.vue";
import TheFooter from "./components/TheFooter.vue";
export default {
  components: {
    TheNav,
    TheFooter
  }
};
</script>
