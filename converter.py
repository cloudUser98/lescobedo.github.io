import json
import sys
import random

file_path = sys.argv[1]

if not file_path.endswith(".osu"):
    print("No osu file")
    exit()

with open(file_path) as f:
    result = []
    readingHit = False
    active_track = 1
    for line in f.readlines():
        if "HitObjects" in line:
            readingHit = True
            continue

        if not readingHit:
            continue

        # print(line)
        step = line.split(",")[0]
        time = line.split(",")[2]
        time = int(time)

        # Get the track
        # track = random.randrange(1, 5)
        type = random.randrange(0, 6)

        # result.append({"handler": "chanegthislol", "time": time, "track": track})
        result.append({ "time": time, "track": active_track, "type": type, "handler": "jajaja" })

        if type == 5: # Turn right
            if active_track == 1: # Upper
                active_track = 3

            elif active_track == 2: # Left
                active_track = 1

            elif active_track == 3: # Right
                active_track = 4

            elif active_track == 4: # Bottom
                active_track = 2

        elif type == 4: # Turn left
            if active_track == 1: # Upper
                active_track = 2

            elif active_track == 2: # Left
                active_track = 4

            elif active_track == 3: # Right
                active_track = 1

            elif active_track == 4: # Bottom
                active_track = 3

    else:
        print(json.dumps(result, indent=2))