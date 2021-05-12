<template>
  <div>
    <div>
      <card>
        <modal
          class="modal-search"
          id="searchModal"
          :centered="false"
          :show-close="true"
        >
          <!-- <input slot="header" type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH FOR APP NAME/APP ID" icon="tim-icons icon-chart-pie-36"> -->
          <base-input
            addon-left-icon="tim-icons icon-zoom-split"
            placeholder="SEARCH BY APP ID"
            v-model="searchInput"
            @keyup.enter="searchApp(searchInput)"
          >
          </base-input>
        </modal>
      </card>
    </div>
    <div>
      <card>
        <h4 class="card-title">{{appInfo.name}}</h4>
        <h6 class="card-subtitle mb-2 text-muted">APP ID: {{appInfo.id}}</h6>
        <div class="row">
          <div class="col">
           <p class="card-text">positive rank: {{appInfo.posRank}}</p>
           <p class="card-text">UI related rank: {{appInfo.UIRank}}</p>
           <!-- <p class="card-text">count rank: {{appInfo.countRank}}</p> -->
          </div>
          <div class="col">
           <p class="card-text">positive rate: {{appInfo.posRate}}</p>
           <p class="card-text">UI related rate: {{appInfo.UIRate}}</p>
           <!-- <p class="card-text">count rank: {{appInfo.countRank}}</p> -->
          </div>
          <div class="col">
           <p class="card-text">count rank: {{appInfo.countRank}}</p>
           <!-- <p class="card-text">UI related rate: {{appInfo.UIRate}}</p> -->
           <!-- <p class="card-text"></p> -->
          </div>
        </div>
        <div class="row float-right" style="padding-top: 0px">
          <!-- <base-button round type="primary">Primary</base-button>
      <base-button round type="primary">Primary</base-button> -->
          <div class="col" style="width: 150px">
            <a :href="appInfo.link" class="card-link">Google Play</a>
          </div>
          <div class="col">
            <a :href="'/api/download?type=app&id='+appid" class="card-link">Download</a>
          </div>
          <!-- <p>{{ this.aaa }}</p> -->
        </div>
      </card>

      <div class="row">
        <div class="col-12">
          <card type="chart">
            <template slot="header">
              <div class="row">
                <div
                  class="col-sm-6"
                  :class="isRTL ? 'text-right' : 'text-left'"
                >
                  <h5 class="card-category">
                    {{ this.appInfo.name }} {{ this.appInfo.id }}
                  </h5>
                  <h2 class="card-title">{{ $t("analysis.trend") }}</h2>
                </div>
                <div class="col-sm-6">
                  <div
                    class="btn-group btn-group-toggle"
                    :class="isRTL ? 'float-left' : 'float-right'"
                    data-toggle="buttons"
                  >

                  </div>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <line-chart
                style="height: 100%"
                ref="linechart"
                chart-id="big-line-chart"
                :chart-data="trendChart.trendData"
                :gradient-colors="trendChart.gradientColors"
                :gradient-stops="trendChart.gradientStops"
                :extra-options="trendChart.extraOptions"
              >
              </line-chart>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Positive Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              review given score: {{exampleData.pos.score}} / 5
              <!-- positive review example for keyword button -->
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p>
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante. -->
                {{exampleData.pos.content}}
              </p>
              <footer class="blockquote-footer">
                reivew for version <cite title="Source Title">{{exampleData.pos.version}}</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="primary" @click="switchFunc(0)" >switch</base-button>
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
                reivew for version <cite title="Source Title">{{exampleData.neg.version}}</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="primary" @click="switchFunc(1)"
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
                POSITIVE : NEGATIVE = {{appInfo.pos}} : {{appInfo.neg}}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-primary"></i> Total: {{appInfo.total}}
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
                <i class="tim-icons icon-delivery-fast text-info"></i> Keyword Rank
              </h3>
              <base-dropdown
                          title-tag="a"
                          menu-on-right=false
                          class="nav-item float-left">
                          <a
                            slot="title"
                            href="#/icons"
                            class="dropdown-toggle nav-link float-left"
                            data-toggle="dropdown"
                          >                            
                            <i class="tim-icons icon-settings-gear-63"></i>
                          </a>
                          <li class="nav-link">
                            <a href="#/icons" class="nav-item dropdown-item" @click="changeSort(0)">count</a>
                          </li>
                          <li class="nav-link">
                            <a href="#/icons" class="nav-item dropdown-item" @click="changeSort(1)">positive rank rate</a>
                          </li>
                          <!-- <div class="dropdown-divider"></div> -->
                          <li class="nav-link">
                            <a href="#/icons" class="nav-item dropdown-item" @click="changeSort(2)">negative rank rate</a>
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
                    <!-- <td class="td-actions text-center">
                       <base-button class="animation-on-hover" type="success" size="sm" @click="detail" >Details</base-button>
                    </td> -->
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
import { BaseAlert } from '@/components';
import AppNotFound from './Notifications/AppNotFound';
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import BaseTable from "@/components/BaseTable";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

