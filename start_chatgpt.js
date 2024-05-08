const fs = require('fs')
let run = [
  {
    method: "shell.run",
    params: {
      venv: "env",
      env: { "OPENAI_API_KEY": "{{local.key}}" },
      path: "app/backend",
      message: [
        "python -m openui"
      ],
      on: [{
        "event": "/http:\/\/\\S+/",   
        "done": true
      }]
    }
  },
  {
    method: "local.set",
    params: {
      url: "{{input.event[0]}}"
    }
  },
  {
    method: "proxy.start",
    params: {
      uri: "{{local.url}}",
      name: "Local Sharing"
    }
  }
]

let key = ""
try {
  key = fs.readFileSync("key.txt")
} catch (e) {
}
if (!key) {
  run = [
    {
      method: "input",
      params: {
        title: "OpenAI API Key",
        description: "Get the API key at https://platform.openai.com/login?launch",
        form: [{
          key: "key",
          title: "API Key",
          placeholder: "Set the API Key",
          value: key
        }]
      }
    },
    {
      method: "fs.write",
      params: {
        path: "key.txt",
        text: "{{input.key}}"
      }
    },
    {
      method: "fs.read",
      params: {
        path: "key.txt",
        encoding: "utf8"
      }
    },
    {
      method: "local.set",
      params: {
        key: "{{input}}"
      }
    }
  ].concat(run)
}

module.exports = { daemon: true, run }
