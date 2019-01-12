import os
from flask import Flask, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')


if __name__== "__main__":
    app.run(debug=True)