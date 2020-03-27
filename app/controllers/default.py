import os
import time

from random import randrange
from flask import jsonify, request
from app import app, db


from app.models.tables import Image

@app.route('/api/images/<searchType>/<search>/', methods = ['GET'])
def get(searchType, search):

    if(searchType == 'name'):
      i = Image.query.filter(Image.name.like('%' + search + '%')).all()
    elif(searchType == 'type'):
      i = Image.query.filter(Image.type.like('%' + search + '%')).all()
    else:
      return jsonify(
        error = "Invalid search type",
      ), 400

    return jsonify(i)

@app.route('/api/images/', methods = ['POST'])
def post():
    millis = int(round(time.time() * 1000))

    name = request.form['name']
    type = request.form['type']
    image = request.files['image']
    filename = str(millis) + '_' + str(randrange(millis)) + '.png'

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    i = Image(name, type, filename)
    db.session.add(i)
    db.session.commit()

    return jsonify(i)

@app.route('/api/images/<int:id>', methods = ['PUT'])
def put(id):
    i = Image.query.filter_by(id=id).one()

    if "name" in request.form:
        i.name = request.form['name']

    if "type" in request.form:
        i.type = request.form['type']
    
    db.session.commit()

    return jsonify(i)    

@app.route('/api/images/<int:id>', methods = ['DELETE'])
def delete(id):
    Image.query.filter_by(id=id).delete()
    db.session.commit()
    return jsonify(
      successfull = True
    )