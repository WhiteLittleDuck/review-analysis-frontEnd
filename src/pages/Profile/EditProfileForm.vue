<template>
  <card>
    <h4 slot="header" class="title">Run New APP From Google Play Store</h4>

    <!-- <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="First Name"
          v-model="model.firstName"
          placeholder="First Name"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Last Name"
          v-model="model.lastName"
          placeholder="Last Name"
        >
        </base-input>
      </div>
    </div> -->
    <base-input
      label="APP ID in Google Play Store"
      placeholder="Wechat"
      v-model="model.company"
    >
    </base-input>


    <div class="row">
      <div class="col-md-12">
        <base-input
          label="Email(MUST)"
          v-model="model.email"
          placeholder="Your Email Address"
        >
        </base-input>
      </div>
    </div>
        <base-input
          label="Comment(Optional)"
          v-model="model.lastName"
          placeholder="We will be so grateful if there is any suggestion for our tool :)"
        >
        </base-input>
    <base-button slot="footer" type="primary" fill>Submit</base-button>
  </card>
</template>
<script>
export default {
  methods:{
    submit(){
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
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style>
</style>
