const path = require(`path`)

const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      "@router": resolvePath("./src/router"),
      "@modules": resolvePath("./src/modules"),
      "@components": resolvePath("./src/components"),

      "@helpers": resolvePath("./src/shared/helpers"),
      "@utils": resolvePath("./src/shared/utils"),
      "@rejex": resolvePath("./src/shared/rejex"),
      "@lib": resolvePath("./src/shared/lib"),
      "@ui": resolvePath("./src/shared/ui"),
      "@hooks": resolvePath("./src/shared/hooks"),

      "@assets": resolvePath("./src/shared/assets"),
      "@styles": resolvePath("./src/shared/assets/styles"),

      "@context": resolvePath("./src/shared/context"),
      "@store": resolvePath("./src/shared/store"),

      "@data": resolvePath("./src/shared/data"),
    },
  },
}
