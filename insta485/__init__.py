import flask
import flask_cors

app = flask.Flask(__name__)  # pylint: disable=invalid-name
# cross-site read, same origin policy
cors = flask_cors.CORS(app, resources={r"/views/*": {"origins": "*"}})
# Read settings from config module (insta485/config.py)
# Overlay settings read from file specified by environment variable. This is
# useful for using different on development and production machines.
# Reference: http://flask.pocoo.org/docs/0.12/config/
app.config.from_envvar('INSTA485_SETTINGS', silent=True)

# Tell our app about views and model.  This is dangerously close to a
# circular import, which is naughty, but Flask was designed that way.
# (Reference http://flask.pocoo.org/docs/0.12/patterns/packages/)  We're
# going to tell pylint and pycodestyle to ignore this coding style violation.
import insta485.views  # noqa: E402  pylint: disable=wrong-import-position

if __name__ == '__main__':
    insta485.app.run(debug=True, host='0.0.0.0', port=8000)
