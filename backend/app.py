#  PS E:\Flask\backend> python -m venv venv
# PS E:\Flask\backend> .\venv\Scripts\activate
# (venv) PS E:\Flask\backend> 
# (venv) PS E:\Flask\backend> pip install flask flask-sqlalchemy flask-cors

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)