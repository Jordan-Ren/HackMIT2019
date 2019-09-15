from flask import render_template, Blueprint, request
import json
hello_blueprint = Blueprint('hello',__name__)

@hello_blueprint.route('/')
@hello_blueprint.route('/hello')

def index():
	return render_template("index.html")

@hello_blueprint.route('/api/donations', methods=['GET'])
def donation():

	# make  call to database

	x =  {'food': 'hamburger'}

	return json.dumps(x)


@hello_blueprint.route('/api/donations', methods=['POST'])
def donation():

	data = request.get_json()

	# make  call to database

	x =  {'food': 'hamburger'}

	return json.dumps(x)

@hello_blueprint.route('/api/donations/<donation_id>')
def donation_by_id(donation_id):

	# make  call to database

	x =  {'food': 'hamburger'}

	return json.dumps(x)