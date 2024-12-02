module.exports = {
    devServer: {
        setupMiddlewares: (middlewares, devServer) => {
            return middlewares;
        },
    },
    resolve: {
        fallback: {
            "timers": require.resolve('timers-browserify'),
        },
    },
};
