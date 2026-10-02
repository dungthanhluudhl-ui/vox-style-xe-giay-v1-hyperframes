import json,pathlib,sys,hashlib
manifest_path=pathlib.Path(sys.argv[1]);root=manifest_path.resolve().parent
manifest=json.loads(manifest_path.read_text());assets={a['id']:a for a in manifest['assets']};shots=json.loads(pathlib.Path(sys.argv[2]).read_text());errors=[]
for shot in shots:
 if shot.get('presentationMode')!='mascot':continue
 sid=shot.get('id');asset=assets.get(shot.get('mascotAssetId'))
 if not asset or asset['status']!='ready':errors.append(f'{sid}: unknown or unavailable mascot ID');continue
 file=(root/asset['file']).resolve()
 if not file.is_relative_to(root) or not file.is_file():errors.append(f'{sid}: file missing or outside library');continue
 if hashlib.sha256(file.read_bytes()).hexdigest()!=asset['sha256']:errors.append(f'{sid}: asset hash mismatch')
 if shot.get('assetId') is not None or shot.get('graphicsSpec') is not None or shot.get('overlays'):errors.append(f'{sid}: mascot shot mixes illustrative media, graphics or overlays')
 if shot.get('animationPreset') not in manifest['motionPresets']:errors.append(f'{sid}: unknown animation preset')
 if shot.get('lipSync') is not False:errors.append(f'{sid}: v1 requires lipSync=false')
 if shot.get('endMs',0)<=shot.get('startMs',0):errors.append(f'{sid}: invalid duration')
 if shot.get('animationPreset')=='grow-600' and shot['endMs']-shot['startMs']<600:errors.append(f'{sid}: entrance exceeds shot duration')
 layout=shot.get('layoutSpec',{})
 if layout.get('fit')!='contain' or layout.get('rotation')!=0 or layout.get('safeRect')!=manifest['layout']['safeRect']:errors.append(f'{sid}: layout does not match library v1')
 if not isinstance(shot.get('textEvents'),list):errors.append(f'{sid}: textEvents must be explicit')
print(json.dumps({'ok':not errors,'errors':errors,'scope':'Library binding validation; scene schema, text intent, runtime and final layout still require pipeline gates.'},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
