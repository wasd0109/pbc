import colors from "vuetify/es5/util/colors";
// const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3000/'
//     : '/arsen8848.github.io/';
export default {
  // target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - pbc",
    title: "pbc",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // router: {
  //   base: '/'
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios","@nuxtjs/auth-next"],
  auth: {
    scheme: 'refresh',
    token: {
      property: 'access_token',
      maxAge: 1800,
      global: true,
      // type: 'Bearer'
    },
    // refreshToken: {
    //   property: 'refresh_token',
    //   data: 'refresh_token',
    //   maxAge: 60 * 60 * 24 * 30
    // },
    user: {
      property: 'user',
    },
    redirect: {
      login: "/login",
      home: "/",
      callback: false,
      logout: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'https://t2meet.bubbleapps.io/version-test/api/1.1/wf/login', method: 'post', propertyName: 'token' },
          logout: { url: 'https://t2meet.bubbleapps.io/version-test/api/1.1/wf/logout', method: 'post' },
          user: { url: 'https://t2meet.bubbleapps.io/version-test/api/1.1/wf/currentuser', method: 'get' }
        }
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
