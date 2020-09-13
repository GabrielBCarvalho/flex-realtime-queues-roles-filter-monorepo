# Twilio Functions

## Setup

1. Copy the `.env.example` file and create a `.env` one. Provide your ACCOUNT_SID and AUTH_TOKEN, as well as the FLEX_TR_WORKSPACE_SID - The SID of the TaskRouter's Workspace used by flex.
2. Deploy these functions or run it locally using ngrok.
3. Set the webhook of the TaskRouter's Workspace used by Flex to call the `/taskrouter/event` function of this project. This function will update all the reserved tasks to save the `worker_sid` on its attributes, since it is needed to filter the task in the flex-plugin.
