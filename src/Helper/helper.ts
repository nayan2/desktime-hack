
const sleep = (ms: number): Promise<any> => {
	return new Promise((resolve) => {
	  setTimeout(resolve, ms);
	});
};

const removeLines = (data: string, ...lines: number[]): string => {
	return data.split("\n").filter((_, index) => lines.indexOf(index) === -1).join("\n");
};

const removeLastLine = (data: string): string => {
	return data.split("\n").slice(1).join("\n");
};

const removeFirstLine = (data: string): string => {
	return data.split("\n").splice(0, 1).join("\n");
};

export { sleep, removeLines, removeLastLine, removeFirstLine };