// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface IBuildingsSystem {
  function addBuildingsMud(
    int32 x,
    int32 z,
    int32 rotation,
    string memory id,
    string memory url,
    string memory structuresName,
    string memory structuresColor
  ) external;

  function updateBuildingsMud(string memory id, string memory structuresName, string memory structuresColor) external;
}
