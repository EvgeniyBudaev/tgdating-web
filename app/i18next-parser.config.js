module.exports = {
  contextSeparator: "_",
  createOldCatalogs: true,
  defaultNamespace: "index",
  defaultValue: "Добавь сюда перевод!!!",
  indentation: 2,
  keepRemoved: false,
  keySeparator: ".",
  lexers: {
    hbs: ["HandlebarsLexer"],
    handlebars: ["HandlebarsLexer"],

    htm: ["HTMLLexer"],
    html: ["HTMLLexer"],

    mjs: ["JavascriptLexer"],
    js: ["JavascriptLexer"],
    ts: ["JavascriptLexer"],
    jsx: ["JsxLexer"],
    tsx: ["JsxLexer"],

    default: ["JavascriptLexer"],
  },
  lineEnding: "auto",
  locales: [
    "en",
    "ru",
    "ar",
    "be",
    "ca",
    "cs",
    "de",
    "es",
    "fi",
    "fr",
    "he",
    "hi",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "kk",
    "ko",
    "nl",
    "no",
    "pt",
    "sv",
    "uk",
    "zh",
  ],
  namespaceSeparator: ":",
  output: "app/i18n/locales/$LOCALE/$NAMESPACE.json",
  input: ["app/**/*.{tsx,ts,js,jsx}"],
  reactNamespace: false,
  sort: false,
  skipDefaultValues: false,
  useKeysAsDefaultValue: false,
  verbose: false,
  customValueTemplate: null,
};
