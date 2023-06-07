function ir(){for(var r=0,e,t,o="";r<arguments.length;)(e=arguments[r++])&&(t=rr(e))&&(o&&(o+=" "),o+=t);return o}function rr(r){if(typeof r=="string")return r;for(var e,t="",o=0;o<r.length;o++)r[o]&&(e=rr(r[o]))&&(t&&(t+=" "),t+=e);return t}var $="-";function ar(r){var e=lr(r),t=r.conflictingClassGroups,o=r.conflictingClassGroupModifiers,a=o===void 0?{}:o;function s(i){var l=i.split($);return l[0]===""&&l.length!==1&&l.shift(),er(l,e)||sr(i)}function n(i,l){var c=t[i]||[];return l&&a[i]?[].concat(c,a[i]):c}return{getClassGroupId:s,getConflictingClassGroupIds:n}}function er(r,e){var n;if(r.length===0)return e.classGroupId;var t=r[0],o=e.nextPart.get(t),a=o?er(r.slice(1),o):void 0;if(a)return a;if(e.validators.length!==0){var s=r.join($);return(n=e.validators.find(function(i){var l=i.validator;return l(s)}))==null?void 0:n.classGroupId}}var Y=/^\[(.+)\]$/;function sr(r){if(Y.test(r)){var e=Y.exec(r)[1],t=e==null?void 0:e.substring(0,e.indexOf(":"));if(t)return"arbitrary.."+t}}function lr(r){var e=r.theme,t=r.prefix,o={nextPart:new Map,validators:[]},a=cr(Object.entries(r.classGroups),t);return a.forEach(function(s){var n=s[0],i=s[1];V(i,o,n,e)}),o}function V(r,e,t,o){r.forEach(function(a){if(typeof a=="string"){var s=a===""?e:_(e,a);s.classGroupId=t;return}if(typeof a=="function"){if(dr(a)){V(a(o),e,t,o);return}e.validators.push({validator:a,classGroupId:t});return}Object.entries(a).forEach(function(n){var i=n[0],l=n[1];V(l,_(e,i),t,o)})})}function _(r,e){var t=r;return e.split($).forEach(function(o){t.nextPart.has(o)||t.nextPart.set(o,{nextPart:new Map,validators:[]}),t=t.nextPart.get(o)}),t}function dr(r){return r.isThemeGetter}function cr(r,e){return e?r.map(function(t){var o=t[0],a=t[1],s=a.map(function(n){return typeof n=="string"?e+n:typeof n=="object"?Object.fromEntries(Object.entries(n).map(function(i){var l=i[0],c=i[1];return[e+l,c]})):n});return[o,s]}):r}function ur(r){if(r<1)return{get:function(){},set:function(){}};var e=0,t=new Map,o=new Map;function a(s,n){t.set(s,n),e++,e>r&&(e=0,o=t,t=new Map)}return{get:function(n){var i=t.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return a(n,i),i},set:function(n,i){t.has(n)?t.set(n,i):a(n,i)}}}var tr="!";function pr(r){var e=r.separator||":",t=e.length===1,o=e[0],a=e.length;return function(n){for(var i=[],l=0,c=0,f,u=0;u<n.length;u++){var b=n[u];if(l===0){if(b===o&&(t||n.slice(u,u+a)===e)){i.push(n.slice(c,u)),c=u+a;continue}if(b==="/"){f=u;continue}}b==="["?l++:b==="]"&&l--}var m=i.length===0?n:n.substring(c),h=m.startsWith(tr),g=h?m.substring(1):m,y=f&&f>c?f-c:void 0;return{modifiers:i,hasImportantModifier:h,baseClassName:g,maybePostfixModifierPosition:y}}}function fr(r){if(r.length<=1)return r;var e=[],t=[];return r.forEach(function(o){var a=o[0]==="[";a?(e.push.apply(e,t.sort().concat([o])),t=[]):t.push(o)}),e.push.apply(e,t.sort()),e}function br(r){return{cache:ur(r.cacheSize),splitModifiers:pr(r),...ar(r)}}var gr=/\s+/;function mr(r,e){var t=e.splitModifiers,o=e.getClassGroupId,a=e.getConflictingClassGroupIds,s=new Set;return r.trim().split(gr).map(function(n){var i=t(n),l=i.modifiers,c=i.hasImportantModifier,f=i.baseClassName,u=i.maybePostfixModifierPosition,b=o(u?f.substring(0,u):f),m=!!u;if(!b){if(!u)return{isTailwindClass:!1,originalClassName:n};if(b=o(f),!b)return{isTailwindClass:!1,originalClassName:n};m=!1}var h=fr(l).join(":"),g=c?h+tr:h;return{isTailwindClass:!0,modifierId:g,classGroupId:b,originalClassName:n,hasPostfixModifier:m}}).reverse().filter(function(n){if(!n.isTailwindClass)return!0;var i=n.modifierId,l=n.classGroupId,c=n.hasPostfixModifier,f=i+l;return s.has(f)?!1:(s.add(f),a(l,c).forEach(function(u){return s.add(i+u)}),!0)}).reverse().map(function(n){return n.originalClassName}).join(" ")}function vr(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];var o,a,s,n=i;function i(c){var f=e[0],u=e.slice(1),b=u.reduce(function(m,h){return h(m)},f());return o=br(b),a=o.cache.get,s=o.cache.set,n=l,l(c)}function l(c){var f=a(c);if(f)return f;var u=mr(c,o);return s(c,u),u}return function(){return n(ir.apply(null,arguments))}}function d(r){var e=function(o){return o[r]||[]};return e.isThemeGetter=!0,e}var or=/^\[(?:([a-z-]+):)?(.+)\]$/i,hr=/^\d+\/\d+$/,yr=new Set(["px","full","screen"]),xr=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,wr=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|^0$/,Cr=/^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;function x(r){return z(r)||yr.has(r)||hr.test(r)||M(r)}function M(r){return G(r,"length",Sr)}function kr(r){return G(r,"size",nr)}function Mr(r){return G(r,"position",nr)}function zr(r){return G(r,"url",Ir)}function j(r){return G(r,"number",z)}function z(r){return!Number.isNaN(Number(r))}function Gr(r){return r.endsWith("%")&&z(r.slice(0,-1))}function I(r){return D(r)||G(r,"number",D)}function p(r){return or.test(r)}function P(){return!0}function k(r){return xr.test(r)}function Ar(r){return G(r,"",Pr)}function G(r,e,t){var o=or.exec(r);return o?o[1]?o[1]===e:t(o[2]):!1}function Sr(r){return wr.test(r)}function nr(){return!1}function Ir(r){return r.startsWith("url(")}function D(r){return Number.isInteger(Number(r))}function Pr(r){return Cr.test(r)}function Rr(){var r=d("colors"),e=d("spacing"),t=d("blur"),o=d("brightness"),a=d("borderColor"),s=d("borderRadius"),n=d("borderSpacing"),i=d("borderWidth"),l=d("contrast"),c=d("grayscale"),f=d("hueRotate"),u=d("invert"),b=d("gap"),m=d("gradientColorStops"),h=d("gradientColorStopPositions"),g=d("inset"),y=d("margin"),C=d("opacity"),w=d("padding"),B=d("saturate"),W=d("scale"),U=d("sepia"),F=d("skew"),q=d("space"),Z=d("translate"),L=function(){return["auto","contain","none"]},N=function(){return["auto","hidden","clip","visible","scroll"]},J=function(){return["auto",e]},X=function(){return["",x]},R=function(){return["auto",z,p]},H=function(){return["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"]},T=function(){return["solid","dashed","dotted","double","none"]},K=function(){return["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter"]},O=function(){return["start","end","center","between","around","evenly","stretch"]},A=function(){return["","0",p]},Q=function(){return["auto","avoid","all","avoid-page","page","left","right","column"]},S=function(){return[z,j]},E=function(){return[z,p]};return{cacheSize:500,theme:{colors:[P],spacing:[x],blur:["none","",k,M],brightness:S(),borderColor:[r],borderRadius:["none","","full",k,M],borderSpacing:[e],borderWidth:X(),contrast:S(),grayscale:A(),hueRotate:E(),invert:A(),gap:[e],gradientColorStops:[r],gradientColorStopPositions:[Gr,M],inset:J(),margin:J(),opacity:S(),padding:[e],saturate:S(),scale:S(),sepia:A(),skew:E(),space:[e],translate:[e]},classGroups:{aspect:[{aspect:["auto","square","video",p]}],container:["container"],columns:[{columns:[k]}],"break-after":[{"break-after":Q()}],"break-before":[{"break-before":Q()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none"]}],clear:[{clear:["left","right","both","none"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[].concat(H(),[p])}],overflow:[{overflow:N()}],"overflow-x":[{"overflow-x":N()}],"overflow-y":[{"overflow-y":N()}],overscroll:[{overscroll:L()}],"overscroll-x":[{"overscroll-x":L()}],"overscroll-y":[{"overscroll-y":L()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[g]}],"inset-x":[{"inset-x":[g]}],"inset-y":[{"inset-y":[g]}],start:[{start:[g]}],end:[{end:[g]}],top:[{top:[g]}],right:[{right:[g]}],bottom:[{bottom:[g]}],left:[{left:[g]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",I]}],basis:[{basis:[e]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",p]}],grow:[{grow:A()}],shrink:[{shrink:A()}],order:[{order:["first","last","none",I]}],"grid-cols":[{"grid-cols":[P]}],"col-start-end":[{col:["auto",{span:[I]},p]}],"col-start":[{"col-start":R()}],"col-end":[{"col-end":R()}],"grid-rows":[{"grid-rows":[P]}],"row-start-end":[{row:["auto",{span:[I]},p]}],"row-start":[{"row-start":R()}],"row-end":[{"row-end":R()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",p]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",p]}],gap:[{gap:[b]}],"gap-x":[{"gap-x":[b]}],"gap-y":[{"gap-y":[b]}],"justify-content":[{justify:["normal"].concat(O())}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal"].concat(O(),["baseline"])}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[].concat(O(),["baseline"])}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[w]}],px:[{px:[w]}],py:[{py:[w]}],ps:[{ps:[w]}],pe:[{pe:[w]}],pt:[{pt:[w]}],pr:[{pr:[w]}],pb:[{pb:[w]}],pl:[{pl:[w]}],m:[{m:[y]}],mx:[{mx:[y]}],my:[{my:[y]}],ms:[{ms:[y]}],me:[{me:[y]}],mt:[{mt:[y]}],mr:[{mr:[y]}],mb:[{mb:[y]}],ml:[{ml:[y]}],"space-x":[{"space-x":[q]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[q]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit",e]}],"min-w":[{"min-w":["min","max","fit",x]}],"max-w":[{"max-w":["0","none","full","min","max","fit","prose",{screen:[k]},k,M]}],h:[{h:[e,"auto","min","max","fit"]}],"min-h":[{"min-h":["min","max","fit",x]}],"max-h":[{"max-h":[e,"min","max","fit"]}],"font-size":[{text:["base",k,M]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",j]}],"font-family":[{font:[P]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",M]}],"line-clamp":[{"line-clamp":["none",z,j]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",x]}],"list-image":[{"list-image":["none",p]}],"list-style-type":[{list:["none","disc","decimal",p]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[r]}],"placeholder-opacity":[{"placeholder-opacity":[C]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[r]}],"text-opacity":[{"text-opacity":[C]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[].concat(T(),["wavy"])}],"text-decoration-thickness":[{decoration:["auto","from-font",x]}],"underline-offset":[{"underline-offset":["auto",x]}],"text-decoration-color":[{decoration:[r]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],indent:[{indent:[e]}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",M]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",p]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[C]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[].concat(H(),[Mr])}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",kr]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},zr]}],"bg-color":[{bg:[r]}],"gradient-from-pos":[{from:[h]}],"gradient-via-pos":[{via:[h]}],"gradient-to-pos":[{to:[h]}],"gradient-from":[{from:[m]}],"gradient-via":[{via:[m]}],"gradient-to":[{to:[m]}],rounded:[{rounded:[s]}],"rounded-s":[{"rounded-s":[s]}],"rounded-e":[{"rounded-e":[s]}],"rounded-t":[{"rounded-t":[s]}],"rounded-r":[{"rounded-r":[s]}],"rounded-b":[{"rounded-b":[s]}],"rounded-l":[{"rounded-l":[s]}],"rounded-ss":[{"rounded-ss":[s]}],"rounded-se":[{"rounded-se":[s]}],"rounded-ee":[{"rounded-ee":[s]}],"rounded-es":[{"rounded-es":[s]}],"rounded-tl":[{"rounded-tl":[s]}],"rounded-tr":[{"rounded-tr":[s]}],"rounded-br":[{"rounded-br":[s]}],"rounded-bl":[{"rounded-bl":[s]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[C]}],"border-style":[{border:[].concat(T(),["hidden"])}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[C]}],"divide-style":[{divide:T()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:[""].concat(T())}],"outline-offset":[{"outline-offset":[x]}],"outline-w":[{outline:[x]}],"outline-color":[{outline:[r]}],"ring-w":[{ring:X()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[r]}],"ring-opacity":[{"ring-opacity":[C]}],"ring-offset-w":[{"ring-offset":[x]}],"ring-offset-color":[{"ring-offset":[r]}],shadow:[{shadow:["","inner","none",k,Ar]}],"shadow-color":[{shadow:[P]}],opacity:[{opacity:[C]}],"mix-blend":[{"mix-blend":K()}],"bg-blend":[{"bg-blend":K()}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[l]}],"drop-shadow":[{"drop-shadow":["","none",k,p]}],grayscale:[{grayscale:[c]}],"hue-rotate":[{"hue-rotate":[f]}],invert:[{invert:[u]}],saturate:[{saturate:[B]}],sepia:[{sepia:[U]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[l]}],"backdrop-grayscale":[{"backdrop-grayscale":[c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[f]}],"backdrop-invert":[{"backdrop-invert":[u]}],"backdrop-opacity":[{"backdrop-opacity":[C]}],"backdrop-saturate":[{"backdrop-saturate":[B]}],"backdrop-sepia":[{"backdrop-sepia":[U]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[n]}],"border-spacing-x":[{"border-spacing-x":[n]}],"border-spacing-y":[{"border-spacing-y":[n]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",p]}],duration:[{duration:E()}],ease:[{ease:["linear","in","out","in-out",p]}],delay:[{delay:E()}],animate:[{animate:["none","spin","ping","pulse","bounce",p]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[W]}],"scale-x":[{"scale-x":[W]}],"scale-y":[{"scale-y":[W]}],rotate:[{rotate:[I,p]}],"translate-x":[{"translate-x":[Z]}],"translate-y":[{"translate-y":[Z]}],"skew-x":[{"skew-x":[F]}],"skew-y":[{"skew-y":[F]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",p]}],accent:[{accent:["auto",r]}],appearance:["appearance-none"],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",p]}],"caret-color":[{caret:[r]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":[e]}],"scroll-mx":[{"scroll-mx":[e]}],"scroll-my":[{"scroll-my":[e]}],"scroll-ms":[{"scroll-ms":[e]}],"scroll-me":[{"scroll-me":[e]}],"scroll-mt":[{"scroll-mt":[e]}],"scroll-mr":[{"scroll-mr":[e]}],"scroll-mb":[{"scroll-mb":[e]}],"scroll-ml":[{"scroll-ml":[e]}],"scroll-p":[{"scroll-p":[e]}],"scroll-px":[{"scroll-px":[e]}],"scroll-py":[{"scroll-py":[e]}],"scroll-ps":[{"scroll-ps":[e]}],"scroll-pe":[{"scroll-pe":[e]}],"scroll-pt":[{"scroll-pt":[e]}],"scroll-pr":[{"scroll-pr":[e]}],"scroll-pb":[{"scroll-pb":[e]}],"scroll-pl":[{"scroll-pl":[e]}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","pinch-zoom","manipulation",{pan:["x","left","right","y","up","down"]}]}],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",p]}],fill:[{fill:[r,"none"]}],"stroke-w":[{stroke:[x,j]}],stroke:[{stroke:[r,"none"]}],sr:["sr-only","not-sr-only"]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}var Tr=vr(Rr);export{Tr as t};
