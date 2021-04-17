# varia

An open-source discord music bot written in Typescript.

[![GitHub](https://img.shields.io/github/license/collinkleest/varia)](https://github.com/collinkleest/varia/blob/master/LICENSE)
![GitHub top language](https://img.shields.io/github/languages/top/collinkleest/varia)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/collinkleest/varia)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/collinkleest/varia/discord.js)
#

## Usage

#

Command List

- **/play | /p** play a song by using a youtube url or a song name
- **/queue | /q** queue a song at the end of the queue by using a youtube url or a song name
- **/skip | /s** skips the current song being played
- **/pause | /pa** pauses a song (resumable)
- **/volume | /v** raise or lower the volume
- **/stop | /s** stop the current song being played (non-resumable)
- **/queue | /vq** look at the current queue
- **/help | /h** get the command list and other information about the bot
- **/currentlyplaying | /cp | /playing | /playingnow** 
- **/reload | /r** reload a command

#

## Development

#### Yarn Scripts (uses yarn-1 not the latest yarn-2 berry project)

- **yarn build**: deletes previous build folder (`./dist`) and rebuilds project (`production`)
- **yarn start**: builds the project with `yarn build` and starts the bot with `node dist/index.js` (`production`)
- **yarn run start:dev**: start the bot with nodemon (`development`)
- **yarn run lint**: lints the project (`development`)
- **yarn run lint:fix**: lints the project and fixes any errors (`development`)


#

## Environment Vars

```
DISCORD_TOKEN=<discord bot token>
YT_API_KEY=<youtube/google developer api access key>
PORT=<port number for homepage>
```

#




## Todo List
- [x] implement skip functionality
- [x] implement play and queue if yt url is passed
- [x] create custom help command and documentation
- [x] required arguments stuff
- [ ] implement permissions
- [x] clean up queue
- [x] command reloading
- [x] command cooldowns
- [x] embeds for queue and play (https://discordjs.guide/popular-topics/embeds.html#embed-preview)
    - [x] queue duration
    - [x] queue size
- [x] playtime for queue and play
- [x] set activity if noting playing
- [ ] message reactions for pause / stop / skip (https://discordjs.guide/popular-topics/reactions.html#reacting-to-messages)
- [x] handling for multiple servers
- [ ] currently playing command with time
    - [ ] progress bar 
    - [x] thumbnail image
    - [ ] link
    - [x] status
- [x] stop command
- [x] clear queue command
- [x] currently playing command
    - [ ] checks against queue
- [ ] deployment
- [ ] front-end homepage for adding a server
