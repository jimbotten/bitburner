/** @param {NS} ns **/
export async function main(ns) {
	let result = ns.scan();
	let hl = ns.getHackingLevel();
	if (ns.args.length != 1) { ns.tprint("Pass one target argument"); ns.exit(); }
	var target = ns.args[0];
	for (const serv of result) { await getHl(serv) };

	async function getHl(server) {
		let srhl = ns.getServerRequiredHackingLevel(server);
		if (srhl <= hl) {
			// if it needs more than 2 ports
			if (ns.getServerNumPortsRequired(server) <= 2) {
				ns.tprint("Let's nuke it - ", server);
				ns.nuke(server);
//				await ns.installBackdoor(server);
				await ns.sleep(500);
				// how many instances
				let serverRAM = ns.getServerMaxRam(server);
				if(!ns.fileExists("generalHack.script",server)) { ns.tprint("Missing hack scripts"); ns.exit(); }
				let scriptRAM = ns.getScriptRam("generalHack.script",server);
				const inst = Math.floor(serverRAM/scriptRAM);
				ns.tprint("Running ", inst, " instances on ", server);
				let ret =  ns.exec("generalHack.script",server,inst,target);
	ns.tprint(ret);
			}
		}
	}
	async function sendFiles(target) {
		if (!ns.hasRootAccess(target)) {
			if (ns.fileExists("BruteSSH.exe", "home")) {
				ns.brutessh(target);
			}
			if (ns.fileExists("FTPCrack.exe", "home")) {
				ns.ftpcrack(target);
			}
		}
			let files= ["generalHack.script"];
			await ns.scp(files,target);
			ns.tprint("Placed files");
		}
}