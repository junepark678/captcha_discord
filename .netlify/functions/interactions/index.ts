import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
  } from 'discord-interactions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	const { type, id, data } = JSON.parse(event.body!);

    if (type === InteractionType.PING) {
        return { statusCode: 200, body: JSON.stringify({ type: InteractionResponseType.PONG }) };
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;
    
        // "test" command
        if (name === 'ping') {
            // Send a message into the channel where command was triggered from
            return {
                statusCode: 200,
                body: JSON.stringify({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'pong',
                    },
                }),
            }
        }
    }

    return {
        statusCode: 404
    }

};

export { handler };