export default {
  components: {BaseAlert,
    LineChart,
    PieChart,
    BaseTable,
  },
  data() {
    return {
      appid:"12345",
      searchInput:"",
      //table
      tableData:[],
      sort:{
        orderRule: ["total count", "positive rate", "negative rate"],
        order: 0,
        size: 10
      },

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
            data: [2, 8],
            radius: "20%",
          },
        ],
      },

      appInfo:{},

      exampleData:{
        pos:{},
        neg:{},
      },

      trendChart: {
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        extraOptions: chartConfigs.trendChartOptions,
        trendData: {
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [10, 12, 15, 20, 30, 40, 60, 90],
            },
          ],
          labels: ["1.0", "1,1", "1,2", "1.3", "1.4", "1.5", "2.0", "2.1"],
        },
      },
    };
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
    notifyVue() {
      this.$notify({
          component: AppNotFound,
          // icon: "tim-icons icon-bell-55",
          horizontalAlign: 'center',
          verticalAlign: 'top',
          type: "warning",
          timeout: 0
      });
    },
    switchFunc(type){
      var that = this;
      axios.get("/api/app/switch?type="+type).then(
        function (response) {
          console.log(response.data);

          if (response.data["meta"]["status"] == 200) {
            if(type==0){
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
    this.getAppRankInfo(this.appid);
    },
    searchApp(appid){
      // alert(appid);
      this.getAppInfo(appid);
      this.getAppRankInfo(appid);
      this.searchInput="";
    },
    getAppInfo(appid){
      var that = this;
      axios.get("/api/app?id="+appid).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            var info = response.data["data"]["info"];
            //set app info
            that.appInfo=info;
            //set pie chart data
            that.chartData.datasets[0]["data"]=[info["pos"],info["neg"]];
            that.$refs.pie.reloadChart();

            var data = [];
            var label = [];
            var x;
            //set line chart data
            for (x in response.data["data"]["version"]) {
              label.push(response.data["data"]["version"][x]["version"]);
              data.push(response.data["data"]["version"][x]["rate"]);
            }
            that.trendChart.trendData.datasets[0].data=data;
            that.trendChart.trendData.labels=label;
            that.$refs.linechart.reloadChart();
            //set pos and neg example
            that.exampleData.pos=response.data["data"]["posExample"];
            that.exampleData.neg=response.data["data"]["negExample"];
            if(appid!=that.appid){
              that.appid=appid;
            }
          }else{
            that.notifyVue();
            //alert("app info wrong!");
          }
        },
      function (err) {}
      );
    },
    getAppRankInfo(appid){
      var that = this;
      axios.get("/api/app/rank?id="+appid+"&order="+that.sort.order).then(
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
    //get appid from dashboard page
    this.appid = this.$route.params.id;
    if (this.appid==null){
      this.appid = "12345";
    }

    this.getAppInfo(this.appid);
    this.getAppRankInfo(this.appid);


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
