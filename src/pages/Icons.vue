<template>
  <div>
    <div>
      <card>
        <!-- <base-button @click="test">test</base-button> -->

        <div class="row">
          <div class="col-lg-10">
            <base-input
              addon-left-icon="tim-icons icon-zoom-split"
              :placeholder="
                'SEARCH BY ' + searchOption.searchRule[searchOption.type]
              "
              v-model="searchOption.searchInput"
              @keyup.enter="searchApp(searchOption.searchInput)"
            >
            </base-input>
          </div>
          <div class="col-lg-2">
            <div>
              <base-dropdown
                menu-classes="dropdown-black"
                title-classes="btn btn-secondary"
                :title="searchOption.searchRule[searchOption.type]"
              >
                <a
                  class="dropdown-item"
                  href="#/icons"
                  @click="searchOption.type = 0"
                  >App Name</a
                >
                <a
                  class="dropdown-item"
                  href="#/icons"
                  @click="searchOption.type = 1"
                  >App ID</a
                >
                <a
                  class="dropdown-item"
                  href="#/icons"
                  @click="searchOption.type = 2"
                  >Commit ID</a>
              </base-dropdown>
              <modal :show.sync="searchOption.modal"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
                <card
                  type="secondary"
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 mb-0 "
                >
                <div>
                <h4 slot="header" class="modal-title" id="modal-title-default">Choose the app you want: </h4>

                <base-table :data="chooseData" :columns="columns">
                  <template slot="columns">
                    <th class="text-center">App ID</th>
                    <th class="text-center">SEE</th>
                    <!-- <th class="text-center">More</th> -->
                  </template>
                  <template slot-scope="{ row }">
                    <td class="text-center">{{ row.id }}</td>
                    <td class="td-actions text-center">
                       <base-button class="animation-on-hover" type="success" size="sm" @click="search(row.id,0)">Forward</base-button>
                    </td>
                  </template>
                </base-table>
              </div>
                </card>
              </modal>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div>
      <div class="row">
        <div class="col-lg-10">
          <card>
            <h4 class="card-title">{{ appInfo.name }}</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              APP ID: {{ appInfo.id }}
            </h6>
            <div class="row">
              <div class="col">
                <p class="card-text">positive rank: {{ appInfo.posRank }}</p>
                <p class="card-text">UI related rank: {{ appInfo.UIRank }}</p>
                <!-- <p class="card-text">count rank: {{appInfo.countRank}}</p> -->
              </div>
              <div class="col">
                <p class="card-text">positive rate: {{ appInfo.posRate }}</p>
                <p class="card-text">UI related rate: {{ appInfo.UIRate }}</p>
                <!-- <p class="card-text">count rank: {{appInfo.countRank}}</p> -->
              </div>
              <div class="col">
                <p class="card-text">count rank: {{ appInfo.countRank }}</p>
                <!-- <p class="card-text">UI related rate: {{appInfo.UIRate}}</p> -->
                <!-- <p class="card-text"></p> -->
              </div>
            </div>
            <div class="row float-right" style="padding-top: 10px">
              <!-- <base-button round type="primary">Primary</base-button>
      <base-button round type="primary">Primary</base-button> -->
              <div class="col" style="width: 150px">
                <a :href="appInfo.link" class="card-link text-info">Google Play</a>
              </div>
              <div class="col">
                <a
                  :href="'/api/download?type=app&id=' + appid"
                  class="card-link text-info"
                  >Download</a
                >
              </div>
              <!-- <p>{{ this.aaa }}</p> -->
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
            <!-- <h4 class="card-title">Card title</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a> -->
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
                    {{ this.appInfo.name }} {{ this.appInfo.id }}
                  </h5>
                  <h2 class="card-title">{{ $t("analysis.trend") }}</h2>
                </div>
                <div class="col-sm-6">
                  <div
                    class="btn-group btn-group-toggle"
                    :class="isRTL ? 'float-left' : 'float-right'"
                    data-toggle="buttons"
                  ></div>
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
              <base-button size="sm" type="success" @click="switchFunc(1)"
                >switch</base-button
              >
            </div>
          </card>
        </div>
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Negative Example</h4>
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
              <base-button size="sm" type="success" @click="switchFunc(-1)"
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
                POSITIVE : NEGATIVE = {{ appInfo.pos }} : {{ appInfo.neg }}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-info"></i> Total:
                {{ appInfo.total }}
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
                CURRENT SORT RULE: {{ sort.orderRule[sort.order] }}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-delivery-fast text-info"></i> Keyword
                Rank
              </h3>
              <base-dropdown
                title-tag="a"
                menu-on-right="false"
                class="nav-item float-left "
              >
                <a
                  slot="title"
                  href="#/icons"
                  class="dropdown-toggle nav-link float-left"
                  data-toggle="dropdown"
                >
                  <i class="tim-icons icon-settings-gear-63 text-info"></i>
                </a>
                <li class="nav-link">
                  <a
                    href="#/icons"
                    class="nav-item dropdown-item"
                    @click="changeSort(0)"
                    >count</a
                  >
                </li>
                <li class="nav-link">
                  <a
                    href="#/icons"
                    class="nav-item dropdown-item"
                    @click="changeSort(1)"
                    >positive rank rate</a
                  >
                </li>
                <!-- <div class="dropdown-divider"></div> -->
                <li class="nav-link">
                  <a
                    href="#/icons"
                    class="nav-item dropdown-item"
                    @click="changeSort(2)"
                    >negative rank rate</a
                  >
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
import { BaseAlert } from "@/components";
import Modal from "@/components/Modal";
import AppNotFound from "./Notifications/AppNotFound";
import LineChart from "@/components/Charts/LineChart";
import PieChart from "@/components/Charts/PieChart";
import BaseTable from "@/components/BaseTable";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/config";

