<template>
  <v-container>
    <v-row>
      <v-col cols="2" style="border: 2px solid black" />
      <v-col cols="8" style="border: 2px solid black">
        <v-toolbar dense class="title"
          >Total Parenteral Nutrition (TPN) Calculator</v-toolbar
        >
        <v-toolbar dense class="title">Created by Kevin Leung, RDN</v-toolbar>
        <v-card class="mt-2">
          <FormulateForm class="pa-2 ma-2">
            <FormulateInput
              type="text"
              name="patientName"
              label="Patient Initials"
              placeholder="Ex. J.D."
              class="my-3"
            />
            <FormulateInput
              type="number"
              name="patient weight"
              label="Patient Weight (Kilograms)"
              validation="required|number"
              placeholder="70 kg"
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="dextrose grams"
              label="Grams Dextrose"
              validation="required|number"
              placeholder="150 grams"
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="protein grams"
              label="Grams Protein"
              validation="required|number"
              placeholder="100 grams"
              class="my-3"
            />
            <FormulateInput
              type="text"
              name="lipid grams"
              label="Grams Lipids"
              validation="required|number"
              placeholder="50 grams"
              class="my-3"
            />
          </FormulateForm>
        </v-card>
      </v-col>
      <v-col cols="2" style="border: 2px solid black" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Calculator",

  data: () => ({}),

  methods: {}
};
</script>
