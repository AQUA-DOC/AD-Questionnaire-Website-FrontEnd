<template>
  <div class="single-page">
    <div class="card">
      <h1>Client Care Specialist Questions</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 5</p>

      <!-- Success Popup -->
      <div v-if="showSuccess" class="">
        <div class="">
          <h2>✅ Submitted</h2>
          <p>
            Thanks! Your responses have been submitted.
          </p>
          <p>
            I’ll review your answers and follow up to schedule a one-on-one discussion if needed.
          </p>
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

      <!-- VIEW 2 (Customer Calls) -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>What is the most common reason a client calls the office?</label>
          <textarea
            v-model.trim="form.mostCommonCallReason"
            rows="4"
            placeholder="Example: billing, service questions, scheduling, complaints, etc."
          />
        </div>

        <div class="field">
          <label>What are some other reasons clients call the office?</label>
          <textarea
            v-model.trim="form.otherCallReasons"
            rows="4"
            placeholder="List other frequent call topics."
          />
        </div>

        <div class="field">
          <label>What are some client questions you are NOT able to answer yourself?</label>
          <textarea
            v-model.trim="form.questionsCantAnswer"
            rows="4"
            placeholder="What questions require escalation or extra research?"
          />
        </div>
      </div>

      <!-- VIEW 3 (New Customers) -->
      <div v-else-if="step === 3" class="form">
        <div class="field">
          <label>When someone who isn't an existing customer calls, what information do you need from them?</label>
          <textarea
            v-model.trim="form.newCustomerInfoNeeded"
            rows="5"
            placeholder="Contact info, address, waterbody details, goals, urgency, etc."
          />
        </div>

        <div class="field">
          <label>What questions do you ask about the service being requested?</label>
          <textarea
            v-model.trim="form.serviceQuestionsAsked"
            rows="5"
            placeholder="What do you ask to understand what they need and route it correctly?"
          />
        </div>

        <div class="field">
          <label>Are you able to schedule the consultation before hanging up with the customer?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="true" v-model="form.canScheduleConsultation" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" v-model="form.canScheduleConsultation" />
              No
            </label>
          </div>

          <textarea
            v-if="form.canScheduleConsultation === 'false'"
            v-model.trim="form.consultationSchedulingBlockers"
            rows="4"
            placeholder="If no, what prevents it? (availability, process, info missing, tools, etc.)"
          />
        </div>
      </div>

      <!-- VIEW 4 (RealGreen) -->
      <div v-else-if="step === 4" class="form">
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
            placeholder="Example: special instructions, preferences, past issues, pets, access constraints, etc."
          />
        </div>

        <div class="field">
          <label>From your perspective, how could the client care team provide a better customer experience?</label>
          <textarea
            v-model.trim="form.clientCareBetterExperience"
            rows="4"
            placeholder="What changes would improve speed, clarity, trust, or satisfaction?"
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
        <button v-if="step > 1" class="btn secondary" @click="prevStep">
          Back
        </button>

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
import { submitReportRequest } from '../services/submitService';

