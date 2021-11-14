<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout justify-center>
        <v-flex xs10 sm8 md4 lg4 xl4>
          <NpmPackageForm @getDependenciesTree="processTree" />

          <v-divider class="my-10"></v-divider>

          <div class="d-flex justify-center">
            <v-treeview
              v-if="items.length > 0"
              :items="items"
              item-children="dependencies"
            ></v-treeview>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import NpmPackageForm from "./components/NpmPackageForm";

export default {
  name: "App",

  components: {
    NpmPackageForm,
  },

  data: () => ({
    items: [],
  }),
  methods: {
    processTree(dependenciesTree) {
      this.items.push(dependenciesTree);
    },
  },
};
</script>
