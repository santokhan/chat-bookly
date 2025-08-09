<template>
  <BusinessLayout>
    <div class="inner-wrapper">
      <div class="mb-8">
        <p class="text-center main-title mb-6">Streamline your teamwork. Start free.</p>
        <p class="text-center sub-title">Choose the perfect plan for your business needs</p>
      </div>
      <div class="mb-6">
        <div class="plan-toggle-group mb-16">
          <VBtnToggle v-model="selectedBilling" mandatory class="toggle-group" color="primary">
            <VBtn value="monthly" density="compact">Monthly</VBtn>
            <VBtn value="yearly" density="compact">Yearly </VBtn>
          </VBtnToggle>
          <span class="save-badge">Save 20%</span>
        </div>
        <div class="plan-cards">
          <VCard class="plan-card free" outlined elevation="0">
            <div class="plan-header">
              <div class="plan-title">Free</div>
              <div class="plan-desc">Best for personal use</div>
              <div class="plan-price">$0 <span class="plan-duration">/month</span></div>
              <VBtn class="plan-btn" variant="outlined">Current Plan</VBtn>
            </div>
            <div class="plan-features">
              <div class="feature-title">What you get:</div>
              <ul>
                <li>Task Management</li>
                <li>Project Planning</li>
                <li>Team Collaboration</li>
                <li>Notifications and Reminders</li>
                <li>What you get</li>
              </ul>
            </div>
          </VCard>
          <VCard class="plan-card business" outlined elevation="0">
            <div class="plan-header">
              <div class="plan-most-popular">Most Popular</div>
              <div class="plan-title">Business</div>
              <div class="plan-desc">Best for a business team use</div>
              <div class="plan-price">$16 <span class="plan-duration">/month</span></div>
              <VBtn color="primary" class="plan-btn selected">Select Plan</VBtn>
            </div>
            <div class="plan-features">
              <div class="feature-title">All free features, plus:</div>
              <ul>
                <li>Customizable Workflows</li>
                <li>Reporting and Analytics</li>
                <li>Document Management</li>
                <li>Agile Methodology Support</li>
                <li>Issue Tracking</li>
              </ul>
            </div>
          </VCard>
          <VCard class="plan-card enterprise" outlined elevation="0">
            <div class="plan-header">
              <div class="plan-title">Enterprise</div>
              <div class="plan-desc">Best for multinational business</div>
              <div class="plan-price">Custom</div>
              <VBtn class="plan-btn" variant="outlined">Contact us</VBtn>
            </div>
            <div class="plan-features">
              <div class="feature-title">All business features, plus:</div>
              <ul>
                <li>SSO</li>
                <li>All integrations</li>
                <li>Client Collaboration with 2FA</li>
                <li>Advanced Project Planning</li>
                <li>Mobile App Integration</li>
              </ul>
            </div>
          </VCard>
        </div>
      </div>
    </div>
    <div class="rectangle-bg"></div>
  </BusinessLayout>
</template>
<script setup>
import BusinessLayout from '@/layouts/components/BusinessLayout.vue';
import { ref } from 'vue';

const selectedBilling = ref('monthly');
</script>
<style lang="scss">
.inner-wrapper {
  position: relative;
  inline-size: 100%;
  margin-inline: auto;
  max-inline-size: 916px;
}

.plan-toggle-group {
  display: flex;
  align-items: center;
  justify-content: center;

  .toggle-group {
    padding: 4px !important;
    border-radius: 24px;
    background: #fff;
    block-size: 44px !important;

    .v-btn {
      border-radius: 24px !important;
      block-size: 36px !important;
      font-size: 16px;
      font-weight: 500;
      min-inline-size: 120px;
      padding-block: 0;
      padding-inline: 16px !important;
    }
  }

  .save-badge {
    position: relative;
    border-radius: 12px;
    background: #e0f7fa;
    color: #00b894;
    font-size: 12px;
    margin-inline-start: 8px;
    padding-block: 2px;
    padding-inline: 8px;

    &::after {
      position: absolute;
      background-image: url("../assets/images/svg/save-arrow.svg");
      background-repeat: no-repeat;
      background-size: contain;
      block-size: 27px;
      content: "";
      inline-size: 83px;
      inset-block-start: -30px;
      inset-inline-start: -50px;
    }
  }
}

.plan-cards {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;
  gap: 16px;
}

.plan-card {
  position: relative;
  display: flex;
  overflow: visible !important;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  padding: 24px !important;
  border: 1px solid #e1e4ea;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(80, 112, 255, 8%);

  &.business {
    border: 2px solid #335cff;
    border-radius: 0 0 16px 16px;
  }

  .plan-header {
    display: flex;
    flex-direction: column;
    margin-block-end: 32px;

    .plan-most-popular {
      position: absolute;
      border-radius: 8px 8px 0 0;
      background: #335cff;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      inline-size: calc(100% + 4px);
      inset-block-start: 0;
      inset-inline-start: 0;
      letter-spacing: 6%;
      margin-block-end: 8px;
      padding-block: 6px;
      padding-inline: 12px;
      text-align: center;
      text-transform: uppercase;
      transform: translateX(-2px) translateY(-100%);
    }

    .plan-title {
      color: #0e121b;
      font-size: 24px;
      font-weight: 700;
      margin-block-end: 4px;
    }

    .plan-desc {
      color: #525866;
      font-size: 14px;
      margin-block-end: 32px;
    }

    .plan-price {
      color: #0e121b;
      font-size: 32px;
      font-weight: 700;
      margin-block-end: 8px;

      .plan-duration {
        color: #0e121b;
        font-size: 16px;
        font-weight: 400;
      }
    }

    .plan-btn {
      border-color: #e1e4ea;
      border-radius: 10px;
      color: #525866 !important;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      margin-block-start: 8px;
      min-inline-size: 120px;

      &.selected {
        background: #335cff !important;
        color: #fff !important;
      }
    }
  }

  .plan-features {
    inline-size: 100%;

    .feature-title {
      color: #0e121b;
      font-size: 16px;
      font-weight: 500;
      margin-block-end: 16px;
    }

    ul {
      margin: 0;

      li {
        position: relative;
        color: #0e121b;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        list-style: none;
        margin-block-end: 18px;
        padding-inline-start: 44px;

        &::before {
          position: absolute;
          background-image: url("../assets/images/svg/checkmark.svg");
          background-repeat: no-repeat;
          background-size: contain;
          block-size: 24px;
          color: #2962ff;
          content: "";
          font-size: 14px;
          inline-size: 24px;
          inset-inline-start: 0;
        }
      }
    }
  }
}

.main-title {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -1.5%;
  line-height: 32px;
}

.sub-title {
  color: #525866;
  font-size: 18px;
  font-weight: 400;
}

/* Rectangle  */
.rectangle-bg {
  position: absolute;
  z-index: -1;
  border-radius: 551.593px;
  background: radial-gradient(47.3% 47.5% at 44.99% 59.52%, #335cff 0%, rgba(51, 92, 255, 31%) 100%);
  filter: blur(115.582px);
  inset-block: 31.3% -8.48%;
  inset-inline: 23.91% 34.65%;
  transform: matrix(-0.64, -0.77, -0.92, 0.39, 0, 0);
}
</style>
<style lang="scss">
html body .toggle-group .v-btn.v-btn--active {
  background: #335cff !important;

  &:hover,
  &:active,
  &:focus {
    background: #335cff !important;
  }
}

.content-container {
  position: relative;
  z-index: 0;
}
</style>
