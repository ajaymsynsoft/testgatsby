module.exports = {
    siteMetadata: {
        title: `qrcode gatsby pwa`,
        description: `qrcode gatsby pwa`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-sharp`,       
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `qrcode gatsby`,
                short_name: `qrcode gatsby`,
                start_url: `/?pwa=1`,
                background_color: `#f7f0eb`,
                theme_color: `#a2466c`,
                display: `standalone`,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}