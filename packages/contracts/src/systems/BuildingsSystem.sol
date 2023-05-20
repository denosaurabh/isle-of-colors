// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../Utils.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Buildings, BuildingsData } from "../codegen/Tables.sol";


contract BuildingsSystem is System {

    function addBuildingsMud(int32 x, int32 z, int32 rotation, string memory id, string memory url) public {
        bytes32 owner = addressToEntity(_msgSender());


        // bytes32 keyId = getUniqueEntity();        
        Buildings.set(bytes32(bytes(id)), BuildingsData({x: x, z: z, rotation: rotation, id : owner, url : url}));
    }
    
}