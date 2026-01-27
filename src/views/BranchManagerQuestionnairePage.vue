<template>
  <div class="single-page">
    <div class="card">
      <h1>Branch Manager Questions</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 6</p>

      <!-- Success Popup -->
      <div v-if="showSuccess" class="">
        <div class="">
          <h2>✅ Submitted</h2>
          <p>
            Thanks! Your responses have been submitted.
          </p>
          <p>I will reach out directly to schedule a
            one-on-one follow-up.</p>
        </div>
      </div>

      <!-- VIEW 1 -->
      <div v-if="step === 1" class="form">
        <div class="field-row small-row">
          <label>Name:</label>
          <input v-model.trim="form.name" type="text" placeholder="Jane Doe" />
        </div>

        <div class="field-row small-row">
          <label>Branch:</label>
          <input v-model.trim="form.branch" type="text" placeholder="Columbus, OH" />
        </div>

        <div class="field">
          <label>What makes your branch location unique compared to other AQUA DOC locations?</label>
          <textarea
            v-model.trim="form.branchUnique"
            rows="4"
            placeholder="What makes your location different? Market, staff, services, seasonality, etc."
          />
        </div>

        <div class="field">
          <label>What is the biggest challenge your branch location faces?</label>
          <textarea
            v-model.trim="form.branchBiggestChallenge"
            rows="4"
            placeholder="Operational, staffing, scheduling, customer expectations, geography, etc."
          />
        </div>
      </div>

      <!-- VIEW 2 -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>
            Please name some positive effects corporate has on your location today. (In what ways is
            the corporate office helpful?)
          </label>
          <textarea
            v-model.trim="form.corporatePositives"
            rows="4"
            placeholder="What helps you today? Tools, support, resources, guidance, reporting, etc."
          />
        </div>

        <div class="field">
          <label>
            Please name some negative effects corporate has on your location today. (In what ways is
            the corporate office harmful?)
          </label>
          <textarea
            v-model.trim="form.corporateNegatives"
            rows="4"
            placeholder="What causes friction? Delays, policies, lack of visibility, unclear ownership, etc."
          />
        </div>

        <div class="field">
          <label>How could the corporate office better support your location in the future?</label>
          <textarea
            v-model.trim="form.corporateFutureSupport"
            rows="4"
            placeholder="What would make the biggest difference going forward?"
          />
        </div>
      </div>

      <!-- VIEW 3 -->
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
            Please name 5 things RealGreen is not able to do today that you would like to be able to
            do tomorrow?
          </label>
          <textarea
            v-model.trim="form.realGreenFiveThings"
            rows="5"
            placeholder="List 5 items (or as many as you can)."
          />
        </div>
      </div>

      <!-- VIEW 4 -->
      <div v-else-if="step === 4" class="form">
        <div class="field field--narrow">
          <label>
            How many days out should we have an accurate schedule for upcoming regular management
            visits?
          </label>
          <select v-model="form.scheduleMgmtVisits">
            <option value="">Select...</option>
            <option value="today-only">Today-only</option>
            <option value="2-days">2 days</option>
            <option value="7-days">7 days</option>
            <option value="14-days">14 days</option>
          </select>
        </div>

        <div class="field field--narrow">
          <label>
            How many days out should we have an accurate schedule for upcoming fountains division
            work?
          </label>
          <select v-model="form.scheduleFountainsWork">
            <option value="">Select...</option>
            <option value="today-only">Today-only</option>
            <option value="2-days">2 days</option>
            <option value="7-days">7 days</option>
            <option value="14-days">14 days</option>
          </select>
        </div>

        <div class="field">
          <label>Does your location do any work that requires licenses / permits?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="true" v-model="form.requiresPermits" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" v-model="form.requiresPermits" />
              No
            </label>
          </div>

          <textarea
            v-if="form.requiresPermits === 'true'"
            v-model.trim="form.permitsList"
            rows="3"
            placeholder="If yes, please list them."
          />
        </div>

        <div class="field">
          <label>Do contracts from your location need any special terms, or wording?</label>
          <textarea
            v-model.trim="form.contractSpecialTerms"
            rows="4"
            placeholder="Anything unique your branch needs in contracts?"
          />
        </div>

        <div class="field">
          <label>
            Is there information you wish you had access to today that would help you manage your
            branch better?
          </label>
          <textarea
            v-model.trim="form.infoWishAccess"
            rows="4"
            placeholder="What info would make decisions easier or faster?"
          />
        </div>
      </div>

      <!-- VIEW 5 -->
      <div v-else-if="step === 5" class="form">
        <div class="field">
          <label>When training new staff, what part of RealGreen do they struggle with the most?</label>
          <textarea
            v-model.trim="form.trainingRealGreenStruggle"
            rows="4"
            placeholder="What areas cause confusion or require the most coaching?"
          />
        </div>

        <div class="field">
          <label>
            When training new staff, what do they struggle with the most? (outside of RealGreen)
          </label>
          <textarea
            v-model.trim="form.trainingOutsideStruggle"
            rows="5"
            placeholder="Example: application rates, seasonal product timing/selection, annual usage limits per waterbody."
          />
        </div>

        <div class="field">
          <label>
            Is there any training not offered today you feel would be beneficial to your employees?
          </label>
          <textarea
            v-model.trim="form.trainingMissing"
            rows="4"
            placeholder="What training would help new hires ramp faster or reduce errors?"
          />
        </div>
      </div>

      <!-- VIEW 6 -->
      <div v-else class="form">
        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>Is there anything your clients request that we are unable to accommodate today?</label>
          <textarea
            v-model.trim="form.clientsUnableToAccommodate"
            rows="4"
            placeholder="Services, timelines, reporting, communication, billing, etc."
          />
        </div>

        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>What is some information that would be useful to record about your clients?</label>
          <textarea
            v-model.trim="form.clientsUsefulInfo"
            rows="5"
            placeholder="Example: client behavior, on-site considerations, environmental factors, recurring causes of management challenges, etc."
          />
        </div>

        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>From your perspective, what could we do to improve the client experience?</label>
          <textarea
            v-model.trim="form.clientsImproveExperience"
            rows="4"
            placeholder="What changes would have the biggest impact?"
          />
        </div>

        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>Do you have any other input, requests, or ideas for the new system?</label>
          <textarea
            v-model.trim="form.otherInput"
            rows="4"
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
import { submitReportRequest } from '../services/submitService';

