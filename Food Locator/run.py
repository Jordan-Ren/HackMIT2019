from flask import render_template, request, Flask
import json

app = Flask(__name__,
 	static_folder = './templates/public',
 	template_folder="./templates/static")

@app.route('/')
def index():
    return render_template("index.html")

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()
