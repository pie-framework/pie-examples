 
  //auto generated on: Thu Jul 26 2018 21:06:09 GMT+0300 (EEST)
  
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
      "/Users/elod/KDS/pie-examples/docs/graph-lines/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  },
  "context": "/Users/elod/KDS/pie-examples/docs/graph-lines/.pie",
  "entry": "./client.entry.js",
  "output": {
    "filename": "pie-view.js",
    "path": "/Users/elod/KDS/pie-examples/docs/graph-lines"
  },
  "resolve": {
    "extensions": [
      ".js",
      ".jsx"
    ],
    "modules": [
      "/Users/elod/KDS/pie-examples/docs/graph-lines/.pie/.configure/node_modules",
      "/Users/elod/KDS/pie-examples/docs/graph-lines/.pie/.controllers/node_modules",
      "/Users/elod/KDS/pie-examples/docs/graph-lines/.pie/node_modules",
      "node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-less/node_modules",
      "/Users/elod/KDS/pie-examples/node_modules/pie-support-react/node_modules"
    ]
  }
};
  