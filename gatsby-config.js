module.exports = {
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-react-helmet`,
            options: {
                optionA: true,
                optionB: `Another option`,
            },
        },
    ],
}