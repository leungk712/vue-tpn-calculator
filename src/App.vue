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
