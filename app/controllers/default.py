import os
import time
import requests
import json
import math

from PIL import Image
import urllib

from random import randrange
from flask import jsonify, request
from app import app, db

from app.models.tables import ImageModel

def insertIntoDatabase(name, type, image):
    millis = int(round(time.time() * 1000))
    filename = str(millis) + '_' + str(randrange(millis)) + '.png'

    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    i = ImageModel(name, type, filename)
    db.session.add(i)
    db.session.commit()

    return jsonify(i)

@app.route('/api/images/<searchType>/<search>/', methods = ['GET'])
def get(searchType, search):

    if(searchType == 'name'):
      i = ImageModel.query.filter(ImageModel.name.like('%' + search + '%')).all()
    elif(searchType == 'type'):
      i = ImageModel.query.filter(ImageModel.type.like('%' + search + '%')).all()
    elif(searchType == 'id'):
      i = ImageModel.query.filter_by(id=search).one()
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

    return insertIntoDatabase(name, type, image)

@app.route('/api/images/minning', methods = ['POST'])
def minning():
  sentence = request.form['sentence']
  number = int(request.form['number'])
  ignoreOffset = 0

  if "ignoreOffset" in request.form:
    ignoreOffset = int(request.form['ignoreOffset'])

  pages = math.ceil(number + ignoreOffset/20)
  values = []

  for i in range(pages):
    url = "https://unsplash.com/napi/search/photos?query=" + sentence + "&xp=&per_page=20&page=" + str()

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'}
    result = requests.get(url, headers=headers)
    content = result.content

    valuesB = json.loads(content)
    valuesB = valuesB['results']
    values = values + valuesB

  rangeNumber = number + ignoreOffset
  numberOfPhotos = len(values)

  if(number > numberOfPhotos):
    rangeNumber = numberOfPhotos

  for i in range(rangeNumber):
    if(i + 1 > ignoreOffset):
      value = values[i]
      im = Image.open(urllib.request.urlopen(value['urls']['regular']))
      insertIntoDatabase(value['alt_description'], sentence, im)

  return jsonify(
    successfull = True
  )  
  


@app.route('/api/images/<int:id>', methods = ['PUT'])
def put(id):
    i = ImageModel.query.filter_by(id=id).one()

    if "name" in request.form:
        i.name = request.form['name']

    if "type" in request.form:
        i.type = request.form['type']
    
    db.session.commit()

    return jsonify(i)    

@app.route('/api/images/<int:id>', methods = ['DELETE'])
def delete(id):
    ImageModel.query.filter_by(id=id).delete()
    db.session.commit()
    return jsonify(
      successfull = True
    )