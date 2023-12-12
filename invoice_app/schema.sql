DROP TABLE IF EXISTS invoice_db;

CREATE TABLE invoice_main_db(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trans_pk_id INTEGER,
    item_name TEXT,
    price REAL,
    hsn_code TEXT,
    quantity INTEGER,
    discount_percent REAL,
    discount_amount REAL,
    gst_percent REAL,
    gst_amount REAL,
    subtotal_for_product REAL,
    amount_for_product REAL,
    discounted_amount_for_product REAL,
    customer_name TEXT,
    customer_number TEXT ,
    customer_address TEXT,
    customer_type TEXT,
    bill_type TEXT,
    invoice_total REAL, 
    invoice_total_tax_amount REAL,
    invoice_sub_total  REAL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);