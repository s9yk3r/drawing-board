const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            scss: {
                // loading bootstrap overriding scss and other scss files
                additionalData: `
                    @import "@/styles/_mixins.scss";
                    @import "@/styles/main.scss";
                `,
            }
        }
    }
})
