"""Headless full-body character render.

Run as:  blender --background --factory-startup --python render_char.py -- <fbx> <out.png>

The models are Tripo generations: a single mesh, arbitrary scale, arbitrary
orientation, arms usually out in a T-pose. The script normalises all of that so
every character comes out framed identically against transparency.
"""
import bpy
import sys
import math
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
SRC, OUT = argv[0], argv[1]
RES_X, RES_Y = 900, 1500

# --- clean slate -----------------------------------------------------------
bpy.ops.wm.read_factory_settings(use_empty=True)

# --- import ----------------------------------------------------------------
if SRC.lower().endswith(".fbx"):
    bpy.ops.import_scene.fbx(filepath=SRC)
else:
    bpy.ops.import_scene.gltf(filepath=SRC)

meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
if not meshes:
    raise SystemExit("no mesh imported")

for o in meshes:
    o.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]

# --- world bounds ----------------------------------------------------------
lo = Vector((1e9, 1e9, 1e9))
hi = Vector((-1e9, -1e9, -1e9))
for o in meshes:
    for corner in o.bound_box:
        w = o.matrix_world @ Vector(corner)
        lo = Vector((min(lo[i], w[i]) for i in range(3)))
        hi = Vector((max(hi[i], w[i]) for i in range(3)))

size = hi - lo
centre = (hi + lo) / 2

# Tripo exports are Y-up or Z-up depending on the converter. Pick whichever of
# those two is taller — never X, because a T-pose with a wide robe can span
# further across the arms than the figure is tall, and picking X points the
# camera straight down at the top of the head.
up_axis = 1 if size[1] >= size[2] else 2
height = size[up_axis]
if height <= 0:
    raise SystemExit("degenerate bounds")

# --- camera ----------------------------------------------------------------
cam_data = bpy.data.cameras.new("Cam")
cam_data.type = "ORTHO"
# A little headroom so nothing is clipped, and the frame reads as a full body.
cam_data.ortho_scale = height * 1.18
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.scene.collection.objects.link(cam)
bpy.context.scene.camera = cam

dist = max(size) * 4 + 10
if up_axis == 2:                     # Z-up: look along -Y
    cam.location = centre + Vector((0, -dist, 0))
    cam.rotation_euler = (math.radians(90), 0, 0)
else:                                # Y-up: look along +Z
    cam.location = centre + Vector((0, 0, dist))
    cam.rotation_euler = (0, 0, 0)

# --- light -----------------------------------------------------------------
# Three-point-ish rig so the silhouette reads and the face is not flat.
def add_light(name, loc, energy, size_):
    d = bpy.data.lights.new(name, type="AREA")
    d.energy = energy
    d.size = size_
    ob = bpy.data.objects.new(name, d)
    ob.location = centre + Vector(loc)
    bpy.context.scene.collection.objects.link(ob)
    # aim at the figure
    direction = centre - ob.location
    ob.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return ob

k = max(size) * 3 + 4
add_light("Key", (-k * 0.7, -k, k * 0.7), 900 * k * k / 25, k * 0.7)
add_light("Fill", (k * 0.9, -k * 0.8, k * 0.1), 300 * k * k / 25, k)
add_light("Rim", (k * 0.2, k, k * 0.8), 700 * k * k / 25, k * 0.6)

# --- render settings -------------------------------------------------------
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = RES_X
scene.render.resolution_y = RES_Y
scene.render.film_transparent = True          # cut-out, drops onto any page colour
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.filepath = OUT
scene.view_settings.view_transform = "Standard"

bpy.ops.render.render(write_still=True)
print("RENDERED", OUT)
