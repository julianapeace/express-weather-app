const importEnv = require('import-env')

const config = importEnv(
    {
        name: 'GOOGLE_API_KEY',
        alias: 'GKEY',
        required: true
    },
    {
        name: 'DARK_SKY_API_KEY',
        alias: 'DARKSKYKEY',
        required: true
    },
    {
        name: 'DB',
        alias: 'DB',
        required: true
    }
)


module.exports = config
