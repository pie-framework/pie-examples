 
  //auto generated on: Wed Nov 14 2018 17:12:01 GMT+0200 (EET)
  
  module.exports = {
  "module": {
    "rules": [
      {
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "modules": false
            }
          }
        ]
      },
      {
        "test": /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        "use": [
          {
            "loader": "url-loader",
            "options": {
              "limit": 10000
            }
          }
        ]
      },
      {
        "test": /\.less$/,
        "use": [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        "test": /\.(jsx)?$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "babelrc": false,
              "presets": [
                "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules/babel-preset-react/lib/index.js",
                "/Users/elod/KDS/pie-examples/node_modules/babel-preset-env/lib/index.js",
                "/Users/elod/KDS/pie-examples/node_modules/babel-preset-stage-0/lib/index.js"
              ]
            }
          }
        ]
      }
    ]
  },
  "resolveLoader": {
    "modules": [
      "/Users/elod/KDS/pie-examples/docs/function-entry/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  },
  "context": "/Users/elod/KDS/pie-examples/docs/function-entry/.pie",
  "entry": "./default.configure.entry.js",
  "output": {
    "filename": "pie-configure.js",
    "path": "/Users/elod/KDS/pie-examples/docs/function-entry"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/elod/KDS/pie-examples/docs/function-entry/.pie/.configure/node_modules",
      "/Users/elod/KDS/pie-examples/docs/function-entry/.pie/.controllers/node_modules",
      "/Users/elod/KDS/pie-examples/docs/function-entry/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  }
};
  