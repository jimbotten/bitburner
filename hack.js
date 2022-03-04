/** @param {NS} ns **/
export async function main(ns) {
    await fullhack(ns);
}
export async function fullhack(ns) {
    var target = ns.args[0];
    var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
    var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
    if (!hasRootAccess(target)) {
        if (ns.fileExists("BruteSSH.exe", "home")) {
            ns.brutessh(target);
        }
        ns.nuke(target);
    }
    while (true) {
        await ns.sleep(500);
        if (ns.getServerSecurityLevel(target) > securityThresh) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}