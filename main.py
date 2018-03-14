from aiohttp import web
from src.app import app

if __name__ == '__main__':
  web.run_app(app)