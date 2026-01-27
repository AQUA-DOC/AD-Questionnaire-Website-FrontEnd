<template>
  <div class="single-page">
    <div class="card">
      <h1>Regional Manager Questions</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 6</p>

      <!-- Success Popup -->
      <div v-if="showSuccess" class="success-overlay">
        <div class="success-modal">
          <h2>✅ Submitted</h2>
          <p>Thanks! Your responses have been submitted.</p>
          <p>I will reach out directly to schedule a one-on-one follow-up.</p>
        </div>
      </div>

      <!-- VIEW 1 -->
      <div v-if="step === 1" class="form">
        <div class="field-row medium-row">
          <label>Name:</label>
          <input v-model.trim="form.name" type="text" placeholder="Jane Doe" />
        </div>

        <div class="field-row medium-row">
          <label>Routes in Region:</label>
          <input v-model.trim="form.routesInRegion" type="text" placeholder="1-AA, 1-AB, 1-AC" />
        </div>

        <div class="field">
          <label>How long have you worked for AQUA DOC?</label>
          <input v-model.trim="form.tenure" type="text" placeholder="e.g., 2 years" />
        </div>

        <div class="field">
          <label>In your own words, what is the focus of your position?</label>
          <textarea
            v-model.trim="form.positionFocus"
            rows="4"
            placeholder="What are you responsible for day-to-day? What outcomes are you accountable for?"
          />
        </div>
      </div>

      <!-- VIEW 2 (Corporate) -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>
            Please name some positive effects corporate has on your position today. (In what ways is
            the corporate office helpful?)
          </label>
          <textarea
            v-model.trim="form.corporatePositives"
            rows="4"
            placeholder="What helps you today? Tools, support, reporting, resources, etc."
          />
        </div>

        <div class="field">
          <label>
            Please name some negative effects corporate has on your position today. (In what ways is
            the corporate office harmful?)
          </label>
          <textarea
            v-model.trim="form.corporateNegatives"
            rows="4"
            placeholder="What causes friction? Delays, unclear ownership, lack of visibility, etc."
          />
        </div>

        <div class="field">
          <label>How could the corporate office better support your position in the future?</label>
          <textarea
            v-model.trim="form.corporateFutureSupport"
            rows="4"
            placeholder="What would make the biggest difference going forward?"
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
            placeholder="What feels clunky, slow, repetitive, confusing, or error-prone?"
          />
        </div>

        <div class="field">
          <label>
            Please name some things RealGreen is not able to do today that you would like to be able
            to do tomorrow?
          </label>
          <textarea
            v-model.trim="form.realGreenMissing"
            rows="5"
            placeholder="List items (as many as you can)."
          />
        </div>
      </div>

      <!-- VIEW 4 (General) -->
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
          <label>Where do most sales opportunities come from today?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="existing-clients" v-model="form.salesOpportunitySource" />
              Existing Clients
            </label>
            <label class="radio">
              <input type="radio" value="new-leads" v-model="form.salesOpportunitySource" />
              New Leads
            </label>
            <label class="radio">
              <input type="radio" value="referrals" v-model="form.salesOpportunitySource" />
              Referrals
            </label>
            <label class="radio">
              <input type="radio" value="consultations" v-model="form.salesOpportunitySource" />
              Consultations
            </label>
          </div>
        </div>
      </div>

      <!-- VIEW 5 (Clients) -->
      <div v-else-if="step === 5" class="form">
        <div class="field">
          <label>What types of client issues most often require your involvement?</label>
          <textarea
            v-model.trim="form.clientIssuesNeedingInvolvement"
            rows="4"
            placeholder="Escalations, expectations, billing, quality, timing, special circumstances, etc."
          />
        </div>

        <div class="field">
          <label>Are there recurring quality issues you see across your region?</label>
          <div class="radio-group">
            <label class="radio">
              <input type="radio" value="true" v-model="form.recurringQualityIssues" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" value="false" v-model="form.recurringQualityIssues" />
              No
            </label>
          </div>
        </div>

        <div class="field" v-if="form.recurringQualityIssues === 'true'">
          <label>If yes, what do you believe causes them?</label>
          <textarea
            v-model.trim="form.recurringQualityCauses"
            rows="4"
            placeholder="Staffing, training, product availability, scheduling, communication, tools, process gaps, etc."
          />
        </div>

        <div class="field">
          <label>What client or site-specific information do you wish was easier to capture or reference?</label>
          <textarea
            v-model.trim="form.siteInfoEasierToCapture"
            rows="4"
            placeholder="Access notes, hazards, client expectations, history, equipment, environmental factors, etc."
          />
        </div>

        <div class="field">
          <label>
            What information about a site or body of water could realistically be recorded at every
            management visit without adding significant time or effort?
          </label>
          <textarea
            v-model.trim="form.everyVisitInfo"
            rows="4"
            placeholder="A short checklist or a few simple notes that are consistently doable."
          />
        </div>
      </div>

      <!-- VIEW 6 -->
      <div v-else class="form">
        <div class="field" v-if="!showSuccess && error.length == 0">
          <label>Would you like to meet in person to go over anything specific?</label>
          <textarea
            v-model.trim="form.meetInPerson"
            rows="4"
            placeholder="If yes, what topics should we cover?"
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
          Submit
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { submitReportRequest } from '../services/submitService';

