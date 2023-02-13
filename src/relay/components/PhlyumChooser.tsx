import * as React from "react";
import { EFFECTS } from "../../common/constants";
import { MonsterData } from "../../common/types";
import MonsterButton from "./MonsterButton";

const PHYLA = [
  "All",
  "Beast",
  "Bug",
  "Constellation",
  "Construct",
  "Demon",
  "Dude",
  "Elemental",
  "Elf",
  "Fish",
  "Goblin",
  "Hippy",
  "Hobo",
  "Humanoid",
  "Horror",
  "Mer-Kin",
  "Orc",
  "Penguin",
  "Pirate",
  "Plant",
  "Slime",
  "Undead",
  "Weird",
];

function PhylumChooser(availableMonsters: { [key: number]: MonsterData }): JSX.Element {
  const [enchantments, setEnchantments] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [advCount, setAdvCount] = React.useState(1);
  const [monsterName, setMonsterName] = React.useState("");
  let monsters = Object.values(availableMonsters).sort((a, b) => {
    const aN = a.name.toUpperCase();
    const bN = b.name.toUpperCase();
    return aN < bN ? -1 : aN > bN ? 1 : 0;
  });
  const [selectedMonster, setSelectedMonster] = React.useState(monsters[0]);

  const onMonsterUpdated = (): void => {
    let selectedMonsterId = document.getElementById("monster").value;
    let enchantments = [],
      image = "data:,",
      adventures = 0,
      name = "",
      monster: MonsterData;
    if (selectedMonsterId) {
      monster = availableMonsters[selectedMonsterId];
      enchantments = EFFECTS[monster.phylum];
      image = `/images/adventureimages/${monster.img}`;
      adventures = monster.free ? 0 : 1;
      name = monster.name;
    }
    setEnchantments(enchantments);
    setImage(image);
    setAdvCount(adventures);
    setMonsterName(name);
    setSelectedMonster(monster);
  };

  const [options, setOptions] = React.useState([]);

  function updateOptions(): void {
    const onlyFree = document.getElementById("freeFightOnly")
      ? document.getElementById("freeFightOnly").checked
      : false;
    const phylum = document.getElementById("phylum")
      ? document.getElementById("phylum").value.toLowerCase()
      : "all";
    const options: JSX.Element[] = [];
    monsters.forEach((monster) => {
      if (phylum === "all" || phylum === monster.phylum) {
        if (!onlyFree || monster.free) {
          options.push(<option value={monster.id}>{monster.name}</option>);
        }
      }
    });
    setOptions(options);
  }

  React.useEffect(updateOptions, [""]);
  React.useEffect(onMonsterUpdated, [options]);

  return (
    <div style={{ display: "inline-flex" }}>
      <div>
        <select id="monster" onChange={onMonsterUpdated}>
          {options}
        </select>
        <div>
          <label>
            <input id="freeFightOnly" type="checkbox" onChange={updateOptions}></input>Free Fights
            only
          </label>
          <label>
            Phylum:
            <select id="phylum" onChange={updateOptions}>
              {PHYLA.map((phylum) => (
                <option value={phylum}>{phylum} | {EFFECTS[phylum.toLowerCase()].join(', ')}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <MonsterButton {...selectedMonster} />
    </div>
  );
}

export default PhylumChooser;
