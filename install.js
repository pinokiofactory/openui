module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/wandb/openui app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app/backend",
        message: [
          "pip install .",
          "pip install tiktoken"
        ],
      }
    },
    {
      method: "fs.link",
      params: {
        venv: "app/backend/env"
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
