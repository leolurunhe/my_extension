import flask
import json
import insta485


@insta485.app.route('/views/', methods=["GET","POST"])
def hello():
    ret=flask.jsonify({"value" : "Hello World."})
    return ret
