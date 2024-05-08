module.exports = {
  daemon: true,
  run:[
    {
      method: "input",
      params: {
        title: "Set OpenAI API Key",
        description: "Set the API key to start. You can get the API key at https://platform.openai.com/login?launch",
        form: [{
          key: "key",
          placeholder: "Set the API Key",
          default: "{{args.key ? args.key : ''}}"
        }]
      }
    },
    {
      method: "local.set",
      params: {
        key: "{{input.key}}"
      }
    },
    {
      method: "fs.write",
      params: {
        path: "key.txt",
        text: "{{local.key}}"
      }
    },
    {
      id: "start",
      method: "shell.run",
      params: {
        venv: "env",
        env: { "OPENAI_API_KEY": "{{args.key ? args.key : local.key}}" },
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
}
