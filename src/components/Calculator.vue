<template>
  <v-container>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6">
        <v-toolbar dense class="title"
          >Total Parenteral Nutrition (TPN) Calculator</v-toolbar
        >
        <v-toolbar dense class="title mt-2"
          >Created by Kevin Leung, RDN</v-toolbar
        >
        <v-card class="mt-2">
          <FormulateForm
            v-model="formValues"
            class="pa-2 ma-2"
            @submit="validateForm"
          >
            <v-row>
              <v-col>
                <FormulateInput
                  type="text"
                  v-model="patientInitials"
                  name="patientName"
                  label="Patient Initials (Optional)"
                  placeholder="Ex. JD"
                  class="my-3"
                />
              </v-col>
              <v-col>
                <FormulateInput
                  type="text"
                  name="weight"
                  label="Patient Weight (Kilograms)"
                  validation="required|number"
                  placeholder="Ex. 70 kg"
                  class="my-3"
                />
              </v-col>
            </v-row>
            <FormulateInput
              type="text"
              name="dextrose"
              label="Grams Dextrose (required)"
              validation="required|number|max:1000,value"
              placeholder="Ex. 150 grams..."
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="protein"
              label="Grams Protein (required)"
              validation="required|number|max:1000,value"
              placeholder="Ex. 100 grams..."
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="lipid"
              label="Grams Lipids (required)"
              validation="required|number|max:1000,value"
              placeholder="Ex. 50 grams..."
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="hours"
              label="TPN Duration (Hours)"
              validation="required|number|max:24,value"
              placeholder="Ex. 24 hours..."
              class="my-3"
            />
            <v-row>
              <v-col>
                <FormulateInput
                  type="submit"
                  label="Calculate"
                  id="submit-btn"
                  class="primary darken white--text py-2 my-3"
                  style="border-radius: 5px;"
                />
              </v-col>
              <v-col>
                <FormulateInput
                  type="button"
                  label="Reset"
                  id="reset-btn"
                  class="error darken-1 white--text py-2 my-3"
                  style="border-radius: 5px;"
                  @click="resetForm"
                />
              </v-col>
            </v-row>
          </FormulateForm>
        </v-card>
      </v-col>
      <v-col cols="3" />
    </v-row>

    <v-row>
      <v-col cols="3" />
      <v-col cols="6">
        <v-card v-if="isCalculated">
          <v-card-title>{{ patientCardTitle }}'s TPN Summary</v-card-title>
          <v-divider />
          <v-card-text>
            {{ patientCardTitle }} will be receiving a total of
            {{ totalCalories }} calories within a {{ formValues.hours }} hour
            duration. TPN will provide {{ caloriesPerKilogram }} kcals/kg,
            {{ proteinPerKilogram }} g/protein/kg, with a glomerular filtration
            rate (GFR) of {{ gfr }} mg/kg/hr.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Calculator",

  data: () => ({
    formValues: {},
    patientInitials: "",
    totalCalories: 0,
    gfr: 0,
    dextroseCalories: 0,
    proteinCalories: 0,
    lipidCalories: 0,
    isCalculated: false
  }),

  methods: {
    validateForm(data) {
      this.calculateMacronutrients(data);
      this.gfrCalculation(data);
    },

    calculateMacronutrients(macronutrients) {
      this.isCalculated = true;
      this.dextroseCalories = +macronutrients.dextrose * 3.4;
      this.proteinCalories = +macronutrients.protein * 4;
      this.lipidCalories = +macronutrients.lipid * 10;

      this.totalCalories = Math.floor(
        this.dextroseCalories + this.proteinCalories + this.lipidCalories
      );
    },

    gfrCalculation(data) {
      const tpnMinutes = +((data.hours * 60) / 1000);

      this.gfr = parseFloat(data.dextrose / data.weight / tpnMinutes).toFixed(
        2
      );
    },

    resetForm() {
      this.patientInitials = "";
      this.patientWeight = "";
      this.formValues = {};
      this.totalCalories = 0;
      this.gfr = 0;
      this.dextroseCalories = 0;
      this.proteinCalories = 0;
      this.lipidCalories = 0;
      this.isCalculated = false;
    }
  },

  computed: {
    patientCardTitle() {
      return this.patientInitials ? this.patientInitials : "Patient";
    },

    caloriesPerKilogram() {
      return +(this.totalCalories / this.formValues.weight).toFixed(2);
    },

    proteinPerKilogram() {
      return +(this.formValues.protein / this.formValues.weight).toFixed(2);
    }
  }
};
</script>

<style>
.formulate-input-element input {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 2px;
  width: 100%;
}
.formulate-input-error {
  color: #c62828;
}

.formulate-input-element button {
  width: 100%;
  font-weight: bold;
}
</style>
