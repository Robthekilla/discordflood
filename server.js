const port = 4000;

const express = require("express")
const Discord = require("discord.js")

const app = express()
var clients = []

const version = "tudbut.discordflood.public.release 0.2.1a"

const v = '<meta name="viewport" content="width=device-width height=device-height">' + version + "<br /><br />"
const style = "<title>DiscordFlood by TudbuT#2624 (" + version + ")</title><style>body {background-color: #2C2F33; color: #CCCCCC; font-family: Whitney, Arial} button {background-color: #99AAB5; color: #FFF; height: 2em; border-radius: 8px; border: 1px solid #2C2F33; cursor: pointer;} pre {color: #eee;background-color: #1C1F22;border-radius: 8px;} code pre {background-color: #1C1F22; border-bottom: 5px solid #303030;border-right: 5px solid #303030;  border-top: 5px solid #050505;  border-left: 5px solid #050505;} dembed pre {border-left: 5px solid #4f545c; background-color: #33353c;}</style><script>String.prototype.repl = function (o, n) {var result = this;result = result.split(o);result = result.join(n);return result;}</script>"



app.use("/", function (req, res) {
  const r = req.query
  if(!r.a || r.a == "add") {
    res.send(
      v +
      '<button type="button" onclick="window.location.href = `?a=add&token=${prompt(\'Token:\')}`">Add account</button>' +
      '<button type="button" onclick="window.location.href = `?a=list`">List</button>' +
      '<button type="button" onclick="window.location.href = `?a=actions`">Actions</button>' +
      style
    )
  }
  if(r.a == "add" && r.token) {
    const client = new Discord.Client()
    client.login(r.token)
    if(client.user) clients[clients.length] = client
  }

  if(r.a == "c") {
    clients = []
  }

  if(r.a == "list" || r.a == "c") {
    var result = '<button type="button" onclick="window.location.href = `?a=c`">Clear</button><br />'
    clients.forEach(client => {
      result = result + client.user.tag + `<br />`
    })
    res.send(v + '<button type="button" onclick="window.location.href = `?`">Main menu</button>' + result + style)
  }

  if(r.a == "actions" || r.a == "send" || r.a == "spam") {
    res.send(
      v +
      '<button type="button" onclick="window.location.href = `?`">Main menu</button>' +
      '<button type="button" onclick="window.location.href = `?a=send&channel=${prompt(\'ChannelID:\')}&message=${prompt(\'Message:\')}`">Send</button>' +
      '<button type="button" onclick="window.location.href = `?a=spam&guild=${prompt(\'GuildID:\')}&message=${prompt(\'Message:\')}&count=${prompt(\'Count:\')}`">Spam</button>' +
      style
    )
  }
  
  if(r.a == "send" && r.channel && r.message) {
    clients.forEach(client => {
      if(client.channels.find(c => c.id == r.channel))
        client.channels.find(c => c.id == r.channel).send(r.message)
    })
  }
  
  if(r.a == "spam" && r.guild && r.message && r.count) {
    for(var i = 0; i < new Number(r.count); i++)
    clients.forEach(client => {
      const g = client.guilds.find(g => g.id == r.guild)
      if(g) {
        g.channels.forEach(c => {
          c.send(r.message)
        })
        g.members.forEach(m => {
          m.user.send(r.message)
        })
      }
    })
  }
})


const listener = app.listen(port, function() { // open server
  console.log("Loaded DF " + version)
  console.log(`Go to any browser on THIS computer and open http://localhost:${port}`)
})