export default {
  name: 'regional-manager-questions-page',
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
        routesInRegion: '',
        tenure: '',
        positionFocus: '',

        // Page 2 (Corporate)
        corporatePositives: '',
        corporateNegatives: '',
        corporateFutureSupport: '',

        // Page 3 (RealGreen)
        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',

        // Page 4 (General)
        scheduleMgmtVisits: '',
        scheduleFountainsWork: '',
        salesOpportunitySource: '',

        // Page 5 (Clients)
        clientIssuesNeedingInvolvement: '',
        recurringQualityIssues: 'false',
        recurringQualityCauses: '',
        siteInfoEasierToCapture: '',
        everyVisitInfo: '',

        // Page 6
        meetInPerson: '',
        otherInput: '',

        messageType: 'regional-manager-questions',
      },
    };
  },

  computed: {
    canGoNext() {
      if (this.step === 1) {
        return (
          this.form.name.length > 0 &&
          this.form.routesInRegion.length > 0 &&
          this.form.tenure.length > 0 &&
          this.form.positionFocus.length > 0
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
          this.form.realGreenMissing.length > 0
        );
      }

      if (this.step === 4) {
        return (
          this.form.scheduleMgmtVisits.length > 0 &&
          this.form.scheduleFountainsWork.length > 0 &&
          this.form.salesOpportunitySource.length > 0
        );
      }

      if (this.step === 5) {
        const qualityOk =
          this.form.recurringQualityIssues === 'false' ||
          this.form.recurringQualityCauses.trim().length > 0;

        return (
          this.form.clientIssuesNeedingInvolvement.length > 0 &&
          this.form.recurringQualityIssues.length > 0 &&
          qualityOk &&
          this.form.siteInfoEasierToCapture.length > 0 &&
          this.form.everyVisitInfo.length > 0
        );
      }

      return false;
    },

    canSubmit() {
      const qualityOk =
        this.form.recurringQualityIssues === 'false' ||
        this.form.recurringQualityCauses.trim().length > 0;

      return (
        // Step 1
        this.form.name.length > 0 &&
        this.form.routesInRegion.length > 0 &&
        this.form.tenure.length > 0 &&
        this.form.positionFocus.length > 0 &&
        // Step 2
        this.form.corporatePositives.length > 0 &&
        this.form.corporateNegatives.length > 0 &&
        this.form.corporateFutureSupport.length > 0 &&
        // Step 3
        this.form.realGreenUseful.length > 0 &&
        this.form.realGreenFrustrations.length > 0 &&
        this.form.realGreenMissing.length > 0 &&
        // Step 4
        this.form.scheduleMgmtVisits.length > 0 &&
        this.form.scheduleFountainsWork.length > 0 &&
        this.form.salesOpportunitySource.length > 0 &&
        // Step 5
        this.form.clientIssuesNeedingInvolvement.length > 0 &&
        this.form.recurringQualityIssues.length > 0 &&
        qualityOk &&
        this.form.siteInfoEasierToCapture.length > 0 &&
        this.form.everyVisitInfo.length > 0 &&
        // Step 6
        this.form.meetInPerson.length > 0
        // otherInput optional
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
      if (this.submitting) return;

      this.error = '';
      if (!this.canSubmit) {
        this.error = 'Please complete the required fields before submitting.';
        return;
      }

      this.submitting = true;

      const payload = {
        ...this.form,
        submittedAt: new Date().toISOString(),
      };

      submitReportRequest(payload)
        .then((status) => {
          if (status == 200) {
            this.showSuccess = true;

            setTimeout(() => {
              this.showSuccess = false;
              this.resetForm();
            }, 7000);
          } else {
            this.error = 'Submission failed. Please try again.';
          }
        })
        .catch((err) => {
          console.error('Submit failed:', err);
          this.error = 'Unable to submit responses. Please try again later.';
        })
        .finally(() => {
          setTimeout(() => {
            this.submitting = false;
          }, 7000);
        });
    },

    resetForm() {
      this.step = 1;
      this.error = '';
      this.form = {
        name: '',
        routesInRegion: '',
        tenure: '',
        positionFocus: '',

        corporatePositives: '',
        corporateNegatives: '',
        corporateFutureSupport: '',

        realGreenUseful: '',
        realGreenFrustrations: '',
        realGreenMissing: '',

        scheduleMgmtVisits: '',
        scheduleFountainsWork: '',
        salesOpportunitySource: '',

        clientIssuesNeedingInvolvement: '',
        recurringQualityIssues: 'false',
        recurringQualityCauses: '',
        siteInfoEasierToCapture: '',
        everyVisitInfo: '',

        meetInPerson: '',
        otherInput: '',

        messageType: 'regional-manager-questions',
      };
    },
  },
};
</script>

<style>
/* Uses global form.css (no per-page CSS needed) */

/* Default (mobile-first) */
.medium-row label {
  display: flex;
  font-weight: 600;
  margin-bottom: 0px;
  width: fit-content;
  justify-content: right;
  white-space: nowrap;
  margin-top: 6px;
  margin-right: 4px;
}

/* Desktop override */
@media (min-width: 1024px) {
  .medium-row label {
    width: 20%;
  }
}

.radio input[type="radio"] {
  margin: 0;                 /* remove default offset */
}

</style>