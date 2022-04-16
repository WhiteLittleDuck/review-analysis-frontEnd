<template>
  <div class="row" >
        <div class="col-lg-12">
          <card>
            <div class = "row">
              <div class = "col-lg-10">
                <h4><a href="#/icons" @click="search" class="card-link text-info">{{title}}</a> </h4>
                <p class="card-text">App Id: {{appId}}</p>
                <p class="card-text">Released Time: {{released}}</p>

                <p class="card-text">Develper: {{developer}}</p>
                <p class="card-text">Develper Email: {{developerEmail}}</p>
                <a :href="url">Google Play: {{url}}</a>
              </div>
              <div class = "col-lg-2">
                  <img slot="image" class="card-img-top" :src="icon" alt="Card image cap"/>
              </div>
            </div>
          </card>
        </div>
  </div> 
</template>


<script>
import config from "@/config";
  export default {
    name: 'AppCard',
    props: {
      title: {
        type: String,
        description: "App name"
      },
      appId: {
        type: String,
        description: "App Id"
      },
      icon: {
        type: String,
        description: "icon url"
      },
      developer: {
        type: String,
        description: "developer name"
      },
      url: {
        type: String,
        description: "google Play url"
      },
      developerEmail: {
        type: String,
        description: "developer email"
      },
      released:{
        type: String,
        description: "released time"
      }
    },

    data(){
      list=[1,2,3]
    },
    methods:{
      search(){
//        this.$parent.getAppInfo(this.appId);
        this.$emit("toFater", this.appId)
        console.log("child finished")
      }
    }
  }
</script>
