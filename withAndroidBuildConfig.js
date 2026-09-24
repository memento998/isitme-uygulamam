// Android Gradle Plugin 8+ bazı ortamlarda BuildConfig üretimini varsayılan olarak
// kapatabildiği için (MainActivity.kt / MainApplication.kt içinde "Unresolved
// reference: BuildConfig" hatası), BuildConfig özelliğini her prebuild'de açıkça açar.
const { withAppBuildGradle, withGradleProperties } = require('@expo/config-plugins');

const GRADLE_PROPERTY_KEY = 'android.defaults.buildfeatures.buildconfig';
const OPTIMIZED_RESOURCE_SHRINKING_KEY = 'android.r8.optimizedResourceShrinking';

function ensureGradleProperty(modResults, key, value) {
  const existing = modResults.find((item) => item.type === 'property' && item.key === key);
  if (existing) {
    existing.value = value;
    return;
  }
  modResults.push({ type: 'property', key, value });
}

module.exports = function withAndroidBuildConfig(config) {
  // 1) Tüm modüller için global varsayılan: gradle.properties
  config = withGradleProperties(config, (config) => {
    ensureGradleProperty(config.modResults, GRADLE_PROPERTY_KEY, 'true');
    // AGP 8.12: Play'in istediği optimize kaynak silme. AGP 9 zorunlu kılınmaz.
    ensureGradleProperty(config.modResults, OPTIMIZED_RESOURCE_SHRINKING_KEY, 'true');
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
    config.modResults.contents = config.modResults.contents.replace(
      'getDefaultProguardFile("proguard-android.txt")',
      'getDefaultProguardFile("proguard-android-optimize.txt")'
    );
    return config;
  });

  return config;
};
