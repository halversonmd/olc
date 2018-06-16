<template>
  <b-container >
    <div class="row justify-content-center">
      <div class="col">
        <div class="row justify-content-center">
          <p>
            Please contact the site owner with questions or suggestions.
          </p>
        </div>
        <div class="row justify-content-center">
          <form class="needs-validation" @submit.prevent="submitForm">
            <div class="form-row form-group">
              <div class="col">
                <input v-model="formData.firstName" type="text" class="form-control" placeholder="First name" required>
              </div>
              <div class="col">
                <input type="text" class="form-control" v-model="formData.lastName" placeholder="Last name" required>
              </div>
            </div>
            <div class="row form-group">
              <div class="col">
                <input type="email" class="form-control" v-model="formData.email" placeholder="Email (optional)">
              </div>
            </div>
            <div class="row form-group">
              <div class="col w-100">
                <textarea class="form-control" v-model="formData.msg" rows="15" placeholder="Message" required></textarea>
              </div>
            </div>
            <div class="g-recaptcha" data-sitekey="6Lf9CF8UAAAAAH47T1lBJL3A_vro_jTf1zV8aOUQ" data-callback="onSuccess"></div>
            <br>
            <button id="contactSubmit" class="btn btn-primary" type="submit" disabled>Submit</button>
          </form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>

let api = require('../../src/api.js').default

export default {
  created () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
    recaptchaScript.async = true
    document.head.appendChild(recaptchaScript)

    let recaptchaSubmit = document.createElement('script')
    recaptchaSubmit.setAttribute('src', '../../static/js/' + api.env + '/recaptchaCtl.js')
    document.head.appendChild(recaptchaSubmit)
  },
  name: 'contact',
  data () {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        msg: '',
        ipInfo: ''
      }
    }
  },
  methods: {
    async submitForm () {
      this.formData.ipInfo = await api.clientInfoApi.getInfo()
      api.exec.formSubmit(this.formData)
      document.getElementById('contactSubmit').disabled = true
      alert('Your comment has been submitted')
    }
  }
}

</script>
