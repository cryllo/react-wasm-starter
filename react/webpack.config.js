const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");
const wasm = path.resolve(__dirname, "..", "wasm");

module.exports = {
	mode: "production",
	devtool: false,
	entry: {
		index: "./src/index.tsx",
	},
	output: {
		path: dist,
		filename: "[name].js",
		chunkFilename: "[name].chunk.js",
	},
	devServer: {
		static: dist,
	},
	experiments: {
		asyncWebAssembly: true,
	},
	performance: {
		hints: false,
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
		new CopyPlugin([path.resolve(__dirname, "static")]),
		new WasmPackPlugin({
			crateDirectory: wasm,
			outDir: path.resolve(wasm, "pkg"),
			forceMode: "production",
		}),
	],
};
