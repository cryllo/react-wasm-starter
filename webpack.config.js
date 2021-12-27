const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
	mode: "production",
	entry: {
		index: "./react/src/index.tsx",
	},
	output: {
		path: dist,
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
	},
	devServer: {
		contentBase: dist,
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: "ts-loader" },
		],
	},
	plugins: [
		new CopyPlugin([path.resolve(__dirname, "react", "static")]),
		new WasmPackPlugin({
			crateDirectory: path.resolve(__dirname, "wasm"),
			outDir: path.resolve(__dirname, "wasm", "pkg"),
			forceMode: "production",
		}),
	],
};
