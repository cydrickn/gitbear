module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./app.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
