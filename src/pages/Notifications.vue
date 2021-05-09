<template>
  <div class="row">
    <div class="col-md-8">
      <edit-profile-form :model="model"> </edit-profile-form>
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
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
export default {
  components: {
    EditProfileForm,
    UserCard,
  },
  data() {
    return {
      model: {
        company: "",
        email: "123@email.com",
        username: "michael23",
        firstName: "",
        lastName: "",
        address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
        city: "Melbourne",
        country: "Australia",
        about:
          "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.",
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
