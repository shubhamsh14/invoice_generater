import sqlite3

def get_table_names(database_path):
    connection = sqlite3.connect(database_path)
    cursor = connection.cursor()

    # Query to retrieve table names
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

    # Fetch all table names
    table_names = cursor.fetchall()

    # Close the cursor and connection
    cursor.close()
    connection.close()

    return table_names

# Replace 'invoice_db.db' with your actual database path
database_path = 'invoice_db.db'
tables = get_table_names(database_path)

print("Tables in the database:")
for table in tables:
    print(table[0])
