import re, urllib.request
html = urllib.request.urlopen('https://www.youtube.com/@kishoregunukulagunukulakis900/videos', timeout=30).read().decode('utf-8', 'ignore')
ids = []
seen = set()
for m in re.finditer(r'"videoId":"([A-Za-z0-9_-]{11})"', html):
    vid = m.group(1)
    if vid not in seen:
        seen.add(vid)
        ids.append(vid)
print('COUNT', len(ids))
for vid in ids[:10]:
    pat = re.compile(r'"videoId":"%s".*?"title":"([^"]+)"' % re.escape(vid), re.DOTALL)
    mm = pat.search(html)
    print(vid + ' | ' + (mm.group(1) if mm else 'UNKNOWN TITLE'))
