# locket-ui
A relay override for the combat lover's locket in Kingdom of Loathing

![image](https://user-images.githubusercontent.com/17497392/155977434-45dfb93a-e73d-4815-83a8-f37912d6de58.png)

## Getting started
`git checkout Loathing-Associates-Scripting-Society/locket-ui`

### Migrating from SVN to Git

With Mafia support now implemented for git you can now remove the old SVN repo and convert to git.

```
svn delete Loathing-Associates-Scripting-Society-locket-ui-branches-main-KoLmafia
```

Then install `locket-ui` as normal.

## Features
- Filter reminiscable monster dropdown by phylum and adventure cost.
- Visual lists of suggested monsters that are disabled when not in your locket or already reminisced.
- See enchantment and adventure cost of monster to be reminisced by hovering over the desired button.

## Customization
### Can I customize the monster displayed?
Yes! Just add `locket_relay_monsters_custom.json` in KoL Mafia's data directory. I would suggest copying `locket_relay_monsters.json` and modifying it.  
### I'm not a fan of orange. Can I change that?
No. Go Tigers.
