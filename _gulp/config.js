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
            dev_dest: development + '/css/',

            critical: core + '/styles/critical.scss',
            critical_dest: app + '/_includes'
        },

        scripts: {
            src: core + '/scripts/**/*.js',
            mainFile: 'core.js',
            app_dest: app + '/js/',
            dev_dest: development + '/js/'
        },

        watch: {
            styles: [core + '/styles/{,*/}*.scss'],
            critical: [
                core + '/styles/critical.scss',
                core + '/styles/1-settings/{,*/}*.scss',
                core + '/styles/4-base/{,*/}*.scss',
                core + '/styles/3-generic/{,*/}*.scss',
            ],
            scripts: core + '/scripts/{,*/}*.js',
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
            app_dest: app + '/js/',
            dev_dest: development + '/js/'
        },

        modernizr: {
            dest: app + '/_scripts/libs'
        },

        responsive: {
            src: app + '/assets/images/responsive/{,*/}*.{jpg,png}',
            files: {
                // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
                '*.jpg': [{
                    width: 640,
                    rename: {
                        suffix: '-small',
                        extname: '.jpg',
                    },
                },
                {
                    width: 640 * 2,
                    rename: {
                        suffix: '-small@2x',
                        extname: '.jpg',
                    },
                },
                {
                    width: 1280,
                    rename: {
                        suffix: '-medium',
                        extname: '.jpg',
                    },
                },
                {
                    width: 1280 * 2,
                    rename: {
                        suffix: '-medium@2x',
                        extname: '.jpg',
                    },
                },
                {
                    width: 1400,
                    rename: {
                        suffix: '-large',
                        extname: '.jpg',
                    },
                },
                {
                    width: 1400 * 2,
                    rename: {
                        suffix: '-large@2x',
                        extname: '.jpg',
                    },
                },
                {
                    width: 640,
                    rename: {
                        suffix: '-small',
                        extname: '.webp',
                    },
                },
                {
                    width: 640 * 2,
                    rename: {
                        suffix: '-small@2x',
                        extname: '.webp',
                    },
                },
                {
                    width: 1280,
                    rename: {
                        suffix: '-medium',
                        extname: '.webp',
                    },
                },
                {
                    width: 1280 * 2,
                    rename: {
                        suffix: '-medium@2x',
                        extname: '.webp',
                    },
                },
                {
                    width: 1400,
                    rename: {
                        suffix: '-large',
                        extname: '.webp',
                    },
                },
                {
                    width: 1400 * 2,
                    rename: {
                        suffix: '-large@2x',
                        extname: '.webp',
                    },
                },
                // {
                //     // Compress, strip metadata, and rename original image
                //     rename: { suffix: ''},
                // }
                ],
            }
        },

        assets: {
            sprites: {
                create: app + '/assets/sprites/template.css',
                src:  app + '/assets/sprites//**/*.svg',
                dest: app + '/assets/sprites',

                copy_css_dest: core + '/styles/3-generic',
                copy_visuals_dest: development + '/assets/sprites'
            },

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
                sprites: app + '/assets/sprites/{,*/}*',
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
                src: [development + '/{,*/}*.html', '!build/development/styleguide/*.html'],
                dest: production,
                options: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            },

            css: {
                // src: development + '/css/*.css',
                group: [
                    development + '/css/core.css',
                    development + '/css/app.css'
                ],
                bundleFile: 'bundle.css',
                dest: production + '/css/',
                options: {},

                base64: {
                    options: {
                        baseDir: development,
                        extensions: ['png'],
                        maxImageSize: 20 * 1024, // bytes
                        debug: false
                    }
                },
            },

            js: {
                src: development + '/js/',
                headScript: 'vendor.js',
                bodyGroup: [
                    development + '/js/lib.js',
                    development + '/js/core.js',
                    development + '/js/app.js'
                ],
                bodyScript: 'bundle.js',
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
            },

            sprites: {
                src: development + '/assets/sprites/{,*/}*',
                dest: production + '/assets/sprites/'
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
