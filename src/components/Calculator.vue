<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-toolbar dense class="title">
            Total Parenteral Nutrition (TPN) Calculator
          </v-toolbar>

          <v-card class="mt-4">
            <v-alert :value="true" type="warning">
              TPN Calculations are based off a Dextrose 70% Stock Solution, 10%
              Amino Acid Stock Solution, and 20% Lipid Stock Solution. Please
              double check your work for any errors.
            </v-alert>

            <FormulateForm
              v-model="formValues"
              class="pa-2 mx-2"
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
                label="Grams Dextrose (required) / (70% Stock Solution)"
                validation="required|number|max:1000,value"
                placeholder="Ex. 150 grams..."
                class="my-3"
              />
              <FormulateInput
                type="text"
                name="protein"
                label="Grams Protein (required) / (10% Stock Solution)"
                validation="required|number|max:1000,value"
                placeholder="Ex. 100 grams..."
                class="my-3"
              />
              <FormulateInput
                type="text"
                name="lipid"
                label="Grams Lipids (required) / (20% Stock Solution)"
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

            <v-card-text class="title">
              {{ patientCardTitle }} will be receiving a total of
              {{ formatNumber(totalCalories) }} calories within a
              {{ formValues.hours }} hour duration. TPN will provide
              {{ caloriesPerKilogram }} kcals/kg,
              {{ proteinPerKilogram }} g/protein/kg, with a glomerular
              filtration rate (GFR) of {{ gfr }} mg/kg/hr.
            </v-card-text>

            <apexchart
              :series="macroOptions.series"
              :options="macroOptions"
              width="100%"
              height="500"
            />
          </v-card>
        </v-col>
        <v-col cols="3" />
      </v-row>

      <v-row>
        <v-col cols="3" />
        <v-col cols="6">
          <v-card v-if="isCalculated">
            <v-card-title
              >{{ patientCardTitle }}'s TPN Calculations</v-card-title
            >
            <v-divider />

            <v-card-text class="title">
              <div>
                Dextrose: {{ formValues.dextrose }} grams x 3.4 kcals/gram =
                {{ dextrose.calories }} calories.
              </div>
              <div>
                Protein: {{ formValues.protein }} grams x 4 kcals/gram =
                {{ protein.calories }} calories.
              </div>
              <div>
                Lipid: {{ formValues.lipid }} grams x 10 kcals/gram =
                {{ lipid.calories }} calories.
              </div>
              <v-divider />
              <div>Total: {{ totalCalories }} calories.</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Calculator",

  data: () => ({
    formValues: {},
    patientInitials: "",
    totalCalories: 0,
    gfr: 0,
    dextrose: {
      calories: 0
    },
    protein: {
      calories: 0
    },
    lipid: {
      calories: 0
    },
    isCalculated: false
  }),

  methods: {
    validateForm(data) {
      this.calculateMacronutrients(data);
      this.gfrCalculation(data);
    },

    calculateMacronutrients(macronutrients) {
      this.isCalculated = true;
      this.dextrose.calories = +macronutrients.dextrose * 3.4;
      this.protein.calories = +macronutrients.protein * 4;
      this.lipid.calories = +macronutrients.lipid * 10;

      this.totalCalories = Math.floor(
        this.dextrose.calories + this.protein.calories + this.lipid.calories
      );
    },

    gfrCalculation(data) {
      const tpnMinutes = +((data.hours * 60) / 1000);

      this.gfr = parseFloat(data.dextrose / data.weight / tpnMinutes).toFixed(
        2
      );
    },

    formatNumber(totalCalories) {
      if (totalCalories > 1000) {
        return totalCalories
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      } else {
        return totalCalories;
      }
    },

    resetForm() {
      this.patientInitials = "";
      this.formValues = {};
      this.totalCalories = 0;
      this.gfr = 0;
      this.dextrose.calories = 0;
      this.protein.calories = 0;
      this.lipid.calories = 0;
      this.isCalculated = false;
    }
  },

  computed: {
    patientCardTitle() {
      return this.patientInitials ? this.patientInitials : "Patient";
    },

    caloriesPerKilogram() {
      return +(this.totalCalories / this.formValues.weight).toFixed(1);
    },

    proteinPerKilogram() {
      return +(this.formValues.protein / this.formValues.weight).toFixed(2);
    },

    macroOptions() {
      return {
        series: [
          this.dextrose.calories,
          this.protein.calories,
          this.lipid.calories
        ],
        labels: ["Dextrose", "Protein", "Lipid"],
        chart: {
          type: "donut",
          height: "500"
        },
        dataLabels: {
          enabled: true
        }
      };
    }
  }
};
</script>

<style>
.formulate-input-label {
  font-weight: bold;
}

.formulate-input-element input {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 2px;
  width: 100%;
  height: 100%;
}
.formulate-input-error {
  color: #c62828;
}

.formulate-input[data-is-showing-errors="true"]
  .formulate-input-wrapper
  .formulate-input-element {
  border: 1px solid #c62828;
  border-radius: 6px;
}

.formulate-input-wrapper {
  height: 100%;
}

.formulate-input-element button {
  width: 100%;
  font-weight: bold;
}
</style>
