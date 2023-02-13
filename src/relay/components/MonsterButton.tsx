import * as React from "react";
import { EFFECTS } from "../../common/constants";
import { MonsterData } from "../../common/types";

function MonsterButton(parentMonster: MonsterData): JSX.Element {
    const [monster, setMonster] = React.useState(parentMonster);
    React.useEffect(() => {
        if (parentMonster !== monster) {
            setMonster(parentMonster);
        }
    }, [parentMonster]);

    const image = monster.img ? `/images/adventureimages/${monster.img}` : '/images/itemimages/confused.gif'
    const className = `monster-button ${monster.available ? '' : monster.fought ? 'fought' : 'disabled'}`;

    const reminisceMonster = () => {

    }

    return (
        <div data-id={monster.id} className={className} onClick={reminisceMonster} title={'Free: ' + (monster.free ? 'Yes' : 'No') + '\n' + EFFECTS[monster?.phylum]?.join('\n')}>
            <img src={image}></img>
            <div className="monster-text">
                <strong>{monster.name}</strong>
                <br />
                {monster.text}
            </div>
        </div >
    );
}

export default MonsterButton;