function buildConfig(env) {
	return require(`./webpack/${env.mode}.js`);
}

module.exports = buildConfig;