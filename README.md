# Isle of Colors

Project link: https://ethglobal.com/showcase/isle-of-colors-qruy2


**Isle of Colors" is an isometric 3D multiplayer game that aims to offer a unique social experiment in color. Build your cities and fight with other players for colors to paint your cities. Using web3 MUD framework & Optimism chain.**

## Project Description
The goal is to build & expand, color & defend your buildings from other players stealing colors from your buildings.

every player starts with nothing
they can place some buildings on the ground below, but the colors of the buildings will be white.
they will only one randomly given color to paint their buildings
they can wander around in the world, find other player cities, steal color from other's buildings & find tree spirits to get more colors.
by stealing colors, mixing with other colors, and getting new colors from tree spirits they can increase their Color Inventory to color their buildings.
Why on-chain?

TODO: players can sell & buy rare colors from other players, building an interesting economy in the game.


## How it's Made
- Frontend

We have used ReactJS combined with React Three Fiber (a wrapper of ThreeJS) to build this 3d experience. We have used Blender to make very lightweight models (~100kb), just geometry, no textures or UV. So the game is very performant. We have also used Zustand for state management, and react-three-rapier for 3d physics. We have also used NFT.Storage for storing those 3d models.

- Backend

We have used MUD to store game data, things like model position & colors are stored on the chain, and even multiplayer & player positions are stored and synced quickly on the chain.
