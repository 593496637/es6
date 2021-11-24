const Mocha = require('mocha')
const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: './docs/mochawesome-report',
    quiet: true,
  }
})

mocha.addFile("./tests/services/index.spec.js")

mocha.run(function (err) {
  console.log('All done');
  process.exit()
})