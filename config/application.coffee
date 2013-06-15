###
Exports an object that defines
all of the configuration needed by the projects'
depended-on grunt tasks.

You can find the parent object in: node_modules/lineman/config/application.coffee
###

module.exports = require(process.env['LINEMAN_MAIN']).config.extend 'application',
  ###
  Override application configuration here. Common examples follow in the comments.

  API Proxying
  During development, you'll likely want to make XHR (AJAX) requests to an API on the same
  port as your lineman development server. By enabling the API proxy and setting the port, all
  requests for paths that don't match a static asset in ./generated will be forwarded to
  whatever service might be running on the specified port.
  ###
  server:
    apiProxy:
      enabled: false
      host: 'localhost'
      port: 3000

  spec:
    options:
      growl: true

  editor:
    template: "<%= files.template.editor %>"
    dev:
      dest: "generated/editor.html"
      context:
        js: "js/app.js"
        css: "css/app.css"
    dist:
      dest: "dist/editor.html"
      context:
        js: "js/app.min.js"
        css: "css/app.min.css"

  appendTasks:
    common: ["editor:dev"]
    dist: ["editor:dist"]

  watch:
    editor:
      files: "<%= files.template.editor %>"
      tasks: ["editor:dev"]