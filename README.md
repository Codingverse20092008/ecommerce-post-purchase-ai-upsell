# E-commerce Order Automation Demo

This project simulates a customer placing an order and sends the data to an N8N webhook for automation testing.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Webhook URL
Edit the `.env` file and replace the placeholder with your actual N8N webhook URL:
```
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
```

### 3. Run the Script
```bash
npm start
```

Or directly:
```bash
node place-order.js
```

## What It Does

The script sends a mock order with:
- **Customer**: Sarah Johnson (US-based)
- **Items**: 
  - Premium Leather Duffle Bag ($149.99)
  - RFID Blocking Wallet ($34.99)
- **Order Total**: $184.98

## Sample Output

### Success:
```
📦 Simulating order placement...
📧 Customer: Sarah Johnson
🛍️  Items: Premium Leather Duffle Bag, RFID Blocking Wallet
💰 Total: $184.98
🌐 Sending to webhook: https://...
---
✅ Order placed successfully!
📋 Order ID: ORD-1725633539981-742
📊 Response Status: 200
📄 Response Data: {...}
```

### Error:
```
❌ Failed to place order
🔴 No response from webhook - check your N8N_WEBHOOK_URL
```

## Order Data Structure

```json
{
  "order_id": "ORD-1725633539981-742",
  "customer": {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@example.com",
    "phone": "+1-555-123-4567",
    "address": { ... }
  },
  "items": [ ... ],
  "order_total": 184.98,
  "currency": "USD",
  "payment_status": "completed"
}
```
