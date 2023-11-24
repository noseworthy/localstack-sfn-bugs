import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
    console.log('quick lambda invoked');
    console.log('event: ', event);
    console.log('context: ', context);

    console.log('quick lambda finished');
    return {
        statusCode: 200,
        body: JSON.stringify({
        message: 'quick lambda finished',
        input: event,
        }, null, 2),
    };
}
