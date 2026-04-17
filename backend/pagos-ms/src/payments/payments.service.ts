import { Inject, Injectable } from '@nestjs/common';
import Stripe = require('stripe');
import { envs, NATS_SERVICE } from '../configs';
import { PaymentSessionDto } from './dto';
import { Request, Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class PaymentsService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {

    }

    private readonly stripeClient = new Stripe(envs.stripeTestingSecretKey);

    async createPaymentSession(paymentSessionDto: PaymentSessionDto) {

        const { currency, items, orderId } = paymentSessionDto

        const session = await this.stripeClient.checkout.sessions.create({
            
            payment_intent_data: {
                // Poner ID de mi orden de compra
                metadata: {
                    orderId,
                },
            },
            // Items del carrito
            line_items: items.map((articulo) => ({
                price_data: {
                    currency,
                    product_data: {
                        name: articulo.name
                    },
                    // Stripe necesita que le envíes con 2 ceros de mas para los 2 decimales del centavo
                    unit_amount: Math.ceil(articulo.price * 100),
                },
                quantity: articulo.quantity,
            })),
            mode: 'payment',
            success_url: envs.stripeSuccesUrl,
            cancel_url: envs.stripeCancelUrl,

        });

        return {
            cancelUrl: session.cancel_url,
            successUrl: session.success_url,
            url: session.url,
        }
    }

    async stripeWebhook(req: Request, res: Response) {
        const signature = req.headers['stripe-signature'];
        const endpointSecret = envs.stripeEndpointSecret;
        let event;


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
                const chargeSucceeded = event.data.object;
                this.client.emit(
                    'payment.succeeded',
                    {
                        stripePaymentId: chargeSucceeded.id,
                        orderId: chargeSucceeded.metadata.orderId,
                        receiptUrl: chargeSucceeded.receipt_url,
                    }
                )
                break;
            case 'charge.cancelled':
                const chargeCancelled = event.data.object;
                this.client.emit(
                    'payment.cancelled',
                    {
                        stripePaymentId: chargeCancelled.id,
                        orderId: chargeCancelled.metadata.orderId,
                        receiptUrl: chargeCancelled.receipt_url,
                    }
                )
                break;
            case 'charge.failed':
                const chargeFailed = event.data.object;
                this.client.emit(
                    'payment.failed',
                    {
                        stripePaymentId: chargeFailed.id,
                        orderId: chargeFailed.metadata.orderId,
                        receiptUrl: chargeFailed.receipt_url,
                    }
                );
                break;
            default:
                console.log(`Event ${event.type} not handled`);
                break;
        }

        return res.status(200).json({ signature });
    }

}
