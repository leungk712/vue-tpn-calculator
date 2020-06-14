<template>
  <v-app>
    <v-app-bar app color="blue-grey darken-2" dark>
      <div class="title">
        Total Parenteral Nutrition (TPN) Calculator
      </div>

      <v-spacer />

      <v-switch
        :prepend-icon="`brightness_5`"
        class="pt-4"
        :append-icon="`brightness_2`"
        v-model="$vuetify.theme.dark"
        inset
      />
    </v-app-bar>

    <v-content>
      <Calculator />
      <v-footer class="title py-4" color="blue-grey darken-2" absolute dark>
        Created by Kevin Leung, RDN - 2020
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import Calculator from "@/components/Calculator";
export default {
  name: "App",

  components: {
    Calculator
  },

  data: () => ({
    //
  }),

  computed: {}
};
</script>
