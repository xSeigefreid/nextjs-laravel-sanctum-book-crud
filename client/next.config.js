const webpack = require('webpack')

module.exports = {
    env: {
        headers: {
            'headers' :{
                'accept': 'application/json',
                'authentication': 'Bearer 1|dhA4wCv0pIFYLgun78HtjSgdQBXW4xo2SPcO7VvM'
            }
        },
        apiKey: 'Bearer 1|dhA4wCv0pIFYLgun78HtjSgdQBXW4xo2SPcO7VvM',
        url: 'http://127.0.0.1:8000/api',
        accept: 'application/json',
    },
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
            })
        )
        return config
    }
}
