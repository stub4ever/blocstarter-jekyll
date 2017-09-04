/*------------------------------------*\
    # CONFIG
\*------------------------------------*/

const core              = '_core';
const app               = 'app';
const development       = 'build/development';
const production        = 'build/production';

// =============================================================================
// Server URL
// =============================================================================
const developmentServerURL  = ''; // example: http://sitename.local
const developmentPort = 3010;

const productionServerURL  = '';
const productionPort = 4010;


// =============================================================================
// PATH SETTINGS
// =============================================================================

module.exports = {

    // CONFIG CORE FOLDER
    core: {
        path: core,

        styles: {
            src: core + '/styles/core.scss',
            app_dest: app + '/css/',
            dev_dest: development + '/css/'
        },

        scripts: {
            src: core + '/scripts/**/*.js',
            mainFile: 'core.js',
            dest: development + '/js/'
        },

        watch: {
            styles: core + '/styles/{,*/}*.scss',
            scripts: core + '/scripts/{,*/}*.js'
        }
    },

    // CONFIG SOURCE FOLDER
    source: {
        path: app,
    },

    // CONFIG DEVELOPMENT
    development: {
        path: development,

        jekyll: {
            src: app,
            dest: development,
            config: '_config.yml,_config.dev.yml'
        },

        styles: {
            src: app + '/_styles/app.scss',
            app_dest: app + '/css/',
            dev_dest: development + '/css/'
        },

        scripts: {
            src: app +'/_scripts/{,*/}*.js',
            mainFile: 'app.js',
            dest: development + '/js/'
        },

        modernizr: {
            dest: app + '/_scripts/libs'
        },


        assets: {

            images: {
                src:  app + '/assets/images/{,*/}*.{jpg,jpeg,png,gif}',
                dest: development + '/assets/images/'
            },

            fonts: {
                src: app + '/assets/fonts/{,*/}*',
                dest: development + '/assets/fonts/'
            },

            icons: {
                src: app + '/assets/icons/{,*/}*',
                dest: development + '/assets/icons/'
            }
        },

        browsersync: {
            baseDir: development,
            proxy: developmentServerURL,
            port: developmentPort
        },

        watch: {
             jekyll: [
                '_config.yml',
                app + '_config.build.yml',
                app + '/_data/**/*.{json,yml,csv}',
                app + '/_includes/**/**/*.{html,xml}',
                app + '/_pages/**/*.html',
                app + '/_layouts/*.html',
                app + '/_plugins/*.rb',
                app + '/_posts/*.{markdown,md}',
                app + '/**/*.{html,markdown,md,yml,json,txt,xml}',
                app + '/*'
            ],
            kss: app + '/_kss_styleguide/{,*/}*.{hbs,html,scss,js,md}',

            styles:  app + '/_styles/{,*/}*.scss',
            scripts: app + '/_scripts/{,*/}*.js',

            assets: {
                images: app + '/assets/images/{,*/}*',
                fonts: app + '/assets/fonts/{,*/}*',
                icons: app + '/assets/icons/{,*/}*'
            }
        }
    },

    // CONFIG PRODUCTION
    production: {
        path: production,

        jekyll: {
            src:    app,
            dest:   production,
            config: '_config.yml'
        },

        optimize: {
            html: {
                src: development + '/*.html',
                dest: production,
                options: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            },

            css: {
                src: development + '/css/*.css',
                dest: production + '/css/',
                options: {}
            },

            scripts: {
                src: development + '/js/*.js',
                dest: production + '/js/',
                options: {}
            },

            images: {
                src: development + '/assets/images/{,*/}*.{jpg,jpeg,png,gif}',
                dest: production + '/assets/images/',
                options: {
                    optimizationLevel: 3,
                    progessive: true,
                    interlaced: true
                }
            }
        },

        base64: {
            src: development + '/css/*.css',
            dest: production + '/css/',
            options: {
                baseDir: production,
                extensions: ['png'],
                maxImageSize: 20 * 1024, // bytes
                debug: false
            }
        },

        copy: {
            fonts: {
                src: development + '/assets/fonts/{,*/}*',
                dest: production + '/assets/fonts/'
            },

            icons: {
                src: development + '/assets/icons/{,*/}*',
                dest: production + '/assets/icons/'
            }
        },

        revision: {
            src: {
                assets: '/{,*/}*.{css,js}',
                html: '/**/*.html'
            },

            dest: {
                manifest: {
                    name: 'manifest.json',
                    path: production
                }
            }
        },

        gzip: {
            src: production + '/**/*.{html,xml,json,css,js}',
            dest: production,
            ignore: '*!manifest.json',
            options: {
                gzip: true
            }
        },

        browsersync: {
            baseDir: production,
            proxy: productionServerURL,
            port: productionPort
        },
    }
};
