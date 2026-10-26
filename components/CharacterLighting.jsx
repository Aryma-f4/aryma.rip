import { characterLights } from '../lib/character-lighting.mjs';

export default function CharacterLighting() {
 return <svg className="filters" aria-hidden="true"><defs>
  {Object.values(characterLights).map(({id,gains})=><filter key={id} id={id} x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
   <feComponentTransfer>
    <feFuncR type="linear" slope={gains[0]} intercept="0" />
    <feFuncG type="linear" slope={gains[1]} intercept="0" />
    <feFuncB type="linear" slope={gains[2]} intercept="0" />
   </feComponentTransfer>
  </filter>)}
 </defs></svg>;
}
