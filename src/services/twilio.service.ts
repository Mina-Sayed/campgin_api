import twilio from 'twilio';

class TwilioService {
    private client: twilio.Twilio;

    constructor(accountSid: string, authToken: string) {
        this.client = twilio(accountSid, authToken);
    }

    async sendMessage(to: string, from: string, body: string): Promise<void> {
        try {
            await this.client.messages.create({
                body,
                to,
                from,
            });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

export default TwilioService;
