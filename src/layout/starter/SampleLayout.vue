<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar @search="search"></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbar from "./SampleNavbar.vue";
  import ContentFooter from "./SampleFooter.vue";
  import DashboardContent from "./Content.vue";
  import MobileMenu from "./MobileMenu";
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      search(){
        // alert("aaaaaaaaaa");
      location.reload();
      // this.$root.reload();
      //  this.$router.push('/profile');
      //  this.$router.reload();
      //  location.reload();
      //  this.$router.go(0);
      //  this.flag=true;
      // alert("aaa");
      // location.push()
      //   this.location.push('/profile');
      //   this.location.reload();
        // location.replace("profile");
        // this.$router.push('/profile');
      },
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
