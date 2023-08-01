import "dotenv/config";
import { Bot, Keyboard } from "grammy";
import { Io } from "./helper/Io.js";
import fs from "fs/promises";
const UserJs = new Io("../db/users.json");
const bot = new Bot(process.env["BOT_TOKEN"]);
const labels = ["Ro'yxatdan o'ting! 📝", "Account Kirish!"];
const buttonRows = labels.map((label) => [Keyboard.text(label)]);
const keyboard = Keyboard.from(buttonRows).resized();
bot.command("start", async (ctx) => {
  ctx.reply("Assalomu aleykum", {
    reply_markup: keyboard,
  });
  setTimeout(() => {
    ctx.reply("Royxatdan o'ting yoki Tizimga kiring!👇");
  }, 100);
  const read = await UserJs.read();
});

bot.on("message", async (ctx) => {
  if (ctx.msg.text === "Ro'yxatdan o'ting! 📝") {
    // let messages;
    const userId = ctx.msg.from.id;
    const firstName = ctx.msg.from.first_name;
    const lastName = ctx.msg.from.last_name;

    let newUser = {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
    };
    // messages = [...messages, newUser];
    // Xabarni JSON faylga yozish
    // writeDataToFile(messages);
  }
});
bot.start();
