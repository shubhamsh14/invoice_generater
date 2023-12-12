import sqlite3

connection = sqlite3.connect('invoice_db.db')
cur = connection.cursor()
cur.execute('DROP TABLE IF EXISTS invoice_db')
connection.commit()
connection.close()
