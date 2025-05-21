import { response } from "../utils/response";
import {sqsClient} from '../clients/sqsClient'
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { env } from "../config/env";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export async function handler(event : APIGatewayProxyEventV2){
  const {userId , filters} = JSON.parse(event.body ?? "")

  const command = new SendMessageCommand({
    QueueUrl : env.GENERATE_REPORT_QUEUE_URL,
    MessageBody: JSON.stringify({userId, filters})
  })

  await sqsClient.send(command)

  return response(200, {
      message: "The report is being generated, you will receive an email when its ready.",
    })
}
