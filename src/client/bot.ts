import makeWASocket, { Browsers } from "@whiskeysockets/baileys";

const bot = new makeWASocket({
  browser: Browsers.ubuntu()
})