export default {
  name: 'client-care-questions-page',
  props: [],

  data() {
    return {
      step: 1,
      error: '',
      showSuccess: false,
      submitting: false,
      form: {
        // Page 1
        name: '',
        tenure: '',
        positionFocus: '',

        // Page 2 (Customer Calls)
        mostCommonCallReason: '',
        otherCallReasons: '',
        questionsCantAnswer: '',

        // Page 3 (New Customers)
        newCustomerInfoNeeded: '',
        serviceQuestionsAsked: '',
        canScheduleConsultation: 'false',
        consultationSchedulingBlockers: '',

        // Page 4 (RealGreen)
        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',
        accountInfoToKnow: '',
        clientCareBetterExperience: '',

        // Page 5
        meetInPerson: 'false',
        meetInPersonDetails: '',
        otherInput: '',

        messageType: 'client-care-questions',
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
          this.form.mostCommonCallReason.length > 0 &&
          this.form.otherCallReasons.length > 0 &&
          this.form.questionsCantAnswer.length > 0
        );
      }

      if (this.step === 3) {
        const blockersOk =
          this.form.canScheduleConsultation === 'true' ||
          this.form.consultationSchedulingBlockers.trim().length > 0;

        return (
          this.form.newCustomerInfoNeeded.length > 0 &&
          this.form.serviceQuestionsAsked.length > 0 &&
          this.form.canScheduleConsultation.length > 0 &&
          blockersOk
        );
      }

      if (this.step === 4) {
        return (
          this.form.realGreenUseful.length > 0 &&
          this.form.realGreenFrustrations.length > 0 &&
          this.form.realGreenMissing.length > 0 &&
          this.form.accountInfoToKnow.length > 0 &&
          this.form.clientCareBetterExperience.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const blockersOk =
        this.form.canScheduleConsultation === 'true' ||
        this.form.consultationSchedulingBlockers.trim().length > 0;

      const meetDetailsOk =
        this.form.meetInPerson === 'false' || this.form.meetInPersonDetails.trim().length > 0;

      return (
        // Step 1
        this.form.name.length > 0 &&
        this.form.tenure.length > 0 &&
        this.form.positionFocus.length > 0 &&
        // Step 2
        this.form.mostCommonCallReason.length > 0 &&
        this.form.otherCallReasons.length > 0 &&
        this.form.questionsCantAnswer.length > 0 &&
        // Step 3
        this.form.newCustomerInfoNeeded.length > 0 &&
        this.form.serviceQuestionsAsked.length > 0 &&
        blockersOk &&
        // Step 4
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenMissing.length > 0 &&
        this.form.accountInfoToKnow.length > 0 &&
        this.form.clientCareBetterExperience.length > 0 &&
        // Step 5
        this.form.meetInPerson.length > 0 &&
        meetDetailsOk
        // otherInput is optional
      );
    },
  },

  methods: {
    nextStep() {
      this.error = '';
      if (!this.canGoNext) {
        this.error = 'Please fill out the required fields before continuing.';
        return;
      }
      this.step = Math.min(5, this.step + 1);
    },

    prevStep() {
      this.error = '';
      this.step = Math.max(1, this.step - 1);
    },

    submit() {
      if (this.submitting) return; // hard guard

      this.error = '';
      if (!this.canSubmit) {
        this.error = 'Please complete the required fields before submitting.';
        return;
      }

      this.submitting = true; // lock immediately

      const payload = {
        ...this.form,
        submittedAt: new Date().toISOString(),
      };

      console.log(payload);

      submitReportRequest(payload)
        .then(status => {
          if (status == 200) {
            this.showSuccess = true;

            setTimeout(() => {
              this.showSuccess = false;
              this.resetForm();
            }, 7000);
          } else {
            alert("Looks like you found a problem, please let me know how you did it! - Connor");
          }
        })
        .catch(err => {
          console.error('Submit failed:', err);
          this.error = 'Unable to submit responses. Please try again later.';
        })
        .finally(() => {
          setTimeout(() => {
            this.submitting = false;
          }, 7000); // unlock after success message duration
        });
    },

    resetForm() {
      this.step = 1;
      this.error = '';
      this.form = {
        name: '',
        tenure: '',
        positionFocus: '',

        mostCommonCallReason: '',
        otherCallReasons: '',
        questionsCantAnswer: '',

        newCustomerInfoNeeded: '',
        serviceQuestionsAsked: '',
        canScheduleConsultation: 'false',
        consultationSchedulingBlockers: '',

        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',
        accountInfoToKnow: '',
        clientCareBetterExperience: '',

        meetInPerson: 'false',
        meetInPersonDetails: '',
        otherInput: '',

        messageType: 'client-care-questions',
      };
    },
  },
};
</script>

<style>
/* Reuse your shared form.css. Keep page-specific overrides only if needed. */
</style>