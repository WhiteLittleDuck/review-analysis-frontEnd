<template>
  <div>
    <!-- <top-navbar></top-navbar> -->
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <div class="row">
                  <div class="col-sm-10">
                    <h5 class="card-category">
                      {{ $t("dashboard.totalShipments") }}
                    </h5>
                    <h2 class="card-title">
                      Rank of Key Reviews
                    </h2>
                     <base-dropdown
                          title-tag="a"
                          class="nav-item float-left"

                        >
                          <a
                            slot="title"
                            href="#/dashboard"
                            class="dropdown-toggle nav-link float-left"

                            data-toggle="dropdown"
                          >                            
                            <i class="tim-icons icon-settings-gear-63"></i>
                          </a>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item"
                              >count</a
                            >
                          </li>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item"
                              >positive rank rate</a
                            >
                          </li>
                          <!-- <div class="dropdown-divider"></div> -->
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item"
                              >negative rank rate</a
                            >
                          </li>
                          <li class="nav-link">
                            <a href="#/dashboard" class="nav-item dropdown-item"
                              >UI related count</a
                            >
                          </li>
                        </base-dropdown>
                  </div>
                  <div class="col-sm-2" >
                      <!-- <base-checkbox inline class="mb-3" v-model="positiveOrder">positive order</base-checkbox> -->
                      <!-- <a @click="modal = true" class="card-link">order setting</a> -->
                        <!-- <base-button link type="primary" @click="modal = true"
                        >order setting</base-button
                      > -->

                        <!-- <base-dropdown title="order" title-classes="btn btn-success">
                        <a class="dropdown-item" href="#">count</a>
                        <a class="dropdown-item" href="#">positive rate</a>
                        <a class="dropdown-item" href="#"
                          >negative rate</a
                        >
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">UI-related rate</a>
                      </base-dropdown> -->
                       
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
            <!-- class="col-lg-6 col-md-12">-->
            <card class="card" :header-classes="{ 'text-right': isRTL }">
              <!-- <h4 slot="header" class="card-title">
                {{ $t("dashboard.simpleTable") }}
              </h4> -->
              <div>
                <!--class="table-responsive">-->
                <!-- <user-table></user-table> -->
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
                    <td class="text-center">{{ row.pos }}</td>
                    <td class="text-center">{{ row.neg }}</td>
                    <td class="text-center">{{ row.rate }}</td>
                    <td class="text-center">{{ row.ui }}</td>
                    <td class="td-actions text-center">
                      <base-button
                        class="animation-on-hover"
                        type="success"
                        size="sm"
                        @click="detail"
                        >Details</base-button
                      >
                      <!-- <base-button type="info" size="sm" icon>
                        <i class="tim-icons icon-single-02"></i>
                      </base-button> -->
                      <!-- <base-button type="success" size="sm" icon>
                        <i class="tim-icons icon-settings"></i>
                      </base-button>
                      <base-button type="danger" size="sm" icon>
                        <i class="tim-icons icon-simple-remove"></i>
                      </base-button> -->
                    </td>
                  </template>
                </base-table>
              </div>
            </card>
          </div>

          <!-- <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div> -->
          <base-button block type="primary">More</base-button>
        </card>
      </div>
    </div>

    <!--Delete-->
    <!-- <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
            </h3>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success"></i> 12,100K
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{ 'text-right': isRTL }">
          <template slot="header">
            <h6 class="title d-inline">
              {{ $t("dashboard.tasks", { count: 5 }) }}
            </h6>
            <p class="card-category d-inline">{{ $t("dashboard.today") }}</p>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
              :class="{ 'float-left': isRTL }"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.action")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.anotherAction")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.somethingElse")
              }}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <h4 slot="header" class="card-title">
            {{ $t("dashboard.simpleTable") }}
          </h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div> -->
  </div>
</template> 
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script>
import axios from "axios";
import Modal from "@/components/Modal";
import TopNavbar from "@/layout/dashboard/TopNavbar";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import BaseTable from "@/components/BaseTable";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import Card from "../components/Cards/Card.vue";

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    TopNavbar,
    UserTable,
    BaseTable,
    Card,
    Modal,
  },
  data() {
    return {
      modal: false,
      positiveOrder: true,
      //Rank table
      rankTable: {
        allData: [
          [
            {
              rank: 1,
              name: "Wechat",
              total: 1000,
              pos: 800,
              neg: 200,
              rate: "80.00%",
              ui: "10%",
            },
            {
              rank: 2,
              name: "QQ",
              total: 900,
              pos: 400,
              neg: 300,
              rate: "44.44%",
              ui: "20%",
            },
            {
              rank: 3,
              name: "Gension Impact",
              total: 800,
              pos: 300,
              neg: 500,
              rate: "37.50%",
              ui: "5%",
            },
          ],
          // ---------------------------------------next one!-----------------------------------------
          [
            {
              rank: 1,
              name: "Button",
              total: 1000,
              pos: 800,
              neg: 200,
              rate: "80.00%",
              ui: "30%",
            },
            {
              rank: 2,
              name: "Navigation Bar",
              total: 900,
              pos: 400,
              neg: 300,
              rate: "44.44%",
              ui: "20%",
            },
            {
              rank: 3,
              name: "theme",
              total: 800,
              pos: 300,
              neg: 500,
              rate: "37.50%",
              ui: "15%",
            },
          ],
        ],
        activeIndex: 0,
        tableData: {},
      },
      //rank table end
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [{}],
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: [],
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
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
              data: [80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
          datasets: [
            {
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
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
    detail() {
      if (this.rankTable.activeIndex == 0) {
        //jump to App
        this.$router.push("/icons");
        // this.$router.reload();
      } else {
        this.$router.push("/maps");
        // this.$router.reload();
      }
    },
    initBigChart(index) {
      //alert(index)
      let chartData = {
        datasets: [
          {
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
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
      // alert(this.bigLineChart.activeIndex);
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    // this.initBigChart(0);
    this.initRankeTable(0);
      
     axios.get("/api/rank?order=0&type=0&size=10").then(
        function (response) {
          if (response.meta["status"] == 200) {
            that.$router.push("/login");
          }else{
            alert("something goes wrong!");
          }
          // that.joke = response.data
        },
        function (err) {}
      );

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
