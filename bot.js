const mineflayer = require('mineflayer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("WARNING: This bot manager is intended for educational purposes only.");
console.log("Do not use this script for malicious activities such as spamming, hacking, or disrupting Minecraft servers.");
console.log("By using this script, you agree to use it responsibly and in compliance with all applicable laws and server policies.\n");

function generateBotName() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let name = '';
    for (let i = 0; i < 10; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

rl.question('Please enter the server IP address: ', (ipAddress) => {
    rl.question('Please enter the server port (e.g., 25565): ', (port) => {
        rl.question('Please enter the number of bots you want to connect: ', (num) => {
            const botCount = parseInt(num);
            
            if (isNaN(botCount) || botCount <= 0) {
                console.log('Please enter a valid number!');
                rl.close();
                return;
            }

            if (!ipAddress || isNaN(port)) {
                console.log('Please enter a valid IP address or port!');
                rl.close();
                return;
            }

            console.log(`\n[LOG] Connecting ${botCount} bots to server ${ipAddress}:${port}...\n`);

            for (let i = 0; i < botCount; i++) {
                const botName = generateBotName();

                const bot = mineflayer.createBot({
                    host: ipAddress,
                    port: port,
                    username: botName,
                    version: '1.12.2',
                    auth: 'offline'
                });

                bot.on('login', () => {
                    console.log(`[LOG] ${botName} successfully logged in`);
                    setTimeout(() => {
                        bot.chat('/reg minecraft4455 minecraft4455');
                        bot.chat('/l minecraft4455');
                        console.log(`[LOG] ${botName} successfully registered and logged in!`);
                    }, 3000);
                });

                bot.on('message', (message) => {
                    console.log(`[CHAT] ${botName}: ${message.toAnsi()}`);
                });

                bot.on('end', () => console.log(`[LOG] ${botName} disconnected from the server`));
                bot.on('error', (err) => console.log(`[ERROR] ${botName}:`, err));
            }

            rl.close();
        });
    });
});
