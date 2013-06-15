module.exports = (grunt) ->
  fs = require("fs")
  _ = grunt.util._

  grunt.registerTask "editor", "generates a editor html file for the project dist directory", (target) ->
    target = target || "dist"
    @requiresConfig("editor.template")
    @requiresConfig("editor.#{target}")
    template = grunt.config.get("editor.template")
    targetConfig = grunt.config.get("editor.#{target}")
    format = (grunt.config.get("editor.format") || extensionOf(template) || "html").toLowerCase()
    if format == "html"
      grunt.file.copy(template, targetConfig.dest)
    else
      source = grunt.file.read(template)
      context = _(grunt.config.get()).extend(targetConfig.context)
      grunt.file.write(targetConfig.dest, htmlFor(format, source, context))

    grunt.log.writeln("Editor HTML written to '#{targetConfig.dest}'")

  extensionOf = (fileName) ->
    _(fileName.match(/[^.]*$/)).last()

  htmlFor = (format, source, context) ->
    if _(["underscore", "us", "jst"]).include(format)
      _(source).template()(context)
    else if _(["handlebar", "hb", "handlebars"]).include(format)
      locateHandlebars().compile(source)(context)
    else
      ""

  locateHandlebars = ->
    handlebarsPath = process.cwd()+'/node_modules/handlebars'
    if fs.existsSync(handlebarsPath)
      require(handlebarsPath)
    else
      grunt.log.writeln('NOTE: please add the `handlebars` module to your package.json, as Lineman doesn\'t include it directly. Attempting to Handlebars load naively (this may blow up).').
      require("handlebars")
