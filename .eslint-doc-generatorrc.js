/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  configEmoji: [
    ["all", "🤓"],
    ["test", "🧪"],
    ["recommended", "☑️"],
    ["react", "🌐"],
    ["react-native", "⚛️"],
    ["redux", "🔄"],
    ["typeorm", "📦"],
  ],
  ignoreConfig: ["all", "test"],
  urlConfigs: "https://github.com/hokla-org/eslint-plugin-bug-shield",
};

module.exports = config;
