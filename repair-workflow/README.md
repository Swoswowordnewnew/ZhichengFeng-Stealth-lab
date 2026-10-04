# Module 10 · Damage Detection and Repair

An interactive honeycomb sandwich workflow: **damage → inspection → repair → re-inspection**.

## Preview

Open the [published module](https://zhichengfeng.github.io/ZhichengFeng-Stealth-lab/repair-workflow/), or run a server from this repository's root:

```powershell
python -m http.server 3000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:3000/repair-workflow/`. Three.js is bundled in `vendor/three.module.js`; the module can run offline through a local HTTP server.

## Modules

| Section | Content | Implementation |
| --- | --- | --- |
| Damage | Rotatable cutaway; intact, impact, perforated, and repaired states | Local Three.js, loaded on demand |
| Sense | A-scan, Hilbert envelope, six-point scan, and point assessment | Canvas and SVG |
| Probe | Probe scan, reference S11 curves, near-field map, and method overview | Canvas and SVG |
| Repair | Six scarf repair steps and a return to the repaired state | SVG |

All sections share the selected damage state. Keyboard controls support state selection and the 3D viewer; the guided tour can be stopped at any time.

## Files and data

- `index.html`, `styles.css`, and `app.js`: page structure, visual styles, and native interactions.
- `data/damage-states.json`: state descriptions.
- `data/ultrasonic-demo.json`: A-scan and envelope data for four states and six points.
- `data/electromagnetic-demo.json`: S11 curves and maps for four states and three points.
- `data/repair-steps.json`: six conceptual repair steps.
- `assets/repair-scarf-configuration.webp`: repair geometry reference.
- `tools/generate-demo-data.mjs`: seeded, deterministic signal generator.

All signals and curves are **synthetic demonstration data**, not measurements, full-wave results, or validated defect estimates. The generator illustrates extra echoes, back-wall attenuation, and interface echoes:

```powershell
node repair-workflow/tools/generate-demo-data.mjs
```

The data schema and generator use English field names. No temperature, pressure, curing time, material grade, or repair dimensions are specified.

## Stealth Lab integration

`assets/repair-workflow-entry.js` adds the top navigation entry after the main application hydrates. The module shares the website theme and includes links to Stealth Lab and AeroRepair Scan.