export default {
  components: { BaseAlert, LineChart, PieChart, BaseTable, Modal },
  data() {
    return {
      appid: "12345",
      //table
      chooseData:[
        {id:1},{id:2},{id:3}
      ],
      tableData: [],
      sort: {
        orderRule: ["total count", "positive rate", "negative rate"],
        order: 0,
        size: 10,
      },
      searchOption: {
        searchInput: "",
        type: 0,
        searchRule: ["App Name", "App ID", "Commit ID"],
        modal: false,
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

      appInfo: {},

      exampleData: {
        pos: {},
        neg: {},
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
    search(appid,type){
        this.getAppInfo(appid,type);
        this.getAppRankInfo(appid,type);
        this.searchOption.searchInput = "";
        this.searchOption.modal = false;
    },
    searchID(name) {
      // alert(this.searchOption.searchInput)
      var that = this;
      let data = name;
      axios.post("/api/app/id", data).then((response) => {
        // console.log( response);
        if(response.data["meta"]["status"]==200){
          if(response.data["data"]["id"].length==1){
            var appid = response.data["data"]["id"][0]["id"];
            // alert(appid)
            that.search(appid,0);
          }else{
            this.searchOption.modal = true;
            this.chooseData=response.data["data"]["id"];
          }
        }else{
          that.notifyVue();
        }
      });
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
      this.searchOption.searchInput = "";

    },
    switchFunc(type) {
      var that = this;
      axios.get("/api/app/switch?type=" + type+"&id="+that.appid).then(
        function (response) {
          // console.log(response.data);

          if (response.data["meta"]["status"] == 200) {
            if (type == 1) {
              that.exampleData.pos = response.data["data"];
            } else {
              that.exampleData.neg = response.data["data"];
            }
            // that.tableData = response.data["data"]["info"];
          } else {
            //alert("app rank wrong！");
          }
        },
        function (err) {}
      );
    },
    changeSort(index) {
      // alert("here");
      this.sort.order = index;
      this.getAppRankInfo(this.appid,0);
    },
    searchApp(app) {
      if (this.searchOption.type == 0) {
        this.searchID(app);
      } else if(this.searchOption.type==1){
        // alert(appid);
        this.search(app,0);
      }else{
        this.search(app,1);
      }
    },
    getAppInfo(appid,type) {
      var that = this;
      axios.get("/api/app?id=" + appid+"&type="+type).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            that.appid = response.data["data"]["info"]["id"];
            var info = response.data["data"]["info"];
            //set app info
            that.appInfo = info;
            //set pie chart data
            that.chartData.datasets[0]["data"] = [info["pos"], info["neg"]];
            that.$refs.pie.reloadChart();

            var data = [];
            var label = [];
            var x;
            //set line chart data
            for (x in response.data["data"]["version"]) {
              label.push(response.data["data"]["version"][x]["version"]);
              data.push(response.data["data"]["version"][x]["rate"]);
            }
            that.trendChart.trendData.datasets[0].data = data;
            that.trendChart.trendData.labels = label;
            that.$refs.linechart.reloadChart();
            //set pos and neg example
            that.exampleData.pos = response.data["data"]["posExample"];
            that.exampleData.neg = response.data["data"]["negExample"];
          } else {
            that.notifyVue();
            //alert("app info wrong!");
          }
        },
        function (err) {}
      );
    },
    getAppRankInfo(appid,type) {
      var that = this;
      axios.get("/api/app/rank?id=" + appid + "&order=" + that.sort.order+"&type="+type).then(
        function (response) {
          if (response.data["meta"]["status"] == 200) {
            that.tableData = response.data["data"]["info"];
          } else {
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
    if (this.appid == null) {
      this.appid = "12345";
    }

    this.getAppInfo(this.appid,0);
    this.getAppRankInfo(this.appid,0);

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
