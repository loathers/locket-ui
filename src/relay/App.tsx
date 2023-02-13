import * as React from "react";
import { RelayData } from "../common/types";
import SectionComponent from "./components/Section";
import PhylumChooser from "./components/PhlyumChooser";
import { EFFECTS } from "../common/constants";

function App({ foughtMonsters, sections, phylum, locketMonsters, availableMonsters, pwd }: RelayData): JSX.Element {
  const preferences = sections.map((section) => (
    <SectionComponent {...section} />
  ));

  const submitForm = (e) => {
    const closestButton = e.target.closest('.monster-button');
    if (closestButton) {
      document.getElementById('formMonsterId').value = closestButton.getAttribute('data-id');
      document.getElementById('locketForm').submit();
    }
  }

  return (
    <div onClick={submitForm}>
      <form id="locketForm" action="choice.php" method="POST">
        <input type="hidden" name="whichchoice" value="1463" />
        <input type="hidden" name="pwd" value={pwd} />
        <input type="hidden" name="option" value="1" />
        <input id="formMonsterId" type="hidden" name="mid" />
      </form>
      <div className="section">
        <div className="section-title">Reminiscing About Those Monsters You Fought</div>
        <div>You look at the photographs in your locket, every time you do it makes you laugh (as you reminisce). You debate which fight to relive.</div>
        <PhylumChooser {...availableMonsters} />
      </div>
      {preferences}
      <div>Reminisced today: {locketMonsters.join(', ')}</div>
      { phylum && 
        <div style={{ display: 'inline-flex' }}>
          <span style={{ alignSelf: 'center' }}>Current Enchantment:</span>
          <span className="enchantment">{EFFECTS[phylum][0]}<br />{EFFECTS[phylum][1]}</span>
        </div>
      }
    </div>
  );
}

export default App;
