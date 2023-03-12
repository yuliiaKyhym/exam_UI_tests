const { defineConfig } = require("cypress")
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: "https://juice-shop-sanitarskyi.herokuapp.com",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
})
