/** @param {NS} ns **/
export async function main(ns) {
  ns.disableLog("ALL");
  if(ns.args.length<2) {
    ns.print("Usage: attack.js <target> <threads>");
  }
  
  var target = ns.args[0];
  var threads = ns.args[1];
  let files = ["hack.js"];

  await ns.scp(files, target);
  if(ns.fileExists("BruteSSH.exe")) { ns.brutessh(target);}
  await ns.sleep(2000);
  ns.exec("backdoor",target);
  await ns.sleep(2000);
  ns.nuke(target);
  ns.exec("hack.js",target,threads);
  ns.print("Started hack on ", target);
}
