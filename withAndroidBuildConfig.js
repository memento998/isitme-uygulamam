// Android Gradle Plugin 8+ bazı ortamlarda BuildConfig üretimini varsayılan olarak
// kapatabildiği için (MainActivity.kt / MainApplication.kt içinde "Unresolved
// reference: BuildConfig" hatası), BuildConfig özelliğini her prebuild'de açıkça açar.
const { withAppBuildGradle, withGradleProperties } = require('@expo/config-plugins');

const GRADLE_PROPERTY_KEY = 'android.defaults.buildfeatures.buildconfig';

module.exports = function withAndroidBuildConfig(config) {
  // 1) Tüm modüller için global varsayılan: gradle.properties
  config = withGradleProperties(config, (config) => {
    const exists = config.modResults.some(
      (item) => item.type === 'property' && item.key === GRADLE_PROPERTY_KEY
    );
    if (!exists) {
      config.modResults.push({
        type: 'property',
        key: GRADLE_PROPERTY_KEY,
        value: 'true',
      });
    }
    return config;
  });

  // 2) Uygulama modülünde açıkça etkinleştir: android/app/build.gradle
  config = withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('buildConfig true')) {
      config.modResults.contents = config.modResults.contents.replace(
        /\nandroid\s*\{/,
        '\nandroid {\n    buildFeatures {\n        buildConfig true\n    }'
      );
    }
    return config;
  });

  return config;
};
