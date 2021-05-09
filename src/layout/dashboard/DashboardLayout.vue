<template>
  <div class="wrapper">
    <side-bar title="Catalog">
      
      <template slot="links" >
        <sidebar-link to="/dashboard" :name="$t('sidebar.emotion')" icon="tim-icons icon-satisfied" />
        <sidebar-link to="/icons" :name="$t('sidebar.app')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/maps" :name="$t('sidebar.keyword')" icon="tim-icons icon-key-25"/>
        <sidebar-link to="/notifications" :name="$t('sidebar.add')" icon="tim-icons icon-upload"/>
        <!-- <sidebar-link to="/profile" :name="$t('sidebar.result')" icon="tim-icons icon-upload"/> -->
        <sidebar-link to="/profile" :name="$t('sidebar.result')" icon="tim-icons icon-cloud-download-93"  v-show="flag"/>
        <!-- <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/> -->
        <!-- <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/> -->
        <!-- <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world"/> -->
      </template>
    </side-bar>
    <div class="main-panel">
      <!-- <top-navbar @search="search" ></top-navbar> -->


      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
import SidebarLink from '../../components/SidebarPlugin/SidebarLink.vue';
export default {
  
  data(){
    return {
      flag: true
    };
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu,
    SidebarLink
  },
  mounted() {
      //alert(this.$route.path);
      // if (this.$route.path == '/profile'){
      //   if(this.flag==false){
      //     this.flag=true;
      //     location.reload();
      //   }
      // }else{
      //   this.flag=false;
      // }
    },
  methods: {
    search(){
      // this.$router.go();
    
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
