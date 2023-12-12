CREATE TABLE  inventory_main_db(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trans_pk_id INTEGER,
    product_name TEXT,
	supplier_name TEXT,
	supplier_gstin TEXT,
	invoice_number TEXT,
	invoice_date TEXT,	
    stock_quantity INTEGER,
    total_quantity INTEGER,
    price REAL,
    gst_percent REAL,
    gst_amount REAL,
    hsn_code TEXT,
    total_price REAL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);