import * as React from "react";
import MonsterButton from "./MonsterButton";
import { Section } from "../../common/types";

function SectionComponent(props: Section): JSX.Element {
    const monsters = props.monsters.map((monster) => (
        <MonsterButton {...monster} />
    ));

    return (
        <div className="section">
            <div className="section-title">{props.title}</div>
            <div>{monsters}</div>
        </div>
    );
}

export default SectionComponent;