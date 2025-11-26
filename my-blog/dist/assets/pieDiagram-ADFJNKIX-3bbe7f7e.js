import{Y as S,Q as F,aI as Q,F as Y,o as Z,p as q,s as H,g as J,c as K,b as X,_ as g,l as z,v as ee,d as te,G as ae,L as re,a6 as ne,k as ie}from"./useMarkdownPosts-dd6d53ab.js";import{p as se}from"./chunk-4BX2VUAB-7de11455.js";import{p as le}from"./mermaid-parser.core-19d184a9.js";import{d as P}from"./arc-80d8d6c0.js";import{o as oe}from"./ordinal-ba9b4969.js";import"./index-871c4268.js";import"./_baseUniq-25534930.js";import"./_basePickBy-2d6c6cce.js";import"./clone-e23d4275.js";import"./init-77b53fdd.js";function ce(e,a){return a<e?-1:a>e?1:a>=e?0:NaN}function ue(e){return e}function pe(){var e=ue,a=ce,f=null,x=S(0),s=S(F),o=S(0);function l(t){var n,c=(t=Q(t)).length,u,y,h=0,p=new Array(c),i=new Array(c),v=+x.apply(this,arguments),w=Math.min(F,Math.max(-F,s.apply(this,arguments)-v)),m,C=Math.min(Math.abs(w)/c,o.apply(this,arguments)),$=C*(w<0?-1:1),d;for(n=0;n<c;++n)(d=i[p[n]=n]=+e(t[n],n,t))>0&&(h+=d);for(a!=null?p.sort(function(A,D){return a(i[A],i[D])}):f!=null&&p.sort(function(A,D){return f(t[A],t[D])}),n=0,y=h?(w-c*$)/h:0;n<c;++n,v=m)u=p[n],d=i[u],m=v+(d>0?d*y:0)+$,i[u]={data:t[u],index:n,value:d,startAngle:v,endAngle:m,padAngle:C};return i}return l.value=function(t){return arguments.length?(e=typeof t=="function"?t:S(+t),l):e},l.sortValues=function(t){return arguments.length?(a=t,f=null,l):a},l.sort=function(t){return arguments.length?(f=t,a=null,l):f},l.startAngle=function(t){return arguments.length?(x=typeof t=="function"?t:S(+t),l):x},l.endAngle=function(t){return arguments.length?(s=typeof t=="function"?t:S(+t),l):s},l.padAngle=function(t){return arguments.length?(o=typeof t=="function"?t:S(+t),l):o},l}var R=Y.pie,G={sections:new Map,showData:!1,config:R},T=G.sections,N=G.showData,ge=structuredClone(R),de=g(()=>structuredClone(ge),"getConfig"),fe=g(()=>{T=new Map,N=G.showData,ee()},"clear"),me=g(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(e)||(T.set(e,a),z.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),he=g(()=>T,"getSections"),ve=g(e=>{N=e},"setShowData"),Se=g(()=>N,"getShowData"),_={getConfig:de,clear:fe,setDiagramTitle:Z,getDiagramTitle:q,setAccTitle:H,getAccTitle:J,setAccDescription:K,getAccDescription:X,addSection:me,getSections:he,setShowData:ve,getShowData:Se},xe=g((e,a)=>{se(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),ye={parse:g(async e=>{const a=await le("pie",e);z.debug(a),xe(a,_)},"parse")},we=g(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),Ae=we,De=g(e=>{const a=[...e.values()].reduce((s,o)=>s+o,0),f=[...e.entries()].map(([s,o])=>({label:s,value:o})).filter(s=>s.value/a*100>=1).sort((s,o)=>o.value-s.value);return pe().value(s=>s.value)(f)},"createPieArcs"),Ce=g((e,a,f,x)=>{z.debug(`rendering pie chart
`+e);const s=x.db,o=te(),l=ae(s.getConfig(),o.pie),t=40,n=18,c=4,u=450,y=u,h=re(a),p=h.append("g");p.attr("transform","translate("+y/2+","+u/2+")");const{themeVariables:i}=o;let[v]=ne(i.pieOuterStrokeWidth);v??(v=2);const w=l.textPosition,m=Math.min(y,u)/2-t,C=P().innerRadius(0).outerRadius(m),$=P().innerRadius(m*w).outerRadius(m*w);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const d=s.getSections(),A=De(d),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let b=0;d.forEach(r=>{b+=r});const W=A.filter(r=>(r.data.value/b*100).toFixed(0)!=="0"),k=oe(D);p.selectAll("mySlices").data(W).enter().append("path").attr("d",C).attr("fill",r=>k(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(W).enter().append("text").text(r=>(r.data.value/b*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(u-50)/2).attr("class","pieTitleText");const I=[...d.entries()].map(([r,M])=>({label:r,value:M})),E=p.selectAll(".legend").data(I).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const O=n+c,V=O*I.length/2,U=12*n,j=M*O-V;return"translate("+U+","+j+")"});E.append("rect").attr("width",n).attr("height",n).style("fill",r=>k(r.label)).style("stroke",r=>k(r.label)),E.append("text").attr("x",n+c).attr("y",n-c).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const B=Math.max(...E.selectAll("text").nodes().map(r=>(r==null?void 0:r.getBoundingClientRect().width)??0)),L=y+t+n+c+B;h.attr("viewBox",`0 0 ${L} ${u}`),ie(h,u,L,l.useMaxWidth)},"draw"),$e={draw:Ce},Ie={parser:ye,db:_,renderer:$e,styles:Ae};export{Ie as diagram};
