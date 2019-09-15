import pyodbc

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

company = 'Text'
email = '@asdfawenglkajwhgp8vu;oikn/lksjbnhlafiuhbe;sfugfLI.WKJZ.com'
passw = 'asdfafag'

data = (email, company, email, passw)
cursor = conn.cursor()
cursor.execute('''SELECT * FROM HackMit2019.dbo.Users''')
initial = len(cursor.fetchall())
cursor.execute('''IF EXISTS (SELECT * FROM HackMit2019.dbo.Users WHERE Email IN (?))
            BEGIN
                SELECT * FROM HackMit2019.dbo.Users
            END
            ELSE
            BEGIN
                INSERT INTO Users (CompanyName, Email, Password)
                VALUES (?,?,?)
                SELECT * FROM HackMit2019.dbo.Users
            END''', email, company, email, passw)
conn.commit()
try:
    final = len(cursot.fetchall())
    if initial == final:
        print('no change')
    else:
        print('change')
except:
    cursor.execute('''SELECT *  FROM HackMit2019.dbo.Users''')
    final = len(cursor.fetchall())
    if initial == final:
        print('no change')
    else:
        print('change')
