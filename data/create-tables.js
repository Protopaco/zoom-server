const client = require("../lib/client");
const { getEmoji } = require("../lib/emoji.js");

// async/await needs to run in a function
run();

async function run() {
  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(` 
                CREATE TABLE meetings (
                    id SERIAL PRIMARY KEY NOT NULL,
                    user_token VARCHAR(512) NOT NULL,
                    chat_url VARCHAR(512),
                    timeline_url VARCHAR(512), 
                    video_url VARCHAR(512) 
            );
        `);

    console.log("create tables complete", getEmoji(), getEmoji(), getEmoji());
  } catch (err) {
    // problem? let's see the error...
    console.log(err);
  } finally {
    // success or failure, need to close the db connection
    client.end();
  }
}
