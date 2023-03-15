import strings from "./strings.json" assert {type: "json"};

// regular expression for finding optional parameters
const re = /\$(\d+)/g;

// get string by path in json structure
// e.g. "auth.register.passwordWeakError"
export const str = (path, ...params) => {
	const separator = ".";
	let result;
	try {
		// split input to represent the properties in order to reach the desired string
		const steps = path.split(separator);
		// reduce object by going each time to a deeper level
		result = steps.reduce((route, currDepth) => route[currDepth], strings);
		if (typeof result !== "string") {

			throw new Error();
		}
	} catch (err) {
		// return error text. happens if:
		// tried to access undefined
		// partial path resulted in an object and didn't go all the way to the string
		// strings.json contains a non-string value somewhere
		return strings.strings.genericError;
	}
	// return result (if success)
	return result.replace(re, (m, iPlusOne) => {
		const i = Number(iPlusOne) - 1,
			param = params[i];
		return param ?? `$${iPlusOne}`;
	});
}