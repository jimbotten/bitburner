/** @param {NS} ns **/
export async function main(ns) {
	let result = ns.scan();
	let hl = ns.getHackingLevel();
	ns.tprint("Hacking Level: ", hl);
	//	ns.tprint(result);
	for (const serv of result) { await getHl(serv) };

	async function getHl(server) {
		let srhl = ns.getServerRequiredHackingLevel(server);
		if (srhl <= hl) {
			ns.tprint(server, " has required level ", srhl);
			await sendFiles(server);
			await ns.sleep(250);
			ns.tprint("Ensuring ports are opened");
			// if it needs more than 2 ports
			if (ns.getServerNumPortsRequired(server) <= 2) {
				ns.tprint("Let's nuke it");
				ns.nuke(server);
				//  TODO BACKDOOR
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
			let files= ["generalHack.script","gm.script","weakenit.js"];
			await ns.scp(files,target);
			ns.tprint("Placed files");
		}
}