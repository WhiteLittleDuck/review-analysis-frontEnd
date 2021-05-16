<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart" class="text-center">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <div class="row">
                  <div class="col-sm-10">
                    <h5 class="card-category">
                      CURRENT SORT RULE: {{sort.orderRule[sort.order]}}
                    </h5>
                    <h2 class="card-title">
                      Rank of {{sort.typeRule[sort.type]}} Reviews
                    </h2>
                     <base-dropdown
                          title-tag="a"
                          class="nav-item float-left">
                          <a
                            slot="title"
                            href="#/dashboard"
                            class="dropdown-toggle nav-link float-left"
                            data-toggle="dropdown">                         
                            <i class="tim-icons icon-settings-gear-63 text-info"></i>
                          </a>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item" @click="changeSort(0)">count</a>
                          </li>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item" @click="changeSort(1)">positive rank rate</a>
                          </li>
                          <!-- <div class="dropdown-divider"></div> -->
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item" @click="changeSort(2)">negative rank rate</a>
                          </li>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item" @click="changeSort(3)">UI related count</a>
                          </li>
                        </base-dropdown>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="col">
                  <div
                    class="btn-group btn-group-toggle"
                    :class="isRTL ? 'float-left' : 'float-right'"
                    data-toggle="buttons"
                  >
                    <!--option part-->
                    <label
                      v-for="(option, index) in rankCategory"
                      :key="option"
                      class="btn btn-sm btn-success btn-simple"
                      :class="{ active: rankTable.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initRankeTable(index)"
                        name="options"
                        autocomplete="on"
                        :checked="rankTable.activeIndex === index"
                        :disabled="rankTable.fix"
                      />
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!--Rank table-->
          <div>
            <card class="card" :header-classes="{ 'text-right': isRTL }">
              <div>
                <base-table :data="rankTable.tableData" :columns="columns">
                  <template slot="columns">
                    <th class="text-center">Rank</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Total</th>
                    <th class="text-center">Positive</th>
                    <th class="text-center">Negative</th>
                    <!--class="text-right/center"-->
                    <th class="text-center">Rate</th>
                    <th class="text-center">UI-Related</th>
                    <th class="text-center">More</th>
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-center">{{ row.rank }}</td>
                    <td class="text-center">{{ row.name }}</td>
                    <td class="text-center">{{ row.total }}</td>
                    <td class="text-center">{{ row.positive }}</td>
                    <td class="text-center">{{ row.negative }}</td>
                    <td class="text-center">{{ row.rate }}%</td>
                    <td class="text-center">{{ row.UIrate }}%</td>
                    <td class="td-actions text-center">
                      <base-button
                        class="animation-on-hover"
                        type="success"
                        size="sm"
                        @click="detail(row.id)"
                        >Details</base-button
                      >
                    </td>
                  </template>
                </base-table>
              </div>
            </card>
          </div>
          <div>
          </div>
          <div class="row" >
            <div class="col"> 
              <!-- <base-button link type="success" >previous</base-button> -->
            </div>
            <div class="col">
              <div class = "row" >
                <div class="col">
                  <base-button link type="info" :disabled="page<=1" @click="changePage(page-1)">previous</base-button>
                </div>
                <div class="col">
                  <base-input :value="page" v-model="page" @keyup.enter="changePage(page)"></base-input>
                </div>
                <div class="col">
                  <base-button link type="info" :disabled="page>=appPage" @click="changePage(page+1)">next</base-button>
                </div>
              </div>
            </div>
            <div class="col"> 
              <!-- <base-button link type="primary" >next</base-button> -->
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template> 
<script>
import axios from "axios";
import PageNotANumber from './Notifications/PageNotANumber';
import PageNumberInvalid from './Notifications/PageNumberInvalid';
import BaseTable from "@/components/BaseTable";
import Card from "../components/Cards/Card.vue";
import BaseInput from '../components/Inputs/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';

export default {
  components: {
    BaseTable,
    Card,
    BaseButton,
    PageNotANumber,
    PageNumberInvalid,
  },
  data() {
    BaseInput
    return {
      appPage: 295,
      keyPage: 11,
      sort:{
        orderRule: ["total count", "positive rate", "negative rate", "UI related rate"],
        typeRule: ["App","Key"],
        order: 0,
        type: 0,
      },
      
      page: 1,
      prepage: 1,
      //Rank table
      rankTable: {
        allData: [],
        activeIndex: 0,
        fix:false,
        tableData: {},
      },
      //rank table end
    }
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    rankCategory() {
      return this.$t("dashboard.rankCategory");
    },
  },
  methods: {
    notifyVue(type) {
      var com = PageNotANumber;
      if(type==1){
        com=PageNumberInvalid;
      }
      this.$notify({
          component: com,
          // icon: "tim-icons icon-bell-55",
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: "danger",
          timeout: 0
      });
      this.page=this.prepage;
      // alert(this.page);
    },
    //rank initialization
    initRankeTable(index) {
      this.sort.type=index;
      // alert(index)
      let tableData = this.rankTable.allData[index];
      this.rankTable.tableData = tableData;
      this.rankTable.activeIndex = index;
    },
    //jump from detail button
    detail(thisId) {
      // alert(id)
      if (this.rankTable.activeIndex == 0) {
        //jump to App
          this.$router.push({name:'icons',params: {id:thisId}});      
          //this.$router.push({path:'/icons',query: {id:'1'}})
        // this.$router.reload();
      } else {
        this.$router.push({name:'maps',params: {id:thisId}});//{name: "/maps",});
        // this.$router.reload();
      }
    },
    changePage(newPage){
      //check number
      //var reg = /^[0-9]+\.?[0-9]*$/;
      if (!/^\d+$/.test(newPage)) {
          this.notifyVue(0);
          // alert("not an positive integer number!");
      }else{
        var num = parseInt(newPage);
        if(num<=0||num>this.appPage){
          this.notifyVue(1);
          // alert("the valid page number is from 0 to 295! ")
        }else{
          if(num>this.keyPage){
            this.initRankeTable(0);
            this.rankTable.fix=true;
          }else{
            this.rankTable.fix=false;
          }
          this.page=num;
          this.prepage=num;
          this.getRankInfo();
        }
      }
    },
    changeSort(index){
      // alert("here");
      this.sort.order=index;
      this.getRankInfo();
    },
    getRankInfo(){
      // get rank table info
     var that = this;
     axios.get("/api/rank?order="+that.sort.order+"&page="+that.page).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            that.rankTable.allData=[response.data["data"]["app"],response.data["data"]["key"]];
            that.initRankeTable(that.sort.type);
          }else{
            alert("something goes wrong!");
          }
        },
        function (err) {}
      );
    },
  },
  mounted() {
    this.getRankInfo();
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
</style>
