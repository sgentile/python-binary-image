from aiohttp import web

# routes
from .router import setup_routes
from .middleware import error_middleware

app = web.Application(middlewares=[error_middleware])
setup_routes(app)
