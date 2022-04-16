<template>
  <div>
    <div>
      <card>
        <div class="row">
          <div class="col-lg-10">
            <base-input
              addon-left-icon="tim-icons icon-zoom-split"
              placeholder="SEARCH APP"
              v-model="searchContent"
              @keyup.enter="search(searchContent)">
            </base-input>
          </div>
          <base-button round type="success" @click="search(searchContent)">
            SEARCH APP
          </base-button>
        </div>
      </card>
    </div>

    <div v-for="item in searchInfo" v-if="isSearch">
      <AppCard v-on:toFater="searchJump"
       :title="item.title" :appId="item.appId" :icon="item.icon" :developer="item.developer" :url="item.url" :developerEmail="item.developerEmail" :released="item.released"></AppCard>
    </div>

    <div v-if="!isSearch">
      <div class="row">
        <div class="col-lg-10">
          <card>
            <h4 class="card-title"> App Name: {{ appInfo.name }}</h4>
            <h5 class="card-subtitle mb-2 text-muted">
              App ID: {{ appInfo.appId }}
            </h5>
            <div class="row">
              <div class="col">
                <p class="card-text">Total count: {{ appInfo.reviews }}</p>
                <p class="card-text">UI-related count: {{ appInfo.ui_cnt }}</p>
                <p class="card-text">Android Version: {{appInfo.androidVersionText}}</p>
              </div>
              <div class="col">
                <p class="card-text">Average Score: {{ toFix2(appInfo.score) }}/5</p>
                <p class="card-text">UI Rate: {{ toPercentag(appInfo.ui_rate) }}%</p>
                <p class="card-text">Genre: {{appInfo.genre}}</p> 
              </div>
              <div class="col">
                <p class="card-text">Positive UI Rate: {{ toPercentag(appInfo.ui_pos_rate) }}%</p>
                <p class="card-text">Positive UI Count: {{appInfo.ui_pos_cnt}}</p>
                <p class="card-text">Installs: {{appInfo.installs}}</p>
              </div>
            </div>
            <div class="row float-right" style="padding-top: 10px">
              <div class="col" style="width: 150px">
                <a :href="appInfo.url" class="card-link text-info">Google Play</a>
              </div>
              <div class="col">
                <a
                  :href="'/api/download?type=app&id=' + appid"
                  class="card-link text-info"
                  >Download</a>
              </div>
            </div>
          </card>
        </div>
        <div class="col-lg-2">
          <card>
            <img
              slot="image"
              class="card-img-top"
              :src="appInfo.icon"
              alt="Card image cap"
            />
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <card>
           <h4 class="card-title">Descrption:</h4>
            <p class="card-text">
            <div v-html="appInfo.descriptionHTML">
            </div>
            </p>
          </card>
        </div>
      </div>

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
                    {{ this.appInfo.appId }}
                  </h5>
                  <h2 class="card-title">{{ trendChart.sortType[trendChart.sortIndex] }} - version</h2>
                </div>
                <div class="col-sm-6">
                  <div
                    class="btn-group btn-group-toggle"
                    :class="isRTL ? 'float-left' : 'float-right'"
                    data-toggle="buttons"
                  ></div>
                </div>
              </div>
              <base-dropdown
                title-tag="a"
                menu-on-right="false"
                menu-classes="dropdown-black"
                class="nav-item float-left ">
                <a
                  slot="title"
                  href="#/icons"
                  class="dropdown-toggle nav-link float-left"
                  data-toggle="dropdown">
                  <i class="tim-icons icon-settings-gear-63 text-info"></i>
                </a>
                  <a class="dropdown-item" href="#/icons" @click="setTrend(0)">{{trendChart.sortType[0]}}</a>
                  <a class="dropdown-item" href="#/icons" @click="setTrend(1)">{{trendChart.sortType[1]}}</a>
                  <a class="dropdown-item" href="#/icons" @click="setTrend(2)">{{trendChart.sortType[2]}}</a>
                  <a class="dropdown-item" href="#/icons" @click="setTrend(3)">{{trendChart.sortType[3]}}</a>
              </base-dropdown>
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
            <h4 class="card-title">Positive Review Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              review given score: {{ exampleData.pos.score }} / 5
            </h6>
            <blockquote class="blockquote mb-0">
              <p>
                <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante. -->
                {{ exampleData.pos.content }}
              </p>
              <footer class="blockquote-footer">
                reivew for version
                <cite title="Source Title">{{ exampleData.pos.version }}</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="getExample(1)"
                >switch</base-button
              >
            </div>
          </card>
        </div>
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Negative Review Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              review given score: {{ exampleData.neg.score }} / 5
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p>
                {{ exampleData.neg.content }}
              </p>
              <footer class="blockquote-footer">
                reivew for version
                <cite title="Source Title">{{ exampleData.neg.version }}</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="success" @click="getExample(0)"
                >switch</base-button
              >
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">
                POSITIVE : NEGATIVE = {{ appInfo.ui_pos_cnt }} : {{ appInfo.ui_neg_cnt }}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-info"></i> All UI review count:
                {{ appInfo.ui_cnt }}
              </h3>
            </template>
            <div class="chart-area" style="height: 55%">
              <pie-chart
                :data="chartData"
                :options="chartOptions"
                ref="pie"
              ></pie-chart>
            </div>
          </card>
        </div>

        <div class="col-lg-8" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">
                SORTED BY: {{ sort.orderRule[sort.order] }}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-delivery-fast text-info"></i> UI Keyword Rank</h3>
              <base-dropdown
                title-tag="a"
                menu-on-right="false"
                menu-classes="dropdown-black"
                class="nav-item float-left ">
                  <a
                    slot="title"
                    href="#/icons"
                    class="dropdown-toggle nav-link float-left"
                    data-toggle="dropdown">
                    <i class="tim-icons icon-settings-gear-63 text-info"></i>
                  </a>
                  <a class="dropdown-item" href="#/icons" @click="getAppRankInfo(0)">UI count</a>
                  <a class="dropdown-item" href="#/icons" @click="getAppRankInfo(1)">positive count</a>
                  <a class="dropdown-item" href="#/icons" @click="getAppRankInfo(2)">negative count</a>
                  <a class="dropdown-item" href="#/icons" @click="getAppRankInfo(3)">positive rate</a>
                  <a class="dropdown-item" href="#/icons" @click="getAppRankInfo(4)">negative rate</a>
              </base-dropdown>
            </template>
            <div >
              <div>
                <!--class="table-responsive">-->
                <!-- <user-table></user-table> -->
                <base-table :data="tableData" :columns="columns">
                  <template slot="columns">
                    <th class="text-center">Rank</th>
                    <th class="text-center">Name</th>
                    <th class="text-center">UI Count</th>
                    <th class="text-center">Positive Count</th>
                    <th class="text-center">Negative Count</th>
                    <!--class="text-right/center"-->
                    <th class="text-center">Positive Rate</th>
                    <!-- <th class="text-center">More</th> -->
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-center">{{ row.rank }}</td>
                    <td class="text-center">{{ row.name }}</td>
                    <td class="text-center">{{ row.cnt }}</td>
                    <td class="text-center">{{ row.pos_cnt }}</td>
                    <td class="text-center">{{ row.neg_cnt }}</td>
                    <td clase="text-center">{{ toPercentag(row.pos_rate) }}%</td>
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
import { BaseAlert } from "@/components";
import Modal from "@/components/Modal";
import AppNotFound from "./Notifications/AppNotFound";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import BaseTable from "@/components/BaseTable";
import AppCard from "@/pages/SearchLoadPage/AppCard";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";



