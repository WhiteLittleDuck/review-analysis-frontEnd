<template>
  <div>
    <div>
      <card>
        <div class="row">
          <div class="col-lg-9">
        <!-- <modal
          class="modal-search"
          id="searchModal"
          :centered="false"
          :show-close="true"
        > -->
          <!-- <base-input addon-left-icon="tim-icons icon-single-02" slot="header" type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH FOR KEYWORDS" icon="tim-icons icon-chart-pie-36"> -->
          <base-input
            addon-left-icon="tim-icons icon-zoom-split"
            placeholder="SEARCH KEYWORD"
          >
          </base-input>
        <!-- </modal> -->
          </div>
          <div class="col-lg-3">
            <div>
           <base-button link type="primary" size="sm" @click="modal = true">possible keywords</base-button>
                  <modal :show.sync="modal">
            <h3 slot="header" class="modal-title" id="modal-title-default">All Availabel Keywords</h3>

            <p>alignment, clarity, column, combination, design, layer, layout, look, position, row, scale, 
              shape, space, structure, style, UI, alert ,button, checkbox, confirm, dropdown, element, 
              exploration, form, icon, input, load, menu, message, navigation, notification, picker, 
              progress, radio, result, search, select, slider, spin, step, appearance, bar, baseline, 
              bold, brightness, composition, consistency, distance, RGB, blindness, edge, emblem, footer, 
              gradient, grayscale, grid, hierarchy, hover, interface, italic, kerning, logo, mark, monochromatic, 
              opacity, overlap, pattern, pixel, proximity, round corner, saturation, scheme, serif, shade, 
              symbol, theme, tint, tone, typography, visibility, weight, widget, wireframe, switch, tab, 
              table, toggle, background, color, contrast, font, header, height, image, line, paragraph, 
              photo, shadow, size, text, title</p>

            <template slot="footer">
                <base-button type="secondary" class="ml-auto" @click="modal = false">Close
                </base-button>
            </template>
        </modal>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div>
      <card>
        <h4 class="card-title">Button</h4>
        <h6 class="card-subtitle mb-2 text-muted">
          Some description if needed
        </h6>
        <p class="card-text">positive rank: 1/1024</p>
        <p class="card-text">review count rank: 3/1024</p>
        <!-- <a href="#" class="card-link">Google Play Store</a> -->
        <a href="#" class="float-right">Download Data</a>
      </card>

      <div class="row">
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Positive Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              positive review example for keyword button
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
            <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="primary" 
                >switch</base-button>
            </div>
          </card>
        </div>
        <div class="col-lg-6" :class="{ 'text-right': isRTL }">
          <card>
            <h4 class="card-title">Negative Example</h4>
            <h6 class="card-subtitle mb-2 text-muted">
              negative review example review for keyword button
            </h6>
            <!-- <p class="card-text">positive:</p> -->
            <blockquote class="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
              <div class="float-right" style="padding-top: 10px">
              <base-button size="sm" type="primary" 
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
                {{ $t("dashboard.totalShipments") }}
              </h5>
              <h3 class="card-title">
                <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
              </h3>
            </template>
            <div class="chart-area" style="height: 55%">
              <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
              <!-- <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart> -->
            </div>
          </card>
        </div>
        <div class="col-lg-8" :class="{ 'text-right': isRTL }">
          <card type="chart">
            <template slot="header">
              <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
              <h3 class="card-title">
                <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
              </h3>
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
                    <td class="text-center">{{ row.pos }}</td>
                    <td class="text-center">{{ row.neg }}</td>
                    <td clase="text-center">{{ row.rate }}</td>
                    <!-- <td class="td-actions text-center">
                       <base-button class="animation-on-hover" type="success" size="sm" @click="detail" >Details</base-button>
                    </td> -->
                  </template>
                </base-table>
              </div>
              <!-- <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart> -->
            </div>
          </card>
        </div>
        <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div> -->
      </div>
      <!-- <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div> -->
    </div>
  </div>
</template>
<script>
import Modal from "@/components/Modal";
import BaseInput from "@/components/Inputs/BaseInput";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import PieChart from "@/components/Charts/PieChart";
import BaseTable from "@/components/BaseTable";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";

export default {
  components: {
    BaseInput,
    LineChart,
    BarChart,
    PieChart,
    BaseTable,
    TaskList,
    UserTable,
    Modal,
  },
  data() {
    return {
      modal:false,
      //table
      tableData:
        // ---------------------------------------next one!-----------------------------------------
        [
          {
            rank: 1,
            name: "Wechat",
            total: 1000,
            pos: 800,
            neg: 200,
            rate: "80.00%",
          },
          {
            rank: 2,
            name: "QQ",
            total: 900,
            pos: 400,
            neg: 300,
            rate: "44.44%",
          },
          {
            rank: 3,
            name: "Genshin Impact",
            total: 800,
            pos: 300,
            neg: 500,
            rate: "37.50%",
          },
        ],

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

      appName: "Wechat",
      appID: 102,
      trendChart: {
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
              // data: [1,1,1,1,1,1,1,1]
              data: [10, 12, 15, 20, 30, 40, 60, 90],
            },
          ],
          //[10,20,30,40,50,70,100,130],
          labels: ["1.0", "1,1", "1,2", "1.3", "1.4", "1.5", "2.0", "2.1"],
          // options:{
          //   scales:{
          //     y:{
          //       max:100
          //     }
          //   }
          // },
        },
      },

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
    bigLineChartCategories() {
      return this.$t("dashboard.chartCategories");
    },
  },
  methods: {
    initBigChart(index) {
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
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
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
