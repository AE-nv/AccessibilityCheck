
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        eslint: {
            target: ['Standards/**/*.js', 'Contrib/PhantomJS/*.js']
        },
        uglify: {
            debug: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    preserveComments: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Contrib/polyfills/index.js', 'Contrib/html2canvas/html2canvas.min.js', 'Contrib/Tesseract/tesseract.min.js', 'Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js'],
                    'build/polyfills.js': ['Contrib/polyfills/promise.min.js', 'Contrib/polyfills/fetch.min.js'],
                    'build/promise.js': ['Contrib/polyfills/promise.min.js'],
                    'build/fetch.js': ['Contrib/polyfills/fetch.min.js']
                }
            },
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Contrib/polyfills/index.js', 'Contrib/html2canvas/html2canvas.min.js', 'Contrib/Tesseract/tesseract.min.js', 'Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js'],
                    'build/polyfills.js': ['Contrib/polyfills/promise.min.js', 'Contrib/polyfills/fetch.min.js'],
                    'build/promise.js': ['Contrib/polyfills/promise.min.js'],
                    'build/fetch.js': ['Contrib/polyfills/fetch.min.js']
                }
            },
            bookmarklet: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/header-bookmarklet.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Contrib/polyfills/index.js', 'Contrib/html2canvas/html2canvas.min.js', 'Contrib/Tesseract/tesseract.min.js', 'Translations/*.js', 'Standards/**/*.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/Auditor_with_beacon.js'],
                    'build/polyfills.js': ['Contrib/polyfills/promise.min.js', 'Contrib/polyfills/fetch.min.js'],
                    'build/promise.js': ['Contrib/polyfills/promise.min.js'],
                    'build/fetch.js': ['Contrib/polyfills/fetch.min.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/HTMLCSAuditor.css',
                        rename: function (dest, src) {
                            return dest + '/HTMLCS.css';
                        },
                        dest: 'build',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/Images/*',
                        dest: 'build/Images',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'licence.txt',
                        dest: 'build',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.file.setBase('./');
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('build', ['uglify:dist', 'copy:dist']);
    grunt.registerTask('build-bookmarklet', ['uglify:bookmarklet', 'copy:dist']);

    return grunt.registerTask('build-debug', ['uglify:debug', 'copy:dist']);
};
