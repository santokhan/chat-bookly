<script setup>
import { onMounted, ref } from 'vue';
import BusinessLayout from '@/layouts/components/BusinessLayout.vue'

let phnId = "";
let wId = "";
const isSetupLoading = ref(false);

const appId = import.meta.env.VITE_META_APP_ID;
const configId = import.meta.env.VITE_META_CONFIG_ID;

onMounted(() => {
  window.fbAsyncInit = function () {
    // JavaScript SDK configuration and setup
    FB.init({
      appId: appId, // Facebook App ID
      cookie: true, // enable cookies
      xfbml: true, // parse social plugins on this page
      version: "v20.0", // Graph API version
    });
  };

  // Load the JavaScript SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
});

const sessionInfoListener = (event) => {
  if (event.origin !== "https://www.facebook.com" && event.origin !== "https://web.facebook.com") {
    return;
  }

  try {
    const data = JSON.parse(event.data);
    if (data.type === "WA_EMBEDDED_SIGNUP") {
      // if user finishes the Embedded Signup flow
      if (data.event === "FINISH") {
        const { phone_number_id, waba_id } = data.data;
        console.log("PhoneNumber ID :: ", phone_number_id);
        console.log("waba_id :: ", waba_id);
        phnId = phone_number_id;
        wId = waba_id;
      }
      // if user cancels the Embedded Signup flow
      else {
        const { current_step } = data.data;
      }
    }
  } catch {
    // Don’t parse info that’s not a JSON
    console.log("Non JSON Response", event.data);
  }
};

function launchWhatsAppSignup() {
  window.addEventListener("message", sessionInfoListener);

  // Conversion tracking code
  if (typeof fbq !== "undefined") {
    fbq("trackCustom", "WhatsAppOnboardingStart", {
      appId: appId,
      feature: "whatsapp_embedded_signup",
    });
  }

  // Launch Facebook login
  FB.login(
    function (response) {
      if (response.authResponse) {
        isSetupLoading.value = true;
        console.log(response.authResponse);
        // setTimeout(() => {
        //   router.post(
        //     "/whatsapp/exchange-code",
        //     {
        //       token: response.authResponse.code,
        //       phone_number_id: phnId,
        //       waba_id: wId,
        //       app_id: props.appId,
        //       access_token: "needtogenerate",
        //     },
        //     {
        //       preserveState: false,
        //     }
        //   );
        // }, 500);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },
    {
      config_id: configId, // configuration ID goes here
      response_type: "code", // must be set to 'code' for System User access token
      override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
      extras: {
        sessionInfoVersion: 2,
        setup: {
          // Prefilled data can go here
        },
      },
    }
  );
}
</script>

<template>
  <BusinessLayout>
    <VContainer
      fluid
      class="d-flex align-center justify-center fill-height"
      style="min-height: 80vh;"
    >
      <VCard
        class="pa-8 d-flex flex-column align-center justify-center"
        max-width="70vh"
        elevation="8"
      >
        <h2 class="text-center mb-2">Connect your business with WhatsApp</h2>
        <h4 class="text-center mb-4 font-weight-regular">Easily reach your customers and manage conversations</h4>
        <div class="mb-2 text-center">
          <p>
            Integrate your business with WhatsApp to streamline communication and provide instant support to your clients.
          </p>
          <p>
            Connecting your business enables you to send updates, receive inquiries, and build stronger relationships with your customers.
          </p>
        </div>
        <VBtn color="primary" size="large" class="mt-4" block @click="launchWhatsAppSignup">
          Connect with WhatsApp
        </VBtn>
      </VCard>
    </VContainer>
  </BusinessLayout>
</template>
