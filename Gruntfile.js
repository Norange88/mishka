"use strict";

module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt); 

	grunt.initConfig({
		sass: {
			style: {
				files: {
					"css/style.css": "sass/style.scss"
				}
			}
		},

		postcss: {
			style: {
				options: {
					processors: [
						require("autoprefixer")({browsers: [
							"last 1 version",
							"last 2 Chrome versions",
							"last 2 Firefox versions",
							"last 2 Opera versions",
							"last 2 Edge versions"
						]}),
						require("css-mqpacker")({
							sort: false
						})
					]
				},
				src: "css/*.css"
			}
		},

		browserSync: {
			server: {
				bsFiles: {
					src: [
						"*.html",
						"css/*.css"
					]
				},
				options: {
					server: ".",
					watchTask: true,
					notify: false,
					open: true,
					ui: false
				}
			}
		},

		watch: {
			style: {
				files: ["sass/**/*.{scss,sass}"],
				tasks: ["sass", "postcss"],
				options: {
					spawn: false
				}
			}
		},

		copy: {
			build: {
				files: [{
					expand: true,
					src: [
						"fonts/**/*.{woff,woff2}",
						"img/**",
						"js/**",
						"*.html"
					],
					dest: "build"
				}]
			}
		},

		clean: {
			build: ["build"]
		},

		csso: {
			compress: {
				files: {
					"build/css/style.min.css": ["build/css/style.css"]
				}
			}
		},

		uglify: {
			compress: {
				files: {
					"build/js/main.min.js": ["build/js/main.js"]
				}
			}
		},

		imagemin: {
			images: {
				options: {
					optimizationlevel: 3
				},
				files: [{
					expand: true,
					src: ["build/img/**/*{.jpg,png,gif}"]
				}]
			}
		},

		svgstore: {
			options: {
				svg: {
					style: "display:none"
				}
			},
			symbols: {
				files: {
					"build/img/symbols.svg": ["img/icons/*svg"]
				}
			}
		},

		svgmin: {
			symbols: {
				files: {
					src: ["build/img/icons/*.svg"]
				}
			}
		}

	});

	grunt.registerTask("serve", ["browserSync", "watch"]);
	grunt.registerTask("symbols", ["svgmin", "svgstore"]);
	grunt.registerTask("build", [
		"clean",
		"copy",
		"sass",
		"postcss",
		"csso",
		"uglify",
		"symbols",
		"imagemin"
	]);
};
