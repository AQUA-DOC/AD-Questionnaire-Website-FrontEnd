<template>
  <div class="single-page">
    <div class="card">
      <h1>Report Request</h1>

      <!-- Simple step indicator -->
      <p class="step">Step {{ step }} of 3</p>

        <!-- Success Popup -->
         <div v-if="showSuccess" class="success-overlay">
            <div class="success-modal">
                <h2>✅ Successfully Submitted Request</h2>
                <p>Your report request has been submitted.</p>
            </div>
        </div>


      <!-- VIEW 1 -->
      <div v-if="step === 1" class="form">
        <div class="field-row">
          <label>Employee Name:</label>
          <input v-model.trim="form.employeeName" type="text" placeholder="Jane Doe" />
        </div>

        <div class="field-row">
          <label>Report Name:</label>
          <input v-model.trim="form.reportName" type="text" placeholder="Monthly Sales by Branch" />
        </div>

        <div class="field-row">
          <label>Report Description:</label>
          <textarea
            v-model.trim="form.reportDescription"
            rows="4"
            placeholder="What is this report for? What should it help you do?"
          />
        </div>
      </div>

      <!-- VIEW 2 -->
      <div v-else-if="step === 2" class="form">
        <div class="field">
          <label>What question(s) do you want this report to answer?</label>
          <textarea
            v-model.trim="form.reportQuestion"
            rows="4"
            placeholder="What is this report for? What should it help you do?"
          />
          <!-- <input v-model.trim="form.audience" type="text" placeholder="Branch Managers, CFO, etc." /> -->
        </div>

        <div class="field">
          <label>How often is this report needed?</label>
          <select v-model="form.frequency">
            <option value="">Select...</option>
            <option value="one-time">One-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>


        <div class="field">
            <label>Do you need historical backfill?</label>

            <div class="radio-group">
                <label class="radio">
                <input
                    type="radio"
                    value="true"
                    v-model="form.needsBackfill"
                />
                Yes
                </label>

                <label class="radio">
                <input
                    type="radio"
                    value="false"
                    v-model="form.needsBackfill"
                />
                No
                </label>
            </div>

            <textarea
                v-if="form.needsBackfill === 'true'"
                v-model.trim="form.backfillDetails"
                rows="3"
                placeholder="How far back do you need the data? (e.g., last 2 years, since 2019, all historical data)"
            />
            </div>
      </div>

      <!-- VIEW 3 -->
      <div v-else class="form">
        <div class="field" v-if="!showSuccess">
          <label>What decisions will this report help you make?</label>
          <textarea
            v-model.trim="form.intendedUse"
            rows="4"
            placeholder="e.g., Track KPIs, adjust staffing, monitor collections, etc."
          />
        </div>

        <div class="field" v-if="!showSuccess">
          <label>Delivery preference</label>
          <select v-model="form.delivery">
            <option value="">Select...</option>
            <option value="pdf">PDF Document</option>
            <option value="email">Email (scheduled)</option>
            <option value="export">Export (CSV/Excel)</option>
            <option value="dashboard">Interactive Dashboard</option>
          </select>
        </div>
      </div>

      <!-- BUTTONS -->
      <div class="actions">
        <button v-if="step > 1" class="btn secondary" @click="prevStep">
          Back
        </button>

        <button
          v-if="step < 3"
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
          :disabled="!canSubmit"
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
  name: "request-report-page",
  props: [],

  data() {
    return {
      step: 1,
      error: "",
      showSuccess: false,
      form: {
        // Step 1
        employeeName: "",
        reportName: "",
        reportDescription: "",
        

        // Step 2
        reportQuestion: "",
        frequency: "",
        needsBackfill: "false",
        backfillDetails: "",

        // Step 3
        intendedUse: "",
        delivery: "",
        messageType: "report-request"
      },
    };
  },

  computed: {
    // Require Step 1 fields to proceed (easy to extend per-step)
    canGoNext() {
      if (this.step === 1) {
        return (
          this.form.employeeName.length > 0 &&
          this.form.reportName.length > 0 &&
          this.form.reportDescription.length > 0
        );
      }

      if (this.step === 2) {
        // Keep this permissive or tighten it as needed
        return (
            this.form.reportQuestion.length > 0 &&
            this.form.frequency.length > 0
        );
      }

      if (this.step === 3) {
        return (
            this.form.intendedUse.length > 0 &&
            this.form.delivery.length > 0
        );
      }

      return false;
    },

    // On submit, you can require whatever you want (below requires Step 1 + intendedUse)
    canSubmit() {
      return (
        this.form.employeeName.length > 0 &&
        this.form.reportName.length > 0 &&
        this.form.reportDescription.length > 0 &&
        this.form.intendedUse.length > 0
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
      this.step = Math.min(3, this.step + 1);
    },

    prevStep() {
      this.error = "";
      this.step = Math.max(1, this.step - 1);
    },

    submit() {
      this.error = "";
      if (!this.canSubmit) {
        this.error = "Please complete the required fields before submitting.";
        return;
      }

      const payload = {
        ...this.form,
        submittedAt: new Date().toISOString(),
      };

      submitReportRequest(payload)
        .then(status => {
            console.log("Response is back33")
            console.log(status)
            if (status == 200) {
                // Show Success Modal
                this.showSuccess = true;
                // After 5 seconds, reset everything
                setTimeout(() => {
                    this.showSuccess = false;
                    this.resetForm();
                }, 7000);
            } else {
                alert("Looks like you found a problem, please let me know how you did it! - Connor")
            }
        }).catch(err => {
            console.error("Submit failed:", err);

            this.error =
            "Unable to submit report request. Please try again later.";
        });

      console.log("Report Request Submitted:", payload);
    },

    resetForm() {
        this.step = 1;
        this.error = "";
        this.form = {
            employeeName: "",
            reportName: "",
            reportDescription: "",
            audience: "",
            frequency: "",
            filters: "",
            intendedUse: "",
            delivery: "",
            needsBackfill: false,
            backfillDetails: "",
            reportQuestion: "",
            messageType: "report-request"
        };
    },
  },
};
</script>

<style>



.field-row label {
  display: flex;
  font-weight: 600;
  margin-bottom: 0px;
  width: 25%;
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


.radio input[type="radio"] {
  cursor: pointer;
  accent-color: #222; /* modern browsers */
}

.field textarea {
  margin-top: 10px;
}

/* =========================
   TABLET (<= 1024px)
   - Slightly tighter spacing
   - Card uses more width
   - Field-row label gets a bit wider
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
    justify-content: flex-end;
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
   - Switch field-row to stacked layout
   - Larger tap targets
   - Buttons full-width
   ========================= */
@media (max-width: 600px) {
  .single-page {
    padding: 12px;
  }

  .card {
    padding: 14px;
    border-radius: 12px;
  }

  /* Stack label above input */
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
    white-space: normal; /* allow wrap on small screens */
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

  /* Buttons become stacked and easy to tap */
  .actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 12px 14px;
  }

  /* Radio buttons stack nicely */
  .radio-group {
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
  }

  /* Review block scroll feels better on small screens */
  .review pre {
    max-height: 220px;
  }
}

/* =========================
   VERY SMALL PHONES (<= 360px)
   - Extra-tight padding
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