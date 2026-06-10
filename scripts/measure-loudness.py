import miniaudio, numpy as np, os

BASE = r'C:\Code\ardenmoor\public\assets\audio'

FILES = [
    ('ambient', 'menu-ambient.mp3'),
    ('ambient', 'map-ambient.mp3'),
    ('ambient', 'archive-exterior-night.mp3'),
    ('ambient', 'archive-interior-day.mp3'),
    ('ambient', 'archive-burning.mp3'),
    ('ambient', 'storage-district-night.mp3'),
    ('ambient', 'city-morning.mp3'),
    ('ambient', 'road-cold-field.mp3'),
    ('ambient', 'safe-house.mp3'),
    ('ambient', 'forest-path.mp3'),
    ('ambient', 'settlement-interior.mp3'),
    ('ambient', 'settlement-exterior.mp3'),
    ('sfx/prologue', 'sfx_fire_crackle.mp3'),
    ('sfx/prologue', 'sfx_crowd_murmur.mp3'),
    ('sfx/prologue', 'sfx_cold_wind.mp3'),
    ('sfx/prologue', 'sfx_stone_echo.mp3'),
    ('sfx/prologue', 'sfx_dawn_birds.mp3'),
]

results = []
for folder, name in FILES:
    path = os.path.join(BASE, folder, name)
    if not os.path.exists(path):
        results.append((name, None))
        continue
    decoded = miniaudio.decode_file(path)
    samples = np.frombuffer(decoded.samples, dtype=np.int16).astype(np.float32) / 32768.0
    rms = np.sqrt(np.mean(samples**2))
    rms_db = 20 * np.log10(rms + 1e-10)
    results.append((name, round(rms_db, 2)))

print(f"{'File':<42} {'RMS dBFS':>10}")
print('-' * 54)
for name, db in results:
    if db is not None:
        print(f"{name:<42} {db:>10.2f} dBFS")
    else:
        print(f"{name:<42} {'MISSING':>10}")

valid = [(n, db) for n, db in results if db is not None]
dbs = sorted(db for _, db in valid)
median_db = dbs[len(dbs) // 2]
print(f"\nMedian RMS: {median_db:.2f} dBFS")

# Ambient target volume = 0.30 (the current default)
# Prologue SFX loop target = 0.14 (current prologue SFX volume)
# For each file, calculate the volume multiplier that brings it to the median loudness.
print(f"\n{'File':<42} {'adjusted vol (base 0.30)':>24}")
print('-' * 68)
for name, db in valid:
    delta_db = median_db - db
    factor = 10 ** (delta_db / 20)
    if 'sfx_' in name:
        base = 0.14
    else:
        base = 0.30
    norm = round(min(base * factor, 0.95), 4)
    print(f"{name:<42} {norm:>24.4f}")
