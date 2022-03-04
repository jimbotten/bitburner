/** @param {NS} ns **/
export async function main(ns) {
	if (ns.args.length != 4) {
		ns.tprint("Usage: rrun.js <remote file> <targetHost> <threads> <target>");
	} else {
		ns.tprint("Running: ", ns.args[0], " <targetHost>", ns.args[1], " <threads>", ns.args[2], " <target>", ns.args[3]);
		let ret = ns.exec(ns.args[3], ns.args[1], ns.args[2], ns.args[3]);
		ns.tprint(ret);
	}
}