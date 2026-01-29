<template>
  <div class="single-page">
    <div class="card">
      <h1>Waterscapes Team Questions</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 6</p>

      <!-- Success Popup -->
      <div v-if="showSuccess" class="">
        <div class="">
          <h2>✅ Submitted</h2>
          <p>Thanks! Your responses have been submitted.</p>
          <p>I’ll review your answers and follow up to schedule a one-on-one discussion if needed.</p>
        </div>
      </div>

      <!-- VIEW 1 -->
      <div v-if="step === 1" class="form">
        <div class="field-row small-row">
          <label>Name:</label>
          <input v-model.trim="form.name" type="text" placeholder="Jane Doe" />
        </div>

        <div class="field small-row">
          <label>How long have you worked for AQUA DOC?</label>
          <input
            v-model.trim="form.tenure"
            type="text"
            placeholder="Example: 6 months, 2 years, since 2019, etc."
          />
        </div>

        <div class="field">
          <label>In your own words, what is the focus of your position?</label>
          <textarea
            v-model.trim="form.positionFocus"
            rows="4"
            placeholder="What do you feel your role is responsible for?"
          />
        </div>
      </div>

      <!-- VIEW 2 (Systems) -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>
            What types of water features do you work with most often?
          </label>
          <textarea
            v-model.trim="form.featureTypes"
            rows="5"
            placeholder="Small waterfalls, Pondless systems, Koi ponds, etc."
          />
        </div>

        <div class="field">
          <label>
            What are the most common issues you see with these features after installation?
          </label>
          <textarea
            v-model.trim="form.commonPostInstallIssues"
            rows="5"
            placeholder="Example: leaks, flow issues, algae, plant health, etc."
          />
        </div>

        <div class="field">
          <label>
            Do any of these issues tend to occur at regular intervals or seasons?
          </label>
          <textarea
            v-model.trim="form.seasonalIssues"
            rows="5"
            placeholder="Example: spring start-up, summer algae, fall debris, winter damage, etc."
          />
        </div>
      </div>

      <!-- VIEW 3 (Plants) -->
      <div v-else-if="step === 3" class="form">
        <div class="field">
          <label>How often do you care for or install plants in or around water features?</label>
          <textarea
            v-model.trim="form.plantsFrequency"
            rows="4"
            placeholder="How often?"
          />
        </div>

        <div class="field">
          <label>
            What plant-related issues come up most frequently?
          </label>
          <textarea
            v-model.trim="form.plantIssues"
            rows="5"
            placeholder="Poor growth, Plant loss, Invasiveness, Seasonal die-off, etc."
          />
        </div>

        <div class="field">
          <label>Is there plant or biological information you wish was easier to reference?</label>
          <textarea
            v-model.trim="form.bioInfoWishEasier"
            rows="4"
            placeholder="Species guidance, planting timing, compatibility, treatment notes, etc."
          />
        </div>
      </div>

      <!-- VIEW 4 (General) -->
      <div v-else-if="step === 4" class="form">
        <div class="field">
          <label>
            Are there items that are frequently missed or underestimated in waterscape quotes?
          </label>
          <textarea
            v-model.trim="form.quoteMisses"
            rows="6"
            placeholder="Labor, Rock / material quantity, Material costs, Access / prep work, Tear-out / repairs, etc."
          />
        </div>

        <div class="field">
          <label>
            What site conditions most often complicate waterscape work?
          </label>
          <textarea
            v-model.trim="form.siteConditions"
            rows="5"
            placeholder="What conditions cause delays, rework, cost overruns, or scheduling issues?"
          />
        </div>

        <div class="field">
          <label>What information do you wish was always confirmed before a waterscape job is scheduled?</label>
          <textarea
            v-model.trim="form.preScheduleInfo"
            rows="5"
            placeholder="Example: access, utilities marked, drainage plan, materials confirmed, client expectations, approvals, etc."
          />
        </div>
      </div>

      <!-- VIEW 5 (RealGreen) -->
      <div v-else-if="step === 5" class="form">
        <div class="field">
          <label>In your opinion, what are the most useful parts of RealGreen today?</label>
          <textarea
            v-model.trim="form.realGreenUseful"
            rows="4"
            placeholder="What do you rely on most?"
          />
        </div>

        <div class="field">
          <label>What parts of RealGreen slow your team down or cause frustration today?</label>
          <textarea
            v-model.trim="form.realGreenFrustrations"
            rows="4"
            placeholder="What feels clunky, slow, confusing, repetitive, or error-prone?"
          />
        </div>

        <div class="field">
          <label>
            Please name a few things RealGreen is not able to do today that you would like to be able to do tomorrow?
          </label>
          <textarea
            v-model.trim="form.realGreenMissing"
            rows="5"
            placeholder="List items (or as many as you can)."
          />
        </div>

        <div class="field">
          <label>From your perspective, how could the waterscape team provide a better customer experience?</label>
          <textarea
            v-model.trim="form.waterscapesBetterExperience"
            rows="4"
            placeholder="What changes would improve speed, clarity, trust, or satisfaction?"
          />
        </div>
      </div>

      <!-- VIEW 6 -->
      <div v-else class="form">
        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>Would you like to meet in person to go over anything specific?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="true" v-model="form.meetInPerson" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" v-model="form.meetInPerson" />
              No
            </label>
          </div>

          <textarea
            v-if="form.meetInPerson === 'true'"
            v-model.trim="form.meetInPersonDetails"
            rows="4"
            placeholder="If yes, what topics would you like to cover?"
          />
        </div>

        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>Do you have any other input, requests, or ideas for the new system?</label>
          <textarea
            v-model.trim="form.otherInput"
            rows="5"
            placeholder="Optional: anything else we should know."
          />
        </div>
      </div>

      <!-- BUTTONS -->
      <div class="actions">
        <button v-if="step > 1" class="btn secondary" @click="prevStep">Back</button>

        <button
          v-if="step < 6"
          class="btn primary"
          @click="nextStep"
          :disabled="!canGoNext"
        >
          Next
        </button>

        <button
          v-else
          class="btn primary"
          @click="submit"
          :disabled="!canSubmit || submitting"
        >
          {{ submitting ? "Submit" : "Submit" }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { submitReportRequest } from "../services/submitService";

export default {
  name: "waterscapes-team-questions-page",
  props: [],

  data() {
    return {
      step: 1,
      error: "",
      showSuccess: false,
      submitting: false,
      form: {
        // Page 1
        name: "",
        tenure: "",
        positionFocus: "",

        // Page 2 (Systems)
        featureTypes: "",
        commonPostInstallIssues: "",
        seasonalIssues: "",

        // Page 3 (Plants)
        plantsFrequency: "",
        plantIssues: "",
        bioInfoWishEasier: "",

        // Page 4 (General)
        quoteMisses: "",
        siteConditions: "",
        preScheduleInfo: "",

        // Page 5 (RealGreen)
        realGreenUseful: "",
        realGreenFrustrations: "",
        realGreenMissing: "",
        waterscapesBetterExperience: "",

        // Page 6
        meetInPerson: "false",
        meetInPersonDetails: "",
        otherInput: "",

        messageType: "waterscapes-team-questions",
      },
    };
  },

  computed: {
    canGoNext() {
      if (this.step === 1) {
        return (
          this.form.name.length > 0 &&
          this.form.tenure.length > 0 &&
          this.form.positionFocus.length > 0
        );
      }

      if (this.step === 2) {
        return (
          this.form.featureTypes.length > 0 &&
          this.form.commonPostInstallIssues.length > 0 &&
          this.form.seasonalIssues.length > 0
        );
      }

      if (this.step === 3) {
        return (
          this.form.plantsFrequency.length > 0 &&
          this.form.plantIssues.length > 0 &&
          this.form.bioInfoWishEasier.length > 0
        );
      }

      if (this.step === 4) {
        return (
          this.form.quoteMisses.length > 0 &&
          this.form.siteConditions.length > 0 &&
          this.form.preScheduleInfo.length > 0
        );
      }

      if (this.step === 5) {
        return (
          this.form.realGreenUseful.length > 0 &&
          this.form.realGreenFrustrations.length > 0 &&
          this.form.realGreenMissing.length > 0 &&
          this.form.waterscapesBetterExperience.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const meetDetailsOk =
        this.form.meetInPerson === "false" ||
        this.form.meetInPersonDetails.trim().length > 0;

      return (
        // Step 1
        this.form.name.length > 0 &&
        this.form.tenure.length > 0 &&
        this.form.positionFocus.length > 0 &&
        // Step 2
        this.form.featureTypes.length > 0 &&
        this.form.commonPostInstallIssues.length > 0 &&
        this.form.seasonalIssues.length > 0 &&
        // Step 3
        this.form.plantsFrequency.length > 0 &&
        this.form.plantIssues.length > 0 &&
        this.form.bioInfoWishEasier.length > 0 &&
        // Step 4
        this.form.quoteMisses.length > 0 &&
        this.form.siteConditions.length > 0 &&
        this.form.preScheduleInfo.length > 0 &&
        // Step 5
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenMissing.length > 0 &&
        this.form.waterscapesBetterExperience.length > 0 &&
        // Step 6
        this.form.meetInPerson.length > 0 &&
        meetDetailsOk
        // otherInput is optional
      );
    },
  },

  methods: {
    nextStep() {
      this.error = "";
      if (!this.canGoNext) {
        this.error = "Please fill out the required fields before continuing.";
        return;
      }
      this.step = Math.min(6, this.step + 1);
    },

    prevStep() {
      this.error = "";
      this.step = Math.max(1, this.step - 1);
    },

    submit() {
      if (this.submitting) return; // hard guard

      this.error = "";
      if (!this.canSubmit) {
        this.error = "Please complete the required fields before submitting.";
        return;
      }

      this.submitting = true; // lock immediately

      const payload = {
        ...this.form,
        submittedAt: new Date().toISOString(),
      };

      console.log(payload);

      submitReportRequest(payload)
        .then((status) => {
          if (status == 200) {
            this.showSuccess = true;

            setTimeout(() => {
              this.showSuccess = false;
              this.resetForm();
            }, 7000);
          } else {
            alert(
              "Looks like you found a problem, please let me know how you did it! - Connor"
            );
          }
        })
        .catch((err) => {
          console.error("Submit failed:", err);
          this.error = "Unable to submit responses. Please try again later.";
        })
        .finally(() => {
          setTimeout(() => {
            this.submitting = false;
          }, 7000); // unlock after success message duration
        });
    },

    resetForm() {
      this.step = 1;
      this.error = "";
      this.form = {
        name: "",
        tenure: "",
        positionFocus: "",

        featureTypes: "",
        commonPostInstallIssues: "",
        seasonalIssues: "",

        plantsFrequency: "",
        plantIssues: "",
        bioInfoWishEasier: "",

        quoteMisses: "",
        siteConditions: "",
        preScheduleInfo: "",

        realGreenUseful: "",
        realGreenFrustrations: "",
        realGreenMissing: "",
        waterscapesBetterExperience: "",

        meetInPerson: "false",
        meetInPersonDetails: "",
        otherInput: "",

        messageType: "waterscapes-team-questions",
      };
    },
  },
};
</script>

<style>
/* Reuse your shared form.css. Keep page-specific overrides only if needed. */
.field label ul {
  margin: 6px 0 0 18px;
  padding: 0;
}
.field label li {
  margin: 2px 0;
}
</style>