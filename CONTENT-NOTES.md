# Content notes — verification status

Rewritten after reading the four source projects. Almost everything on the site is
now taken from your own code, not inferred. This file records where each claim came
from and what is still open.

Legend: ✅ verified in source · ⚠️ your judgement call · ❌ still unverified

Sources read:
- `C:/Unity/Turn_Off_The_Light` — full Unity 6 project, 74 C# scripts
- `C:/Unity/TamCam` — full Unity 6 project, 82 C# scripts, `CharacterWork/`
- `C:/Unity/RedRain` — assets only, no project
- `C:/Char/sontinhthuytinh` — six zipped characters

---

## What changed from the first draft

Four things on the old site were **wrong**, not just thin:

1. **Tấm Cám was listed as Unreal Engine 5.** It is Unity 6 (6000.2.9f1), same as
   Turn Off The Light. This came from the previous site and I carried it forward
   without checking.
2. **Tấm Cám's protagonist was wrong.** I had you playing Tấm. You play **Cám** —
   `DreadSystem.Whispers` is Tấm's voice accusing the player ("kẻ mạo danh", "you
   took her place"). That inverts the entire premise, and the page is rewritten
   around it.
3. **Quảng Trị Battle claimed a prototype and gameplay code.** There is no Unity
   project in `RedRain` — no scenes, no scripts, no ProjectSettings. It is now
   marked **Concept**, its progress dropped from 41% to 18%, and the page opens by
   saying plainly that it is a design document.
4. **The site claimed you modelled 22 assets.** Every character mesh in all three
   projects reports `"generator":"Tripo"`, and the RedRain weapons are third-party
   GLBs with marketplace filenames. Those claims are removed and replaced with
   accurate disclosures.

The fourth one mattered most. A studio that opens your Quảng Trị page, sees "3D
asset pipeline: 22 models modelled and exported", and then opens an asset they
recognise, stops reading the rest of the site.

---

## Turn Off The Light — now the strongest page

Read from `GameProgress.cs`, `StageFlow.cs`, `RoomController.cs`, `SetupRoomTasks.cs`,
`OldManForm.cs`, `MemoryBulb.cs`, `CREDITS.md`.

| Item | Status |
| --- | --- |
| Rooms: Bathroom → Kitchen → Living Room → Garage, fixed order | ✅ `GameProgress.Stages` |
| Chores: Pee / Brush teeth · Cook Dad's noodles · Put the tape in and watch it · Get the garage door open | ✅ `SetupRoomTasks.cs` |
| Dad's four intro lines, quoted exactly | ✅ `GameProgress.IntroLines` |
| Dad's three inter-stage lines, quoted exactly | ✅ `StageDef.DadLine` |
| Three endings — Everything Remembered / Goodnight / The Road | ✅ `GameProgress.Endings`, with blurbs, hints and card titles quoted verbatim |
| Four memory bulbs; all four → the Remembered ending | ✅ `MemoryBulb`, `AllMemoriesFound` |
| Normal / Spooky / Memory light modes | ✅ `RoomController.RoomMode` |
| Stage completes only when light is off AND kid is home | ✅ `StageFlow` class docs |
| Two-tier save: run wiped by New Game, gallery never wiped | ✅ `GameProgress` docs |
| Epilogue: night → bed → morning → parents' door → sixty years → old man | ✅ `RunMorning`, `ApplyMorning`, `RunDiscovery`, `OldManForm` |
| Old man: 2.5 units tall, 55% speed, no jump or duck | ✅ `OldManForm` defaults |
| `ParentsGone` room if all memories found | ✅ `ApplyMorning` |
| 74 C# scripts (56 runtime + 18 editor) | ✅ counted |
| Build 36 MB | ✅ measured (`du` on the zip; the itch page says 35 MB) |
| Controls layering bug | ✅ visible in your own screenshot |
| Third-party art: Noto Emoji (Apache 2.0), game-icons.net (CC BY 3.0) | ✅ `CREDITS.md` |
| **"Sixty years" framing of the whole game** | ⚠️ The code says the fade is sixty years and the player returns as an old man. How much of that to put in the logline is a taste call — I put it front and centre because it is the most distinctive thing about the game. Soften it if you would rather players discover it. |
| Playtime 30–45 min | ❌ Carried from your itch page, not measurable from source. |
| The epilogue and endings sections are spoiler-gated | ⚠️ Both are behind a click. Given the logline now hints at the ending, you may want to reconsider how much the gate is protecting. |

**Note:** `game-icons.net` requires attribution *per icon, naming the artist* — your
CREDITS.md says so explicitly. That obligation is on the itch page and the build,
not this site, but it is worth confirming it is actually discharged.

---

## Tấm Cám: The Untold — rewritten

Read from `GameEnums.cs`, `DreadSystem.cs`, `RecognitionSystem.cs`,
`RealitySystem.cs`, `CharacterWork/`.

