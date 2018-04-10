"""
Insta485 development configuration.

Runhe Lu <lurunhe@umich.edu>
Tianyu Qiao <qiaotian@umich.edu>
"""

import os

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'FIXME SET THIS WITH: $ python3 -c "import os; print(os.urandom(24))" '  # noqa: E501  pylint: disable=line-too-long
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'uploads'
)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif','pdf'])

# Database file is var/insta485.sqlite3
DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'database.sqlite3'
)

