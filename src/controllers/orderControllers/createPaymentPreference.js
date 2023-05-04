const mercadopago = require('mercadopago');
const { Order, OrderItem, Product } = require('../../db');

mercadopago.configure({
  access_token: "APP_USR-838836474824790-042021-8fc594cb25ce9594e59655dc2b45a4dd-1357523216",
});

const createPaymentPreference = async (orderId) => {
  console.log("orderId", orderId)
  const order = await Order.findByPk(orderId, {
    include: [{
      model: OrderItem,
      as: 'items',
      include: {
        model: Product,
        as: 'product',
      }
    }],
  });
  console.log(order)
  if (!order) {
    throw new Error('Pedido no encontrado');
  }

  const items = order.items.map((item) => ({
    title: item.product.name,
    unit_price: item.product.price,
    quantity: item.quantity,
  }));

  const preference = {
    items,
    external_reference: `${order.id}`,
    back_urls: {
      success: 'https://deploy-front2.vercel.app/purchase/approved',
      failure: 'https://deploy-front2.vercel.app/purchase/rejected',
      pending: 'https://deploy-front2.vercel.app/purchase/pending',
    },
    notification_url: 'https://backpf-production-18e8.up.railway.app/payment/handle-payment-notification',
  };
  

  const response = await mercadopago.preferences.create(preference);
  console.log("Preferencia de pago creada:", response.body);

  return response.body.init_point;
};

module.exports = { createPaymentPreference };