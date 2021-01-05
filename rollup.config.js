import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
    {
        input: 'src/testing-ga.js',
        output: {
            file: 'dist/test-ga.iife.js',
            format: 'iife',
            exports: 'named',
            name: 'gatesting',
            strict: false
        },
        plugins: [
            resolve({
                browser: true
            }),
            commonjs()
        ]
    },
    {
        input: 'src/testing-ga.js',
        output: {
            file: 'dist/test-ga.common.js',
            format: 'cjs',
            exports: 'named',
            name: 'gatesting',
            strict: false
        },
        plugins: [
            resolve({
                browser: true
            }),
            commonjs()
        ]
    }
]