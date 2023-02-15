<template>
  <h1 class="modal-title">Create/edit a swap</h1>

  <div class="form-container" v-if="isInit">
    <div class="create-form">

      <div class="form-input-cover">
        <div class="form-input-legend">Deck in</div>
        <VueMultiselect 
          v-model="intForm.deckIn" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
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

      <div class="form-input-cover">
        <div class="form-input-legend">Card in</div>
        <VueMultiselect 
          v-model="intForm.cardIn" 
          :options="cardNames"
          :close-on-select="true"
          :clear-on-select="false"
          :max-height="200"
          placeholder=""
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
    <button class="form-button" @click="updateSwappItem">Submit</button>
    <button class="form-button" @click="cancelChangesInForm">Cancel</button>
  </div>

</template>

<script>
import VueMultiselect from 'vue-multiselect'
import constants from '@/static/constants.js';
import cloneObject from '@/helpers/cloneObject.js';
import localStorage from '@/helpers/localStorage.js';

export default {
  name: 'CreateEditModal',
  components: {
    VueMultiselect
  },
  data() {
    return {
      isInit: false,
      swappId: null,
      cardNames: null,
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
        const itemInStorage = localStorage.getLocalStorage(this.swappId);
        for (let key in this.extForm) {
          this.extForm[key] = itemInStorage[key]?.name
        }
      }
      this.intForm = cloneObject(this.extForm);
      this.isInit = true;
    },
    cancelChangesInForm() {
      this.intForm = cloneObject(this.extForm);
    },
    getCardNames() {
      if (localStorage.getLocalStorage('cardNames')) {
        this.cardNames = localStorage.getLocalStorage('cardNames');
        this.init();
      } else {
        const storageTime = 3600000;
        fetch(`${constants.API_URL}/catalog/card-names`)
        .then(response => response.json())
        .then(json => this.cardNames = json.data)
        .then(() => {
          localStorage.setLocalStorage('cardNames', this.cardNames, storageTime)
          this.init();
        });
      }
    },
    generateSwappId() {
      return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, '');
    },
    
    updateSwappItem() {
      if (!this.swappId) {
        this.swappId = this.generateSwappId();
      }

      let objectForSend = {};
      async function getFullCardData(cardName, field) {
        if(cardName) {
          await fetch(`${constants.API_URL}/cards/named?exact=${cardName}`)
          .then(response => response.json())
          .then((json) => {
            objectForSend[field] = json;
          })
        } else {
          objectForSend[field] = null;
        }
      }

      let promises = [];
      for (const key in this.intForm) {
          promises.push(new Promise((resolve) => {
          resolve(getFullCardData(this.intForm[key], key))
        }))
      }

      Promise.all(promises).then(() => {
        localStorage.setLocalStorage(this.swappId, objectForSend);
        this.$store.commit('closeModal');
      });
    }
  },
  mounted() {
    this.getCardNames();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style src="@/static/multiselect_custom.less" lang="less"></style>
<style lang="less" scoped>
  .modal-title {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 40px 0;
  }

  .form-container {
    margin-bottom: 20px;
  }

  .form-input-cover {
    box-sizing: border-box;

    & + & {
      margin-top: 30px;
    }
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

  .modal-controls {
    display: flex;
    justify-content: flex-end;
    gap: 6px;

  }

  .form-button {
    border: none;
    background-color: transparent;
    font-size: 16px;
    padding: 8px 10px;
    border: 1px solid var(--color-main);
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      transition: all var(--main-transition);
    }
  }
</style>