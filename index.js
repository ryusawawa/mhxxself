const Discord = require('discord.js-selfbot-v11');
require('dotenv').config();

const client = new Discord.Client();

// 5秒ごとにループさせる「変態的なクエスト状況」のリスト
const QUEST_STATUS = [
    { details: '【集会所G級】クエスト周回中', state: '狩猟対象: 鏖魔ディアブロス' },
    { details: '調合中...', state: 'もどりの玉 を量産しています' },
    { details: '【超特殊許可】クエスト', state: '狩猟対象: 青電主ライゼクス' },
    { details: '集会酒場「ホーンズ」', state: '炭鉱夫としてお守りを掘っています' },
    { details: 'キャンプ待機中', state: '秘薬を飲み忘れて乙りました 💀' }
];

// 指定されたアプリケーションID
const TARGET_APP_ID = '1555877264694972447';

client.on('ready', () => {
    console.log('--------------------------------------------------');
    console.log(` Wispbyte上で [${client.user.username}] ログイン成功！`);
    console.log(` MHXX（アプリID: ${TARGET_APP_ID}）の同期を開始します。`);
    console.log('--------------------------------------------------');

    let index = 0;
    const startTime = Date.now(); // 経過時間の起点

    setInterval(() => {
        const current = QUEST_STATUS[index];

        // 古いバージョン特有の、Discordサーバーへ直接リッチプレゼンスを送り込む力技
        client.user.setPresence({
            status: 'dnd', // 応答不可
            afk: false,
            activity: {
                application_id: TARGET_APP_ID,
                name: 'モンスターハンターダブルクロス',
                type: 'PLAYING',
                details: current.details,
                state: current.state,
                timestamps: {
                    start: startTime
                },
                assets: {
                    large_image: `mp:apps/${TARGET_APP_ID}/1234567890`,
                    large_text: 'モンスターハンターダブルクロス (MHXX)'
                }
            }
        }).catch(console.error);

        index = (index + 1) % QUEST_STATUS.length;
    }, 5000); // 5秒ループ
});

if (!process.env.TOKEN) {
    console.error("エラー: .env ファイルに TOKEN が設定されていません。");
    process.exit(1);
}

// 接続エラーが起きたときにプロセスを落とさず自動再接続を試みる記述
client.on('error', console.error);

client.login(process.env.TOKEN);
