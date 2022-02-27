<template>
  <div>
    <div>
      <card>
        <div class="row">
          <div class="col-lg-10">
            <base-input
              addon-left-icon="tim-icons icon-zoom-split"
              placeholder="SEARCH BY UI CONTROL NAME(KEYWORD)"
              v-model="searchOption.searchInput"
              @keyup.enter="search(searchOption.searchInput)">
            </base-input>
          </div>
          <base-button round type="success" @click="search(searchOption.searchInput)">
            SEARCH UI
          </base-button>
        </div>
      </card>
    </div>
    
    <div>
      <card>
        <h4 class="card-title">{{keywordInfo.keyid}}</h4>
        <h6 class="card-subtitle mb-2 text-muted">In 100 UI control keyword list summarized by Aolei and Yirui</h6>

        <div class="row">
          <div class="col">
            <p class="card-text">count: {{keywordInfo.ui_cnt}}</p>
            <p class="card-text">positive rate: {{toPercentag(keywordInfo.ui_pos_rate)}}%</p>
          </div>
          <div class="col">
           <p class="card-text">positive count: {{keywordInfo.ui_pos_cnt}}</p>
           <p class="card-text">negative count: {{keywordInfo.ui_neg_cnt}}</p>
          </div>
        </div>

        <div class="float-right">
          <a :href="'/api/download?type=key&id='+keyid" class="card-link text-info">Download</a>
        </div>
      </card>

      <div class="row">
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Positive Review Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
               review given score: {{exampleData.pos.score}} / 5
            </h6>            
            <blockquote class="blockquote mb-0">
              <p v-html="exampleData.pos.content"></p>
              <footer class="blockquote-footer">
                reivew from app <cite title="Source Title">{{exampleData.pos.appId}}</cite>
              </footer>
            </blockquote>

            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="getExample(1)"
                >switch</base-button>
            </div>
          </card>
        </div>
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Negative Review Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
               review given score: {{exampleData.neg.score}} / 5
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p v-html="exampleData.neg.content"></p>
              <footer class="blockquote-footer">
                reivew from app <cite title="Source Title">{{exampleData.neg.appId}}</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="getExample(-1)">switch</base-button>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">
                POSITIVE : NEGATIVE = {{keywordInfo.ui_pos_cnt}} : {{keywordInfo.ui_neg_cnt}}              </h5>
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
                <i class="tim-icons icon-delivery-fast text-info"></i> Rank of App contains <span style="font-weight:bold">{{keyid}}</span>
              </h3>
              <base-dropdown
                title-tag="a"
                menu-on-right="false"
                menu-classes="dropdown-black"
                class="nav-item float-left ">
                  <a
                    slot="title"
                    href="#/maps"
                    class="dropdown-toggle nav-link float-left"
                    data-toggle="dropdown">
                    <i class="tim-icons icon-settings-gear-63 text-info"></i>
                  </a>
                  <a class="dropdown-item" href="#/maps" @click="getKeywordRankInfo(0)">UI count</a>
                  <a class="dropdown-item" href="#/maps" @click="getKeywordRankInfo(1)">positive count</a>
                  <a class="dropdown-item" href="#/maps" @click="getKeywordRankInfo(2)">negative count</a>
                  <a class="dropdown-item" href="#/maps" @click="getKeywordRankInfo(3)">positive rate</a>
                  <a class="dropdown-item" href="#/maps" @click="getKeywordRankInfo(4)">negative rate</a>
              </base-dropdown>
            </template>
            <div>
              <div>
                <!--class="table-responsive">-->
                <!-- <user-table></user-table> -->
                <base-table :data="tableData" :columns="columns">
                  <template slot="columns">
                    <th class="text-center">Rank</th>
                    <th class="text-center">APP</th>
                    <th class="text-center">UI Count</th>
                    <th class="text-center">Positive Count</th>
                    <th class="text-center">Negative Count</th>
                    <!--class="text-right/center"-->
                    <th class="text-center">Positive Rate</th>
                    <!-- <th class="text-center">More</th> -->
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-center">{{ row.rank }}</td>
                    <td class="text-center">{{ row.appId }}</td>
                    <td class="text-center">{{ row.cnt }}</td>
                    <td class="text-center">{{ row.pos_cnt }}</td>
                    <td class="text-center">{{ row.neg_cnt }}</td>
                    <td clase="text-center">{{ toPercentag(row.pos_rate) }}%</td>
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
      keyid:'design',
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
        searchRule:['Key','Key ID'],
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
    toPercentag(val){     
        return Number(val*100).toFixed(2);
    },
    search(input){
      this.getKeywordInfo(input);
      this.searchOption.searchInput = "";
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
    getExample(type){
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
          }else{ // not found data example
            if(type==1){
              that.exampleData.pos={'appId':'---', 'content': 'sorry, no data currently', 'score':'---'};
            }else{
              that.exampleData.neg={'appId':'---', 'content': 'sorry, no data currently', 'score':'---'};
            }          
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
    getKeywordInfo(input){
      var that = this;
      axios.get("/api/keyword?id="+input).then(
        function (response) {
          // console.log(response.data);

          if (response.data["meta"]["status"] == 200) {
            that.keyid=input
            var info = response.data["data"]["info"];
            //set key info
            that.keywordInfo=info;
            // //set pie chart data
            that.chartData.datasets[0]["data"]=[info["ui_pos_cnt"],info["ui_neg_cnt"]];
            that.$refs.pie.reloadChart();

            //set pos and neg example
            // that.exampleData.pos=response.data["data"]["posExample"];
            // that.exampleData.neg=response.data["data"]["negExample"];
            that.getExample(1)
            that.getExample(-1)

            that.getKeywordRankInfo(0)
          }else{
            that.notifyVue();
          }
        },
      function (err) {}
      );
    },
    getKeywordRankInfo(order){
      var that = this;
      axios.get("/api/keyword/rank?id="+that.keyid+"&order="+order).then(
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
      this.keyid = 'design';
    }

    this.getKeywordInfo(this.keyid);
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
