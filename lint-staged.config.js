module.exports = {
    '{src,web,scripts}/**/*.{js,ts,tsx}': 'eslint -c .eslintrc.js',
    '*.{js,jsx,ts,tsx,json,css,less,scss,md,xml}': 'prettier --write',
    'src/**/*.ts?(x)': () => 'tsc -p ./src/tsconfig.json --noEmit',
};

const a = 1;
