import { Client, LocalAuth } from "whatsapp-web.js";

export const bot = new Client({
  authStrategy: new LocalAuth(),
  takeoverOnConflict: true,
});
