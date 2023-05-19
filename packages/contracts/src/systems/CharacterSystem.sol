// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { addressToEntity } from "../Utils.sol";
import { getUniqueEntity } from "@latticexyz/world/src/modules/uniqueentity/getUniqueEntity.sol";
import { Character, CharacterData } from "../codegen/Tables.sol";


contract CharacterSystem is System {

    function addCharacterMud(int32 x, int32 z) public {
        bytes32 owner = addressToEntity(_msgSender());
        // bytes32 id = getUniqueEntity();        
        Character.set(owner, CharacterData({x: x, z: z}));
    }

    function updateCharacterPositionMud(bytes32 characterId, int32 x, int32 z) public {
        bytes32 sender = addressToEntity(_msgSender());
        // require(sender == Character.getOwner(characterId), "CharacterSystem: Only owner can update position");

        // Character.setX(characterId, x);
        Character.set(characterId, CharacterData({x : x, z : z}));
        // Character.setX(characterId, z);
    }

    function getCurrentCharacterIdMud() public view returns (bytes32) {
        return addressToEntity(_msgSender());
    }
}