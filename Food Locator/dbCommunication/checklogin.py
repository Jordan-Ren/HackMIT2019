import pyodbc

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

password = 'asdff'
email ='jordan@jordan.com'
cursor = conn.cursor()
vars = {"E": email, "P": password}
cursor.execute('''SELECT Email, Password FROM HackMit2019.dbo.Users''')
for row in cursor.fetchall():
    if password == row[1] and email == row[0]:
        print('it match')
else:
    print('nah')
