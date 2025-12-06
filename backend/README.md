# MediSure Backend API

Django REST API for the MediSure medicine track-and-trace system on Cardano.

## Live Deployment

**Backend API:** https://medisure-backend-t5yr.onrender.com/api/

## Local Setup

1. Create virtual environment and activate it:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file in backend folder:
```
BLOCKFROST_PROJECT_ID=your_testnet_api_key_here
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start server:
```bash
python manage.py runserver
```

## API Endpoints

**Live Base URL:** `https://medisure-backend-t5yr.onrender.com/api/`
**Local Base URL:** `http://127.0.0.1:8000/api/`

### Core Endpoints

**POST /api/mint/**
- Mint a new batch
- Body:
```json
{
  "batch_id": "BATCH001",
  "medicine_name": "Paracetamol",
  "composition": "500mg paracetamol",
  "manufacturer_id": "uuid",
  "manufactured_date": "2025-01-01",
  "expiry_date": "2027-01-01",
  "quantity": 1000,
  "policy_id": "cardano_policy_id",
  "asset_name": "asset_name",
  "manufacturer_wallet": "addr_test...",
  "tx_hash": "transaction_hash"
}
```

**POST /api/transfer/**
- Transfer batch between entities
- Body:
```json
{
  "batch_id": "BATCH001",
  "from_wallet": "addr_test...",
  "to_wallet": "addr_test...",
  "tx_hash": "transaction_hash"
}
```

**GET /api/verify/{qr_code}/**
- Verify medicine authenticity

**GET /api/journey/{batch_id}/**
- Track batch through supply chain

### CRUD Endpoints

- `/api/manufacturers/` - Manage manufacturers
- `/api/distributors/` - Manage distributors
- `/api/pharmacies/` - Manage pharmacies
- `/api/batches/` - Manage batches
- `/api/transactions/` - View transactions