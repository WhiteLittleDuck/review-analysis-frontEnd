<template>
  <div class="row">
    <div class="col-md-8">
      <card>
        <h4 slot="header" class="title">Run New APP From Google Play Store</h4>
        <base-input
          label="APP ID"
          placeholder="APP ID in Google Play Store"
          v-model="model.id"
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
        <!-- <base-input
          label="Comment(Optional)"
          v-model="model.comment"
          placeholder="We will be so grateful if there is any suggestion for our tool :)"
        >
        </base-input> -->
        <base-button slot="footer" type="primary" fill @click="submit"
          >Submit</base-button
        >
      </card>
    </div>
    <div class="col-md-4">
      <card class="text-center">
        <h4 class="card-title">TIPS</h4>
        <blockquote class="blockquote mb-0">
          <p>
            According to the App name or App ID providen, it will cost some time
            for use to crawl down the reviews from Google Play Store and run NLP
            on our server. We will notify you from your email when the task is
            finished.
          </p>
          <footer class="blockquote-footer">
            White Little Duck <cite title="Source Title">SUSTECH</cite>
          </footer>
        </blockquote>
        <!-- <p class="card-text"> -->

        <!-- </p> -->
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
      </card>
    </div>
  </div>
</template>
<script>
// import EditProfileForm from "./Profile/EditProfileForm";
// import UserCard from "./Profile/UserCard";
import axios from "axios";

export default {
  methods: {
    submit() {
      if (this.model.id == "" || this.model.email == "") {
        alert("please input APP ID and Email!");
      } else {
        var that = this;
        axios
          .get("/api/new?id=" + that.model.id + "&order=" + that.model.email)
          .then(
            function (response) {
              if (response.data["meta"]["status"] == 200) {
                alert("success!");
                that.model.id = "";
                that.model.email = "";
                // that.tableData = response.data["data"]["info"];
              } else if (response.data["meta"]["status"] == 400) {
                alert("This App is already exist in our databse！");
                that.$router.push({
                  name: "icons",
                  params: { id: that.model.id },
                });
              } else {
                alert("Invalid App ID input!");
              }
            },
            function (err) {}
          );
      }
    },
  },
  components: {
    // EditProfileForm,
    // UserCard,
  },
  data() {
    return {
      model: {
        id: "",
        email: "",
      },
      user: {
        fullName: "Mike Andrew",
        title: "Ceo/Co-Founder",
        description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
      },
    };
  },
};
</script>
<style>
</style>
