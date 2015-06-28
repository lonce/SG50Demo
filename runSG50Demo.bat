START /MIN /B CMD /C CALL "node" SG50DemoServer.js 8090
START "" "http://localhost:8090/index.html"
echo "Hello from SonicChat - server started, and leadClient fired up."
