<template>
  <div>
    <div>
      <card>
        <div class="row">
          <div class="col-lg-10">
        
          <base-input
            addon-left-icon="tim-icons icon-zoom-split"
            :placeholder="'SEARCH BY '+searchOption.searchRule[searchOption.type]"
            v-model="searchOption.searchInput"
            @keyup.enter="searchKey(searchOption.searchInput)"
          >
          </base-input>
          </div>
          <div class="col-lg-2">
            <div>
          <base-dropdown menu-classes="dropdown-black"
               title-classes="btn btn-secondary"
               :title="searchOption.searchRule[searchOption.type]">
            <a class="dropdown-item" href="#/maps" @click="searchOption.type=0">Keyword Text</a>
            <a class="dropdown-item" href="#/maps" @click="searchOption.type=1">Keyword ID</a>
          </base-dropdown>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div>
      <card>
        <h4 class="card-title">{{keywordInfo.name}}</h4>
                  <h6 class="card-subtitle mb-2 text-muted">KEY ID: {{keywordInfo.id}}</h6>

        <div class="row">
          <div class="col">
           <p class="card-text">positive rank: {{keywordInfo.posRank}}</p>
             <p class="card-text">positive rate: {{keywordInfo.posRate}}</p>
          </div>
          <div class="col">
           <p class="card-text">count rank: {{keywordInfo.countRank}}</p>
          </div>
        </div>
          <div class="float-right">
            <a :href="'/api/download?type=key&id='+keyid" class="card-link text-info">Download</a>
          </div>
      </card>

      <div class="row">
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Positive Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
               review given score: {{exampleData.pos.score}} / 5
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            
            <blockquote class="blockquote mb-0">
              <p>
                {{exampleData.pos.content}}
              </p>
              <footer class="blockquote-footer">
                reivew from app <cite title="Source Title">{{exampleData.pos.name}}</cite>
              </footer>
            </blockquote>

            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="switchFunc(1)"
                >switch</base-button>
            </div>
          </card>
        </div>
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Negative Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
               review given score: {{exampleData.neg.score}} / 5
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p>
                {{exampleData.neg.content}}
              </p>
              <footer class="blockquote-footer">
                reivew from app <cite title="Source Title">{{exampleData.neg.name}}</cite>
              </footer>
            </blockquote>
              <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="switchFunc(-1)"
                  >switch</base-button>
              </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">
                POSITIVE : NEGATIVE = {{keywordInfo.pos}} : {{keywordInfo.neg}}              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-info"></i> Total: {{keywordInfo.total}}
              </h3>
            </template>
            <div class="chart-area" style="height: 55%">
              <pie-chart :data="chartData" :options="chartOptions" ref="pie"></pie-chart>
            </div>
          </card>
        </div>
        <div class="col-lg-8" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">CURRENT SORT RULE: {{sort.orderRule[sort.order]}}</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-delivery-fast text-info"></i> App Rank
              </h3>
              <base-dropdown
                          title-tag="a"
                          menu-on-right=false
                          class="nav-item float-left">
                          <a
                            slot="title"
                            href="#/maps"
                            class="dropdown-toggle nav-link float-left"
                            data-toggle="dropdown"
                          >                            
                            <i class="tim-icons icon-settings-gear-63 text-info"></i>
                          </a>
                          <li class="nav-link">
                            <a href="#/maps" class="nav-item dropdown-item" @click="changeSort(0)">count</a>
                          </li>
                          <li class="nav-link">
                            <a href="#/maps" class="nav-item dropdown-item" @click="changeSort(1)">positive rank rate</a>
                          </li>
                          <!-- <div class="dropdown-divider"></div> -->
                          <li class="nav-link">
                            <a href="#/maps" class="nav-item dropdown-item" @click="changeSort(2)">negative rank rate</a>
                          </li>
                        </base-dropdown>
            </template>
            <div class="chart-area">
              <div>
                <!--class="table-responsive">-->
                <!-- <user-table></user-table> -->
                <base-table :data="tableData" :columns="columns">
                  <template slot="columns">
                    <th class="text-center">Rank</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">Total</th>
                    <th class="text-center">Positive</th>
                    <th class="text-center">Negative</th>
                    <!--class="text-right/center"-->
                    <th class="text-center">Rate</th>
                    <!-- <th class="text-center">More</th> -->
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-center">{{ row.rank }}</td>
                    <td class="text-center">{{ row.name }}</td>
                    <td class="text-center">{{ row.total }}</td>
                    <td class="text-center">{{ row.positive }}</td>
                    <td class="text-center">{{ row.negative }}</td>
                    <td clase="text-center">{{ row.rate }}</td>
                  </template>
                </base-table>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import KeyNotFound from "./Notifications/KeyNotFound";
