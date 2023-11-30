module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@/components': './src/components',
          '@/routes': './src/routes',
          '@/screens': './src/screens',
          '@/declaration': './src/declaration',
          '@/global': './src/global',
          '@/utility': './src/utility',
          '@/theme': './src/theme',
          '@/models': './src/models',
          '@/mocks': './src/mocks',
          '@/view_models': './src/view_models',
          '@/services': './src/services',
          '@/test': './src/test',
          '@/server': './src/test/server',
          '@/client': './src/client',
        },
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
      },
    ],
  ],
};
