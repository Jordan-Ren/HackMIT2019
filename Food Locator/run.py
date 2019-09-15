from flask import render_template, request, Flask
import pyodbc
import json
import datetime

app = Flask(__name__,
 	static_folder = './templates/public',
 	template_folder="./templates/static")

# @hello_blueprint.route('/api/get_location_food', methods=['GET'])
#Returns the food and the time it was entered into for a specific location
@app.route('/list')
def get_location_food():
    # make  call to database
    conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')
    location = request.args.get('location')
    cursor = conn.cursor()
    cursor.execute('''SELECT FoodType, TimeEntered FROM HackMit2019.dbo.Donations WHERE Location IN (?)''', location)
    rows = cursor.fetchall()
    if len(rows) == 0:
       	return json.dumps({})
    data = []
    for row in rows:
        print(row)
        row_list = list(row)
        row_json = {'food': row_list[0], 'timestamp': row_list[1].strftime("%d-%b-%Y (%H:%M:%S.%f)")}
        data.append(row_json)
    return json.dumps(data)

@app.route('/donate')
#Enters a donation into the database
def donation():
	#Add into database
	conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')

	location = request.args.get('location')
	type = request.args.get('foodtype')
	current_time = datetime.datetime.now()
	time = current_time.strftime('%H:%M:%S')
	cursor = conn.cursor()
	cursor.execute('''INSERT INTO HackMit2019.dbo.Donations (Location, FoodType, TimeEntered)
	                  VALUES (?,?,?)
	                  SELECT * FROM HackMit2019.dbo.Donations''',location, type, time)
	conn.commit()
	return 'Okay'

@app.route('/')
def index():
    return render_template("index.html")

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()




#
# @hello_blueprint.route('/api/add_user', methods=['POST'])
# #Checks if the email has already been used to create an account. If the email is
# #associated with an account then return True, else return False
# def add_user():
# 	conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')
#
# 	company = business
# 	email = mail
# 	passw = pword
#
# 	data = (email, company, email, passw)
# 	cursor = conn.cursor()
# 	cursor.execute('''SELECT * FROM HackMit2019.dbo.Users''')
# 	initial = len(cursor.fetchall())
# 	cursor.execute('''IF EXISTS (SELECT * FROM HackMit2019.dbo.Users WHERE Email IN (?))
# 	            BEGIN
# 	                SELECT * FROM HackMit2019.dbo.Users
# 	            END
# 	            ELSE
# 	            BEGIN
# 	                INSERT INTO Users (CompanyName, Email, Password)
# 	                VALUES (?,?,?)
# 	                SELECT * FROM HackMit2019.dbo.Users
# 	            END''', email, company, email, passw)
# 	conn.commit()
# 	try:
# 	    final = len(cursot.fetchall())
# 	    if initial == final:
# 	        return json.dumps({'created': "False"})
# 	    else:
# 	        return json.dumps({'created': "True"})
# 	except:
# 	    cursor.execute('''SELECT *  FROM HackMit2019.dbo.Users''')
# 	    final = len(cursor.fetchall())
# 	    if initial == final:
# 	        return json.dumps({'created': "False"})
# 	    else:
# 	        return json.dumps({'created': "True"})
#
# @hello_blueprint.route('/api/check_login', methods = ['GET'])
# #Checks if the login exists. If the login exists, return True, else return False
# def check_login():
# 	conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=hackmit2019.database.windows.net;DATABASE=HackMit2019;UID=texmix;PWD=Texm1x@2019')
#
# 	password = pword
#     email = mail
#     cursor = conn.cursor()
#     cursor.execute('''SELECT Email, Password FROM HackMit2019.dbo.Users''')
#     for row in cursor.fetchall():
#         if password == row[1] and email == row[0]:
#             return json.dumps({'user_exists': "True"})
#     else:
#         return json.dumps({'user_exists': "False"})
