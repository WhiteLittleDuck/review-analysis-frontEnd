<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
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
                            <i class="tim-icons icon-settings-gear-63"></i>
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
                      class="btn btn-sm btn-primary btn-simple"
                      :class="{ active: rankTable.activeIndex === index }"
                      :id="index"
                    >
                      <input
                        type="radio"
                        @click="initRankeTable(index)"
                        name="options"
                        autocomplete="on"
                        :checked="rankTable.activeIndex === index"
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
                    <td class="text-center">{{ row.rate }}</td>
                    <td class="text-center">{{ row.UIrate }}</td>
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
          <base-button block type="primary">More</base-button>
        </card>
      </div>
    </div>
  </div>
</template> 
<script>
import axios from "axios";
import BaseTable from "@/components/BaseTable";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";
import Card from "../components/Cards/Card.vue";

export default {
  components: {
    BaseTable,
    Card,
  },
  data() {
    return {
      hi:"aaa",
      sort:{
        orderRule: ["total count", "positive rate", "negative rate", "UI related rate"],
        typeRule: ["App","Key"],
        order: 0,
        type: 0,
        size: 10
      },
      
      //Rank table
      rankTable: {
        allData: [],
        activeIndex: 0,
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
    //rank initialization
    initRankeTable(index) {
      // alert(index)
      let tableData = this.rankTable.allData[index];
      this.rankTable.tableData = tableData;
      this.rankTable.activeIndex = index;
    },
    //jump from detail button
    detail(appid) {
      // alert(id)
      if (this.rankTable.activeIndex == 0) {
        //jump to App
          this.$router.push({name:'icons',params: {id:appid}});      
          //this.$router.push({path:'/icons',query: {id:'1'}})
        // this.$router.reload();
      } else {
        this.$router.push("/maps");
        // this.$router.reload();
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
     axios.get("/api/rank?order="+that.sort.order+"&size=10").then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            // alert("hihi");
            var a = [response.data["data"]["app"],response.data["data"]["key"]];
            // console.log(a);
            that.rankTable.allData=[response.data["data"]["app"],response.data["data"]["key"]];
            that.initRankeTable(0);
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
