# varia

An open-source music discord bot written in Typescript.

#

## Development

#### Yarn Scripts (uses yarn-1 not the latest yarn-2 berry project)

- **yarn build**: deletes previous build folder (`./dist`) and rebuilds project (`production`)
- **yarn start**: builds the project with `yarn build` and starts the bot with `node dist/index.js` (`production`)
- **yarn run start:dev**: start the bot with nodemon (`development`)
- **yarn run lint**: lints the project (`development`)
- **yarn run lint:fix**: lints the project and fixes any errors (`development`)

#

## Usage

#

Command List

- **/play | /p** play a song by using a youtube url or a song name
- **/queue | /q** queue a song at the end of the queue by using a youtube url or a song name
- **/skip | /s** skips the current song being played
- **/pause** pauses a song (resumable)
- **/stop | /s** stop the current song being played (non-resumable)
- **/view-queue | /vq** look at the current queue
- **/help | /h** get the command list and other information about the bot
