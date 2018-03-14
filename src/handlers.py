import random
import uuid
import io

from aiohttp import web
from PIL import Image, ImageDraw


def generate_random_image(width=128, height=128):
    rand_pixels = [random.randint(0, 255) for _ in range(width * height * 3)]
    rand_pixels_as_bytes = bytes(rand_pixels)
    text_and_filename = str(uuid.uuid4())

    random_image = Image.frombytes('RGB', (width, height), rand_pixels_as_bytes)

    draw_image = ImageDraw.Draw(random_image)
    draw_image.text(xy=(0, 0), text=text_and_filename, fill=(255, 255, 255))    
    #random_image.save("{file_name}.jpg".format(file_name=text_and_filename))
    #return random_image.tobytes()
    b = io.BytesIO()
    random_image.save(b, 'JPEG')
    return b.getvalue()

async def heathCheckHandler(request):
  res = {
    "status": "healthy"
  }
  return web.json_response(res)

async def imageHandler(request):
  resp =  web.StreamResponse(
    status=200
  )
  await resp.prepare(request)
  width = 128
  if request.query.get('width') is not None:
    width = int(request.query.get('width'))
    if width > 256:
      width = 256
  height = 128
  if request.query.get('height') is not None:
    height = int(request.query.get('height'))
    if height > 256:
      width = 256
  print("request for image with width of %s and height of %s" % (width, height))  
  await resp.write(generate_random_image(width=width,height=height))
  return resp