export default {
  name: 'branch-manager-questions-page',
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
        branch: '',
        branchUnique: '',
        branchBiggestChallenge: '',

        // Page 2 (Corporate)
        corporatePositives: '',
        corporateNegatives: '',
        corporateFutureSupport: '',

        // Page 3 (RealGreen)
        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenFiveThings: '',

        // Page 4 (General)
        scheduleMgmtVisits: '',
        scheduleFountainsWork: '',
        requiresPermits: 'false', // keep consistent with v-if check
        permitsList: '',
        contractSpecialTerms: '',
        infoWishAccess: '',

        // Page 5 (Training)
        trainingRealGreenStruggle: '',
        trainingOutsideStruggle: '',
        trainingMissing: '',

        // Page 6 (Clients + Other)
        clientsUnableToAccommodate: '',
        clientsUsefulInfo: '',
        clientsImproveExperience: '',
        otherInput: '',

        messageType: 'branch-manager-questions',
      },
    };
  },

  computed: {
    canGoNext() {
      if (this.step === 1) {
        return (
          this.form.name.length > 0 &&
          this.form.branch.length > 0 &&
          this.form.branchUnique.length > 0 &&
          this.form.branchBiggestChallenge.length > 0
        );
      }

      if (this.step === 2) {
        return (
          this.form.corporatePositives.length > 0 &&
          this.form.corporateNegatives.length > 0 &&
          this.form.corporateFutureSupport.length > 0
        );
      }

      if (this.step === 3) {
        return (
          this.form.realGreenUseful.length > 0 &&
          this.form.realGreenFrustrations.length > 0 &&
          this.form.realGreenFiveThings.length > 0
        );
      }

      if (this.step === 4) {
        const permitsOk =
          this.form.requiresPermits === 'false' || this.form.permitsList.trim().length > 0;

        return (
          this.form.scheduleMgmtVisits.length > 0 &&
          this.form.scheduleFountainsWork.length > 0 &&
          this.form.requiresPermits.length > 0 &&
          permitsOk &&
          this.form.contractSpecialTerms.length > 0 &&
          this.form.infoWishAccess.length > 0
        );
      }

      if (this.step === 5) {
        return (
          this.form.trainingRealGreenStruggle.length > 0 &&
          this.form.trainingOutsideStruggle.length > 0 &&
          this.form.trainingMissing.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const permitsOk =
        this.form.requiresPermits === 'false' || this.form.permitsList.trim().length > 0;

      return (
        // Step 1
        this.form.name.length > 0 &&
        this.form.branch.length > 0 &&
        this.form.branchUnique.length > 0 &&
        this.form.branchBiggestChallenge.length > 0 &&
        // Step 2
        this.form.corporatePositives.length > 0 &&
        this.form.corporateNegatives.length > 0 &&
        this.form.corporateFutureSupport.length > 0 &&
        // Step 3
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenFiveThings.length > 0 &&
        // Step 4
        this.form.scheduleMgmtVisits.length > 0 &&
        this.form.scheduleFountainsWork.length > 0 &&
        permitsOk &&
        this.form.contractSpecialTerms.length > 0 &&
        this.form.infoWishAccess.length > 0 &&
        // Step 5
        this.form.trainingRealGreenStruggle.length > 0 &&
        this.form.trainingOutsideStruggle.length > 0 &&
        this.form.trainingMissing.length > 0 &&
        // Step 6 (required ones)
        this.form.clientsUnableToAccommodate.length > 0 &&
        this.form.clientsUsefulInfo.length > 0 &&
        this.form.clientsImproveExperience.length > 0
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
      this.step = Math.min(6, this.step + 1);
    },

    prevStep() {
      this.error = '';
      this.step = Math.max(1, this.step - 1);
    },


submit() {
  if (this.submitting) return; // 👈 hard guard

  this.error = "";
  if (!this.canSubmit) {
    this.error = "Please complete the required fields before submitting.";
    return;
  }

  this.submitting = true; // 👈 lock immediately

  const payload = {
    ...this.form,
    submittedAt: new Date().toISOString(),
  };

  console.log(payload)

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
      this.error = '';
      this.form = {
        name: '',
        branch: '',
        branchUnique: '',
        branchBiggestChallenge: '',

        corporatePositives: '',
        corporateNegatives: '',
        corporateFutureSupport: '',

        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenFiveThings: '',

        scheduleMgmtVisits: '',
        scheduleFountainsWork: '',
        requiresPermits: 'false',
        permitsList: '',
        contractSpecialTerms: '',
        infoWishAccess: '',

        trainingRealGreenStruggle: '',
        trainingOutsideStruggle: '',
        trainingMissing: '',

        clientsUnableToAccommodate: '',
        clientsUsefulInfo: '',
        clientsImproveExperience: '',
        otherInput: '',

        messageType: 'branch-manager-questions',
      };
    },
  },
};
</script>

<style>
.field-row {
  display: flex;
  flex-direction: row;
}

/* .field-row label {
  display: flex;
  font-weight: 600;
  margin-bottom: 0px;
  width: max-content;
  justify-content: right;
  white-space: nowrap;
  margin-top: 6px;
  margin-right: 4px;
} */

.field--narrow select {
  width: auto;
  min-width: 220px;
  max-width: 280px;
}

.small-row label {
    display: flex;
    font-weight: 600;
    margin-bottom: 0px;
    width: 10%;
    justify-content: right;
    white-space: nowrap;
    margin-top: 6px;
    margin-right: 4px;
}

.field-row input,
.field-row textarea,
.field-row select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

.single-page {
  height: 100dvh;
  width: 100dvw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(135deg, rgb(0, 135, 216) 0%, rgb(0, 110, 185) 50%, rgb(0, 90, 160) 100%);
}

.card {
  width: min(820px, 90%);
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 18px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
}

.step {
  margin-top: 6px;
  opacity: 0.7;
}

.form {
  margin-top: 16px;
  display: grid;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0px;
  width: auto;
  white-space: wrap;
  margin-top: 5px;
  text-align: left;
  padding-left: 10px;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #bbb;
  cursor: pointer;
  font-weight: 600;
}

.btn.primary {
  background: linear-gradient(180deg, #3fbf6f, #2fa45a);
  border: 1px solid #2a8f52;
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(47, 164, 90, 0.35);
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease;
}

.btn.secondary {
  opacity: 0.85;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  margin-top: 12px;
  color: #b00020;
  font-weight: 600;
}

.review {
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.review pre {
  background: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  overflow: auto;
}

.radio-group {
  display: flex;
  gap: 16px;
  margin-top: 6px;
}

.radio {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  cursor: pointer;
}

.radio input[type='radio'] {
  cursor: pointer;
  accent-color: #222; /* modern browsers */
}

.field textarea {
  margin-top: 10px;
}

/* =========================
   TABLET (<= 1024px)
   ========================= */
@media (max-width: 1024px) {
  .single-page {
    padding: 16px;
    align-items: flex-start;
  }

  .card {
    width: 100%;
    padding: 16px;
  }

  .form {
    gap: 12px;
  }

  .field-row label {
    width: 32%;
    justify-content: flex-start;
    margin-right: 8px;
  }

  .actions {
    gap: 8px;
  }

  .btn {
    padding: 10px 12px;
  }
}

/* =========================
   PHONE (<= 600px)
   ========================= */
@media (max-width: 600px) {
  .single-page {
    padding: 12px;
  }

  .card {
    padding: 14px;
    border-radius: 12px;
  }

  .field-row {
    flex-direction: column;
    gap: 6px;
  }

  .field-row label {
    width: 100%;
    justify-content: flex-start;
    text-align: left;
    margin: 0;
    padding-left: 2px;
    white-space: normal;
  }

  .field input,
  .field textarea,
  .field select,
  .field-row input,
  .field-row textarea,
  .field-row select {
    font-size: 16px; /* prevents iOS zoom on focus */
    padding: 12px;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 12px 14px;
  }

  .radio-group {
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
  }

  .review pre {
    max-height: 220px;
  }
}

/* =========================
   VERY SMALL PHONES (<= 360px)
   ========================= */
@media (max-width: 360px) {
  .single-page {
    padding: 10px;
  }

  .card {
    padding: 12px;
  }

  .btn {
    padding: 12px;
  }
}

/* Success overlay */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 9999;
}

.success-modal {
  width: min(520px, 92%);
  background: white;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
}
</style>