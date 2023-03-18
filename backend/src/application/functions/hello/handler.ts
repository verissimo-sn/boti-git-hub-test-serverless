import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = async (event: APIGatewayProxyEvent) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
};
