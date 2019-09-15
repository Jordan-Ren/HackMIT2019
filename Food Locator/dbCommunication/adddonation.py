import pyodbc
import datetime

conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

location = 'North Carolina'
type = 'Spaghetios'
current_time = datetime.datetime.now()
time = current_time.strftime('%H:%M:%S')
print(time)
cursor = conn.cursor()
cursor.execute('''INSERT INTO HackMit2019.dbo.Donations (Location, FoodType, TimeEntered)
                  VALUES (?,?,?)
                  SELECT * FROM HackMit2019.dbo.Donations''',location, type, time)
conn.commit()
