<template>
  <div class="single-page">
    <div class="card">
      <h1>Finance Team Questions</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 6</p>

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
          <input v-model.trim="form.tenure" type="text" placeholder="Example: 6 months, 2 years, since 2019, etc." />
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
          <label>
            What finance related tasks do you work on most frequently? (Example: Billing support, AR,
            AP, Reporting, etc.)
          </label>
          <textarea
            v-model.trim="form.frequentTasks"
            rows="4"
            placeholder="What do you spend most of your time doing?"
          />
        </div>

        <div class="field">
          <label>What is some information you have to track manually or outside of our current systems?</label>
          <textarea
            v-model.trim="form.manualTracking"
            rows="4"
            placeholder="Spreadsheets, notes, emails, personal trackers, etc."
          />
        </div>

        <div class="field">
          <label>What financial information do you regularly need but don't always have easy access to?</label>
          <textarea
            v-model.trim="form.infoNeedNoAccess"
            rows="4"
            placeholder="What do you need that is hard to find or takes too long to get?"
          />
        </div>

        <div class="field">
          <label>What information do you often have to request from other departments?</label>
          <textarea
            v-model.trim="form.infoRequestFromOthers"
            rows="4"
            placeholder="What do you need to ask others for?"
          />
        </div>

        <div class="field">
          <label>Which departments?</label>
          <textarea
            v-model.trim="form.departmentsRequested"
            rows="3"
            placeholder="List departments or teams."
          />
        </div>

        <div class="field">
          <label>Why?</label>
          <textarea
            v-model.trim="form.departmentsWhy"
            rows="4"
            placeholder="Why do you need to request this info and what is it used for?"
          />
        </div>
      </div>

      <!-- VIEW 3 -->
      <div v-else-if="step === 3" class="form">
        <div class="field">
          <label>Is there information you wish was always present or clearly visible on an account?</label>
          <textarea
            v-model.trim="form.accountInfoWishVisible"
            rows="4"
            placeholder="What should always be easy to see?"
          />
        </div>

        <div class="field">
          <label>Are there finance-related processes that feel inconsistent across branches or regions?</label>
          <textarea
            v-model.trim="form.inconsistentProcesses"
            rows="4"
            placeholder="What varies from branch to branch that shouldn't?"
          />
        </div>

        <div class="field">
          <label>What information do clients regularly request from the finance department?</label>
          <textarea
            v-model.trim="form.clientsRequestFinanceInfo"
            rows="4"
            placeholder="Statements, invoice details, payment receipts, W-9, breakdowns, etc."
          />
        </div>

        <div class="field">
          <label>
            Are there common billing issues that originate before they reach the finance team?
            (For example: quotes, contracts, service data, customer setup, or missing approvals)
          </label>
          <textarea
            v-model.trim="form.billingIssuesBeforeFinance"
            rows="5"
            placeholder="What upstream issues create downstream billing problems?"
          />
        </div>
      </div>

      <!-- VIEW 4 -->
      <div v-else-if="step === 4" class="form">
        <div class="field">
          <label>What are the most common issues you encounter related to billing or invoices?</label>
          <textarea
            v-model.trim="form.billingCommonIssues"
            rows="4"
            placeholder="Missing info, incorrect pricing, timing issues, approvals, contract mismatch, etc."
          />
        </div>

        <div class="field">
          <label>Are there customer billing questions that are difficult for finance to answer quickly?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="true" v-model="form.billingQuestionsHard" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" v-model="form.billingQuestionsHard" />
              No
            </label>
          </div>

          <textarea
            v-if="form.billingQuestionsHard === 'true'"
            v-model.trim="form.billingQuestionsHardExplain"
            rows="4"
            placeholder="If yes, please elaborate."
          />
        </div>

        <div class="field field--narrow">
          <label>How do most clients want to pay their bill?</label>
          <select v-model="form.paymentPreference">
            <option value="">Select...</option>
            <option value="yearly">Yearly</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="50-down-balance-on-completion">50% down, balance on completion.</option>
            <option value="custom-payment-plan">Custom payment plan.</option>
          </select>
        </div>

        <div class="field">
          <textarea
            v-if="form.paymentPreference === 'custom-payment-plan'"
            v-model.trim="form.customPaymentPlanExplain"
            rows="4"
            placeholder="If custom, please explain the clients request."
          />
        </div>
      </div>

      <!-- VIEW 5 -->
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
          <label>From your perspective, how could the finance team provide a better customer experience?</label>
          <textarea
            v-model.trim="form.financeBetterCustomerExperience"
            rows="4"
            placeholder="What changes would improve clarity, speed, trust, or satisfaction?"
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
  name: 'finance-team-questions-page',
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

        // Page 2 (General)
        frequentTasks: '',
        manualTracking: '',
        infoNeedNoAccess: '',
        infoRequestFromOthers: '',
        departmentsRequested: '',
        departmentsWhy: '',

        // Page 3 (General Continued)
        accountInfoWishVisible: '',
        inconsistentProcesses: '',
        clientsRequestFinanceInfo: '',
        billingIssuesBeforeFinance: '',

        // Page 4 (Billing)
        billingCommonIssues: '',
        billingQuestionsHard: 'false',
        billingQuestionsHardExplain: '',
        paymentPreference: '',
        customPaymentPlanExplain: '',

        // Page 5 (RealGreen)
        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',
        financeBetterCustomerExperience: '',

        // Page 6
        meetInPerson: 'false',
        meetInPersonDetails: '',
        otherInput: '',

        messageType: 'finance-team-questions',
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
          this.form.frequentTasks.length > 0 &&
          this.form.manualTracking.length > 0 &&
          this.form.infoNeedNoAccess.length > 0 &&
          this.form.infoRequestFromOthers.length > 0 &&
          this.form.departmentsRequested.length > 0 &&
          this.form.departmentsWhy.length > 0
        );
      }

      if (this.step === 3) {
        return (
          this.form.accountInfoWishVisible.length > 0 &&
          this.form.inconsistentProcesses.length > 0 &&
          this.form.clientsRequestFinanceInfo.length > 0 &&
          this.form.billingIssuesBeforeFinance.length > 0
        );
      }

      if (this.step === 4) {
        const billingExplainOk =
          this.form.billingQuestionsHard === 'false' ||
          this.form.billingQuestionsHardExplain.trim().length > 0;

        const customPlanOk =
          this.form.paymentPreference !== 'custom-payment-plan' ||
          this.form.customPaymentPlanExplain.trim().length > 0;

        return (
          this.form.billingCommonIssues.length > 0 &&
          this.form.billingQuestionsHard.length > 0 &&
          billingExplainOk &&
          this.form.paymentPreference.length > 0 &&
          customPlanOk
        );
      }

      if (this.step === 5) {
        return (
          this.form.realGreenUseful.length > 0 &&
          this.form.realGreenFrustrations.length > 0 &&
          this.form.realGreenMissing.length > 0 &&
          this.form.financeBetterCustomerExperience.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const billingExplainOk =
        this.form.billingQuestionsHard === 'false' ||
        this.form.billingQuestionsHardExplain.trim().length > 0;

      const customPlanOk =
        this.form.paymentPreference !== 'custom-payment-plan' ||
        this.form.customPaymentPlanExplain.trim().length > 0;

      const meetDetailsOk =
        this.form.meetInPerson === 'false' || this.form.meetInPersonDetails.trim().length > 0;

      return (
        // Step 1
        this.form.name.length > 0 &&
        this.form.tenure.length > 0 &&
        this.form.positionFocus.length > 0 &&
        // Step 2
        this.form.frequentTasks.length > 0 &&
        this.form.manualTracking.length > 0 &&
        this.form.infoNeedNoAccess.length > 0 &&
        this.form.infoRequestFromOthers.length > 0 &&
        this.form.departmentsRequested.length > 0 &&
        this.form.departmentsWhy.length > 0 &&
        // Step 3
        this.form.accountInfoWishVisible.length > 0 &&
        this.form.inconsistentProcesses.length > 0 &&
        this.form.clientsRequestFinanceInfo.length > 0 &&
        this.form.billingIssuesBeforeFinance.length > 0 &&
        // Step 4
        this.form.billingCommonIssues.length > 0 &&
        billingExplainOk &&
        this.form.paymentPreference.length > 0 &&
        customPlanOk &&
        // Step 5
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenMissing.length > 0 &&
        this.form.financeBetterCustomerExperience.length > 0 &&
        // Step 6
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
      this.step = Math.min(6, this.step + 1);
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

        frequentTasks: '',
        manualTracking: '',
        infoNeedNoAccess: '',
        infoRequestFromOthers: '',
        departmentsRequested: '',
        departmentsWhy: '',

        accountInfoWishVisible: '',
        inconsistentProcesses: '',
        clientsRequestFinanceInfo: '',
        billingIssuesBeforeFinance: '',

        billingCommonIssues: '',
        billingQuestionsHard: 'false',
        billingQuestionsHardExplain: '',
        paymentPreference: '',
        customPaymentPlanExplain: '',

        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',
        financeBetterCustomerExperience: '',

        meetInPerson: 'false',
        meetInPersonDetails: '',
        otherInput: '',

        messageType: 'finance-team-questions',
      };
    },
  },
};
</script>

<style>
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

.field--narrow select {
  width: auto;
  min-width: 220px;
  max-width: 280px;
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

.review pre {
  background: #f7f7f7;
  padding: 10px;
  border-radius: 10px;
  overflow: auto;
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
  /* .single-page {
    padding: 16px;
    align-items: flex-start;
  } */

  .card {
    width: 100%;
    padding: 16px;
  }

  .form {
    gap: 12px;
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
    text-align: right;
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
</style>