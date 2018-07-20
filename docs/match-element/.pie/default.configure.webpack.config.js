 
  //auto generated on: Fri Jul 20 2018 16:56:52 GMT+0300 (EEST)
  
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
      "/Users/elod/KDS/pie-examples/pies/match-element/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  },
  "context": "/Users/elod/KDS/pie-examples/pies/match-element/.pie",
  "entry": "./default.configure.entry.js",
  "output": {
    "filename": "pie-configure.js",
    "path": "/Users/elod/KDS/pie-examples/pies/match-element"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/elod/KDS/pie-examples/pies/match-element/.pie/.configure/node_modules",
      "/Users/elod/KDS/pie-examples/pies/match-element/.pie/.controllers/node_modules",
      "/Users/elod/KDS/pie-examples/pies/match-element/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  }
};
  