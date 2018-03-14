from .handlers import heathCheckHandler, imageHandler

def setup_routes(app):
  app.router.add_route('GET', '/api/v1/health', heathCheckHandler)
  app.router.add_route('GET', '/api/v1/image', imageHandler)
  