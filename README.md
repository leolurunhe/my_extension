# my_extension

# open a console

cd ~

sudo jupyter nbextension install ~/my_extension/

sudo jupyter nbextension enable my_extension/main

cd ~/my_extension

python3 -m venv env

source env/bin/activate

pip install -e ,

export FLASK_APP=insta485

flask run --host 0.0.0.0 --port 8000

#open another console

jupyter notebook

#create a new document, click on the button
