<template>
  <h1 class="modal-title">Create/edit a swap</h1>

  <div v-if="!isInit">
    <SwappLoader />
  </div>
  
  <div class="form-container" v-else>
    <div class="create-form">
      <div 
        class="form-input-cover"
        :class="{ error : validationErrors.indexOf('deckIn') > -1 }"
      >
        <div class="form-input-legend">
          Deck in *
          <span 
            class="validation-hint"
            v-if="validationErrors.indexOf('deckIn') > -1">
              - this field is required
          </span>
        </div>
        <VueMultiselect 
          v-model="intForm.deckIn" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
          @open="clearFromValidation('deckIn')"
        ></VueMultiselect>
      </div>

      <div class="form-input-cover">
        <div class="form-input-legend">Deck out</div>
        <VueMultiselect 
          v-model="intForm.deckOut" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
        ></VueMultiselect>
      </div>

      <div 
        class="form-input-cover"
        :class="{ error : validationErrors.indexOf('cardIn') > -1 }"
      >
        <div class="form-input-legend">
          Card in *
          <span 
            class="validation-hint"
            v-if="validationErrors.indexOf('cardIn') > -1"
          >
            - this field is required
          </span>
        </div>
        <VueMultiselect 
          v-model="intForm.cardIn" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
          @open="clearFromValidation('cardIn')"
        ></VueMultiselect>
      </div>
      
      <div class="form-input-cover">
        <div class="form-input-legend">Card out</div>
        <VueMultiselect 
          v-model="intForm.cardOut" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
        ></VueMultiselect>
      </div>
    </div>
  </div>

  <div class="modal-controls">
    <span class="api-error">{{ this.apiErrors }}</span>
    <button 
      class="form-button" 
      :class="{ disabled: isSending || !isInit }"
      @click="updateSwappItem"
      :disabled="isSending || !isInit"
    >
      <SwappLoaderButton v-if="isSending" />
      <span v-else>Submit</span>
    </button>
    <button 
      class="form-button" 
      :class="{ disabled: isSending || !isInit }"
      @click="formChangesMade && isInit ? cancelChangesInForm() : closeModal()"
      :disabled="isSending || !isInit"
    >
      <SwappLoaderButton v-if="isSending" />
      <span v-else>Cancel</span>
    </button>
  </div>

</template>

<script>
import VueMultiselect from 'vue-multiselect'
import constants from '@/static/constants.js';
import cloneObject from '@/helpers/cloneObject.js';
import localStorageHelper from '@/helpers/localStorageHelper.js';
import SwappLoader from '@/components/SwappLoader.vue';
import SwappLoaderButton from '@/components/SwappLoaderButton.vue';

export default {
  name: 'CreateEditModal',
  components: {
    VueMultiselect,
    SwappLoader,
    SwappLoaderButton
  },
  data() {
    return {
      isInit: false,
      isSending: false,
      swappId: null,
      cardNames: null,
      requiredFields: ['cardIn', 'deckIn'],
      validationErrors: [],
      apiErrors: null,
      extForm: {
        deckIn: null,
        deckOut: null,
        cardIn: null,
        cardOut: null
      },
      intForm: null
    }
  },
  methods: {
    init() {
      if (this.$store.getters.modalPayload) {
        this.swappId = this.$store.getters.modalPayload;
        const itemInStorage = localStorageHelper.getLocalStorage(this.swappId);
        for (let key in this.extForm) {
          this.extForm[key] = itemInStorage[key]?.name
        }
      }
      this.intForm = cloneObject(this.extForm);
      this.isInit = true;
    },
    cancelChangesInForm() {
      this.apiErrors = null;
      this.validationErrors = [];
      this.intForm = cloneObject(this.extForm);
    },
    closeModal() {
      this.$store.commit('closeModal');
    },
    getCardNames() {
      if (localStorageHelper.getLocalStorage('cardNames')) {
        this.cardNames = localStorageHelper.getLocalStorage('cardNames');
        this.init();
      } else {
        const storageTime = 3600000;
        fetch(`${constants.API_URL}/catalog/card-names`)
        .then(response => {
          if(response?.ok) {
            return response.json()
          }
          throw new Error('Something went wrong. Please try again');
        })
        .then(json => this.cardNames = json.data)
        .then(() => {
          localStorageHelper.setLocalStorage('cardNames', this.cardNames, storageTime)
          this.init();
        })
        .catch(error => {
          this.apiErrors = 'Something went wrong. Please try again';
          console.log(error);
        });
      }
    },
    generateSwappId() {
      return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    },
    validateRequiredFields() {
      this.validationErrors = [];
      this.requiredFields.forEach(item => {
        if (!this.intForm[item]) {
          this.validationErrors.push(item);
          this.isSending = false;
        }
      })
    },
    clearFromValidation(field) {
      if (this.validationErrors.indexOf(field) > -1) {
        this.validationErrors.splice(this.validationErrors.indexOf(field), 1);
      }
    },
    updateSwappItem() {
      this.isSending  = true;

      let objectForSend = {};
      async function getFullCardData(cardName, field) {
        if(cardName) {
          await fetch(`${constants.API_URL}/cards/named?exact=${cardName}`)
          .then(response => {
            if (response?.ok) {
              return response.json()
            }
            throw new Error('Something went wrong. Please try again');
          })
          .then((json) => {
            objectForSend[field] = json;
          })
          .catch((error) => {
            console.log(error)
            this.apiErrors = 'Something went wrong. Please try again';
          })
        } else {
          objectForSend[field] = null;
        }
      }

      let promises = [];
      for (const key in this.intForm) {
          promises.push(new Promise((resolve) => {
          resolve(getFullCardData(this.intForm[key], key));
        }))
      }

      this.validateRequiredFields();
      let actionMessage;

      if (!this.validationErrors.length) {
        if (!this.swappId) {
          actionMessage = 'Swap created'
          this.swappId = this.generateSwappId();
        } else {
          actionMessage = 'Swap updated'
        }

        Promise.all(promises)
        .then(() => {
          objectForSend.created = Date.now();
          localStorageHelper.setLocalStorage(this.swappId, objectForSend);
          this.isSending = false;
          this.$store.commit('closeModal');
          this.$store.commit('triggerReInitFlag');
          this.$store.commit('triggerActionsMessage', actionMessage)
        })
        .catch((error) => {
          this.isSending = false;
          console.log(error);
          this.apiErrors = 'Something went wrong. Please try again';
        })
      }
      
    }
  },
  computed: {
    formChangesMade() {
      return JSON.stringify(this.intForm) !== JSON.stringify(this.extForm);
    }
  },
  mounted() {
    this.getCardNames();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style src="@/assets/styles/multiselect_custom.less" lang="less"></style>
<style lang="less" scoped>
  .form-input-cover {
    box-sizing: border-box;

    & + & {
      margin-top: 30px;
    }
  }

  .validation-hint {
    color: var(--color-error);
  }

  .form-input {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 4px 0;
    font-size: 22px;
    border: none;
    border-bottom: 2px solid var(--color-main);

    &:focus {
      outline: none;
      border-bottom: 2px solid var(--color-secondary);
    }
  }

  .form-input-legend {
    font-size: 14px;
    color: var(--color-secondary);
  }

  .api-error {
    color: var(--color-error);
    line-height: 36px;
    font-size: 14px;
  }

  @media (max-width: 576px) {
    .api-error {
      line-height: 16px;
    }
  }
</style>