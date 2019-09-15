import pyodbc

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

company = 'Text'
email = 'jordana@jordan.com'
passw = 'asdfafag'

data = (email, company, email, passw)
cursor = conn.cursor()
inp = '''IF EXISTS (SELECT * FROM HackMit2019.dbo.Users WHERE Email IN (?))
				BEGIN
                    SELECT * FROM HackMit2019.dbo.Users
                END
                ELSE
                BEGIN
                    INSERT INTO Users (CompanyName, Email, Password)
                    VALUES (?,?,?)
                    SELECT * FROM HackMit2019.dbo.Users
                END'''
cursor.execute('''SELECT * FROM HackMit2019.dbo.Users''')
initial = len(cursor.fetchall())
cursor.execute(inp, email, company, email, passw)
# final = len(cursor.fetchall())
# if final > initial:
#     print("account created!")
# else:
#     print("account with email already exists.")
