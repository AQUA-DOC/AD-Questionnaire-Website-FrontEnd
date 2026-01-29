<template>
  <div class="single-page">
    <div class="card">
      <h1>General Questionnaire</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 5</p>

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
          <input v-model.trim="form.name" type="text" placeholder="Jane Doe (Optional)" />
        </div>

        <div class="field small-row">
          <label>How long have you worked for AQUA DOC?</label>
          <input
            v-model.trim="form.tenure"
            type="text"
            placeholder="Example: 6 months, 2 years, since 2019, etc."
          />
        </div>

        <div class="field small-row">
          <label>Position:</label>
          <input v-model.trim="form.position" type="text" placeholder="Example: Client Care Specialist" />
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

      <!-- VIEW 2 -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>When you first started, what was hardest to learn?</label>
          <textarea
            v-model.trim="form.hardestToLearn"
            rows="4"
            placeholder="What took the longest to figure out or was most confusing at first?"
          />
        </div>

        <div class="field">
          <label>Is there training or guidance you wish you had today that is not available?</label>
          <textarea
            v-model.trim="form.trainingWishHad"
            rows="4"
            placeholder="What training would help you (or new hires) be more effective?"
          />
        </div>

        <div class="field">
          <label>When you have a question or problem, how easy is it to get help?</label>
          <textarea
            v-model.trim="form.helpEase"
            rows="4"
            placeholder="Who do you go to? Is it fast? Are answers consistent?"
          />
        </div>
      </div>

      <!-- VIEW 3 (RealGreen) -->
      <div v-else-if="step === 3" class="form">
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
          <label>What information would you want to be aware of if it exists on a customers account?</label>
          <textarea
            v-model.trim="form.accountInfoToKnow"
            rows="5"
            placeholder="Example: special instructions, preferences, past issues, access constraints, billing flags, etc."
          />
        </div>

        <div class="field">
          <label>From your perspective, how could AQUA DOC provide a better customer experience?</label>
          <textarea
            v-model.trim="form.betterCustomerExperience"
            rows="4"
            placeholder="What changes would have the biggest impact?"
          />
        </div>
      </div>

      <!-- VIEW 4 -->
      <div v-else-if="step === 4" class="form">
        <div class="field">
          <label>If you could change one thing that would make your job easier, what would it be?</label>
          <textarea
            v-model.trim="form.oneChangeToMakeEasier"
            rows="4"
            placeholder="If you could fix one thing tomorrow, what would it be?"
          />
        </div>

        <div class="field">
          <label>Is there anything that feels unnecessarily complicated or repetitive?</label>
          <textarea
            v-model.trim="form.complicatedOrRepetitive"
            rows="4"
            placeholder="What tasks feel like they have too many steps or repeated effort?"
          />
        </div>

        <div class="field">
          <label>Is there anything you think management should be more aware of?</label>
          <textarea
            v-model.trim="form.managementAwareness"
            rows="4"
            placeholder="Risks, bottlenecks, customer patterns, staffing issues, process gaps, etc."
          />
        </div>
      </div>

      <!-- VIEW 5 -->
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
          v-if="step < 5"
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
  name: "general-questionnaire-page",
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
        position: "",
        positionFocus: "",

        // Page 2
        hardestToLearn: "",
        trainingWishHad: "",
        helpEase: "",

        // Page 3 (RealGreen)
        realGreenUseful: "",
        realGreenFrustrations: "",
        realGreenMissing: "",
        accountInfoToKnow: "",
        betterCustomerExperience: "",

        // Page 4
        oneChangeToMakeEasier: "",
        complicatedOrRepetitive: "",
        managementAwareness: "",

        // Page 5
        meetInPerson: "false",
        meetInPersonDetails: "",
        otherInput: "",

        messageType: "general-questionnaire",
      },
    };
  },

  computed: {
    canGoNext() {
      if (this.step === 1) {
        // name is optional
        return (
          this.form.tenure.length > 0 &&
          this.form.position.length > 0 &&
          this.form.positionFocus.length > 0
        );
      }

      if (this.step === 2) {
        return (
          this.form.hardestToLearn.length > 0 &&
          this.form.trainingWishHad.length > 0 &&
          this.form.helpEase.length > 0
        );
      }

      if (this.step === 3) {
        return (
          this.form.realGreenUseful.length > 0 &&
          this.form.realGreenFrustrations.length > 0 &&
          this.form.realGreenMissing.length > 0 &&
          this.form.accountInfoToKnow.length > 0 &&
          this.form.betterCustomerExperience.length > 0
        );
      }

      if (this.step === 4) {
        return (
          this.form.oneChangeToMakeEasier.length > 0 &&
          this.form.complicatedOrRepetitive.length > 0 &&
          this.form.managementAwareness.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const meetDetailsOk =
        this.form.meetInPerson === "false" ||
        this.form.meetInPersonDetails.trim().length > 0;

      return (
        // Step 1 (name optional)
        this.form.tenure.length > 0 &&
        this.form.position.length > 0 &&
        this.form.positionFocus.length > 0 &&
        // Step 2
        this.form.hardestToLearn.length > 0 &&
        this.form.trainingWishHad.length > 0 &&
        this.form.helpEase.length > 0 &&
        // Step 3
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenMissing.length > 0 &&
        this.form.accountInfoToKnow.length > 0 &&
        this.form.betterCustomerExperience.length > 0 &&
        // Step 4
        this.form.oneChangeToMakeEasier.length > 0 &&
        this.form.complicatedOrRepetitive.length > 0 &&
        this.form.managementAwareness.length > 0 &&
        // Step 5
        this.form.meetInPerson.length > 0 &&
        meetDetailsOk
        // otherInput optional
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
      this.step = Math.min(5, this.step + 1);
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
        position: "",
        positionFocus: "",

        hardestToLearn: "",
        trainingWishHad: "",
        helpEase: "",

        realGreenUseful: "",
        realGreenFrustrations: "",
        realGreenMissing: "",
        accountInfoToKnow: "",
        betterCustomerExperience: "",

        oneChangeToMakeEasier: "",
        complicatedOrRepetitive: "",
        managementAwareness: "",

        meetInPerson: "false",
        meetInPersonDetails: "",
        otherInput: "",

        messageType: "general-questionnaire",
      };
    },
  },
};
</script>

<style>
/* Reuse your shared form.css. Keep page-specific overrides only if needed. */
</style>