<template>
  <v-container>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6">
        <v-toolbar dense class="title"
          >Total Parenteral Nutrition (TPN) Calculator</v-toolbar
        >
        <v-toolbar dense class="title">Created by Kevin Leung, RDN</v-toolbar>
        <v-card class="mt-2">
          <FormulateForm
            v-model="formValues"
            class="pa-2 ma-2"
            @submit="validateForm"
          >
            <FormulateInput
              type="text"
              v-model="patientInitials"
              name="patientName"
              label="Patient Initials"
              placeholder="Ex. JD"
              class="my-3"
            />
            <FormulateInput
              type="text"
              v-model="patientWeight"
              name="patient weight"
              label="Patient Weight (Kilograms)"
              validation="required|number"
              placeholder="Ex. 70 kg"
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="dextrose grams"
              label="Grams Dextrose (required)"
              validation="required|number"
              placeholder="Ex. 150 grams..."
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="protein grams"
              label="Grams Protein (required)"
              validation="required|number"
              placeholder="Ex. 100 grams..."
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="lipid grams"
              label="Grams Lipids (required)"
              validation="required|number"
              placeholder="Ex. 50 grams..."
              class="my-3"
            />
            <FormulateInput
              type="submit"
              label="Calculate"
              id="submit-btn"
              class="purple lighten-1 white--text py-2 my-3"
              style="border-radius: 5px;"
            />
          </FormulateForm>
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
    patientWeight: "",
  }),

  methods: {
    validateForm(data) {
      alert("data", data);
    },
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
