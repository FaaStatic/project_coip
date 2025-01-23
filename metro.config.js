const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
  {
    // for these option look javascript-obfuscator library options from  above url
    compact: false,
    sourceMap: false, // source Map generated after obfuscation is not useful right now so use default value i.e. false
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
  },
  {
    runInDev: false /* optional */,
    logObfuscatedFiles: true /* optional generated files will be located at ./.jso */,
  }
);

const configDefault = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  const projectRoot = __dirname;
  const monorepoRoot = path.resolve(projectRoot, '../..');

  // 1. Watch all files within the monorepo
  config.watchFolders = [monorepoRoot];
  // 2. Let Metro know where to resolve packages and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ];
  config.resolver.disableHierarchicalLookup = true;
  config.transformer.minifierPath = require.resolve('metro-minify-esbuild');
  config.transformer.minifierConfig = {
    mangle: {
      toplevel: true,
    },
    compress: {
      drop: ['console'],
    },
  };

  config.resolver.alias = {
    ...config.resolver.alias,
    '@untr/apps-coip': path.resolve(projectRoot, './'),
  };

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    after: [jsoMetroPlugin],
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();

module.exports = withNativeWind(configDefault, { input: './global.css' });
