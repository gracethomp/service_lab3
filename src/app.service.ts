import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class AppService {
  private readonly url = 'amqp://rabbitmq';
  private readonly queue = 'test_queue';
  private readonly responseQueue = 'response_queue';

  async sendMessage(message: string): Promise<void> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue, { durable: false });
    channel.sendToQueue(this.queue, Buffer.from(message));
    console.log(`Message sent: ${message}`);
    await channel.close();
    await connection.close();
  }

  async receiveMessage(): Promise<string> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.queue, { durable: true });

    const msg = await new Promise<string>((resolve) => {
      channel.consume(this.queue, (msg) => {
        if (msg !== null) {
          const message = msg.content.toString();
          channel.ack(msg);
          resolve(message);
        }
      });
    });

    await channel.close();
    await connection.close();

    return msg;
  }

  async receiveResponse(): Promise<string> {
    const connection = await amqp.connect(this.url);
    const channel = await connection.createChannel();
    await channel.assertQueue(this.responseQueue, { durable: true });

    const msg = await new Promise<string>((resolve) => {
      channel.consume(this.responseQueue, (msg) => {
        if (msg !== null) {
          const message = msg.content.toString();
          channel.ack(msg);
          resolve(message);
        }
      });
    });

    await channel.close();
    await connection.close();

    return msg;
  }
}