import Modal from "@/components/Modal";
import BaseInput from "@/components/Inputs/BaseInput";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import BaseTable from "@/components/BaseTable";

export default {
  components: {
    BaseInput,
    BarChart,
    PieChart,
    BaseTable,
    KeyNotFound,
    Modal,
  },
  data() {
    return {
      keyid:1,
      keywordInfo:{},
      sort:{
        orderRule: ["total count", "positive rate", "negative rate"],
        order: 0,
        size: 10
      },
      tableData:[],

      searchOption:{
        searchInput: "",
        type:0,
        searchRule:['Keyword Text','Keyword ID'],
        modal:false,
      },
      // dropDownText="Keyword Text",

      //Pie Chart Test
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["pos", "neg"],
        radius: "20%",

        datasets: [
          {
            // label: "Data One",
            backgroundColor: ["#41B883", "#E46651"],
            data: [1, 10],
            radius: "20%",
          },
        ],
      },
      exampleData:{
        pos:{},
        neg:{},
      }
    }
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },
  methods: {
    search(keyid){
      this.getKeywordInfo(keyid);
      this.getKeywordRankInfo(keyid);
      this.searchOption.searchInput = "";
    },
    searchID(text) {
      // alert(this.searchOption.searchInput)
      var that = this;
      // let data = name;
      axios.post("/api/keyword/id", text).then((response) => {
        if(response.data["meta"]["status"]==200){
          var keyid = response.data["data"]["id"];
            // alert(appid)
          that.search(keyid);
        }else{
          that.notifyVue();
        }
      });
    },
    notifyVue() {
      this.$notify({
        component: KeyNotFound,
        // icon: "tim-icons icon-bell-55",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "warning",
        timeout: 0,
      });
    },
    switchFunc(type){
      var that = this;
      axios.get("/api/keyword/switch?type="+type+"&id="+that.keyid).then(
        function (response) {
          console.log(response.data);

          if (response.data["meta"]["status"] == 200) {
            if(type==1){
              that.exampleData.pos=response.data["data"];
            }else{
              that.exampleData.neg=response.data["data"];
            }
            // that.tableData = response.data["data"]["info"];
          }else{
            //alert("app rank wrong！");
          }
        },
        function (err) {}
      );
    },
    changeSort(index){
      // alert("here");
      this.sort.order=index;
      this.getKeywordRankInfo(this.keyid);
    },
    searchKey(key) {
      // alert(this.searchOption.type)
      if (this.searchOption.type == 0) {
        this.searchID(key);
      }else{
        this.search(key);
      }
    },
    getKeywordInfo(keyid){
      var that = this;
      axios.get("/api/keyword?id="+keyid).then(
        function (response) {
          // console.log(response.data);

          if (response.data["meta"]["status"] == 200) {
            var info = response.data["data"]["info"];
            //set key info
            that.keywordInfo=info;
            // //set pie chart data
            that.chartData.datasets[0]["data"]=[info["pos"],info["neg"]];
            that.$refs.pie.reloadChart();

            //set pos and neg example
            that.exampleData.pos=response.data["data"]["posExample"];
            that.exampleData.neg=response.data["data"]["negExample"];
            // if(appid!=that.appid){
            //   that.appid=appid;
            // }
          }else{
            that.notifyVue();
          }
        },
      function (err) {}
      );
    },
    getKeywordRankInfo(keywordid){
      var that = this;
      axios.get("/api/keyword/rank?id="+keywordid+"&order="+that.sort.order).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            that.tableData = response.data["data"]["info"];
          }else{
            //alert("app rank wrong！");
          }
        },
        function (err) {}
      );
    },
    
  },
  mounted() {
    this.keyid = this.$route.params.id;
    if (this.keyid==null){
      this.keyid = 1;
    }

    this.getKeywordInfo(this.keyid);
    this.getKeywordRankInfo(this.keyid);

    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    // this.initBigChart(0);
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
