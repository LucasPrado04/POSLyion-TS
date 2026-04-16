import { Injectable } from '@nestjs/common';
import Stripe = require('stripe');
import { envs } from '../configs';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';


@Injectable()
export class PaymentsService {

    private readonly stripeClient = new Stripe(envs.stripeTestingSecretKey);

    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {

        const { currency, items, orderId } = paymentSessionDto

        const session = await this.stripeClient.checkout.sessions.create({
            // Poner ID de mi orden de compra
            payment_intent_data: {
                metadata: {
                    orderId,
                },
            },
            line_items: items.map((articulo) => ({
                price_data: {
                    currency,
                    product_data: {
                        name: articulo.name
                    },
                    unit_amount: Math.ceil(articulo.price * 100),
                },
                quantity: articulo.quantity,
            })),
            mode: 'payment',
            success_url: envs.stripeSuccesUrl,
            cancel_url: envs.stripeCancelUrl,

        });

        return session;
    }

    async stripeWebhook(req: Request, res: Response) {
        const signature = req.headers['stripe-signature'];
        let event;
        
        const endpointSecret = envs.stripeEndpointSecret;

        try {
            event = this.stripeClient.webhooks.constructEvent(
                req['rawBody'],
                signature!,
                endpointSecret,
            );
        } catch (error) {
            res.status(400).send(`Webhook error: ${error.message}`);
            return;
        };


        switch (event.type) {
            case 'charge.succeeded':
                const chargeSucceded = event.data.object;
                // TODO: llamar microservicio
                console.log({
                    orderId: chargeSucceded.metadata.orderId,
                });
                break;
            case 'charge.cancelled':
                const chargeCancelled = event.data.object;
                console.log({
                    orderId: chargeCancelled.metadata.orderId,
                });
                break;
            case 'charge.failed':
                const chargeFailed = event.data.object;
                console.log({
                    orderId: chargeFailed.metadata.orderId,
                });
                break;
            default:
                console.log(`Event ${event.type} not handled`);
                break;
        }

        return res.status(200).json({ signature });
    }

}
