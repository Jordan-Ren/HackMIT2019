import pyodbc

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

location = "North Carolina"
cursor = conn.cursor()
cursor.execute('''SELECT * FROM HackMit2019.dbo.Donations WHERE Location IN (?)''', location)
rows = cursor.fetchall()
for row in rows:
    print(row)
if len(rows) == 0:
    print('No food')