export default {
  components: { BaseAlert, LineChart, PieChart, BaseTable, Modal, AppCard },
  data() {
    return {
      appid: "12345",
      test_list: [1,2,3],
      tableData: [],
      sort: {
        orderRule: ["UI count", "positive count", "negative count", "positive rate", "negative rate"],
        order: 0,
        size: 10,
      },
      searchContent: "",
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

      appInfo: {},
      isSearch: false,
      searchInfo:[],
      exampleData: {
        pos: {},
        neg: {},
      },

      trendChart: {
        sortIndex: 0,
        sortType:['positive UI-review rate (%)', 'UI related review count', 'positive UI-review count', 'negative UI-review count'],
        sortData:[],
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
              data: [],
            },
          ],
          labels: []
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
    toPercentag(val){     
        return Number(val*100).toFixed(2);
    },
    toFix2(val){
        return Number(val).toFixed(2);
    },
    search(appid){
        this.getAppInfo(appid);
        this.searchContent = "";
    },
    searchJump(appid){
      this.appid = appid;
      this.getAppInfo(appid)
      this.getExample(1);
      this.getExample(0);
      this.getAppRankInfo(0);
    },
    notifyVue() {
      this.$notify({
        component: AppNotFound,
        // icon: "tim-icons icon-bell-55",
        horizontalAlign: "center",
        verticalAlign: "top",
        type: "warning",
        timeout: 0,
      });
      this.searchContent = "";

    },
    getExample(type) {
      var that = this;
      axios.get("/api/app/switch?type=" + type+"&id="+that.appid).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            if (type == 1) {
              that.exampleData.pos = response.data["data"];
            } else {
              that.exampleData.neg = response.data["data"];
            }
          } else {
            if (type == 1) {
              that.exampleData.pos = {'score':'---', 'content': 'sorry, no data currently', 'version':'---'};
            } else {
              that.exampleData.neg = {'score':'---', 'content': 'sorry, no data currently', 'version':'---'};
            }
          }
        },
        function (err) {}
      );
    },

    setTrend(index){
      this.trendChart.sortIndex=index;
      this.trendChart.trendData.datasets[0].data = this.trendChart.sortData[index]['data'];
      this.trendChart.trendData.labels = this.trendChart.sortData[index]['label'];
      this.$refs.linechart.reloadChart();
    },

    getAppInfo(appid) {
      var that = this;
      axios.get("/api/app?id=" + appid).then(
        function (response) {
          if (response.data["meta"]["status"] == 201){
            that.isSearch=true;
            that.searchInfo = response.data["data"]["info"];
          }else if (response.data["meta"]["status"] == 200) {
            that.isSearch=false;
            that.appid = response.data["data"]["info"]["appId"];
            var info = response.data["data"]["info"];
            //set app info
            that.appInfo = info;
            //set pie chart data
            that.chartData.datasets[0]["data"] = [info["ui_pos_cnt"], info["ui_neg_cnt"]];
            that.$refs.pie.reloadChart();
            
            // load 4 version list data for trend chart
            var label = response.data["data"]['versions'];
            that.trendChart.sortData.push({'data':response.data["data"]['version_values']['pos_rate'],'label':label}); 
            that.trendChart.sortData.push({'data':response.data["data"]['version_values']['cnt'],'label':label}) 
            that.trendChart.sortData.push({'data':response.data["data"]['version_values']['pos_cnt'],'label':label}) 
            that.trendChart.sortData.push({'data':response.data["data"]['version_values']['neg_cnt'],'label':label}) 
            that.setTrend(0)

            that.getExample(1)
            that.getExample(0)
            that.getAppRankInfo(0)
          } else {
            that.notifyVue();
          }
        },
        function (err) {}
      );
    },
    getAppRankInfo(order) {
      this.sort.order = order;
      var that = this;
      axios.get("/api/app/rank?id=" + this.appid + "&order=" + order).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            that.tableData = response.data["data"]["info"];
          } else {
            //alert("app rank wrong！");
          }
        },
        function (err) {}
      );
      console.log(this.tableData)
    },
  },
  mounted() {
    //get appid from dashboard page
    this.appid = this.$route.params.id;
    if (this.appid == null) {
      this.appid = "air.com.vudu.air.DownloaderTablet";
    }

    this.getAppInfo(this.appid);

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
