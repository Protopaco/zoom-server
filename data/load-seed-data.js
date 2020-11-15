const client = require("../lib/client");
// import our seed data:
const meetings = require("./meetings.js");
// const usersData = require('./users.js');
const { getEmoji } = require("../lib/emoji.js");

run();

async function run() {
  try {
    await client.connect();

    // const users = await Promise.all(
    //   usersData.map(user => {
    //     return client.query(`
    //                   INSERT INTO users (email, hash)
    //                   VALUES ($1, $2)
    //                   RETURNING *;
    //               `,
    //     [user.email, user.hash]);
    //   })
    // );

    // const user = users[0].rows[0];

    await Promise.all(
      meetings.map((meeting) => {
        return client.query(
          `
                    INSERT INTO meetings (user_token, chat_url, timeline_url, video_url)
                    VALUES ($1, $2, $3, $4);
                `,
          [
            meeting.user_token,
            meeting.chat_url,
            meeting.timeline_url,
            meeting.video_url,
          ]
        );
      })
    );

    console.log("seed data load complete", getEmoji(), getEmoji(), getEmoji());
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}
