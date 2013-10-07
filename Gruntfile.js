module.exports = function(grunt) {

	grunt.initConfig({
		server: {
			port: 3000,
			base: './demo'
		},

		// Import package manifest
		pkg: grunt.file.readJSON('easy-select.jquery.json'),

		// Banner definitions
		meta: {
			banner: '/*\n' +
				' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
				' *  <%= pkg.description %>\n' +
				' *  <%= pkg.homepage %>\n' +
				' *\n' +
				' *  Made by <%= pkg.author.name %>\n' +
				//' *  Under <%= pkg.licenses[0].type %> License\n' +
				' */\n'
		},

		// Concat definitions
		concat: {
			dist: {
				src: ['src/jquery.easy-select.js'],
				dest: 'dist/jquery.easy-select.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		// Lint definitions
		jshint: {
			files: ['src/jquery.easy-select.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ['dist/jquery.easy-select.js'],
				dest: 'dist/jquery.easy-select.min.js'
			},
			options: {
				banner: '<%= meta.banner %>'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'dist/easy-select.css': 'src/easy-select.scss'
				}
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist',
				src: ['*.css', '!*.min.css'],
				dest: 'dist',
				ext: '.min.css'
			}
		},

		connect: {
			preview: {
				options: {
					port: 9001,
					base: '.',
					keepalive: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass', 'cssmin']);
	grunt.registerTask('preview', ['connect:preview']);
	grunt.registerTask('travis', ['jshint']);

};
