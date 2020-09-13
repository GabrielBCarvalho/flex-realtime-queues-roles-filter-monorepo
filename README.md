# Flex Real-time Queues Roles Filter

## How to setup this project

1. Deploy or run the twilio-functions locally.
2. Configurate the Flex TaskRouter's Workspace Webhook to call the `/taskrouter/event` function
3. Deploy or run the flex-plugin locally. You can check the instructions to set up the plugin in its [README](flex-plugin/README.md).

## Limitations

There are some limitations that come within this plugin:

- Max number of workers per supervisor: 200 (limited by the [max number of registers](https://www.twilio.com/docs/sync/live-query#using-empty-string-for-wildcard-search) returned by the getItems() method in a liveQuery)
- Max number of queues per supervisor: 30 (limited by the [max number of items in an array](https://www.twilio.com/docs/sync/limits#sync-insights-client-limits) in a liveQuery expression)
- Max number of skills/teams per worker: 30 (limited by the [max number of operators](https://www.twilio.com/docs/sync/limits#sync-insights-client-limits) in a livequery expression)

If your workspace exceeds these limits, some of the data may not be shown in the queue monitoring.

## How it works

The flex plugin read a `json` file with an array of supervisors, where each supervisor has an email and an array of queues which they can visualize. Only these queues will be shown in the queue monitoring.

### Workers Count

The workers count filtering is made verifying the `selection attribute` defined in the plugin. As an example, consider that the attribute selected to make the filtering is an array named `teams`. If a supervisor has the `teams` attribute defined as `['Team 1', 'Team 2']`, he can visualize the status of every worker that also belongs to the Team 1 OR to the Team 2 (or both at the same time).

In the workers by queue count, this rule also applies. So the supervisor will be able to see the status of the workers that belong to at least one of these teams, although they cannot see the status of workers that also are in this queue but doesn't belong to any of these teams.

### Tasks Count

Primarily, the tasks are filtered by `queue`, so the supervisor will only be able to see tasks that are in one of the queues defined on the `supervisors.json` file. While the task is pending - in other words, while it is not assigned to any work - this is the only filter that is applied.

When the task is assigned to a worker, then another filter is applied: the task only counts for the supervisor if it is assigned to a worker that belongs to at least one of the supervisor's teams. So if the supervisor can see a queue that has workers who don't belong to any of their teams, then the task is not shown in the counting, even if it is in a queue that the supervisor can visualize.
