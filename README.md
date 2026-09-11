# React + TypeScript + Vite

## Performance o'lchash

**Lighthouse'ni HECH QACHON `npm run dev` ustida ishlatmang.** Dev server modullarni
bundle qilmaydi, React'ning development build'ini beradi va devtools yuklaydi —
bu ~12 MB trafik demak. Lighthouse buni sekin tarmoqqa taqlid qilib o'lchaydi va
FCP ~4.9s / LCP ~9.4s ko'rsatadi. Bu ilovaning emas, dev server'ning natijasi.

Har doim production build'ni o'lchang:

```bash
npm run perf     # build qiladi va http://localhost:4173 da preview ochadi
```

Keyin Lighthouse'ni `http://localhost:4173` ustida ishlating.

Joriy natijalar (production build):

| Metrika | Desktop | Mobile (4x CPU + Slow 4G) | Dev server |
| --- | --- | --- | --- |
| Performance | **100** | **99** | 55 |
| FCP | 0.4 s | 1.6 s | 4.9 s |
| LCP | 0.5 s | 1.7 s | 9.4 s |
| TBT | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 |
| Trafik | 117 KB | 117 KB | 11.9 MB |


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