| Item | Status |
| --- | --- |
| Unity 6, not Unreal | ✅ `ProjectVersion.txt` |
| You play Cám | ✅ `DreadSystem.Whispers` |
| Chapter 1 = "Bốn Cái Hũ" (Four Jars) | ✅ `ActType` doc comment |
| Six acts: Intro, Blood, Grain, Loom, Interlude, Epilogue | ✅ `ActType` |
| Three endings: Jar / Loop / Confession, gated by Recognition | ✅ `EndingKind` |
| Dread: denial relieves, mercy costs | ✅ `DreadSystem` header |
| Recognition = blood flowers, never a HUD number | ✅ `RecognitionSystem` header |
| Reality falls when the mother's head is found | ✅ `RealitySystem` header |
| 82 C# scripts, service locator, event bus, test assembly | ✅ counted |
| Blender: Python rigging scripts, walk/run/knock, shape keys | ✅ `CharacterWork/scripts/`, `.blend` files |
| Base meshes are Tripo, ~1M triangles | ✅ GLB header: `"generator":"Tripo"`, 996,890-vertex accessor |
| Scene `NhaBaGian` | ✅ |
| Track percentages (70/55/50/25/15) | ❌ **My estimates.** Only you know how close Chapter 1 is. |
| "Chapter 1 of a longer game" | ⚠️ Implied by `HẾT MÀN 1` and the chapter naming. Confirm how many chapters you intend. |

**Worth knowing:** the character GLBs are ~57 MB each at roughly a million triangles.
That is fine in-engine after decimation but it is why this website loads them only on
click. A retopology pass is on the roadmap for a reason.

---

## Quảng Trị Battle — downgraded to Concept

| Item | Status |
| --- | --- |
| No Unity project exists | ✅ `RedRain/` contains only `Character/`, `Weapon/`, `Map.webp` |
| Six characters are Tripo AI, unrigged | ✅ zips contain `tripo_convert_*.fbx` |
| 26 weapon/vehicle GLBs, third-party | ✅ marketplace filenames, 1.5 GB |
| Round design, no-abilities constraint, phase timings | ⚠️ From your previous site. Kept as stated design intent, explicitly not as tuned values. |
| Based on *Mưa Đỏ*, 81-day siege, 1972 | ⚠️ From your previous site. I removed the "2025" film release year — I could not verify it. |

The library includes duplicates and off-period items (`futuristic+gun`,
`air-to-ground+missile`), so "26 GLB" is a reference library, not a weapon roster.
The page says so.

---

## Thủy Tinh: The Adventure

| Item | Status |
| --- | --- |
| Six characters in the source folder, all Tripo, PBR textured | ✅ |
| No project, no code | ✅ |
| Tide / Persuasion / The Race systems | ⚠️ From your previous site — paper design. |
| Site shows 7 characters, source folder has 6 | ⚠️ `my-nuong` is in `public/works/` but not in `C:/Char/sontinhthuytinh`. Harmless, but you may know where it came from. |

---

## Still open

1. **Playtime for Turn Off The Light** — the only unverified headline number.
2. **All track percentages** on the three unreleased titles are my estimates.
3. **Your contact email** is still your personal Gmail in `src/content/studio.ts`.
4. **Chapter count** for Tấm Cám.

## The numbers

`progressOf()` uses a weighted mean — streams that gate a playable build carry
weight 3–5, art streams 1. Current: Turn Off The Light 100% (shipped) ·
Tấm Cám 45% · Quảng Trị 18% · Thủy Tinh 16%.

---

# Outstanding — 5 September 2026

## 1. Three room images are missing (Turn Off The Light)

The Rooms section has a screenshot for the Kid's Room and the Bathroom. Kitchen,
Living Room and Garage have none, and **I cannot capture them.** The Unity
project only holds individual prop sprites (`kit_stove.png`, `liv_sofa.png`,
`gar_car.png` are 24–50px polaroid thumbnails), and compositing a room out of
loose props would invent a layout the game does not have.

**What to do:** run the build, walk into each room, press your screenshot key,
and drop the files at:

```
public/works/turn-off-the-light/06-kitchen.png
public/works/turn-off-the-light/07-living-room.png
public/works/turn-off-the-light/08-garage.png
```

Then add `image:` and `imageNote:` to the R2/R3/R4 entries in
`src/content/games/turn-off-the-light.ts`, matching how R1 does it. Lights on,
before the chore is done, is the shot that matches the other two.

## 2. Character renders

Every character on Quảng Trị Battle and Thủy Tinh is now a Blender render of the
source FBX — full body, on transparency, evenly lit. That replaced the Tripo
reference sheets, which carried a ghost silhouette and grey backing plates that
were invisible on white and obvious on a dark page.

`tools/render-character.py` does it. Re-run for a new character:

```bash
"C:/Program Files/Blender Foundation/Blender 5.1/blender.exe" --background --factory-startup --python tools/render-character.py -- "path/to/model.fbx" "out.png"
```

Then trim to the alpha bounding box and save as WebP.

One thing it gets wrong if you are not careful: the up axis. It picks the taller
of Y and Z, never X — because a T-pose in a wide robe spans further across the
arms than the figure is tall, and picking X renders the top of the head. Vua Hùng
came out that way first time.

**Mỵ Nương is the exception** — there is no source model in
`C:/Char/sontinhthuytinh`, so her card still uses the old `my-nuong.png`. Drop a
`MyNuong.zip` in beside the others and re-run to match the rest.

## 3. The skills list is a first draft

`studio.fields` in `src/content/studio.ts` is seven groups of chips — engines,
languages, programming, 3D/technical art, 2D/UI, design, pipeline. I wrote it
from what the projects actually show, but **it is a list about you, so it should
be yours.** Add, cut, reorder. No numbers in it, as asked.

## 4. Quảng Trị copy is deliberately thin

You said not to invent things for a backlog title, so the page now says only:
it is a multiplayer shooter at Quảng Trị based on *Mưa Đỏ*; five soldiers hold
the Citadel; Captain Hoàng and eight comrades come to take it. Everything I had
made up — round phases and timings, economy rules, per-weapon balance notes, the
roadmap, the progress percentages — is gone.
