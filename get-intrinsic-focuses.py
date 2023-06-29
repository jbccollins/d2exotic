import requests, os, json

#######################################################
# First, download the manifest overview
# https://www.bungie.net/Platform/Destiny2/Manifest/

# Define the required tables. We need InventoryItem and the Plugs
requiredTables = ["DestinyInventoryItemDefinition", "DestinyPlugSetDefinition"]

STAT_TO_INDEX = {
    2996146975: 0,  # Mobility
    392767087: 1,  # Resilience
    1943323491: 2,  # Recovery
    1735777505: 3,  # Discipline
    144602215: 4,  # Intellect
    4244567218: 5,  # Strength
}


# Get the manifest
manifest = requests.get("https://www.bungie.net/Platform/Destiny2/Manifest/").json()
manifest_version = manifest["Response"]["version"]

# create the manifest directories
if not os.path.exists("manifest"):
    os.makedirs("manifest")

if not os.path.exists("manifest/" + manifest_version):
    os.makedirs("manifest/" + manifest_version)

# download the tables, if they are not already downloaded
for table in requiredTables:
    filename = "manifest/" + manifest_version + "/" + table + ".json"
    if os.path.isfile(filename):
        print(table + " already downloaded")
        continue

    print("Downloading " + table + "...")
    table_url = (
        "http://www.bungie.net"
        + manifest["Response"]["jsonWorldComponentContentPaths"]["en"][table]
    )
    table_file = requests.get(table_url)
    with open(filename, "wb") as f:
        f.write(table_file.content)
        print("Downloaded " + table + " to " + filename)


#######################################################
# Actually load the manifest
print("Loading manifest...")
tables = {
    table: json.load(open(f"manifest/{manifest_version}/{table}.json", encoding="utf8"))
    for table in requiredTables
}

#######################################################
# Grab exotic armor
exotic_armor = [
    k
    for _, k in tables["DestinyInventoryItemDefinition"].items()
    if k["itemType"] == 2 and k["inventory"]["tierType"] == 6  # tier: exotic
    # armor 2.0
    and k["sockets"]["socketEntries"][0]["socketTypeHash"] in [1718047805]  # MRR
]


#######################################################
#


def get_stat_minimum(item):
    # Get plugs. MRR are sockets 0 and 1, DIS are sockets 2 and 3
    socketCategories = [
        _["socketIndexes"][:4]
        for _ in item["sockets"]["socketCategories"]
        if _["socketCategoryHash"] == 3154740035
    ][0]
    sockets = [
        sock
        for k, sock in enumerate(item["sockets"]["socketEntries"])
        if k in socketCategories
    ]
    # map sockets to their plugs

    socket_plugs = [
        tables["DestinyPlugSetDefinition"][str(socket["randomizedPlugSetHash"])]
        for socket in sockets
    ]

    # now map the plugs to their inventory items, and then to their stats
    def mapToStats(plug):
        result = [0, 0, 0, 0, 0, 0]
        entries = tables["DestinyInventoryItemDefinition"][str(plug["plugItemHash"])][
            "investmentStats"
        ]
        for entry in entries:
            result[STAT_TO_INDEX[entry["statTypeHash"]]] = entry["value"]
        return result

    socket_plugs = [
        [mapToStats(i) for i in socket_plug["reusablePlugItems"]]
        for socket_plug in socket_plugs
    ]

    # we want to find the minimum of each stat
    minValuesSocket0 = [min([plug[i] for plug in socket_plugs[0]]) for i in range(6)]
    minValuesSocket1 = [min([plug[i] for plug in socket_plugs[1]]) for i in range(6)]
    minValuesSocket2 = [min([plug[i] for plug in socket_plugs[2]]) for i in range(6)]
    minValuesSocket3 = [min([plug[i] for plug in socket_plugs[3]]) for i in range(6)]

    def getMinima(minima):
        # if any stat is > 1, return the index; otherwise, -1
        if any([minima[i] > 1 for i in range(6)]):
            return minima.index(max(minima))
        return -1

    minIndexSocket0 = getMinima(minValuesSocket0)
    minIndexSocket1 = getMinima(minValuesSocket1)
    minIndexSocket2 = getMinima(minValuesSocket2)
    minIndexSocket3 = getMinima(minValuesSocket3)
    minStat = max(minIndexSocket0, minIndexSocket1, minIndexSocket2, minIndexSocket3)
    if minStat > 0 and (
        minIndexSocket0 != minIndexSocket1 or minIndexSocket2 != minIndexSocket3
    ):
        minStat += 6
    return minStat


intrinsics = {
    item["displayProperties"]["name"]: get_stat_minimum(item) for item in exotic_armor
}

STAT_NAMES = [
    "Mobility",
    "Resilience",
    "Recovery",
    "Discipline",
    "Intellect",
    "Strength",
    "Mobility (Partial)",
    "Resilience (Partial)",
    "Recovery (Partial)",
    "Discipline (Partial)",
    "Intellect (Partial)",
    "Strength (Partial)",
    "-",
]

# sort by name (key)
intrinsics = {k: v for k, v in sorted(intrinsics.items(), key=lambda item: item[0])}

for name in intrinsics:
    print(f"{name:30} {STAT_NAMES[intrinsics[name]]}")
