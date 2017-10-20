Files in this folder are created following this three steps:

1. Replace the `process_segment` function in lua profile for this one:

    ```lua
    function process_segment(profile, segment)
        io.write(segment.source.lat .. ',' .. segment.source.lon, '\n')
        io.write(segment.target.lat .. ',' .. segment.target.lon, '\n')
        os.exit()
    end
    ```

2. Run 

    ```
    node ./scripts/build_osrm_data.js uruguay.bicycle/uruguay-latest.osm.pbf bicycle.chivia > ./latlng/uruguay-latest.txt
    ```

3. Restore `process_segment` function to it's original