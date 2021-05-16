# coding=utf-8

import requests


url_titles = 'http://localhost:8000/api/v1/titles/'
url_genres = 'http://localhost:8000/api/v1/genres/'


def main():
    pass


def get_response(url):
    response = requests.get(url_titles)
    print(response)


def get_content(url):
    json = requests.get(url_titles).json()
    print(json)


if __name__ == '__main__':
    main()


get_response(url_titles)
get_content(url_titles)

get_response(url_genres)
get_content(url_genres)
