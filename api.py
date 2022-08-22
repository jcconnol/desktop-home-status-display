from flask import Flask
from flask_restful import Api, Resource, reqparse
import random
from systemInfo import SystemInfo

app = Flask(__name__)
api = Api(app)

@app.route('/api/system-info')
def hello_world():
    return SystemInfo.get()

if __name__ == '__main__':
    app.run(debug=True)