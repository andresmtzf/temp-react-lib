import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import sass from 'rollup-plugin-sass'
import packageJson from './package.json' assert { type: 'json' }

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
        //exports: 'named',
        //strict: false
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      commonjs({ include: 'src/**' }),
      typescript({ tsconfig: './tsconfig.json' }),
      sass({ insert: true }),
    ],
    external: ['react', 'react-dom', 'react-hook-form'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.scss$/],
  },
]
