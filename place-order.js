require('dotenv').config();
const axios = require('axios');

// Mock order data for US e-commerce customer
const orderData = {
  order_id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  customer: {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1-555-123-4567",
    address: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      country: "USA"
    }
  },
  items: [
    {
      product_id: "PROD-001",
      name: "Premium Leather Duffle Bag",
      quantity: 1,
      price: 149.99,
      sku: "LDB-BLK-001"
    },
    {
      product_id: "PROD-002",
      name: "RFID Blocking Wallet",
      quantity: 1,
      price: 34.99,
      sku: "RFW-BRN-002"
    }
  ],
  order_total: 184.98,
  currency: "USD",
  order_date: new Date().toISOString(),
  payment_status: "completed",
  payment_method: "credit_card"
};

async function placeOrder() {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  // Validate webhook URL
  if (!webhookUrl) {
    console.error('❌ Error: N8N_WEBHOOK_URL not found in .env file');
    process.exit(1);
  }

  console.log('📦 Simulating order placement...');
  console.log('📧 Customer:', orderData.customer.name);
  console.log('🛍️  Items:', orderData.items.map(item => item.name).join(', '));
  console.log('💰 Total: $' + orderData.order_total);
  console.log('🌐 Sending to webhook:', webhookUrl);
  console.log('---');

  try {
    const response = await axios.post(webhookUrl, orderData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('✅ Order placed successfully!');
    console.log('📋 Order ID:', orderData.order_id);
    console.log('📊 Response Status:', response.status);
    console.log('📄 Response Data:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Failed to place order');

    if (error.response) {
      // Server responded with error status
      console.error('🔴 Server Error:', error.response.status);
      console.error('📄 Response:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // Request was made but no response received
      console.error('🔴 No response from webhook - check your N8N_WEBHOOK_URL');
      console.error('🌐 URL attempted:', webhookUrl);
    } else {
      // Error in request setup
      console.error('🔴 Error:', error.message);
    }

    process.exit(1);
  }
}

// Run the script
placeOrder();
