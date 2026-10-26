// Measured opaque skin midtones; all cels share the original resting palette.
// Small RGB gains preserve the painted shading, outlines and source alpha.
export const referenceMidtone=[245,201,182];
const midtones={
 'calamitas-v2.png':[245,201,182],
 'calamitas-singing-v2.png':[250,205,182],
 'calamitas-aftermath-v2.png':[243,200,182],
 'calamitas-arm-prepare.png':[252,212,192],
 'calamitas-arm-release.png':[252,208,186],
 'calamitas-arm-gather.png':[252,209,188],
 'calamitas-arm-low.png':[252,208,187],
 'calamitas-arm-open.png':[252,213,191],
 'calamitas-arm-half.png':[252,208,185],
 'calamitas-arm-lift.png':[252,208,187],
 'calamitas-arm-rise.png':[252,208,186],
 'calamitas-arm-extend.png':[252,208,187],
 'calamitas-arm-high.png':[252,206,184],
 'calamitas-arm-unfurl.png':[252,205,183],
 'calamitas-arm-reach.png':[252,207,185],
 'calamitas-arm-settle.png':[251,210,189],
};
export const characterLights=Object.fromEntries(Object.entries(midtones).map(([file,sample])=>[file,{
 id:'light-'+file.replace('.png',''),gains:sample.map((value,i)=>referenceMidtone[i]/value),
}]));
export function lightingFor(src) {
 return characterLights[src.split('/').at(-1)]??characterLights['calamitas-v2.png'];
}
