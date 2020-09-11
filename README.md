# Flex Realtime Queues Roles Filter

## How to setup this project

1. Deploy or run the twilio-functions locally.
2. Configurate the Flex TaskRouter's Workspace Webhook to call the `/taskrouter/event` function
3. Deploy or run the flex-plugin locally. You can check the instructions to set up the plugin in its [README](flex-plugin/README.md).

## Limitations

There are some limitations that comes within this plugin:

* Max number of workers per supervisor: 200
* Max number of queues per supervisor: 30
* Max number of teams per worker: 30

If your workspace exceed these limits, some of the data may be not shown in the queue monitoring.