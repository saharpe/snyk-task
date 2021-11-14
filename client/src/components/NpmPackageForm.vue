<template>
  <v-card class="text-center mt-10" elevation="8">
    <v-card-title class="primary mb-6">
      <h3 class="mx-auto white--text font-weight-light">
        NPM Package Dependencies Tree Builder
      </h3>
    </v-card-title>

    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="login">
        <v-text-field
          outlined
          label="name"
          type="text"
          :rules="rules"
          required
          v-model="packageNameInput"
        ></v-text-field>

        <v-text-field
          outlined
          label="version"
          type="text"
          :rules="rules"
          required
          v-model="packageVersionInput"
        ></v-text-field>

        <v-btn
          :disabled="!isValid"
          :loading="isLoading"
          @click="getTreeData"
          x-large
          color="primary"
          class="white--text"
          >Build!</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "NpmPackageForm",
  data: () => ({
    rules: [(v) => !!v || "Required field!"],
    isValid: false,
    isLoading: false,
    packageNameInput: "",
    packageVersionInput: "",
  }),
  methods: {
    async getTreeData() {
      try {
        this.isLoading = true;
        const targetUrl = `http://localhost:3000/package/${this.packageNameInput}/${this.packageVersionInput}`;
        const { data } = await axios.get(targetUrl);

        // Pass data to parent component
        this.$emit("getDependenciesTree", data);
      } catch (err) {
        alert("Something went wrong, couldn't get package data");
        console.log(err.response);
      }

      this.isLoading = false;
    },
  },
};
</script>