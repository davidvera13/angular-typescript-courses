will look for tsconfig.json

> tsc command will compile all typescript files

if we use different tsconfig file 

> tsc --project tsconfig-custom.json

we can override compiler option: 

> tsc --project tsconfig-custom.json --target es5

tsc compiles all files in a specific folder and subfolders. we can give a list of typescripts files to manage :

    {
        "compilerOptions": {
            "target": "ES5"
        },
        "files": [
            "src/test.ts",
            "src/test2.ts",
            "src/test4.ts",
            "src/test6.ts"
        ]
    }

We can also define path with regular expression to include or exclude scripts: 

    {
        "compilerOptions": {
            "target": "ES5"
        },
        "include": [
            "src/**/*"
        ],
        "exclude": [
            "src/**/*2*"
        ]
    }

We can set root dir and a destination folder : : 

    {
        "compilerOptions": {
            "target": "ES5",
            "rootDir": "src",
            "outDir": "dist"
        }
    }

module property:  

    "lib": [
      "ES5", "DOM"
    ]