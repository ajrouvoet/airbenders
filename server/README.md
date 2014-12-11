Quickstart
==========

    make install # install deps
    source .env/bin/activate # to use the virtualenv (every terminal you use)
    python manage.py migrate # install tables
    python manage.py runserver # run devserver with auto refresh

Now you should be able to query:

    localhost:8000/api/1.0/ # documentation root
    localhost:8000/api/1.0/users/
    localhost:8000/api/1.0/reservs/

The API will show some nice markup if you visit them in your browser and use just json otherwise
