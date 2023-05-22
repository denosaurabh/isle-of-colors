// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../Utils.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Buildings, BuildingsData } from "../codegen/Tables.sol";


contract BuildingsSystem is System {

    function addBuildingsMud(int32 x, int32 z, int32 rotation, string memory id, string memory url, string memory structuresName, string memory structuresColor) public {
        bytes32 owner = addressToEntity(_msgSender());

        // int32[] memory color = new int32[](1);
        // int32[] memory structure = new int32[](1);

        // bytes32 keyId = getUniqueEntity();        
        Buildings.set(bytes32(bytes(id)), BuildingsData({x: x, z: z, rotation: rotation, id : owner, url : url, structuresName : structuresName, structuresColor : structuresColor }));
    }

    function updateBuildingsMud(string memory id, string memory structuresName, string memory structuresColor) public {
        // bytes32 owner = addressToEntity(_msgSender());
        // BuildingsData memory data = Buildings.get(bytes32(bytes(id)));
        // data.structuresName = structureName;
        Buildings.setStructuresName(bytes32(bytes(id)), structuresName);
        Buildings.setStructuresColor(bytes32(bytes(id)), structuresColor);
    }
    
}