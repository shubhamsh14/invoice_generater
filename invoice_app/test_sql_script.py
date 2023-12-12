import sqlite3

connection = sqlite3.connect('invoice_db.db')
cursor = connection.cursor()

# Assuming 'main_inventory_db' is the name of your table
cursor.execute('SELECT * FROM inventory_main_db')

# Fetch all rows from the result set
rows = cursor.fetchall()

# Print column names
columns = [description[0] for description in cursor.description]
print(columns)

# Print each row
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
connection.close()
