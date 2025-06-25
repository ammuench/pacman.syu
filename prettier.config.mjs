export default {
  singleQuote: false,
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  singleAttributePerLine: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
