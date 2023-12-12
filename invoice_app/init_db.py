from flask import Flask, request, jsonify, session, redirect, url_for, render_template
from flask_session import Session
from flask_cors import CORS  # Import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3
from datetime import datetime
from sqlalchemy import desc

# Dummy user for demonstration
users = {'user': '123'}
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///invoice_db.db'
db = SQLAlchemy(app)


# Assuming `products` is a list of dictionaries
products = [
    {"name": "TRANSPORTATION", "hsnCode": "8704", "GST": 18},
    {"name": "STONE CHIPS & DUST SELL", "hsnCode": "2517", "GST": 5},
    {"name": "FLYASH & FLYASHBRICKS", "hsnCode": "6815", "GST": 12},
    {"name": "VEHICLE RENTING", "hsnCode": "9996", "GST": 18}
]

Session(app)

# Initialize CORS with default settings
CORS(app)
class InvoiceMainDB(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trans_pk_id = db.Column(db.Integer)
    item_name = db.Column(db.Text)
    price = db.Column(db.Float)
    hsn_code = db.Column(db.Text)
    quantity = db.Column(db.Integer)
    discount_percent = db.Column(db.Float)
    discount_amount = db.Column(db.Float)
    gst_percent = db.Column(db.Float)
    gst_amount = db.Column(db.Float)
    subtotal_for_product = db.Column(db.Float)
    amount_for_product = db.Column(db.Float)
    discounted_amount_for_product = db.Column(db.Float)
    customer_name = db.Column(db.Text)
    customer_number = db.Column(db.Text)
    customer_address = db.Column(db.Text)
    customer_type = db.Column(db.Text)
    bill_type = db.Column(db.Text)
    invoice_total = db.Column(db.Float)
    invoice_total_tax_amount = db.Column(db.Float)
    invoice_sub_total = db.Column(db.Float)
    created = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)


class InventoryMainDB(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trans_pk_id = db.Column(db.Integer)
    product_name = db.Column(db.Text)
    supplier_name = db.Column(db.Text)
    supplier_gstin = db.Column(db.Text)
    invoice_number = db.Column(db.Text)
    invoice_date = db.Column(db.Text)
    stock_quantity = db.Column(db.Integer)
    total_quantity = db.Column(db.Float)
    price = db.Column(db.Float)
    gst_percent = db.Column(db.Float)
    gst_amount = db.Column(db.Float)
    hsn_code = db.Column(db.Text)
    total_price = db.Column(db.Float)
    created = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)


def Generated_ID():
    current_datetime = datetime.now()
    return int(current_datetime.strftime('%d%m%Y%H%M%S'))


@app.route('/add_invoice_data', methods=['POST'])
def add_invoice_data():
    data = request.json
    print('invoice' , data)
    if (data.get('items', [])):
        for item in data.get('items', []):
            # Update InventoryMainDB model
            invoice_entry = InvoiceMainDB(
                trans_pk_id=Generated_ID(),
                item_name = item.get('name'),
                price = item.get('price'),
                hsn_code = item.get('hsnCode'),
                quantity = item.get('quantity'),
                discount_percent = item.get('discount'),
                gst_percent = item.get('gstRate'),
                amount_for_product = item.get('amountforSelectedItem'),
                discount_amount = item.get('discountForSelectedItem'),
                discounted_amount_for_product = item.get('discountedAmountForSelectedItem'),
                gst_amount = item.get('gstForSelectedItem'),
                subtotal_for_product = item.get('subtotalForSelectedItem'),
                customer_name = data.get('billTo'),
                customer_number = data.get('billToEmail'),
                customer_address = data.get('billToAddress'),
                customer_type = data.get('billToCustomerType'),
                bill_type = data.get('billToType'),
                invoice_total = data.get('total'),
                invoice_total_tax_amount = data.get('taxAmount'),
                invoice_sub_total = data.get('subTotal'),
                created=datetime.utcnow()
                )
            # Commit changes to the database
            print(invoice_entry)
            db.session.add(invoice_entry)
            db.session.commit()
        return jsonify({'message': 'Invoice details added successfully'})
    else:
        return jsonify({'message': 'Product not found'}), 404


@app.route('/add_inventory', methods=['POST'])
def add_inventory():
    data = request.json
    print('test' , data)
    # # Fetch product details based on the selected product name
    product = next((p for p in products if p['name'] == data['selectedProduct']), None)

    if product:
        # Calculate total price and GST amount
        total_price = float(data.get('addStock')) * float(data.get('purchasePrice'))
        gst_amount = (total_price * product['GST']) / 100
        total_amount = total_price + gst_amount
        # Update InventoryMainDB model
        inventory_entry = InventoryMainDB(
            trans_pk_id=Generated_ID(),
            product_name=data.get('selectedProduct'),
            supplier_name=data.get('supplierName'),
            supplier_gstin=data.get('supplierGSTIN'),
            invoice_number = data.get('invoiceNumber'),
            invoice_date = data.get('dateOfIssue'),
            stock_quantity=data.get('addStock'),
            total_quantity=data.get('addStock'),
            price=data.get('purchasePrice'),
            gst_percent=product['GST'],
            gst_amount=gst_amount,
            hsn_code=product['hsnCode'],
            total_price = total_amount,
            created=datetime.utcnow()
        )
        # Commit changes to the database
        print(inventory_entry)
        db.session.add(inventory_entry)
        db.session.commit()

        return jsonify({'message': 'Inventory details added successfully'})
    else:
        return jsonify({'message': 'Product not found'}), 404


# Example route to fetch all data from the database
@app.route('/fetch_all_inventory_data')
def fetch_all_inventory_data():
    data = InventoryMainDB.query.all()
    result = []
    for row in data:
        result.append({
            'id': row.id,
            'trans_pk_id': row.trans_pk_id,
            'item_name': row.product_name,
            'hsn_code': row.hsn_code,
            'supplier_name' : row.supplier_name,
            'price': row.price,
            'total_price' : row.total_price,
            'stock_quantity': row.stock_quantity,
            'total_quantity': row.total_quantity,
            'gst_percent': row.gst_percent,
            'gst_amount': row.gst_amount
            })
    return jsonify(result)


@app.route('/fetch_all_data')
def fetch_all_data():
    data = InvoiceMainDB.query.order_by(desc(InvoiceMainDB.trans_pk_id)).limit(15).all()
    result = []
    for row in data:
        result.append({
            'id': row.id,
            'trans_pk_id': row.trans_pk_id,
            'item_name': row.item_name,
            'quantity': row.quantity,
            'price': row.price,
            'discount_percent': row.discount_percent,
            'discount_amount': row.discount_amount,
            'gst_percent': row.gst_percent,
            'gst_amount': row.gst_amount,
            'sub_total' : row.discounted_amount_for_product,
            'sold_price': row.subtotal_for_product,
            'hsn_code': row.hsn_code,
            'created': row.created
        })
    return jsonify(result)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
