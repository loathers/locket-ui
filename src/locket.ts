import { fileToBuffer, myHash, print, toMonster, urlDecode, visitUrl, writeln, xpath } from "kolmafia";
import { get } from "libram";
import { MonsterData, Section } from "./common/types";


export function main(pageTextEncoded: string): void {
    const pageText = urlDecode(pageTextEncoded);
    let phylumReal = get('locketPhylum') || ''
    const phylum = phylumReal.toString();
    const foughtMonsters = get('_locketMonstersFought', '').split(',');
    const locketMonsters = foughtMonsters.map((id) => (toMonster(id).name));
    let availableMonsters: { [key: number]: MonsterData } = {};
    
    if (locketMonsters.length !== 3) {
        let availableIds = xpath(pageText, '//form[@action="choice.php"]//option/@value');
        availableIds.forEach((id) => {
            const numId = parseInt(id);
            let monster = toMonster(id);
            availableMonsters[numId] = {
                id: numId,
                phylum: monster.phylum.toString(),
                free: monster.attributes.includes('FREE'),
                available: true,
                img: monster.image,
                name: monster.name,
                text: ''
            }
        })
    }

    let sections: Section[] = JSON.parse(fileToBuffer("locket_relay_monsters.json"));
    const customFile = fileToBuffer("locket_relay_monsters_custom.json");
    if (customFile) {
        try {
            sections = JSON.parse(customFile);
        } catch (e) {
            print('Error parsing custom JSON. Using default monster list.', 'red');
        }
    }

    sections.forEach(section => {
        section.monsters.forEach(monsterData => {
            const monster = toMonster(monsterData.id);
            monsterData.img = monster.image;
            monsterData.name = monster.name;
            monsterData.phylum = monster.phylum.toString();
            monsterData.free = monster.attributes.includes('FREE');
            monsterData.available = Boolean(availableMonsters[monsterData.id]);
            monsterData.fought = foughtMonsters.includes(monsterData.id.toString());
        });
    });
    writeln('<link rel="stylesheet" href="./locket/css/locket-ui.css">')
    writeln('<div id="root"></div>');

    // add script that react calls when loaded to get kol data
    writeln("<script>");
    writeln(`let getData = function(callback) {callback(${JSON.stringify({ phylum, locketMonsters, sections, availableMonsters, pwd: myHash() })})}`);
    writeln("</script>");

    writeln('<script src="./locket/locket-ui.js"></script>');
}