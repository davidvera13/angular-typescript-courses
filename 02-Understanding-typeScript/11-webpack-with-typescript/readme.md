How to reload dynamically changes in single typescript file 
> we can't use each time tsc app.ts
>  
> We should run: tsc app.ts --watch
> 
> or: tsc app.ts -w

We have to launch first : 
> npm run start


this won't work with more complex project with several files.
> run first : tsc --init
> 
> this generate tsconfig.json
> 
> npm run start
> 
> to compile all ts files, just run : tsc -w

### Adding web pack 
allow to orchestrate multiple ts & imports & optimize javascript code (minifying)

#### installing webpack

> run : npm i  --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

We added in package.json

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "lite-server",
        "build": "webpack"
    },
    ...
    "devDependencies": {
        "lite-server": "^2.6.1",
        "ts-loader": "^9.5.2",
        "typescript": "^5.7.3",
        "webpack": "^5.97.1",
        "webpack-cli": "^6.0.1",
        "webpack-dev-server": "^5.2.0"
    }


in webpack.config.js file in project root folder: 


const path = require('path');

    module.exports = {
        mode: 'development',
        entry: './src/app.ts',
        devServer: {
            static: [
                {
                    directory: path.join(__dirname),
                },
            ],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/',
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
    };


We also remove all extensions in imports (remove .js)

how to use it now ? 

> npm run build
> 
> We can replace "start": "webpack-dev-server",

We can have production profile: `webpack.config.prod.js`
We also need here : ` npm i  --save-dev clean-webpack-plugin `